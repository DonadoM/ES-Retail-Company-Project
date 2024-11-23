"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaQuery } from "@/components/Hooks/use-media-query"
import { cn } from "@/lib/utils"

const sections = [
  { name: "Products", path: "/admin/products" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Inventory", path: "/admin/inventory" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Supply Chain", path: "/admin/supply-chain" },
  { name: "Promotions", path: "/admin/promotions" },
  { name: "Users", path: "/admin/users" },
]


export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")


  return (
    <div className="min-h-screen bg-[#1a1f2b]">
     

      {/* Secondary Navigation */}
      <div className="bg-[#1F2937] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            {sections.map((section) => (
              <Link
                key={section.name}
                href={section.path}
                className={cn(
                  "text-sm whitespace-nowrap",
                  activeSection === section.name
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                )}
                onClick={() => setActiveSection(section.name)}
              >
                {section.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1F2937] shadow-md"
          >
            <ScrollArea className="h-[calc(100vh-4rem)]">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.path}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium transition-colors duration-200",
                    activeSection === section.name
                      ? "text-white bg-gray-700"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  )}
                  onClick={() => {
                    setActiveSection(section.name)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {section.name}
                </Link>
              ))}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg h-96 flex flex-col items-center justify-center bg-[#374151]"
          >
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Admin Dashboard Icon"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-3xl font-bold text-white text-center px-4">
              {activeSection
                ? `${activeSection} Dashboard`
                : "Welcome to the Admin Dashboard"}
            </h2>
          </motion.div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <motion.div
              key={section.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#374151] hover:bg-[#4B5563] transition-colors duration-200"
              onClick={() => setActiveSection(section.name)}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{section.name}</h3>
              <p className="text-gray-300">
                Manage your {section.name.toLowerCase()} here.
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

