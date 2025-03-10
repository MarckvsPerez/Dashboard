import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Usuario from "@/lib/models/usuario";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const usuarioEliminado = await Usuario.findByIdAndDelete(params.id);

    if (!usuarioEliminado) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await request.json();

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    ).lean();

    if (!usuarioActualizado) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}
