import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface IOrder extends Document {
  orderId: string;
  customerName: string;
  items: Array<{ productId: string; quantity: number }>;
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
  createdAt: Date;
}

const orderSchema: Schema = new Schema({
  orderId: { type: String, unique: true },
  customerName: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre<IOrder>("save", function (next) {
  if (!this.orderId) {
    this.orderId = uuidv4(); // Genera un UUID si `orderId` no se proporciona
  }
  next();
});
export const Order = mongoose.model<IOrder>("Order", orderSchema);
