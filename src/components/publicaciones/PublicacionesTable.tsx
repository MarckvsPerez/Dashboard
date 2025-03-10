import React from "react";
import { IPublicacion } from "@/lib/models/publicacion";
import { WithId } from "../usuarios/UsuariosTable";

type PublicacionesTableProps = {
  publicaciones: IPublicacion[];
  openEditModal: (item: IPublicacion & WithId) => void;
  handleDelete: (id: string) => void;
};

const PublicacionesTable = ({
  publicaciones,
  openEditModal,
  handleDelete,
}: PublicacionesTableProps) => {
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
            Contenido
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Interacciones
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Fecha
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
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion) => (
            <tr key={publicacion._id?.toString()}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {typeof publicacion.usuario === "object"
                    ? (
                        publicacion.usuario as unknown as {
                          username: string;
                        }
                      ).username || publicacion.usuario.toString()
                    : publicacion.usuario}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                  {publicacion.contenido}
                </div>
                {publicacion.hashtags && publicacion.hashtags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {publicacion.hashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>👍 {publicacion.likes}</span>
                  <span>💬 {publicacion.comentarios}</span>
                  <span>🔄 {publicacion.compartidos}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(publicacion.fechaPublicacion).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    publicacion.esPatrocinado
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {publicacion.esPatrocinado ? "Patrocinado" : "Normal"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() =>
                    openEditModal(publicacion as IPublicacion & WithId)
                  }
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    handleDelete(publicacion._id?.toString() || "")
                  }
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
              colSpan={6}
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              No hay publicaciones disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PublicacionesTable;
