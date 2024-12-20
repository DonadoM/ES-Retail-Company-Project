// services/productService.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

interface ProductData {
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
  imageUrl?: string;
}

export const createProduct = async (productData: ProductData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: ProductData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
