// backend/src/models/supplyChainModel.ts

import mongoose, { Schema, Document } from "mongoose";

export interface ISupplyChain extends Document {
  productId: string;
  quantity: number;
  supplier: string;
  deliveryDate: Date;
}

const SupplyChainSchema: Schema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
});

export default mongoose.model<ISupplyChain>("SupplyChain", SupplyChainSchema);
