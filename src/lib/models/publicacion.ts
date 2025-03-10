import mongoose, { Schema, Document } from "mongoose";

export interface IPublicacion extends Document {
  usuario: mongoose.Types.ObjectId;
  contenido: string;
  imagenes?: string[];
  likes: number;
  comentarios: number;
  compartidos: number;
  hashtags?: string[];
  ubicacion?: string;
  fechaPublicacion: Date;
  esPatrocinado: boolean;
}

const PublicacionSchema: Schema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  contenido: { type: String, required: true },
  imagenes: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  comentarios: { type: Number, default: 0 },
  compartidos: { type: Number, default: 0 },
  hashtags: { type: [String], default: [] },
  ubicacion: { type: String },
  fechaPublicacion: { type: Date, default: Date.now },
  esPatrocinado: { type: Boolean, default: false },
});

export default mongoose.models.Publicacion ||
  mongoose.model<IPublicacion>("Publicacion", PublicacionSchema);
