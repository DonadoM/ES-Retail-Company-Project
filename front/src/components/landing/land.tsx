"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const colors = {
  background: "#31363F",
  text: "#EEEEEE",
  accent: "#76ABAE",
};

const MovingBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.accent} 0%, ${colors.background} 50%)`,
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors.accent} 0%, ${colors.background} 50%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      />
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          x: { repeat: Infinity, duration: 20, ease: "linear" },
          y: { repeat: Infinity, duration: 30, ease: "linear" },
        }}
      />
    </div>
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
      <Image src="/fondo.jpg" alt="fondo" layout="fill" objectFit="cover" />
    </motion.div>
  );
};

const AnimatedText: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
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

interface Feature {
  title: string;
  description: string;
  image: string;
}

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-6 rounded-lg overflow-hidden relative"
      style={{ backgroundColor: colors.background }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <Image
        src={feature.image}
        alt={feature.title}
        width={300}
        height={200}
        className="rounded-lg mb-4"
      />
      <motion.h3
        className="text-xl font-semibold mb-2 relative z-10"
        style={{ color: colors.accent }}
        animate={{ y: isHovered ? -5 : 0 }}
      >
        {feature.title}
      </motion.h3>
      <motion.p
        style={{ color: colors.text }}
        className="relative z-10"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        {feature.description}
      </motion.p>
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

  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      <MovingBackground />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{ scaleX, backgroundColor: colors.accent }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <AnimatePresence>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-8 text-center"
            style={{ color: colors.text }}
          >
            Somos Vogue Verse
          </motion.h1>
        </AnimatePresence>

        <AnimatedText delay={0.2}>
          <div className="mb-20 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                className="text-3xl font-semibold mb-4"
                style={{ color: colors.accent }}
              >
                Nuestra Visión
              </h2>
              <p className="text-lg" style={{ color: colors.text }}>
                En VogueVerse, combinamos alta costura con tecnología de
                vanguardia para crear prendas que van más allá de la moda. Cada
                pieza es una obra maestra de diseño y funcionalidad, concebida
                para el consumidor moderno que valora la calidad, el estilo
                único y la sostenibilidad.
              </p>
            </div>
            <FloatingElement>
              <ParallaxImage
                src="/placeholder.svg?height=400&width=600"
                alt="Diseño de moda innovador"
              />
            </FloatingElement>
          </div>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <div className="text-center mb-20">
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ color: colors.accent }}
            >
              Innovación en Cada Detalle
            </h2>
            <p className="text-lg" style={{ color: colors.text }}>
              Desde nuestro proceso de diseño asistido por IA hasta nuestras
              tiendas interactivas, cada aspecto de MODA Innovadora está
              diseñado para ofrecerte una experiencia de compra única y
              personalizada.
            </p>
          </div>
        </AnimatedText>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            {
              title: "Diseño Inteligente",
              description:
                "Integramos inteligencia artificial en nuestro proceso creativo para ofrecer diseños únicos y hechos a medida, adaptados a tus gustos y preferencias. Cada prenda es una pieza exclusiva que refleja innovación y autenticidad.",
              image: "/rojo.jpg",
            },
            {
              title: "Calidad Superior",
              description:
                "Materiales sostenibles y técnicas de fabricación avanzadas.",
              image: "/telas.jpg",
            },
            {
              title: "Estilo a Medida",
              description:
                "Te ofrecemos una experiencia de moda adaptada a ti, con recomendaciones exclusivas y piezas seleccionadas para complementar tu estilo único y resaltar tu personalidad.",
              image: "/estilo.jpg",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <FeatureCard feature={feature} index={index} />
            </motion.div>
          ))}
        </motion.div>

        <AnimatedText delay={0.8}>
          <div className="text-center">
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ color: colors.accent }}
            >
              Tu Estilo, Nuestro Compromiso
            </h2>
            <p className="text-lg mb-8" style={{ color: colors.text }}>
              En VogueVerse, no solo vendemos ropa; creamos una experiencia de
              moda personalizada que refleja tu estilo único y valores. Únete a
              nosotros en esta revolución de la moda.
            </p>
            <motion.button
              className="px-8 py-3 rounded-full text-lg font-semibold relative overflow-hidden"
              style={{
                backgroundColor: colors.accent,
                color: colors.background,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0.3 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <Link href="/pages/store">Descubre Tu Estilo</Link>
            </motion.button>
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
