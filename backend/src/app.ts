// src/app.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import authRoutes from "./routes/authRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import supplyChainRoutes from "./routes/supplyChainRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Salir de la aplicación en caso de error
  }
};

connectDB();

// Rutas
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/supplychain", supplyChainRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/users", userRoutes);
