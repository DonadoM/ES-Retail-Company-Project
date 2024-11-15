"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Grid,
  Info,
  Mail,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const NavLink = ({
  href,
  children,
  icon: Icon,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ElementType;
  onClick?: () => void;
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors text-lg font-medium flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700"
      onClick={onClick}
    >
      <Icon size={20} />
      {children}
    </Link>
  </motion.div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCascadeMenuOpen, setIsCascadeMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCascadeMenu = () => setIsCascadeMenuOpen(!isCascadeMenuOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const cascadeMenuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/pages/store" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="RetailCompany Logo"
                width={45}
                height={45}
              />
            </Link>
            <div className="hidden md:block ml-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCascadeMenu}
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium flex items-center gap-2"
              >
                Menu{" "}
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    isCascadeMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
              <AnimatePresence>
                {isCascadeMenuOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={cascadeMenuVariants}
                    className="absolute mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1">
                      <NavLink href="/" icon={Home} onClick={toggleCascadeMenu}>
                        Inicio
                      </NavLink>
                      <NavLink
                        href="/pages/store"
                        icon={ShoppingBag}
                        onClick={toggleCascadeMenu}
                      >
                        Tienda
                      </NavLink>
                      <NavLink
                        href="/categories"
                        icon={Grid}
                        onClick={toggleCascadeMenu}
                      >
                        Categorías
                      </NavLink>
                      <NavLink
                        href="/about"
                        icon={Info}
                        onClick={toggleCascadeMenu}
                      >
                        Acerca de
                      </NavLink>
                      <NavLink
                        href="/contact"
                        icon={Mail}
                        onClick={toggleCascadeMenu}
                      >
                        Contacto
                      </NavLink>
                      <NavLink
                        href="/pages/profile"
                        icon={User}
                        onClick={toggleCascadeMenu}
                      >
                        Perfil
                      </NavLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-md text-gray-900 bg-blue-400 hover:bg-blue-500 transition-colors text-lg font-medium"
            >
              Iniciar sesión
            </motion.button>
            {/* <Cart /> */}
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <NavLink href="/" icon={Home} onClick={toggleMenu}>
                Inicio
              </NavLink>
              <NavLink
                href="/pages/store"
                icon={ShoppingBag}
                onClick={toggleMenu}
              >
                Tienda
              </NavLink>
              <NavLink href="/categories" icon={Grid} onClick={toggleMenu}>
                Categorías
              </NavLink>
              <NavLink href="/about" icon={Info} onClick={toggleMenu}>
                Acerca de
              </NavLink>
              <NavLink href="/contact" icon={Mail} onClick={toggleMenu}>
                Contacto
              </NavLink>
              <NavLink href="/pages/profile" icon={User} onClick={toggleMenu}>
                Perfil
              </NavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center px-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    router.push("/login");
                    toggleMenu();
                  }}
                  className="w-full px-4 py-2 rounded-md text-gray-900 bg-blue-400 hover:bg-blue-500 transition-colors text-lg font-medium"
                >
                  Iniciar sesión
                </motion.button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <NavLink href="/cart" icon={ShoppingCart} onClick={toggleMenu}>
                  Carrito
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
