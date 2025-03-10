import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Publicacion from "@/lib/models/publicacion";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();

    const publicacionActualizada = await Publicacion.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    )
      .populate("usuario", "username fotoPerfil nombre apellido")
      .lean();

    if (!publicacionActualizada) {
      return NextResponse.json(
        { error: "Publicación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(publicacionActualizada);
  } catch (error) {
    console.error("Error al actualizar publicación:", error);
    return NextResponse.json(
      { error: "Error al actualizar publicación" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const publicacionEliminada = await Publicacion.findByIdAndDelete(params.id);

    if (!publicacionEliminada) {
      return NextResponse.json(
        { error: "Publicación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    return NextResponse.json(
      { error: "Error al eliminar publicación" },
      { status: 500 }
    );
  }
}
