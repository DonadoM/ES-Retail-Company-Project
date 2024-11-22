import mongoose, { Document, Schema } from "mongoose";

export interface IPromotion extends Document {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  applicableProducts: string[]; // Array of product IDs
  minimumPurchaseAmount: number;
  usageLimit: number;
  usageCount: number;
}

const promotionSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    minimumPurchaseAmount: { type: Number, default: 0 },
    usageLimit: { type: Number, default: 0 },
    usageCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPromotion>("Promotion", promotionSchema);
