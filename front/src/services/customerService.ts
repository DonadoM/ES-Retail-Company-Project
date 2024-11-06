// services/customerService.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

export const createCustomer = async (customerData: any) => {
  const response = await api.post("/customers", customerData);
  return response.data;
};

export const updateCustomer = async (id: any, customerData: any) => {
  const response = await api.put("/customers/${id}", customerData);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};
