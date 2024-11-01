// src/routes/authRoutes.ts

import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController"; // Asegúrate de que esta ruta sea correcta

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

export default router;
