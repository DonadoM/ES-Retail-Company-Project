import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);

export default router;

console.log("Order routes created successfully");
