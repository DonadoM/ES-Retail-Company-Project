import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: { _id: string; name: string; price: number }) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒 ({items.reduce((sum, item) => sum + item.quantity, 0)})
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white p-4 shadow-lg z-40"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
            {items.map(item => (
              <div key={item._id} className="mb-2 flex justify-between items-center">
                <span className="text-gray-800">{item.name} (x{item.quantity})</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500"
                  onClick={() => removeFromCart(item._id)}
                >
                  X
                </motion.button>
              </div>
            ))}
            <div className="mt-4 text-gray-800">Total: ${total.toFixed(2)}</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-full font-semibold"
              onClick={() => {
                alert('Purchase completed!');
                setItems([]);
              }}
            >
              Checkout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

