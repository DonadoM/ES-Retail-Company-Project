// backend/src/routes/supplyChainRoutes.ts

import { Router } from "express";
import {
  getSupplyChains,
  addSupplyChain,
  deleteSupplyChain,
  updateSupplyChain,
} from "../controllers/supplyChainController";

const router = Router();

router.get("/", getSupplyChains);
router.post("/", addSupplyChain);
router.delete("/:id", deleteSupplyChain);
router.put("/:id", updateSupplyChain);
export default router;
