import React from "react"
import { motion } from "framer-motion"
import { Menu, X, Search } from "lucide-react"
import { TabType } from "./types"

interface HeaderProps {
  activeTab: TabType
  searchTerm: string
  setSearchTerm: (term: string) => void
  setShowModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export const Header: React.FC<HeaderProps> = React.memo(
  ({
    activeTab,
    searchTerm,
    setSearchTerm,
    setShowModal,
    setShowDeleteModal,
    isSidebarOpen,
    setIsSidebarOpen,
  }) => {
    return (
      <header className="bg-[#31363F] p-4 flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-[#EEEEEE] p-2 rounded-lg hover:bg-[#76ABAE]/20"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
        <h2 className="text-xl font-semibold">{activeTab}</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder={`Buscar en ${activeTab.toLowerCase()}`}
              className="pl-10 pr-3 py-2 rounded-lg bg-[#222831] border border-[#76ABAE]/30 text-[#EEEEEE] placeholder-[#EEEEEE]/50 focus:outline-none focus:border-[#76ABAE]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EEEEEE]/50"
              size={18}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#76ABAE] text-[#222831] rounded-lg hover:bg-[#76ABAE]/80"
          >
            Add {activeTab}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete {activeTab}
          </motion.button>
        </div>
      </header>
    )
  }
)

Header.displayName = "Header"