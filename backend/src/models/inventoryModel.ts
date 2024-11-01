// src/models/inventoryModel.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

interface IInventory extends Document {
  productId: string;
  quantity: number;
  location?: string; // Opcional: ubicación de inventario si se requiere
}

const inventorySchema: Schema = new Schema({
  productId: { 
    type: String, 
    required: true,
    trim: true // Remueve espacios innecesarios
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 // Asegura que la cantidad sea no negativa
  },
  location: { 
    type: String, 
    default: "warehouse", // Ubicación predeterminada
    trim: true
  }
}, { 
  timestamps: true // Agrega `createdAt` y `updatedAt`
});

const Inventory: Model<IInventory> = mongoose.model<IInventory>('Inventory', inventorySchema);
export default Inventory;
