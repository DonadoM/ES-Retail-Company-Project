// src/pages/api/users.ts

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getSession } from "next-auth/react"; // Importa getSession para obtener la sesión

// Este handler maneja las solicitudes GET para obtener usuarios
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica si el método de la solicitud es GET
  if (req.method === "GET") {
    const session = await getSession({ req }); // Obtén la sesión del usuario

    // Si no hay sesión, retorna un error 401
    if (!session) {
      return res.status(401).json({ message: "Not authorized" });
    }

    try {
      await connectDB(); // Conecta a la base de datos
      const users = await User.find().select("-password"); // Obtén todos los usuarios sin el campo de contraseña
      return res.status(200).json(users); // Retorna la lista de usuarios
    } catch (error: any) {
      return res.status(500).json({ message: (error as Error).message });
    }
  } else {
    // Si el método no es GET, retorna un error 405 (Method Not Allowed)
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
