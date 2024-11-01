// backend/src/controllers/supplyChainController.ts

import { Request, Response } from "express";
import SupplyChain, { ISupplyChain } from "../models/supplyChainModel";

export const getSupplyChains = async (req: Request, res: Response) => {
  try {
    const supplyChains: ISupplyChain[] = await SupplyChain.find();
    res.json(supplyChains);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving supply chains" });
  }
};

export const addSupplyChain = async (req: Request, res: Response) => {
  const { productId, quantity, supplier, deliveryDate } = req.body;

  try {
    const newSupplyChain = new SupplyChain({
      productId,
      quantity,
      supplier,
      deliveryDate,
    });

    const savedSupplyChain = await newSupplyChain.save(); // Guardar el nuevo suministro
    res.status(201).json(savedSupplyChain); // Asegúrate de enviar el objeto guardado
  } catch (error) {
    res.status(400).json({ message: "Error adding supply chain" }); // Manejar el error adecuadamente
  }
};


export const deleteSupplyChain = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await SupplyChain.findByIdAndDelete(id);
    res.json({ message: "Supply chain deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting supply chain" });
  }
};

export const updateSupplyChain = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId, quantity, supplier, deliveryDate } = req.body;
  try {
    await SupplyChain.findByIdAndUpdate(id, {
      productId,
      quantity,
      supplier,
      deliveryDate,
    });
    res.json({ message: "Supply chain updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating supply chain" });
  }
};
