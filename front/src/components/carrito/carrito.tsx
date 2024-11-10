// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   getCartItems,
//   updateCartItem,
//   removeCartItem,
//   addCartItem,
// } from "@/app/actions/cartActions";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// export default function Carrito() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [items, setItems] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       const cartItems = await getCartItems();
//       setItems(cartItems);
//     };
//     fetchItems();
//   }, []);

//   const updateQuantity = async (id: string, change: number) => {
//     const item = items.find((item) => item._id === id);
//     if (item) {
//       const newQuantity = Math.max(0, item.quantity + change);
//       if (newQuantity === 0) {
//         await removeCartItem(id);
//         setItems(items.filter((item) => item._id !== id));
//       } else {
//         const updatedItem = await updateCartItem(id, newQuantity);
//         setItems(items.map((item) => (item._id === id ? updatedItem : item)));
//       }
//     }
//   };

//   const addItem = async () => {
//     const newItem = {
//       name: "New Item",
//       price: 9.99,
//       quantity: 1,
//       image: "/placeholder.svg?height=100&width=100",
//     };
//     const addedItem = await addCartItem(newItem);
//     setItems([...items, addedItem]);
//   };

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       <SheetTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="relative bg-white hover:bg-gray-100 text-gray-900"
//         >
//           <ShoppingCart className="h-5 w-5" />
//           {items.length > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
//             >
//               {items.reduce((sum, item) => sum + item.quantity, 0)}
//             </motion.span>
//           )}
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-lg">
//         <SheetHeader>
//           <SheetTitle className="text-2xl font-bold">Shopping Cart</SheetTitle>
//         </SheetHeader>
//         <ScrollArea className="h-[calc(100vh-12rem)] mt-4">
//           <AnimatePresence>
//             {items.map((item) => (
//               <motion.div
//                 key={item._id}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 className="flex gap-4 items-center p-4 border-b"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="h-20 w-20 object-cover rounded-md"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium">{item.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="h-8 w-8"
//                     onClick={() => updateQuantity(item._id, -1)}
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="h-8 w-8"
//                     onClick={() => updateQuantity(item._id, 1)}
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="h-8 w-8 text-red-500 hover:text-red-700"
//                     onClick={() => updateQuantity(item._id, -item.quantity)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//           {items.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex flex-col items-center justify-center h-40 text-gray-500"
//             >
//               <ShoppingCart className="h-12 w-12 mb-2" />
//               <p>Your cart is empty</p>
//             </motion.div>
//           )}
//         </ScrollArea>
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
//           <div className="flex justify-between items-center mb-4">
//             <span className="font-medium">Total</span>
//             <span className="font-bold text-lg">${total.toFixed(2)}</span>
//           </div>
//           <Button
//             className="w-full bg-[#5FB4A2] hover:bg-[#4A9080] text-white mb-2"
//             disabled={items.length === 0}
//           >
//             Checkout
//           </Button>
//           <Button
//             className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white"
//             onClick={addItem}
//           >
//             Add New Item
//           </Button>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
