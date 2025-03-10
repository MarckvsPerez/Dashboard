"use client";

import { useState, useEffect } from "react";
import { IUsuario } from "@/lib/models/usuario";
import { IPublicacion } from "@/lib/models/publicacion";
import UsuariosTable from "@/components/usuarios/UsuariosTable";
import PublicacionesTable from "@/components/publicaciones/PublicacionesTable";
import FormModal from "@/components/common/FormModal";
import { UsuarioFormData } from "@/components/usuarios/UsuarioForm";
import { PublicacionFormData } from "@/components/publicaciones/PublicacionForm";
import { WithId } from "@/components/usuarios/UsuariosTable";

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

      if (!response.ok) throw new Error("Error al procesar la solicitud");

      await fetchData();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Error al procesar la solicitud. Por favor, inténtelo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Está seguro de que desea eliminar este elemento?")) return;

    setLoading(true);
    try {
      const endpoint = `/api/${activeTab}/${id}`;
      const response = await fetch(endpoint, { method: "DELETE" });

      if (!response.ok) throw new Error("Error al eliminar");

      await fetchData();
    } catch (err) {
      console.error("Error:", err);
      setError("Error al eliminar. Por favor, inténtelo de nuevo.");
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
        throw new Error("Error al cargar los datos");
      }

      const usuariosData = await usuariosRes.json();
      const publicacionesData = await publicacionesRes.json();

      setUsuarios(usuariosData);
      setPublicaciones(publicacionesData);
      setError("");
    } catch (err) {
      setError("Error al cargar los datos. Por favor, inténtelo más tarde.");
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
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab("publicaciones")}
            className={`${
              activeTab === "publicaciones"
                ? "border-black text-black"
                : "border-transparent text-white hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Publicaciones
          </button>
        </nav>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          onClick={openCreateModal}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          {activeTab === "usuarios" ? "Nuevo Usuario" : "Nueva Publicación"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center">
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === "usuarios" ? (
              <UsuariosTable
                usuarios={usuarios}
                openEditModal={openEditModal}
                handleDelete={handleDelete}
              />
            ) : (
              <PublicacionesTable
                publicaciones={publicaciones}
                openEditModal={openEditModal}
                handleDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        modalMode={modalMode}
        handleSubmit={handleSubmit}
        usuarioFormData={usuarioFormData}
        publicacionFormData={publicacionFormData}
        handleUsuarioInputChange={handleUsuarioInputChange}
        handlePublicacionInputChange={handlePublicacionInputChange}
        usuarios={usuarios}
      />
    </div>
  );
}
