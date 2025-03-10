import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Publicacion from "@/lib/models/publicacion";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const sponsoredFilter = searchParams.get("sponsoredFilter") || "all";

    let query = {};
    if (sponsoredFilter === "sponsored") {
      query = { esPatrocinado: true };
    } else if (sponsoredFilter === "normal") {
      query = { esPatrocinado: false };
    }

    const posts = await Publicacion.find(query).populate("usuario", "username");

    const postInteractions = posts
      .map((post) => ({
        id: post._id,
        usuario: post.usuario.username,
        contenido: post.contenido.substring(0, 30) + "...",
        likes: post.likes,
        comentarios: post.comentarios,
        compartidos: post.compartidos,
        total: post.likes + post.comentarios + post.compartidos,
        fecha: post.fechaPublicacion,
        esPatrocinado: post.esPatrocinado,
      }))
      .sort((a, b) => b.total - a.total);

    const hashtagsMap = {};
    posts.forEach((post) => {
      if (post.hashtags && post.hashtags.length > 0) {
        post.hashtags.forEach((tag: string) => {
          if (!hashtagsMap[tag as keyof typeof hashtagsMap]) {
            (hashtagsMap as Record<string, number>)[tag] = 0;
          }
          (hashtagsMap as Record<string, number>)[tag] += 1;
        });
      }
    });

    const hashtagsArray = Object.entries(hashtagsMap)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => (b.count as number) - (a.count as number))
      .slice(0, 10);

    const userEngagement = {};
    posts.forEach((post) => {
      const username = post.usuario.username;
      if (!(username in userEngagement)) {
        (
          userEngagement as Record<
            string,
            {
              totalPosts: number;
              totalInteractions: number;
              average: number;
            }
          >
        )[username] = {
          totalPosts: 0,
          totalInteractions: 0,
          average: 0,
        };
      }

      (
        userEngagement as Record<
          string,
          {
            totalPosts: number;
            totalInteractions: number;
            average: number;
          }
        >
      )[username].totalPosts += 1;
      const interactions = post.likes + post.comentarios + post.compartidos;
      (
        userEngagement as Record<
          string,
          {
            totalPosts: number;
            totalInteractions: number;
            average: number;
          }
        >
      )[username].totalInteractions += interactions;
    });

    Object.keys(userEngagement).forEach((username) => {
      const user = (
        userEngagement as Record<
          string,
          {
            totalPosts: number;
            totalInteractions: number;
            average: number;
          }
        >
      )[username];
      user.average = user.totalInteractions / user.totalPosts;
    });

    const engagementArray = Object.entries(userEngagement)
      .map(([username, stats]) => ({
        username,
        ...(stats as {
          totalPosts: number;
          totalInteractions: number;
          average: number;
        }),
      }))
      .sort((a, b) => b.average - a.average);

    const interactionsData = {
      labels: postInteractions
        .slice(0, 5)
        .map((post) => `@${post.usuario}${post.esPatrocinado ? " (P)" : ""}`),
      datasets: [
        {
          label: "Likes",
          data: postInteractions.slice(0, 5).map((post) => post.likes),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Comments",
          data: postInteractions.slice(0, 5).map((post) => post.comentarios),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Shared",
          data: postInteractions.slice(0, 5).map((post) => post.compartidos),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
      ],
    };

    const hashtagsData = {
      labels: hashtagsArray.map((item) => `#${item.tag}`),
      datasets: [
        {
          label: "Mentions",
          data: hashtagsArray.map((item) => item.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    const engagementData = {
      labels: engagementArray.map((item) => `@${item.username}`),
      datasets: [
        {
          label: "Average interactions per post",
          data: engagementArray.map((item) => item.average),
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          tension: 0.1,
        },
      ],
    };

    return NextResponse.json({
      interacciones: interactionsData,
      hashtags: hashtagsData,
      engagement: engagementData,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas de publicaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
