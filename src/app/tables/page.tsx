"use client";

import { useState, useEffect } from "react";
import { IUsuario } from "@/lib/models/usuario";
import { IPublicacion } from "@/lib/models/publicacion";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// Tipos para los formularios
type UsuarioFormData = {
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  seguidores: number;
  esVerificado: boolean;
};

type PublicacionFormData = {
  contenido: string;
  hashtags: string | string[];
  likes: number;
  comentarios: number;
  compartidos: number;
  esPatrocinado: boolean;
  usuario: string;
};

type WithId = {
  _id?: string;
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
          First Name
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
          Last Name
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
          Username
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
          Followers
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
        <label className="text-gray-700 text-sm font-bold">Verified user</label>
      </div>
    </>
  );
};

// Componente de formulario para Publicaciones
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
          User
        </label>
        <select
          name="usuario"
          value={formData.usuario || ""}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select a user</option>
          {usuarios.map((u) => (
            <option key={u._id?.toString()} value={u._id?.toString()}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Content
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
          Hashtags (comma separated)
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
          placeholder="technology, programming, nextjs"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Likes
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
            Comments
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
            Shares
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
          Sponsored post
        </label>
      </div>
    </>
  );
};

export default function Tables() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [publicaciones, setPublicaciones] = useState<IPublicacion[]>([]);
  const [activeTab, setActiveTab] = useState<"usuarios" | "publicaciones">(
    "usuarios"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"crear" | "editar">("crear");
  const [currentItem, setCurrentItem] = useState<
    (IUsuario & WithId) | (IPublicacion & WithId) | null
  >(null);

  // Estados separados para cada tipo de formulario
  const [usuarioFormData, setUsuarioFormData] = useState<UsuarioFormData>({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    seguidores: 0,
    esVerificado: false,
  });

  const [publicacionFormData, setPublicacionFormData] =
    useState<PublicacionFormData>({
      contenido: "",
      hashtags: [],
      likes: 0,
      comentarios: 0,
      compartidos: 0,
      esPatrocinado: false,
      usuario: "",
    });

  const openCreateModal = () => {
    setModalMode("crear");
    if (activeTab === "usuarios") {
      setUsuarioFormData({
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        seguidores: 0,
        esVerificado: false,
      });
    } else {
      setPublicacionFormData({
        contenido: "",
        hashtags: [],
        likes: 0,
        comentarios: 0,
        compartidos: 0,
        esPatrocinado: false,
        usuario: "",
      });
    }
    setIsModalOpen(true);
  };

  const openEditModal = <
    T extends (IUsuario & WithId) | (IPublicacion & WithId)
  >(
    item: T
  ) => {
    setModalMode("editar");
    setCurrentItem(item);

    if ("username" in item) {
      // Es un usuario
      const usuario = item as IUsuario;
      setUsuarioFormData({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        username: usuario.username,
        seguidores: usuario.seguidores,
        esVerificado: usuario.esVerificado,
      });
    } else {
      // Es una publicación
      const publicacion = item as IPublicacion;
      setPublicacionFormData({
        contenido: publicacion.contenido,
        hashtags: publicacion.hashtags?.join(", ") || "",
        likes: publicacion.likes,
        comentarios: publicacion.comentarios,
        compartidos: publicacion.compartidos,
        esPatrocinado: publicacion.esPatrocinado,
        usuario:
          typeof publicacion.usuario === "object"
            ? (publicacion.usuario as unknown as { _id: string })._id
            : (publicacion.usuario as string),
      });
    }

    setIsModalOpen(true);
  };

  const handleUsuarioInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setUsuarioFormData({ ...usuarioFormData, [name]: checked });
    } else if (type === "number") {
      setUsuarioFormData({ ...usuarioFormData, [name]: parseInt(value) });
    } else {
      setUsuarioFormData({ ...usuarioFormData, [name]: value });
    }
  };

  const handlePublicacionInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setPublicacionFormData({ ...publicacionFormData, [name]: checked });
    } else if (name === "hashtags") {
      setPublicacionFormData({ ...publicacionFormData, [name]: value });
    } else if (type === "number") {
      setPublicacionFormData({
        ...publicacionFormData,
        [name]: parseInt(value),
      });
    } else {
      setPublicacionFormData({ ...publicacionFormData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data =
        activeTab === "usuarios"
          ? { ...usuarioFormData }
          : { ...publicacionFormData };

      if (
        activeTab === "publicaciones" &&
        typeof (data as PublicacionFormData).hashtags === "string"
      ) {
        (data as PublicacionFormData).hashtags = (
          (data as PublicacionFormData).hashtags as string
        )
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(Boolean);
      }

      const endpoint = `/api/${activeTab}`;
      const method = modalMode === "crear" ? "POST" : "PUT";
      const url =
        modalMode === "crear" ? endpoint : `${endpoint}/${currentItem?._id}`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error processing the request");

      await fetchData();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Error processing the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      const endpoint = `/api/${activeTab}/${id}`;
      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) throw new Error("Error deleting");

      await fetchData();
    } catch (err) {
      console.error("Error:", err);
      setError("Error deleting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const usuariosRes = await fetch("/api/usuarios");
      const publicacionesRes = await fetch("/api/publicaciones");

      if (!usuariosRes.ok || !publicacionesRes.ok) {
        throw new Error("Error loading data");
      }

      const usuariosData = await usuariosRes.json();
      const publicacionesData = await publicacionesRes.json();

      setUsuarios(usuariosData);
      setPublicaciones(publicacionesData);
      setError("");
    } catch (err) {
      setError("Error loading data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="border-b mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("usuarios")}
            className={`${
              activeTab === "usuarios"
                ? "border-black text-black"
                : "border-transparent text-white hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("publicaciones")}
            className={`${
              activeTab === "publicaciones"
                ? "border-black text-black"
                : "border-transparent text-white hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Posts
          </button>
        </nav>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          onClick={openCreateModal}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          {activeTab === "usuarios" ? "New User" : "New Post"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-600">Loading data...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === "usuarios" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Followers
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Registration Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
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
                          <div className="text-sm text-gray-900">
                            {usuario.email}
                          </div>
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
                            {usuario.esVerificado ? "Verified" : "Not verified"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              openEditModal(usuario as IUsuario & WithId)
                            }
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(usuario._id?.toString() || "")
                            }
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
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
                        No users available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Content
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Interactions
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
                          {publicacion.hashtags &&
                            publicacion.hashtags.length > 0 && (
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
                          {new Date(
                            publicacion.fechaPublicacion
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              publicacion.esPatrocinado
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {publicacion.esPatrocinado
                              ? "Patrocinado"
                              : "Normal"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              openEditModal(
                                publicacion as IPublicacion & WithId
                              )
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
            )}
          </div>
        )}
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {modalMode === "crear" ? "Create new" : "Edit"}{" "}
                    {activeTab === "usuarios" ? "user" : "post"}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="mt-4">
                    {activeTab === "usuarios" ? (
                      <UsuarioForm
                        formData={usuarioFormData}
                        handleInputChange={handleUsuarioInputChange}
                      />
                    ) : (
                      <PublicacionForm
                        formData={publicacionFormData}
                        handleInputChange={handlePublicacionInputChange}
                        usuarios={usuarios}
                      />
                    )}

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                      >
                        {modalMode === "crear" ? "Create" : "Save changes"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
