import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Usuario from "@/lib/models/usuario";

export async function GET() {
  try {
    await dbConnect();
    const usuarios = await Usuario.find({}).sort({ fechaRegistro: -1 }).lean();
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const nuevoUsuario = new Usuario(data);
    await nuevoUsuario.save();
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
