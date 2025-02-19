// src/pages/CreateQuizPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/quiz";

const CreateQuizPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const newQuiz = { title, description };
      const createdQuiz = await createQuiz(newQuiz);
      navigate(`/quiz/${createdQuiz.id}`);
    } catch (err) {
      setError("Error creating quiz. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create New Quiz</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleCreateQuiz}>
        <div className="mb-4">
          <label className="block mb-1">Quiz Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizPage;
