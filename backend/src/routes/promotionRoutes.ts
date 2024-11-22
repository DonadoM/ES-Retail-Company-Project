import express from "express";
import {
  getPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  applyPromotion,
} from "../controllers/promotionsController";

const router = express.Router();

router.route("/").get(getPromotions).post(createPromotion);

router
  .route("/:id")
  .get(getPromotionById)
  .put(updatePromotion)
  .delete(deletePromotion);

router.post("/apply", applyPromotion);

export default router;
