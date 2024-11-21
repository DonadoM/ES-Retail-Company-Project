import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <motion.button
      className="p-2 rounded-full"
      onClick={() => setIsDarkMode(!isDarkMode)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </motion.button>
  );
};

