import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { colors } from "../../lib/colors"; // Ensure this path is correct and the colors object is properly exported from the file
import React from "react";
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export const FeatureCard = React.memo(
  ({ title, description, icon }: FeatureCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverStart = useCallback(() => setIsHovered(true), []);
    const handleHoverEnd = useCallback(() => setIsHovered(false), []);

    return (
      <motion.div
        className="p-6 rounded-lg overflow-hidden relative"
        style={{ backgroundColor: `${colors.accent}22` }}
        whileHover={{ scale: 1.05, backgroundColor: `${colors.accent}33` }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="text-4xl mb-4"
          animate={{ rotateY: isHovered ? 360 : 0 }}
          transition={{ duration: 1.2 }}
        >
          {icon}
        </motion.div>
        <motion.h3
          className="text-xl font-semibold mb-2 relative z-10"
          style={{ color: colors.accent }}
          animate={{ y: isHovered ? -5 : 0 }}
        >
          {title}
        </motion.h3>
        <motion.p
          style={{ color: colors.text }}
          className="relative z-10"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          {description}
        </motion.p>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
