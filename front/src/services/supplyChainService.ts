// services/supplyChainService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getSupplyChain = async () => {
  const response = await api.get('/supplychain');
  return response.data;
};

export const createSupplyChainItem = async (supplyChainData: any) => {
  const response = await api.post('/supplychain', supplyChainData);
  return response.data;
};

export const updateSupplyChainItem = async (id: any, supplyChainData: any) => {
  const response = await api.put(`/supplychain/${id}`, supplyChainData);
  return response.data;
};

export const deleteSupplyChainItem = async (id: any) => {
  const response = await api.delete(`/supplychain/${id}`);
  return response.data;
};