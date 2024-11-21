import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
}

const orderSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
