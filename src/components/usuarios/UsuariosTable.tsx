import React from "react";
import { IUsuario } from "@/lib/models/usuario";
import Image from "next/image";

type WithId = {
  _id?: string;
};

type UsuariosTableProps = {
  usuarios: IUsuario[];
  openEditModal: (item: IUsuario & WithId) => void;
  handleDelete: (id: string) => void;
};

const UsuariosTable = ({
  usuarios,
  openEditModal,
  handleDelete,
}: UsuariosTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Usuario
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nombre
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Seguidores
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Fecha de Registro
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Estado
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <tr key={usuario._id?.toString()}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        usuario.nombre + " " + usuario.apellido
                      )}&background=random&color=fff`}
                      alt="Foto de perfil"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {usuario.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{usuario.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{`${usuario.nombre} ${usuario.apellido}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.seguidores}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(usuario.fechaRegistro).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    usuario.esVerificado
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {usuario.esVerificado ? "Verificado" : "No verificado"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => openEditModal(usuario as IUsuario & WithId)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario._id?.toString() || "")}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              No hay usuarios disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UsuariosTable;
export type { WithId };
