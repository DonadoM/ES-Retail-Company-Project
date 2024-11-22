"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Info,
  User,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

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
  <Link
    href={href}
    className="text-gray-300 hover:text-white transition-colors text-lg font-medium flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700"
    onClick={onClick}
  >
    <Icon size={20} />
    {children}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <nav className="bg-gray-900 shadow-lg dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="RetailCompany Logo"
                width={45}
                height={45}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/" icon={Home}>
              Inicio
            </NavLink>
            <NavLink href="/pages/store" icon={ShoppingBag}>
              Tienda
            </NavLink>
            <NavLink href="/pages/about" icon={Info}>
              Acerca de
            </NavLink>
            <NavLink href="/pages/profile" icon={User}>
              Perfil
            </NavLink>
          </div>
          <div className="flex items-center space-x-4 ">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-md text-gray-900 bg-red-400 hover:bg-red-500 transition-colors text-lg font-medium dark:bg-red-600 dark:hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 rounded-md text-gray-900 bg-blue-400 hover:bg-blue-500 transition-colors text-lg font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Iniciar sesión
              </button>
            )}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
              <NavLink href="/pages/store" icon={ShoppingBag} onClick={toggleMenu}>
                Tienda
              </NavLink>
              <NavLink href="/pages/about" icon={Info} onClick={toggleMenu}>
                Acerca de
              </NavLink>
              <NavLink href="/pages/profile" icon={User} onClick={toggleMenu}>
                Perfil
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

