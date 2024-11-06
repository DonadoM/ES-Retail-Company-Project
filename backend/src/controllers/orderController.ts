import { Request, Response } from "express";
import { Order } from "../models/orderModel";

// Crear una nueva orden
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, items, totalPrice, status } = req.body;

    // Validación de campos requeridos
    if (!customerName || !Array.isArray(items) || items.length === 0 || !totalPrice) {
      res.status(400).json({ error: "Campos requeridos faltantes o inválidos" });
    }

    // Validar cada ítem en `items`
    for (const item of items) {
      if (!item.productId || item.quantity <= 0) {
         res.status(500).json({ error: "Datos de items inválidos" });
      }
    }

    // Crear una nueva orden
    const order = new Order({
      customerName,
      items,
      totalPrice,
      status: status || "pending", // default to "pending" if status is not provided
    });

    // Guardar la orden en la base de datos
    const savedOrder = await order.save();
     res.status(201).json({ message: "Order created successfully", order: savedOrder });

  } catch (error) {
     res.status(400).json({ error: "Error al crear la orden", details: error });
  }
};


 

    //
// Obtener todas las órdenes
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving orders" });
  }
};

// Obtener una orden por ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
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

// Actualizar una orden por ID
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: "Failed to update order" });
  }
};

// Eliminar una orden por ID
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete order" });
  }
};