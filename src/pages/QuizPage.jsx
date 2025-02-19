// src/pages/QuizPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById, submitQuiz } from "../services/quiz";

const QuizPage = () => {
  const { id } = useParams(); // Quiz ID from route
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await getQuizById(id);
        setQuiz(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz.");
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Submit quiz via API
      const result = await submitQuiz(id, userAnswers);
      navigate(`/result/${result.id}`);
    } catch (err) {
      setError("Failed to submit quiz.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading quiz...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      <div className="mb-6">
        <p className="text-lg font-medium">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
        <p className="mt-2">{currentQuestion.question}</p>
        <div className="mt-4">
          {currentQuestion.options.map((option, idx) => (
            <label key={idx} className="block mb-2">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={userAnswers[currentQuestion.id] === option}
                onChange={() => handleAnswerChange(currentQuestion.id, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
