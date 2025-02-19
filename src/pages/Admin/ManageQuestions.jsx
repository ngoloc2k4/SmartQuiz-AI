// src/pages/Admin/ManageQuestions.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteQuestion, getQuestionsByQuiz } from "../../services/question";

const ManageQuestions = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestionsByQuiz(quizId);
        setQuestions(data);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [quizId]);

  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(questionId);
        setQuestions(questions.filter((q) => q.id !== questionId));
      } catch (err) {
        setError("Failed to delete question.");
      }
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading questions...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found for this quiz.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{q.question}</p>
                <p className="text-sm text-gray-600">
                  Difficulty: {q.difficulty} | Category: {q.category}
                </p>
              </div>
              <button
                onClick={() => handleDelete(q.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageQuestions;
