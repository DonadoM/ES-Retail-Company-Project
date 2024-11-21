// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// export const getUsers = async () => {
//   const response = await api.get('/users');
//   return response.data;
// };

// interface UserData {
//   name: string;
//   email: string;
//   // add other user properties here
// }

// export const createUser = async (userData: UserData) => {
//   const response = await api.post('/users', userData);
//   return response.data;
// };

// export const updateUser = async (userId: string, userData: UserData) => {
//   const response = await api.put(`/users/${userId}`, userData);
//   return response.data;
// };

// export const deleteUser = async (userId: string) => {
//   const response = await api.delete(`/users/${userId}`);
//   return response.data;
// };

// // Duplicate function removed