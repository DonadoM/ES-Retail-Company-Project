import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = Router();

// Ruta para obtener todos los productos
router.get("/", getProducts);

// Ruta para crear un nuevo producto
router.post("/", createProduct);

// Ruta para actualizar un producto por su ID
router.put("/:id", updateProduct);

// Ruta para eliminar un producto por su ID

router.delete("/:id", deleteProduct);



export default router;
