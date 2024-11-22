import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClothingItemData {
  _id: string;
  name: string;
  price: number;
}

interface CartProps {
  cartItems: ClothingItemData[];
}

export const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={toggleCart}
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg"
        >
          Cart ({cartItems.length})
        </button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-4"
          >
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <ul className="max-h-60 overflow-auto">
                  {cartItems.map((item) => (
                    <li key={item._id} className="mb-2 flex justify-between">
                      <span>{item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-semibold flex justify-between">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </p>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
                  Checkout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

