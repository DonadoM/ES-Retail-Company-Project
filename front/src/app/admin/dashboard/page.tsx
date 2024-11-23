"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";

const sections = [
  { name: "Products", path: "/admin/products" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Inventory", path: "/admin/inventory" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Supply Chain", path: "/admin/supply-chain" },
  { name: "Promotions", path: "/admin/promotions" },
  { name: "Users", path: "/admin/users" },
];

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (status === "unauthenticated" || !session?.user?.isAdmin) {
      router.push("/login"); // Redirect to login if not authenticated or not an admin
    }
  }, [session, status, router]);

  const handleClick = (path: string) => {
    router.push(path);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg h-96 flex flex-col items-center justify-center bg-[#374151]"
          >
            <Image
              src="/admin.svg"
              alt="Admin Dashboard Icon"
              width={200}
              height={200}
              className="mb-4"
            />
            <h2 className="text-3xl font-bold text-white text-center px-4">
              Welcome to the Admin Dashboard
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
              onClick={() => handleClick(section.path)}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {section.name}
              </h3>
              <p className="text-gray-300">
                Manage your {section.name.toLowerCase()} here.
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}