"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="text-[#EEEEEE] hover:text-[#76ABAE] transition-colors text-lg font-medium block py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="bg-[#222831] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard/store" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="RetailCompany Logo"
                width={45}
                height={45}
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink href="/pages/store/">Home</NavLink>
              <NavLink href="/shop">Shop</NavLink>
              <NavLink href="/categories">Categories</NavLink>
              <NavLink href="/pages/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/pages/profile">Profile</NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-md text-[#222831] bg-[#76ABAE] hover:bg-[#76ABAE]/80 transition-colors text-lg font-medium"
            >
              Login
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/cart"
                className="ml-4 text-[#EEEEEE] hover:text-[#76ABAE] transition-colors text-lg font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#EEEEEE] hover:text-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#76ABAE]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute w-full bg-[#31363F] shadow-lg z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink href="/" onClick={toggleMenu}>
                Home
              </NavLink>
              <NavLink href="/shop" onClick={toggleMenu}>
                Shop
              </NavLink>
              <NavLink href="/categories" onClick={toggleMenu}>
                Categories
              </NavLink>
              <NavLink href="/about" onClick={toggleMenu}>
                About
              </NavLink>
              <NavLink href="/contact" onClick={toggleMenu}>
                Contact
              </NavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-[#76ABAE]/20">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <svg
                    className="h-10 w-10 rounded-full text-[#EEEEEE]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-[#EEEEEE]">
                    Guest
                  </div>
                  <div className="text-sm font-medium text-[#76ABAE]">
                    Not logged in
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto"
                >
                  <Link
                    href="/cart"
                    className="text-[#EEEEEE] hover:text-[#76ABAE] transition-colors text-lg font-medium pd-0"
                    onClick={toggleMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    router.push("/login");
                    toggleMenu();
                  }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-[#222831] bg-[#76ABAE] hover:bg-[#76ABAE]/80 transition-colors"
                >
                  Login
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
