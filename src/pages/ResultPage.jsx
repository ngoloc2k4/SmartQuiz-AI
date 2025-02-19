// src/pages/ResultPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResultById } from "../services/quiz";

const ResultPage = () => {
  const { id } = useParams(); // Result ID from route
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResult() {
      try {
        const data = await getResultById(id);
        setResult(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load result.");
        setLoading(false);
      }
    }
    fetchResult();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10">Loading result...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <div className="mb-6">
        <p className="text-xl">Score: {result.score}</p>
        {result.feedback && (
          <p className="mt-2 text-gray-700 italic">
            Feedback: {result.feedback}
          </p>
        )}
      </div>
      <div className="space-y-4">
        {result.questions &&
          result.questions.map((q, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">{`Q${index + 1}: ${q.question}`}</p>
              <p className="mt-1">
                Your answer:{" "}
                <span className="font-medium">
                  {q.userAnswer || "Not Answered"}
                </span>
              </p>
              <p className="mt-1">
                Correct answer:{" "}
                <span className="font-medium">{q.correctAnswer}</span>
              </p>
              {q.explanation && (
                <p className="mt-1 text-gray-600">
                  Explanation: {q.explanation}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ResultPage;
