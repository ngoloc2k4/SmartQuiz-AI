// src/services/auth.js
import { apiClient } from "./api";

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};
