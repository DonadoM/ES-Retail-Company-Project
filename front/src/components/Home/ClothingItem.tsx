import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ClothingItemProps {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  onAddToCart: (item: ClothingItemProps) => void;
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64">
        <Image
          src={imageUrl || "/placeholder.jpg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-white">{name}</h3>
        <p className="text-sm text-gray-400 mb-2">{category}</p>
        <p className="text-lg font-bold text-accent">${price.toFixed(2)}</p>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-sm text-gray-300 mt-2 mb-2">{description}</p>
          <p className="text-sm text-gray-400 mb-4">Stock: {stock}</p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 px-4 py-2 bg-accent text-gray-900 rounded-full font-semibold w-full"
          onClick={() => onAddToCart({ _id, name, category, price, description, stock, imageUrl, onAddToCart })}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};
