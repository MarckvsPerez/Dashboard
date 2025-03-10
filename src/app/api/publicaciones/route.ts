import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Publicacion from "@/lib/models/publicacion";

export async function GET() {
  try {
    await dbConnect();
    const publicaciones = await Publicacion.find({})
      .populate("usuario", "username")
      .sort({ fechaPublicacion: -1 });
    return NextResponse.json(publicaciones);
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return NextResponse.json(
      { error: "Error al obtener publicaciones" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const nuevaPublicacion = new Publicacion(data);
    await nuevaPublicacion.save();

    const publicacionPopulada = await Publicacion.findById(nuevaPublicacion._id)
      .populate("usuario", "username fotoPerfil nombre apellido")
      .lean();

    return NextResponse.json(publicacionPopulada, { status: 201 });
  } catch (error) {
    console.error("Error al crear publicación:", error);
    return NextResponse.json(
      { error: "Error al crear publicación" },
      { status: 500 }
    );
  }
}
