import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Usuario from "@/lib/models/usuario";

export async function GET() {
  try {
    await dbConnect();

    const usuarios = await Usuario.find().select(
      "username seguidores seguidos esVerificado fechaRegistro"
    );

    const usuariosPopulares = [...usuarios].sort(
      (a, b) => b.seguidores - a.seguidores
    );

    const relacionSeguidores = usuarios
      .map((user) => ({
        username: user.username,
        seguidores: user.seguidores,
        seguidos: user.seguidos,
        ratio: user.seguidores / (user.seguidos || 1),
      }))
      .sort((a, b) => b.ratio - a.ratio);

    const verificados = usuarios.filter((user) => user.esVerificado).length;
    const noVerificados = usuarios.length - verificados;

    const datosUsuariosPopulares = {
      labels: usuariosPopulares.map((user) => `@${user.username}`),
      datasets: [
        {
          label: "Followers",
          data: usuariosPopulares.map((user) => user.seguidores),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };

    const datosRelacionSeguidores = {
      labels: relacionSeguidores.map((user) => `@${user.username}`),
      datasets: [
        {
          label: "Followers",
          data: relacionSeguidores.map((user) => user.seguidores),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Following",
          data: relacionSeguidores.map((user) => user.seguidos),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    const datosVerificados = {
      labels: ["Verified", "Non-verified"],
      datasets: [
        {
          data: [verificados, noVerificados],
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
      usuariosPopulares: datosUsuariosPopulares,
      relacionSeguidores: datosRelacionSeguidores,
      verificados: datosVerificados,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas de usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
