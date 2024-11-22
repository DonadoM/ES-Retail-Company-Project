import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Promotion, { IPromotion } from '../models/promotionModel';

// Get all promotions
export const getPromotions = asyncHandler(async (req: Request, res: Response) => {
  const promotions = await Promotion.find({});
  res.json(promotions);
});

// Get a single promotion by ID
export const getPromotionById = asyncHandler(async (req: Request, res: Response) => {
  const promotion = await Promotion.findById(req.params.id);
  if (promotion) {
    res.json(promotion);
  } else {
    res.status(404);
    throw new Error('Promotion not found');
  }
});

// Create a new promotion
export const createPromotion = asyncHandler(async (req: Request, res: Response) => {
  const {
    code,
    description,
    discountType,
    discountValue,
    startDate,
    endDate,
    isActive,
    applicableProducts,
    minimumPurchaseAmount,
    usageLimit
  } = req.body;

  const promotionExists = await Promotion.findOne({ code });

  if (promotionExists) {
    res.status(400);
    throw new Error('Promotion code already exists');
  }

  const promotion = new Promotion({
    code,
    description,
    discountType,
    discountValue,
    startDate,
    endDate,
    isActive,
    applicableProducts,
    minimumPurchaseAmount,
    usageLimit
  });

  const createdPromotion = await promotion.save();
  res.status(201).json(createdPromotion);
});

// Update a promotion
export const updatePromotion = asyncHandler(async (req: Request, res: Response) => {
  const {
    code,
    description,
    discountType,
    discountValue,
    startDate,
    endDate,
    isActive,
    applicableProducts,
    minimumPurchaseAmount,
    usageLimit
  } = req.body;

  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    promotion.code = code || promotion.code;
    promotion.description = description || promotion.description;
    promotion.discountType = discountType || promotion.discountType;
    promotion.discountValue = discountValue || promotion.discountValue;
    promotion.startDate = startDate || promotion.startDate;
    promotion.endDate = endDate || promotion.endDate;
    promotion.isActive = isActive !== undefined ? isActive : promotion.isActive;
    promotion.applicableProducts = applicableProducts || promotion.applicableProducts;
    promotion.minimumPurchaseAmount = minimumPurchaseAmount || promotion.minimumPurchaseAmount;
    promotion.usageLimit = usageLimit || promotion.usageLimit;

    const updatedPromotion = await promotion.save();
    res.json(updatedPromotion);
  } else {
    res.status(404);
    throw new Error('Promotion not found');
  }
});

// Delete a promotion
export const deletePromotion = asyncHandler(async (req: Request, res: Response) => {
  const promotion = await Promotion.findById(req.params.id);

  if (promotion) {
    await promotion.remove();
    res.json({ message: 'Promotion removed' });
  } else {
    res.status(404);
    throw new Error('Promotion not found');
  }
});

// Apply a promotion
export const applyPromotion = asyncHandler(async (req: Request, res: Response) => {
  const { code, cartTotal, products } = req.body;

  const promotion = await Promotion.findOne({ code, isActive: true });

  if (!promotion) {
    res.status(404);
    throw new Error('Invalid or inactive promotion code');
  }

  if (new Date() < promotion.startDate || new Date() > promotion.endDate) {
    res.status(400);
    throw new Error('Promotion is not currently active');
  }

  if (promotion.usageLimit > 0 && promotion.usageCount >= promotion.usageLimit) {
    res.status(400);
    throw new Error('Promotion usage limit has been reached');
  }

  if (cartTotal < promotion.minimumPurchaseAmount) {
    res.status(400);
    throw new Error(`Minimum purchase amount of ${promotion.minimumPurchaseAmount} not met`);
  }

  let discountAmount = 0;
  if (promotion.discountType === 'percentage') {
    discountAmount = cartTotal * (promotion.discountValue / 100);
  } else {
    discountAmount = promotion.discountValue;
  }

  // Increment usage count
  promotion.usageCount += 1;
  await promotion.save();

  res.json({
    discountAmount,
    finalTotal: cartTotal - discountAmount
  });
});

