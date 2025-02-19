// src/pages/QuizListPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizList } from "../services/quiz";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await getQuizList();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }
    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-4">Available Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{quiz.title}</h3>
            <p className="text-gray-600">{quiz.description}</p>
            <Link
              to={`/quiz/${quiz.id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Start Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizListPage;
