import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, define la variable de entorno MONGODB_URI");
}

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión a MongoDB establecida - Base de datos de Red Social");
    return mongoose;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

export default dbConnect;
