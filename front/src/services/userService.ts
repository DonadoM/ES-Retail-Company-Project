import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getUsers = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await api.post('/', userData);
  return response.data;
};

export const updateUser = async (userId: string, userData: any) => {
  const response = await api.put(`/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/${userId}`);
  return response.data;
};