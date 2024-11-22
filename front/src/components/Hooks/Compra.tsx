import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClothingItem from '../components/ClothingItem'; // Asegúrate de importar el componente correctamente
import Cart from '../components/Cart'; // Asegúrate de importar el componente del carrito correctamente

interface ClothingItemData {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export default function Compra() {
  const [items, setItems] = useState<ClothingItemData[]>([]);
  const [filter, setFilter] = useState<string>('Todos');
  const [cartItems, setCartItems] = useState<ClothingItemData[]>([]);
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

  const addToCart = (item: ClothingItemData) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Cart cartItems={cartItems} />
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center">Cargando productos...</div>
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
                    filter === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ClothingItem
                    {...item}
                    onAddToCart={addToCart}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}