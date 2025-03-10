import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Usuario from "@/lib/models/usuario";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const verifiedFilter = searchParams.get("verifiedFilter") || "all";

    let query = {};
    if (verifiedFilter === "verified") {
      query = { esVerificado: true };
    } else if (verifiedFilter === "unverified") {
      query = { esVerificado: false };
    }

    const users = await Usuario.find(query).select(
      "username seguidores seguidos esVerificado fechaRegistro"
    );

    const popularUsers = [...users].sort((a, b) => b.seguidores - a.seguidores);

    const followersRatio = users
      .map((user) => ({
        username: user.username,
        seguidores: user.seguidores,
        seguidos: user.seguidos,
        ratio: user.seguidores / (user.seguidos || 1),
      }))
      .sort((a, b) => b.ratio - a.ratio);

    const verifiedCount = users.filter((user) => user.esVerificado).length;
    const nonVerifiedCount = users.length - verifiedCount;

    const popularUsersData = {
      labels: popularUsers.map((user) => `@${user.username}`),
      datasets: [
        {
          label: "Followers",
          data: popularUsers.map((user) => user.seguidores),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };

    const followersRatioData = {
      labels: followersRatio.map((user) => `@${user.username}`),
      datasets: [
        {
          label: "Followers",
          data: followersRatio.map((user) => user.seguidores),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Following",
          data: followersRatio.map((user) => user.seguidos),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    const verifiedStatusData = {
      labels: ["Verified", "Non-verified"],
      datasets: [
        {
          data: [verifiedCount, nonVerifiedCount],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    };

    return NextResponse.json({
      usuariosPopulares: popularUsersData,
      relacionSeguidores: followersRatioData,
      verificados: verifiedStatusData,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas de usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
