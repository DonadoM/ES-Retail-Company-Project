// backend/src/models/promotionsModel.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IPromotion extends Document {
  title: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  channels: string[];
}

const PromotionSchema: Schema = new Schema({
  title: { type: String, required: true },
  discount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  channels: { type: [String], required: true },
});

export default mongoose.model<IPromotion>("Promotion", PromotionSchema);
