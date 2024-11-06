import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
} from "../controllers/customerController";

const router = Router();

// Ruta para obtener todos los clientes
router.get("/", getCustomers);

// Ruta para crear un nuevo cliente
router.post("/", createCustomer);

router.put("/:id", (req, res) => {
  res.send("Update customer");
});

router.delete("/:id", deleteCustomer);

export default router;
