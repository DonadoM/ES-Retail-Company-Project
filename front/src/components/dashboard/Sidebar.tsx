import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import router from "next/router";

import { serviceMap, TabType } from "./types";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(
  ({ activeTab, setActiveTab, isSidebarOpen }) => {
    return (
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 bg-[#31363F] p-6 flex flex-col shadow-xl z-20"
          >
            <h1 className="text-2xl font-bold mb-8">Vogue Verse Dashboard</h1>
            <nav className="space-y-2 flex-1">
              {Object.keys(serviceMap).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === tab
                      ? "bg-[#76ABAE] text-[#222831]"
                      : "text-[#EEEEEE] hover:bg-[#76ABAE]/20"
                  }`}
                  onClick={() => setActiveTab(tab as TabType)}
                >
                  {tab}
                </motion.button>
              ))}
            </nav>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/logout")}
              className="mt-auto p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Cerrar sesión
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    );
  }
);

Sidebar.displayName = "Sidebar";
