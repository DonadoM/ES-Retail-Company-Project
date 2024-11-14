import { Request, Response } from "express";
import { Order } from "../models/orderModel";

// Helper function to validate items array in the request
const validateItems = (items: any[]): boolean => {
  return (
    Array.isArray(items) &&
    items.every(
      (item) =>
        item.productId && typeof item.quantity === "number" && item.quantity > 0
    )
  );
};

// Create a new order

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customerName, items, totalPrice, status } = req.body;

  if (!customerName || !validateItems(items) || !totalPrice) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  try {
    const order = new Order({
      customerName,
      totalPrice,
      status: status || "pending",
    });

    const savedOrder = await order.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order", details: error });
  }
};

// Get all orders
export const getOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving orders", details: error });
  }
};

// Get an order by ID
export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order", details: error });
  }
};

// Update an order by ID
export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(404).json({ error: "Failed to update order", details: error });
  }
};

// Delete an order by ID
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Failed to delete order", details: error });
  }
};
