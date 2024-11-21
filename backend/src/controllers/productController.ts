import { Request, Response } from 'express';
import Product from '../models/productModel';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the type for CloudinaryStorage params
interface CloudinaryStorageParams {
  folder: string;
  allowed_formats: string[];
}

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: '4f-wears',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as CloudinaryStorageParams,
});



export const upload = multer({ storage: storage });

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
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

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

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
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

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // If the product has an image, delete it from Cloudinary
    if (product.imageUrl) {
      const publicId = product.imageUrl.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.v2.uploader.destroy(publicId);
      }
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: "Deletion failed",
    });
  }
};