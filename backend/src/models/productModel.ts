import { Schema, model } from 'mongoose';

// Definir el esquema para el Producto
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  imageUrl: {
    type: String,
    required: true,
  }
});

// Crear el modelo de Producto
const Product = model('Product', productSchema);

export default Product;
