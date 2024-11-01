// routes/inventoryRoutes.ts
import express, { Request, Response } from "express";
import {
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController";

const router = express.Router();

router.post("/", createInventory);
router.get("/", getInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

export default router;
