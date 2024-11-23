"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
 
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { colors } from "../../lib/colors";
import { FeatureCard } from "./FeaturedCard";

const AnimatedText: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 2,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (v > 0.1) controls.start({ opacity: 1, y: 0 });
    });
    return () => unsubscribe();
  }, [scrollYProgress, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const FloatingElement: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotateZ: [0, 2, -2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg"
    >
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </motion.div>
  );
};

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="relative min-h-screen overflow-hidden dark:bg-gray-900 dark:text-white"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{ scaleX, backgroundColor: colors.accent }}
      />

      <header className="container mx-auto px-4 py-6 relative z-20">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-xl font-bold"
              style={{ color: colors.accent }}
            >
              4F WEARS
            </Link>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-12 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedText>
            <div className="space-y-6">
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 bg-accent bg-opacity-20 rounded-full px-4 py-1">
                  <motion.div
                    className="w-2 h-2 bg-accent rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-sm" style={{ color: colors.accent }}>
                    New Spring 2023 Collections
                  </span>
                </div>
              </motion.div>
              <h1 className="text-5xl font-bold leading-tight">
                Reflect Who
                <br />
                You Are with
                <br />
                Our{" "}
                <motion.span
                  style={{ color: colors.accent }}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Style
                </motion.span>
              </h1>
              <p className="text-gray-400 max-w-md">
                The power of a great outfit is impossible to overstate. At its
                best, fashion has the ability to transform your mood, identity,
                and of course, your look. It can be refreshing and purposeful.
              </p>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <motion.div
              className="relative aspect-square overflow-hidden rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="relative overflow-hidden"
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === i ? 0.2 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/style.jpg?height=800&width=500"
                        alt={`Fashion model part ${i + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="w-full h-full"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${colors.accent}22, transparent)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </motion.div>
          </AnimatedText>
        </div>

        <AnimatedText delay={0.4}>
          <div className="mt-12 flex justify-center gap-4">
            <motion.button
              className="px-8 py-3 rounded-full text-lg font-semibold relative overflow-hidden"
              style={{
                backgroundColor: colors.accent,
                color: colors.background,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/pages/store">
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0.3 }}
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
                Shop Now
              </Link>
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-full text-lg font-semibold border"
              style={{ borderColor: colors.accent, color: colors.text }}
              whileHover={{
                scale: 1.05,
                backgroundColor: `${colors.accent}22`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </AnimatedText>

        <AnimatedText delay={0.6}>
          <div className="mt-24">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: colors.accent }}
            >
              Our Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Sustainable Fashion"
                description="We prioritize eco-friendly materials and ethical production processes to minimize our environmental impact."
                icon="🌿"
              />
              <FeatureCard
                title="Personalized Style"
                description="Our AI-powered recommendations help you discover pieces that perfectly match your unique style preferences."
                icon="👗"
              />
              <FeatureCard
                title="Quality Craftsmanship"
                description="Each garment is meticulously crafted to ensure the highest quality and longevity."
                icon="✨"
              />
            </div>
          </div>
        </AnimatedText>

        <AnimatedText delay={0.8}>
          <div className="mt-24">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: colors.accent }}
            >
              Featured Collection
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <FloatingElement>
                <ParallaxImage
                  src="/rojo.jpg?height=600&width=400"
                  alt="Featured collection"
                />
              </FloatingElement>
              <div className="flex flex-col justify-center">
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: colors.accent }}
                >
                  Spring Awakening
                </h3>
                <p className="text-gray-400 mb-6">
                  Embrace the season of renewal with our latest collection.
                  Featuring light fabrics, pastel hues, and nature-inspired
                  patterns, this line embodies the freshness and vitality of
                  spring.
                </p>
                <Link href="/collection">
                  <motion.button
                    className="px-6 py-2 rounded-full text-lg font-semibold self-start"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.background,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Collection
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedText>
      </main>

      <footer className="bg-gray-900 py-8 mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <Link
                href="/"
                className="text-xl font-bold"
                style={{ color: colors.accent }}
              >
                4F WEARS
              </Link>
              <p className="mt-2 text-sm text-gray-400">
                Redefining fashion, one style at a time.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: colors.accent }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["About Us", "Collections", "Sustainability", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="/pages/store"
                        className="text-sm text-gray-400 hover:text-accent transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: colors.accent }}
              >
                Stay Connected
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and exclusive
                offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-full bg-gray-800 text-white focus:outline-none"
                />
                <motion.button
                  className="px-4 py-2 rounded-r-full font-semibold"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.background,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2023 4F WEARS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
