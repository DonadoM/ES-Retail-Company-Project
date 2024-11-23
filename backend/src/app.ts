import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
// import authRoutes from "./routes/authRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import supplyChainRoutes from "./routes/supplyChainRoutes";
import promotionRoutes from "./routes/promotionRoutes";
// import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import cloudinary from "cloudinary";

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.use("/api", uploadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/supply-chain", supplyChainRoutes);
app.use("/api/promotions", promotionRoutes);
// app.use("/api/users", userRoutes);

// Ruta principal para la vista de bienvenida
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Bienvenido a la API</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: #343a40;
            margin: 0;
            padding: 20px;
          }
          h1 {
            color: #007bff;
            text-align: center;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            text-align: center;
            margin-bottom: 30px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            padding: 15px;
            border-bottom: 1px solid #e9ecef;
            transition: background-color 0.3s;
          }
          li:last-child {
            border-bottom: none;
          }
          li:hover {
            background-color: #e9ecef;
          }
          a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
            display: block;
          }
          a:hover {
            text-decoration: underline;
          }
          footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #6c757d;
          }
          .api-description {
            margin-bottom: 20px;
            font-size: 16px;
            color: #495057;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Bienvenido a la API</h1>
          <p class="api-description">Utiliza las siguientes rutas para interactuar con los recursos:</p>
          <ul>
            <li><a href="/api/customers">/api/customers</a> - Gestión de clientes</li>
            <li><a href="/api/products">/api/products</a> - Gestión de productos</li>
            <li><a href="/api/orders">/api/orders</a> - Gestión de pedidos</li>
            <li><a href="/api/inventory">/api/inventory</a> - Gestión de inventario</li>
            <li><a href="/api/supply-chain">/api/supply-chain</a> - Gestión de cadena de suministro</li>
            <li><a href="/api/promotions">/api/promotions</a> - Gestión de promociones</li>
          </ul>
          <footer>
            <p>Documentación de la API - Versión 1.0</p>
          </footer>
        </div>
      </body>
    </html>
  `);
});