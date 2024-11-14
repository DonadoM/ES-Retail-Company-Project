import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IOrder extends Document {
  customerId: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
 
}

const orderSchema: Schema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
