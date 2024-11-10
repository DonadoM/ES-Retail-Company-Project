import mongoose, { Document, Schema } from "mongoose";
export interface IOrder extends Document {
  orderId: string;
  customerName: string;
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
}

const orderSchema: Schema = new Schema({
  orderId: { type: String, unique: true },
  customerName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
