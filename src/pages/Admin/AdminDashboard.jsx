// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteQuiz, getQuizList } from "../../services/quiz";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all quizzes from the API when the component mounts.
  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await getQuizList();
        setQuizzes(data);
      } catch (err) {
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  // Handle deletion of a quiz and update the list.
  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(quizId);
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      } catch (err) {
        setError("Failed to delete quiz.");
      }
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading quizzes...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link
          to="/create"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create New Quiz
        </Link>
        <button
          onClick={() => navigate("/admin/edit/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Manage Questions
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Created At</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{quiz.title}</td>
                <td className="py-2 px-4 border">{quiz.description}</td>
                <td className="py-2 px-4 border">
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/admin/edit/${quiz.id}`}
                    className="mr-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {quizzes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No quizzes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
