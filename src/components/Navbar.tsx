"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/logotop.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white fixed w-full top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold tracking-wider">
                CAMALEONIC ANALYTICS
              </span>
            </Link>
          </div>

          {/* Botones de navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={toggleMenu}
              className="px-3 py-2 text-sm font-medium transition duration-150 ease-in-out flex items-center cursor-pointer"
            >
              MENU
              {isMenuOpen ? (
                <HiX className="ml-1 h-5 w-5" />
              ) : (
                <HiMenu className="ml-1 h-5 w-5" />
              )}
            </button>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent focus:outline-none"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable con animaciones */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMenuOpen(false)}
            ></motion.div>

            <motion.div
              className="absolute inset-y-0 right-0 max-w-full flex"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-gradient-to-b from-teal-500 via-teal-600 to-blue-700 shadow-xl overflow-y-auto">
                  <div className="flex justify-end p-4">
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white hover:text-gray-200 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiX className="h-6 w-6" />
                    </motion.button>
                  </div>
                  <div className="flex-1 px-4 py-6 space-y-6 divide-y divide-white/20">
                    {[
                      { name: "HOME", path: "/" },
                      { name: "DASHBOARD", path: "/dashboard" },
                      { name: "TABLES", path: "/tables" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.path}
                          className="block py-3 text-xl font-medium text-white hover:text-gray-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
