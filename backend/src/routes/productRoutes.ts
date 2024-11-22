import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  upload
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", upload.single('image'), createProduct);
router.put("/:id", upload.single('image'), updateProduct);
router.delete("/:id", deleteProduct);

export default router;

