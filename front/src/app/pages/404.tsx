"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { colors } from "../../lib/colors";
import { MovingBackground } from "@/components/Home/MovingBackground";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center relative">
      <MovingBackground />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: colors.accent }}
        >
          404
        </h1>
        <h2 className="text-3xl mb-8">Page Not Found</h2>
        <p className="text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-gray-900 rounded-full font-semibold"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
