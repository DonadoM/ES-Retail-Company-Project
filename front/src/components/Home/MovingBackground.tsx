import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { colors } from "../../lib/colors";

export const MovingBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.accent} 0%, ${colors.background} 50%)`,
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.accent} 0%, ${colors.background} 50%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          x: { repeat: Infinity, duration: 20, ease: "linear" },
          y: { repeat: Infinity, duration: 30, ease: "linear" },
        }}
      />
    </div>
  );
};
