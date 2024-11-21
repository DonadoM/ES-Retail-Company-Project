import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ClothingItem } from "./ClothingItem";
import { colors } from "../../lib/colors";

interface ClothingItemData {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
}

export const ClothingCollection: React.FC = () => {
  const [items, setItems] = useState<ClothingItemData[]>([]);
  const [filter, setFilter] = useState<string>("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backend-service-9xuv.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const categories = ["Todos", ...new Set(items.map((item) => item.category))];

  const filteredItems =
    filter === "Todos"
      ? items
      : items.filter((item) => item.category === filter);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
        style={{ color: colors.accent }}
      >
        Nuestra Colección
      </motion.h2>
      <div className="flex justify-center mb-8 space-x-4 flex-wrap">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full font-semibold m-2 ${
              filter === category
                ? "bg-accent text-gray-900"
                : "bg-gray-700 text-white"
            }`}
            style={{
              backgroundColor: filter === category ? colors.accent : undefined,
            }}
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
            <ClothingItem {...item} onAddToCart={(item) => console.log("Add to cart", item)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
