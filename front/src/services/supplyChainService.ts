// services/supplyChainService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getSupplyChain = async () => {
  const response = await api.get('/supplychain');
  return response.data;
};

interface SupplyChainData {
  id: string;
  name: string;
  status: string;
  // Add other properties as needed
}

export const createSupplyChainItem = async (supplyChainData: SupplyChainData) => {
  const response = await api.post('/supplychain', supplyChainData);
  return response.data;
};

export const updateSupplyChainItem = async (id: string, supplyChainData: SupplyChainData) => {
  const response = await api.put(`/supplychain/${id}`, supplyChainData);
  return response.data;
};

export const deleteSupplyChainItem = async (id: string) => {
  const response = await api.delete(`/supplychain/${id}`);
  return response.data;
};