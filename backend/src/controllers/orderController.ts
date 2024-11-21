import { Request, Response } from "express";
import { Order } from "../models/orderModel";

// Create Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, totalPrice, status } = req.body;

    if (!customerName || !totalPrice) {
      res.status(400).json({ error: "Invalid request. Missing fields." });
      return;
    }

    const order = new Order({
      customerName,
      totalPrice,
      status: status || "pending",
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order", details: error });
  }
};

// Get All Orders
export const getOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders", details: error });
  }
};

// Get Order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order", details: error });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).json({ error: "Failed to update order", details: error });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order", details: error });
  }
};
