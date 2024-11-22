import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ClothingItemProps {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  onAddToCart: (item: Omit<ClothingItemProps, 'onAddToCart'>) => void;
}

export const ClothingItem: React.FC<ClothingItemProps> = ({
  _id,
  name,
  category,
  price,
  description,
  stock,
  imageUrl,
  onAddToCart
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image 
        src={imageUrl} 
        alt={name} 
        width={500} 
        height={300} 
        className="w-full h-64 object-cover" 
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{category}</p>
        <p className="text-gray-800 font-bold mb-2">${price.toFixed(2)}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">In stock: {stock}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
            onClick={() => onAddToCart({ _id, name, category, price, description, stock, imageUrl })}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

