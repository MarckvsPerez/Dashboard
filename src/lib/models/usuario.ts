import mongoose, { Schema, Document } from "mongoose";

export interface IUsuario extends Document {
  username: string;
  email: string;
  nombre: string;
  apellido: string;
  fotoPerfil?: string;
  biografia?: string;
  seguidores: number;
  seguidos: number;
  fechaRegistro: Date;
  ultimaConexion: Date;
  esVerificado: boolean;
}

const UsuarioSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fotoPerfil: { type: String, default: "default-avatar.png" },
  biografia: { type: String, default: "" },
  seguidores: { type: Number, default: 0 },
  seguidos: { type: Number, default: 0 },
  fechaRegistro: { type: Date, default: Date.now },
  ultimaConexion: { type: Date, default: Date.now },
  esVerificado: { type: Boolean, default: false },
});

export default mongoose.models.Usuario ||
  mongoose.model<IUsuario>("Usuario", UsuarioSchema);
