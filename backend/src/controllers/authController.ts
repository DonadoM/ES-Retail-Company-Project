// src/controllers/authController.ts

import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Registrar un nuevo usuario
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario
  const newUser: IUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "user", // Puedes ajustar el rol según sea necesario
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

/**
 * Iniciar sesión
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Buscar al usuario por email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // Comparar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // Generar un token JWT
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1h", // Puedes ajustar el tiempo de expiración
  });

  res.json({ token }); // Devolver el token al cliente
};

/**
 * Obtener el perfil del usuario
 */
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({ user });
};

/**
 * Obtener el dashboard del administrador
 */
export const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
  // Lógica para obtener datos del dashboard del administrador
  res.status(200).json({ message: "Admin dashboard data" });
};