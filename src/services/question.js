// src/services/question.js
import { apiClient } from "./api";

export const getQuestionsByQuiz = async (quizId) => {
  const response = await apiClient.get(`/questions?quiz_id=${quizId}`);
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await apiClient.delete(`/questions/${questionId}`);
  return response.data;
};
