import React from "react";
import { IUsuario } from "@/lib/models/usuario";

type PublicacionFormData = {
  contenido: string;
  hashtags: string | string[];
  likes: number;
  comentarios: number;
  compartidos: number;
  esPatrocinado: boolean;
  usuario: string;
};

type PublicacionFormProps = {
  formData: PublicacionFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  usuarios: IUsuario[];
};

const PublicacionForm = ({
  formData,
  handleInputChange,
  usuarios,
}: PublicacionFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Usuario
        </label>
        <select
          name="usuario"
          value={formData.usuario || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((u) => (
            <option key={u._id?.toString()} value={u._id?.toString()}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contenido
        </label>
        <textarea
          name="contenido"
          value={formData.contenido || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Hashtags (separados por coma)
        </label>
        <input
          type="text"
          name="hashtags"
          value={
            typeof formData.hashtags === "string"
              ? formData.hashtags
              : formData.hashtags.join(", ")
          }
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="tecnología, programación, nextjs"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Me gusta
          </label>
          <input
            type="number"
            name="likes"
            value={formData.likes || 0}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comentarios
          </label>
          <input
            type="number"
            name="comentarios"
            value={formData.comentarios || 0}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Compartidos
          </label>
          <input
            type="number"
            name="compartidos"
            value={formData.compartidos || 0}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="esPatrocinado"
          checked={formData.esPatrocinado || false}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label className="text-gray-700 text-sm font-bold">
          Publicación patrocinada
        </label>
      </div>
    </>
  );
};

export default PublicacionForm;
export type { PublicacionFormData };
