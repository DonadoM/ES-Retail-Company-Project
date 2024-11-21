// services/orderService.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Provide a default value
});

export const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching Orders data:", error);
    return [];
  }
};

export const createOrder = async (orderData: {
  customerName: string;
  totalPrice: number;
  status?: "pending" | "completed" | "canceled";
}) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating Order:", error);
    return null;
  }
};

export const updateOrder = async (id: string, orderData: string) => {
  const response = await api.put(`/orders/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};
