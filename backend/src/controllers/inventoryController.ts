import { Request, Response } from "express";
import Inventory from "../models/inventoryModel";

// Crear un nuevo inventario
export const createInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId, quantity, location } = req.body;

  if (!productId || quantity == null) {
    res.status(400).json({ message: "Product ID and quantity are required." });
    return;
  }

  try {
    const newInventory = new Inventory({
      productId,
      quantity,
      location,
    });

    const savedInventory = await newInventory.save();
    res.status(201).json({
      message: "Inventory item created successfully.",
      data: savedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating inventory item.",
      error: (error as Error).message,
    });
  }
};

// Obtener todos los items de inventario
export const getInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json({
      message: "Inventory items retrieved successfully.",
      data: inventoryItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving inventory items.",
      error: (error as Error).message,
    });
  }
};

// Actualizar un item de inventario
export const updateInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { productId, quantity, location } = req.body;

  if (!productId || quantity == null) {
    res.status(400).json({ message: "Product ID and quantity are required." });
    return;
  }

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      {
        productId,
        quantity,
        location,
      },
      { new: true }
    );

    if (!updatedInventory) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }

    res.status(200).json({
      message: "Inventory item updated successfully.",
      data: updatedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating inventory item.",
      error: (error as Error).message,
    });
  }
};

// Eliminar un item de inventario
export const deleteInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      res.status(404).json({ message: "Inventory item not found." });
      return;
    }

    res.status(200).json({ message: "Inventory item deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting inventory item.",
      error: (error as Error).message,
    });
  }
};
