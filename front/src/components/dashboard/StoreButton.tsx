"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"; // Changed from next/router

interface StoreButtonProps {
  className?: string;
}

export const StoreButton: React.FC<StoreButtonProps> = React.memo(
  ({ className }) => {
    const router = useRouter();

    return (
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/pages/store")}
        className={`fixed bottom-4 right-4 bg-[#76ABAE] text-[#222831] p-4 rounded-full shadow-lg hover:bg-[#76ABAE]/80 flex items-center justify-center ${className}`}
      >
        <span className="mr-2">Visitar Tienda</span>
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    );
  }
);

StoreButton.displayName = "StoreButton";
