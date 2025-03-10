import React from "react";

type UsuarioFormData = {
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  seguidores: number;
  esVerificado: boolean;
};

type UsuarioFormProps = {
  formData: UsuarioFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

const UsuarioForm = ({ formData, handleInputChange }: UsuarioFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Apellido
        </label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre de usuario
        </label>
        <input
          type="text"
          name="username"
          value={formData.username || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Seguidores
        </label>
        <input
          type="number"
          name="seguidores"
          value={formData.seguidores || 0}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="esVerificado"
          checked={formData.esVerificado || false}
          onChange={handleInputChange}
          className="mr-2"
        />
        <label className="text-gray-700 text-sm font-bold">
          Usuario verificado
        </label>
      </div>
    </>
  );
};

export default UsuarioForm;
export type { UsuarioFormData };
