"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  { name: "Products", path: "/admin/products" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Inventory", path: "/admin/inventory" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Supply Chain", path: "/admin/supply-chain" },
  { name: "Promotions", path: "/admin/promotions" },
  { name: "Users", path: "/admin/users" },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {sections.map((section) => (
                  <Link
                    key={section.name}
                    href={section.path}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setActiveSection(section.name)}
                  >
                    {section.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {activeSection
                ? `${activeSection} Dashboard`
                : "Welcome to the Admin Dashboard"}
            </h2>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
