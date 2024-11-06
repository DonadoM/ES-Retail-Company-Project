import { Request, Response } from 'express';
import Product from '../models/productModel';
import mongoose from 'mongoose';

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: (error as Error).message,
    });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el producto",
      error: (error as Error).message,
    });
  }
};

// Actualizar un producto por su ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: (error as Error).message,
    });
  }
};
// Eliminar un producto por su ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar el ID
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: "Deletion failed",
    });
  }
}