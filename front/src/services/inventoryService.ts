// services/inventoryService.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export const createInventoryItem = async (inventoryData: any) => {
  const response = await api.post("/inventory", inventoryData);
  return response.data;
};

export const updateInventoryItem = async (id: any, inventoryData: any) => {
  const response = await api.put(`/inventory/${id}`, inventoryData);
  return response.data;
};

export const deleteInventoryItem = async (id: any) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};
