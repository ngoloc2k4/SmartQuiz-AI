// src/services/quiz.js
import { apiClient } from "./api";
// src/pages/ResultPage.jsx

// Existing functions
export const getQuizList = async () => {
  const response = await apiClient.get("/quizzes");
  return response.data;
};

export const createQuiz = async (quizData) => {
  const response = await apiClient.post("/quizzes", quizData);
  return response.data;
};

// NEW: Add getResultById function
export const getResultById = async (resultId) => {
  const response = await apiClient.get(`/results/${resultId}`);
  return response.data;
};
