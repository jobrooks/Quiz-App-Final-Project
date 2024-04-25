// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateQuizPage() {
    const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [{ text: '', options: ['', '', '',''], correctAnswer: undefined, difficulty: '' }],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/quizzes/${id}`);
        setQuizData(res.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (questionIndex, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((question, index) =>
        index === questionIndex ? { ...question, [field]: value } : question
      ),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/quizzes/${id}`, quizData);
     navigate(`/quiz/${id}`);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Quiz</h1>
      <label className="block mb-2">Quiz Title:</label>
      <input
        type="text"
        className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />
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
            onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
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
        onClick={handleUpdate}
      >
        Update Quiz
      </button>
    </div>
  );
}

export default UpdateQuizPage;