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
