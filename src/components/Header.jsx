// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">QuizMaster AI</Link>
        </h1>
        <nav>
          <Link className="mr-4 hover:underline" to="/quizzes">
            Quizzes
          </Link>
          <Link className="mr-4 hover:underline" to="/create">
            Create Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
