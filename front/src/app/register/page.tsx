"use client";
import { FormEvent, useCallback, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react"; // Asegúrate de importar el ícono correctamente

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = useMemo(() => {
    return (email: string) => {
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        setError("Por favor, ingrese un correo electrónico válido.");
      } else {
        setError("");
      }
    };
  }, []);

  const validatePassword = useMemo(() => {
    return (password: string) => {
      if (password && password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
      } else {
        setError("");
      }
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "email") {
        validateEmail(value);
      } else if (name === "password") {
        validatePassword(value);
      }
    },
    [validateEmail, validatePassword]
  );

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");

      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Por favor, complete todos los campos.");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Por favor, ingrese un correo electrónico válido.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

      if (formData.password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }

      try {
        const signupResponse = await axios.post("/api/auth/signup", {
          email: formData.email,
          password: formData.password,
          fullname: formData.name,
        });

        console.log(signupResponse);
        const res = await signIn("credentials", {
          email: signupResponse.data.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.ok) {
          return router.push("/dashboard/profile");
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data.message;
          setError(errorMessage);
        }
      }
    },
    [formData, router]
  );

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
            Crea tu cuenta
          </motion.h2>
          <p className="mt-2 text-center text-sm text-[#03346E]">
            Únete a nuestra comunidad de moda y disfruta de ofertas exclusivas
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#E2E2B6] bg-[#03346E] hover:bg-[#6EACDA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6EACDA]"
            >
              Crear cuenta
            </motion.button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-[#03346E]">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="#"
              className="font-medium text-[#03346E] hover:text-[#6EACDA]"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
