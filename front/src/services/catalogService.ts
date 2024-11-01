// services/catalogService.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getCatalog = async () => {
  const response = await api.get("/catalog");
  return response.data;
};

export const createCatalogItem = async (catalogData: any) => {
  const response = await api.post("/catalog", catalogData);
  return response.data;
};

export const updateCatalogItem = async (id: any, catalogData: any) => {
  const response = await api.put(`/catalog/${id}`, catalogData);
  return response.data;
};

export const deleteCatalogItem = async (id: any) => {
  const response = await api.delete(`/catalog/${id}`);
  return response.data;
};
