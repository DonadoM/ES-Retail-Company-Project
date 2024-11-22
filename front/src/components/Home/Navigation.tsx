// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useState } from "react";
// import { colors } from "../../lib/colors";

// const navItems = ["Home", "Shop", "Product", "Career"];

// export const Navigation = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   return (
//     <motion.div
//       className="hidden md:flex items-center gap-6"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, staggerChildren: 0.1 }}
//     >
//       {navItems.map((item, index) => (
//         <motion.div
//           key={item}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//         >
//           <Link
//             href="/pages/store"
//             className={`text-sm hover:text-accent transition-colors ${
//               activeIndex === index ? "text-accent" : ""
//             }`}
//             onFocus={() => setActiveIndex(index)}
//             onBlur={() => setActiveIndex(null)}
//             onMouseEnter={() => setActiveIndex(index)}
//             onMouseLeave={() => setActiveIndex(null)}
//           >
//             {item}
//           </Link>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

