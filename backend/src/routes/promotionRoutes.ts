// backend/src/routes/promotionsRoutes.ts

import { Router } from "express";
import {
  getPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotionsController";

const router = Router();

router.get("/", getPromotions);
router.post("/", addPromotion);
router.put("/:id", updatePromotion);
router.delete("/:id", deletePromotion);

export default router;
