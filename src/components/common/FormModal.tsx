import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IUsuario } from "@/lib/models/usuario";
import UsuarioForm from "../usuarios/UsuarioForm";
import PublicacionForm from "../publicaciones/PublicacionForm";
import { UsuarioFormData } from "../usuarios/UsuarioForm";
import { PublicacionFormData } from "../publicaciones/PublicacionForm";

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "usuarios" | "publicaciones";
  modalMode: "crear" | "editar";
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  usuarioFormData: UsuarioFormData;
  publicacionFormData: PublicacionFormData;
  handleUsuarioInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handlePublicacionInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  usuarios: IUsuario[];
};

const FormModal = ({
  isOpen,
  onClose,
  activeTab,
  modalMode,
  handleSubmit,
  usuarioFormData,
  publicacionFormData,
  handleUsuarioInputChange,
  handlePublicacionInputChange,
  usuarios,
}: FormModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                  {modalMode === "crear" ? "Crear nuevo" : "Editar"}{" "}
                  {activeTab === "usuarios" ? "usuario" : "publicación"}
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
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                    >
                      {modalMode === "crear" ? "Crear" : "Guardar cambios"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FormModal;
