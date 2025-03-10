import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Usuario from "@/lib/models/usuario";

export async function GET() {
  try {
    await dbConnect();
    const usuarios = await Usuario.find({}).sort({ fechaRegistro: -1 });
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}
