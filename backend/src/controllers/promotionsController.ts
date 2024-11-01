// backend/src/controllers/promotionsController.ts

import { Request, Response } from "express";
import Promotion, { IPromotion } from "../models/promotionModel";

export const getPromotions = async (req: Request, res: Response) => {
  try {
    const promotions: IPromotion[] = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving promotions" });
  }
};
export const addPromotion = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPromotion = new Promotion(req.body);
    const savedPromotion = await newPromotion.save();
    res.status(201).json(savedPromotion); // Ensure we send the saved object in JSON format
  } catch (error) {
    res.status(400).json({ message: "Error creating promotion" });
  }
};
export const deletePromotion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Promotion.findByIdAndDelete(id);
    res.json({ message: "Promotion deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting promotion" });
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, discount, startDate, endDate, channels } = req.body;
  try {
    await Promotion.findByIdAndUpdate(id, {
      title,
      discount,
      startDate,
      endDate,
      channels,
    });
    res.json({ message: "Promotion updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating promotion" });
  }
};
