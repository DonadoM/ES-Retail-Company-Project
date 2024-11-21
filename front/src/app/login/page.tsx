"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  } from "@/components/navbar/Navbar";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) setError(res.error);
      if (res?.ok) router.push("/pages/store");
    } catch {
      setError("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#021526] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-[#E2E2B6] p-10 rounded-xl shadow-lg"
      >
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto h-12 w-12 text-[#03346E]"
          >
            <ShoppingBag className="h-12 w-12" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-center text-3xl font-extrabold text-[#021526]"
          >
            Inicia sesión en tu cuenta
          </motion.h2>
          <p className="mt-2 text-center text-sm text-[#03346E]">
            Accede a ofertas exclusivas y a tu historial de compras
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#6EACDA] placeholder-[#03346E] text-[#021526] rounded-t-md focus:outline-none focus:ring-[#03346E] focus:border-[#03346E] focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#6EACDA] placeholder-[#03346E] text-[#021526] rounded-b-md focus:outline-none focus:ring-[#03346E] focus:border-[#03346E] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#03346E] focus:ring-[#6EACDA] border-[#6EACDA] rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[#021526]"
              >
                Recordar sesión
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#03346E] hover:text-[#6EACDA]"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#E2E2B6] bg-[#03346E] hover:bg-[#6EACDA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6EACDA]"
            >
              Iniciar Sesión
            </motion.button>
          </div>
        </form>
        <div className="mt-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/pages/store" })}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#E2E2B6] bg-[#DB4437] hover:bg-[#E57373] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E57373]"
          >
            Iniciar sesión con Google
          </button>
        </div>
        <div className="mt-6">
          <p className="text-center text-sm text-[#03346E]">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="font-medium text-[#03346E] hover:text-[#6EACDA]"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
