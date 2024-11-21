'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClothingItem } from "@/components/Clothing/ClothingItem";
import { Cart } from "@/components/Cart";

interface ClothingItemData {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
}

export default function CollectionPage() {
  const [items, setItems] = useState<ClothingItemData[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<ClothingItemData[]>([]);

  useEffect(() => {
    fetch("https://backend-service-9xuv.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => {
        // Add a placeholder image URL if not provided by the API
        const itemsWithImages = data.map((item: ClothingItemData) => ({
          ...item,
          imageUrl: item.imageUrl || "/placeholder.jpg"
        }));
        setItems(itemsWithImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.category === filter);

  const addToCart = (item: ClothingItemData) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Cart />
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-gray-800"
        >
          Our Collection
        </motion.h1>

        {loading ? (
          <div className="text-center text-gray-800">Loading...</div>
        ) : (
          <>
            <div className="flex justify-center mb-8 space-x-4 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full font-semibold m-2 ${
                    filter === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ClothingItem {...item} onAddToCart={addToCart} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}

