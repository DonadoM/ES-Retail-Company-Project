"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#222831]">
      <main>
        {/* Hero Section */}
        <motion.section
          className="relative h-[70vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/hero.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center text-white text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#EEEEEE]">
              Welcome to 4F Wears
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#EEEEEE]">
              Discover the latest trends in fashion
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/collection"
                className="bg-[#76ABAE] text-[#222831] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#76ABAE]/80 transition duration-300"
              >
                Shop New Arrivals
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Featured Categories */}
        <section className="py-16 bg-[#31363F]">
          <div className="container mx-auto px-4">
            <motion.h2
              className="w-64 mx-auto text-3xl text-[#EEEEEE] text-center font-bold mb-12 bg-[#76ABAE] rounded-full hover:bg-[#76ABAE]/80 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Categories
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {[
                { category: "Women", img: "/women.jpg" },
                { category: "Men", img: "/men.jpg" },
                { category: "Accessories", img: "/accesories.jpg" },
              ].map(({ category, img }, index) => (
                <motion.div
                  key={category}
                  className="relative group overflow-hidden rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                >
                  <Image
                    src={img}
                    alt={category}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <Link
                        href="/collection"
                      className="text-[#EEEEEE] text-2xl font-semibold hover:underline"
                    >
                      Shop {category}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-[#222831]">
          <div className="container mx-auto px-4 ">
            <motion.h2
              className="w-64 mx-auto text-3xl text-[#222831] text-center font-bold mb-12 bg-[#76ABAE] rounded-full hover:bg-[#76ABAE]/80 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              New Arrivals
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {[
                {
                  id: 1,
                  img: "/sneakers.jpg",
                  name: "Sneakers",
                  price: "$79.99",
                },
                { id: 2, img: "/tshirt.jpg", name: "T-Shirt", price: "$19.99" },
                { id: 3, img: "/jeans.jpg", name: "Jeans", price: "$49.99" },
                { id: 4, img: "/jacket.jpg", name: "Jacket", price: "$99.99" },
              ].map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-[#31363F] rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                >
                  <Image
                    src={item.img}
                    alt={`Product ${item.id}`}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-[#EEEEEE]">
                      {item.name}
                    </h3>
                    <p className="text-[#76ABAE] mb-2">{item.price}</p>
                    <motion.button
                      className="w-full bg-[#76ABAE] text-[#222831] py-2 rounded-full hover:bg-[#76ABAE]/80 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href="/collection"
                className="inline-block bg-[#76ABAE] text-[#222831] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#76ABAE]/80 transition duration-300"
              >
                View All New Arrivals
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <motion.section
          className="py-16 bg-[#31363F] text-[#EEEEEE]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Stay Updated
            </motion.h2>
            <motion.p
              className="mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Subscribe to our newsletter for exclusive offers and the latest
              fashion trends.
            </motion.p>
            <motion.form
              className="max-w-md mx-auto flex"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#76ABAE] text-[#222831]"
              />
              <motion.button
                type="submit"
                className="bg-[#76ABAE] text-[#222831] px-6 py-2 rounded-r-full hover:bg-[#76ABAE]/80 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-[#222831] text-[#EEEEEE] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">About 4F Wears</h3>
              <p className="text-[#76ABAE]">
                Discover the latest fashion trends and express your unique style
                with 4F Wears.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-[#76ABAE] hover:text-[#76ABAE]/80"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#76ABAE] hover:text-[#76ABAE]/80"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[#76ABAE] hover:text-[#76ABAE]/80"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-[#76ABAE] hover:text-[#76ABAE]/80"
                  >
                    Shipping & Returns
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#76ABAE] hover:text-[#76ABAE]/80">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-[#76ABAE] hover:text-[#76ABAE]/80">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772  1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.577 2.013 9.83 2 12.315 2zm-.015 1.839c-2.31 0-3.284.012-4.43.06-1.148.048-1.834.215-2.306.358-.5.149-.866.352-1.196.682-.33.33-.533.696-.682 1.196-.143.472-.31 1.158-.358 2.306-.048 1.146-.06 2.12-.06 4.43 0 2.31.012 3.284.06 4.43.048 1.148.215 1.834.358 2.306.149.5.352.866.682 1.196.33.33.696.533 1.196.682.472.143 1.158.31 2.306.358 1.146.048 2.12.06 4.43.06 2.31 0 3.284-.012 4.43-.06 1.148-.048 1.834-.215 2.306-.358.5-.149.866-.352 1.196-.682.33-.33.533-.696.682-1.196.143-.472.31-1.158.358-2.306.048-1.146.06-2.12.06-4.43 0-2.31-.012-3.284-.06-4.43-.048-1.148-.215-1.834-.358-2.306a4.902 4.902 0 00-.682-1.196 4.902 4.902 0 00-1.196-.682c-.472-.143-1.158-.31-2.306-.358-1.146-.048-2.12-.06-4.43-.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-[#76ABAE] hover:text-[#76ABAE]/80">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.427 5.477c.875.39 1.48 1.258 1.48 2.27 0 1.32-.73 2.96-1.6 3.566-1.152.731-2.78 1.346-4.447 1.346-1.197 0-2.505-.322-3.206-.851 0 0-.053-.038-.095-.055.045.003.089.005.134.005 1.665 0 3.338-.586 4.136-1.659.007.01.014.019.022.028.988 1.217 2.274 2.02 3.878 2.02 1.592 0 3.026-.982 3.885-2.434.2-.352.385-.796.543-1.302.157-.507.295-1.068.295-1.65 0-1.057-.293-1.917-.617-2.735-.183-.529-.377-1.034-.605-1.523-.193-.436-.4-.871-.631-1.268-.148-.207-.291-.408-.437-.588-.4-.549-.81-.686-1.432-.826-.656-.156-1.362-.171-1.991-.171-1.433 0-2.985.192-4.178 1.09a1.05 1.05 0 00-.392 1.01 1.054 1.054 0 001.045.737c.113 0 .225-.014.337-.043 1.162-.253 2.389-.007 2.68.847.17.63.055 1.576-.366 2.25-.82 1.116-2.607 1.641-4.42 1.641-.115 0-.224 0-.337-.006-.424-.012-.859-.115-1.157-.546-.49-.678-.345-1.429-.007-1.991.696-1.293 1.746-1.795 2.725-1.875-.187.071-.371.147-.552.238-.09.05-.183.098-.275.145-.16.08-.31.16-.442.25-.186.115-.355.253-.49.414-.045.063-.089.126-.134.193.062.034.129.065.189.099.258.124.495.267.727.424.193.137.372.298.533.469.27.283.491.642.645 1.022.016.042.027.085.036.126-.008-.004-.018-.008-.026-.012a5.246 5.246 0 01-2.626-3.69 5.246 5.246 0 01-1.953 5.41c-.099.093-.196.179-.284.262-.192.172-.37.331-.542.495a1.97 1.97 0 01-.301-.341c-.296-.45-.174-.822.177-1.267.315-.378.576-.8.93-1.14.56-.5 1.328-.842 2.044-.68.182.048.29.174.302.348.016.223-.116.387-.284.5-.195.134-.423.17-.642.285-.045.02-.095.032-.14.049-.192.051-.38.092-.57.122a.927.927 0 01-.24.025c-.291 0-.582-.048-.876-.086-.327-.042-.65-.086-.935-.243-.285-.152-.606-.353-.862-.648-.278-.319-.549-.593-.693-.953-.092-.213-.148-.437-.21-.682-.039-.152-.082-.31-.135-.464-.103.166-.192.364-.308.521-.121.167-.242.354-.386.533-.247.297-.635.558-1.081.573a1.366 1.366 0 01-.28-.028c.153-.396.374-.813.559-1.207.194-.415.398-.898.571-1.298.312-.664.618-1.297.896-1.835.001-.005.002-.01.003-.016.281-.553.607-1.03.975-1.455a6.736 6.736 0 011.029-1.077c.615-.54 1.273-1.018 1.909-1.469.646-.454 1.286-.897 1.995-1.024.353-.062.714.063 1.014.299.192.186.279.442.305.698.068.729.193 1.368.479 1.991.084.213.134.447.165.676a.989.989 0 01-.3.8 4.78 4.78 0 01-1.924.644c-.202.027-.433.048-.629.063a5.06 5.06 0 00-.615.052c-.325.038-.658-.025-.966-.133-.444-.158-.82-.398-1.12-.675-.095-.083-.188-.178-.281-.286a.92.92 0 01-.184-.458c.009-.031.018-.062.027-.093.028-.094.056-.188.084-.279.06-.181.119-.365.175-.541a6.467 6.467 0 01.052-.14c.054-.173.086-.34.137-.514.174-.648.437-1.285.83-1.862a3.028 3.028 0 01.353-.48c.112-.12.238-.217.355-.327.18-.178.299-.415.468-.607.165-.192.358-.367.563-.52.087-.068.175-.136.267-.198a.993.993 0 01.733-.227c.086.029"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-[#76ABAE] text-sm">
              &copy; 2024 4F Wears. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
