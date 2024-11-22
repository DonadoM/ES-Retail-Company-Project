// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { useState } from "react";
// import { colors } from "../../lib/colors";

// const navItems = ["Home", "Shop", "Product", "Career"];

// export const MobileMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="md:hidden">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="text-2xl"
//         aria-label="Toggle menu"
//       >
//         ☰
//       </button>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="absolute top-16 left-0 right-0 bg-gray-900 p-4"
//           >
//             {navItems.map((item) => (
//               <Link
//                 key={item}
//                 href="/pages/store"
//                 className="block py-2 text-sm hover:text-accent transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item}
//               </Link>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
