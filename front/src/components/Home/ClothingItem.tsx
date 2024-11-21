import { motion } from "framer-motion";
import Image from "next/image";
import { colors } from "../../lib/colors";

interface ClothingItemProps {
  name: string;
  price: string;
  imageSrc: string;
}

export const ClothingItem: React.FC<ClothingItemProps> = ({ name, price, imageSrc }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-64">
        <Image
          src="/jeans.jpg"
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2" style={{ color: colors.accent }}>{name}</h3>
        <p className="text-white">{price}</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 px-4 py-2 bg-accent text-gray-900 rounded-full font-semibold"
          style={{ backgroundColor: colors.accent }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

