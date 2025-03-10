import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Publicacion from "@/lib/models/publicacion";

export async function GET() {
  try {
    await dbConnect();

    const publicaciones = await Publicacion.find().populate(
      "usuario",
      "username"
    );

    const interaccionesPorPublicacion = publicaciones
      .map((pub) => ({
        id: pub._id,
        usuario: pub.usuario.username,
        contenido: pub.contenido.substring(0, 30) + "...",
        likes: pub.likes,
        comentarios: pub.comentarios,
        compartidos: pub.compartidos,
        total: pub.likes + pub.comentarios + pub.compartidos,
        fecha: pub.fechaPublicacion,
      }))
      .sort((a, b) => b.total - a.total);

    const hashtagsMap = {};
    publicaciones.forEach((pub) => {
      if (pub.hashtags && pub.hashtags.length > 0) {
        pub.hashtags.forEach((tag: string) => {
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

    const engagementPorUsuario = {};
    publicaciones.forEach((pub) => {
      const username = pub.usuario.username;
      if (!(username in engagementPorUsuario)) {
        (
          engagementPorUsuario as Record<
            string,
            {
              totalPublicaciones: number;
              totalInteracciones: number;
              promedio: number;
            }
          >
        )[username] = {
          totalPublicaciones: 0,
          totalInteracciones: 0,
          promedio: 0,
        };
      }

      (
        engagementPorUsuario as Record<
          string,
          {
            totalPublicaciones: number;
            totalInteracciones: number;
            promedio: number;
          }
        >
      )[username].totalPublicaciones += 1;
      const interacciones = pub.likes + pub.comentarios + pub.compartidos;
      (
        engagementPorUsuario as Record<
          string,
          {
            totalPublicaciones: number;
            totalInteracciones: number;
            promedio: number;
          }
        >
      )[username].totalInteracciones += interacciones;
    });

    Object.keys(engagementPorUsuario).forEach((username) => {
      const usuario = (
        engagementPorUsuario as Record<
          string,
          {
            totalPublicaciones: number;
            totalInteracciones: number;
            promedio: number;
          }
        >
      )[username];
      usuario.promedio =
        usuario.totalInteracciones / usuario.totalPublicaciones;
    });

    const engagementArray = Object.entries(engagementPorUsuario)
      .map(([username, stats]) => ({
        username,
        ...(stats as {
          totalPublicaciones: number;
          totalInteracciones: number;
          promedio: number;
        }),
      }))
      .sort((a, b) => b.promedio - a.promedio);

    const datosInteracciones = {
      labels: interaccionesPorPublicacion
        .slice(0, 5)
        .map((pub) => `@${pub.usuario}`),
      datasets: [
        {
          label: "Likes",
          data: interaccionesPorPublicacion.slice(0, 5).map((pub) => pub.likes),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Comments",
          data: interaccionesPorPublicacion
            .slice(0, 5)
            .map((pub) => pub.comentarios),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Shared",
          data: interaccionesPorPublicacion
            .slice(0, 5)
            .map((pub) => pub.compartidos),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
      ],
    };

    const datosHashtags = {
      labels: hashtagsArray.map((item) => `#${item.tag}`),
      datasets: [
        {
          label: "Mentions",
          data: hashtagsArray.map((item) => item.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    const datosEngagement = {
      labels: engagementArray.map((item) => `@${item.username}`),
      datasets: [
        {
          label: "Average interactions per post",
          data: engagementArray.map((item) => item.promedio),
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          tension: 0.1,
        },
      ],
    };

    return NextResponse.json({
      interacciones: datosInteracciones,
      hashtags: datosHashtags,
      engagement: datosEngagement,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas de publicaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
