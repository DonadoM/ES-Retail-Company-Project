import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Middleware para verificar si el usuario tiene rol de 'admin'
const adminMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  try {
    const session = await getSession({ req });

    if (session?.user?.role === "admin") {
      return true; // Permite acceso
    }

    res.status(403).json({ message: "Access denied: Admins only" });
    return false;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: `Server error during authorization: ${errorMessage}` });
    return false;
  }
};

// Handler de la API protegido por el middleware
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await adminMiddleware(req, res))) return;

  // Código a ejecutar si el usuario es admin
  res.status(200).json({ message: "Access granted: Welcome, Admin!" });
}
