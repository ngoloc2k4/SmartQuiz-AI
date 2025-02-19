// src/pages/Admin/EditQuizPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById, updateQuiz } from "../../services/quiz";

const EditQuizPage = () => {
  const { id } = useParams(); // 'new' for creating a new quiz or existing id for editing
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(id !== "new");

  useEffect(() => {
    if (id !== "new") {
      async function fetchQuiz() {
        try {
          const data = await getQuizById(id);
          setQuiz(data);
        } catch (err) {
          setError("Failed to load quiz.");
        } finally {
          setLoading(false);
        }
      }
      fetchQuiz();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateQuiz(id, quiz);
      navigate("/admin");
    } catch (err) {
      setError("Failed to save quiz.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading quiz...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 border rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {id === "new" ? "Create New Quiz" : "Edit Quiz"}
      </h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block mb-1">Quiz Title:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {id === "new" ? "Create Quiz" : "Save Changes"}
        </button>
      </form>
      {id !== "new" && (
        <div className="mt-6">
          <button
            onClick={() => navigate(`/admin/manage-questions/${id}`)}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Manage Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default EditQuizPage;
