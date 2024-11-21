// services/promotionService.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getPromotions = async () => {
  const response = await api.get("/promotions");
  return response.data;
};

interface PromotionData {
  title: string;
  description: string;
  discount: number;
}

export const createPromotion = async (promotionData: PromotionData) => {
  const response = await api.post("/promotions", promotionData);
  return response.data;
};

export const updatePromotion = async (
  id: string,
  promotionData: PromotionData
) => {
  const response = await api.put(`/promotions/${id}`, promotionData);
  return response.data;
};

export const deletePromotion = async (id: string) => {
  const response = await api.delete(`/promotions/${id}`);
  return response.data;
};
