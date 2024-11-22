import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import SupplyChainItem, { ISupplyChainItem } from '../models/supplyChainModel';

// Get all supply chain items
export const getSupplyChainItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await SupplyChainItem.find({});
  res.json(items);
});

// Get a single supply chain item by ID
export const getSupplyChainItemById = asyncHandler(async (req: Request, res: Response) => {
  const item = await SupplyChainItem.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Supply chain item not found');
  }
});

// Create a new supply chain item
export const createSupplyChainItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemName, sku, quantity, supplier, status, expectedDeliveryDate } = req.body;

  const newItem = new SupplyChainItem({
    itemName,
    sku,
    quantity,
    supplier,
    status,
    expectedDeliveryDate
  });

  const createdItem = await newItem.save();
  res.status(201).json(createdItem);
});

// Update a supply chain item
export const updateSupplyChainItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemName, sku, quantity, supplier, status, expectedDeliveryDate, actualDeliveryDate } = req.body;

  const item = await SupplyChainItem.findById(req.params.id);

  if (item) {
    item.itemName = itemName || item.itemName;
    item.sku = sku || item.sku;
    item.quantity = quantity || item.quantity;
    item.supplier = supplier || item.supplier;
    item.status = status || item.status;
    item.expectedDeliveryDate = expectedDeliveryDate || item.expectedDeliveryDate;
    item.actualDeliveryDate = actualDeliveryDate || item.actualDeliveryDate;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Supply chain item not found');
  }
});

// Delete a supply chain item
export const deleteSupplyChainItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await SupplyChainItem.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: 'Supply chain item removed' });
  } else {
    res.status(404);
    throw new Error('Supply chain item not found');
  }
});

