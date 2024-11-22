import mongoose, { Document, Schema } from "mongoose";

interface IInventoryItem extends Document {
  productName: string;
  sku: string;
  quantity: number;
  price: number;
}

const inventoryItemSchema: Schema = new Schema({
  productName: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const InventoryItem = mongoose.model<IInventoryItem>("InventoryItem", inventoryItemSchema);
export default InventoryItem;