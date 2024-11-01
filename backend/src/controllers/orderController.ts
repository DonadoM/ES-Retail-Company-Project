import { Request, Response } from "express";
import { Order } from "../models/orderModel";

// Create a new Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).send(savedOrder);
  } catch (error) {
    res.status(400).send({ error: "Failed to create order" });
  }
};
// Get all Orders

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
};

// Get Order by ID

export const getOrderById = async (
  req: Request,

  res: Response
): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).send({ error: "Order not found" });

      return;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).send({ error: "Failed to fetch order" });
  }
};

// Update an Order by ID
export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      res.status(404).json({ error: "Order not found" }); // If no order, send 404 (Not Found)
      return;
    }
    res.status(200).json(order); // Send response with status 200 (OK)
  } catch (error) {
    res.status(400).json({ error: "Failed to update order" });
  }
};

// Delete an Order by ID
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" }); // If no order, send 404 (Not Found)
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" }); // Send response with status 200 (OK)
  } catch (error) {
    res.status(400).json({ error: "Failed to delete order" });
  }
};
