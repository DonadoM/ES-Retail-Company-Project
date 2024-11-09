import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem extends Document {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItemSchema = new Schema<ICartItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
});

const CartItem = mongoose.models.CartItem || mongoose.model<ICartItem>('CartItem', CartItemSchema);

export default CartItem;
