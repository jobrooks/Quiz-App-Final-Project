// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizCreatePage() {
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [{ options: ["", "", "", ""] }],
  });
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, { options: ["", "", "", ""] }],
    }));
  };

  const handleChange = (questionIndex, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question, index) =>
        index === questionIndex ? { ...question, [field]: value } : question
      ),
    }));
  };

  const handleSaveQuiz = async (e) => {
    e.preventDefault();

    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const quizDataWithUser = {
          ...quizData,
          createdBy: user._id,
        };
        
        const res = await axios.post(
          "http://localhost:8000/api/quizzes/",
          quizDataWithUser
        );
      console.log(res);
      navigate(`/quiz/${res.data._id}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
      <label className="block mb-2">Quiz Title:</label>
      <input
        type="text"
        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      {quizData.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">Question Text:</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
            value={question.text || ""}
            onChange={(e) => handleChange(index, "text", e.target.value)}
          />
          <label className="block mb-2">Options:</label>
          <div className="flex flex-wrap">
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                className="border border-gray-300 rounded px-2 py-1 mb-2 mr-2"
                value={option}
                onChange={(e) => {
                  const newOptions = [...question.options];
                  newOptions[optionIndex] = e.target.value;
                  handleChange(index, "options", newOptions);
                }}
              />
            ))}
          </div>
          <label className="block mb-2">Correct Answer:</label>
          <input
            type="number"
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
            value={question.correctAnswer || ""}
            onChange={(e) =>
              handleChange(index, "correctAnswer", e.target.value)
            }
          />
          <label className="block mb-2">Difficulty:</label>
          <select
            value={question.difficulty || ""}
            onChange={(e) => handleChange(index, "difficulty", e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSaveQuiz}
      >
        Save Quiz
      </button>
    </div>
  );
}

export default QuizCreatePage;
