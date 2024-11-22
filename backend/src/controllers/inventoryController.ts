import { Request, Response } from "express";
import InventoryItem from "../models/inventoryModel";

export const getInventoryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { productName, sku, quantity, price } = req.body;

  const newItem = new InventoryItem({
    productName,
    sku,
    quantity,
    price,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: "Inventory item deleted" });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};