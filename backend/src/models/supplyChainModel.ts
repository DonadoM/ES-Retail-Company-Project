import mongoose, { Document, Schema } from 'mongoose';

export interface ISupplyChainItem extends Document {
  itemName: string;
  sku: string;
  quantity: number;
  supplier: string;
  status: 'Ordered' | 'In Transit' | 'Received' | 'Quality Check' | 'In Stock';
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
}

const supplyChainSchema: Schema = new Schema({
  itemName: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Ordered', 'In Transit', 'Received', 'Quality Check', 'In Stock'],
    default: 'Ordered'
  },
  expectedDeliveryDate: { type: Date, required: true },
  actualDeliveryDate: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model<ISupplyChainItem>('SupplyChainItem', supplyChainSchema);

