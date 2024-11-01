import { Router } from "express";
import {
  createCustomer,
  getCustomers,
} from "../controllers/customerController";

const router = Router();

// Ruta para obtener todos los clientes
router.get("/", getCustomers);

// Ruta para crear un nuevo cliente
router.post("/", createCustomer);

export default router;
