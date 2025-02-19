// src/App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateQuizPage from "./pages/CreateQuizPage";
import LoginPage from "./pages/LoginPage";
import QuizListPage from "./pages/QuizListPage";
import QuizPage from "./pages/QuizListPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
