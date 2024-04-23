// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizDetails= () => {
  const { title } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/quizzes/search/${title}`);
        setQuiz(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (title) {
      fetchQuiz();
    }
  }, [title]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <ul>
        {quiz.questions.map((q, index) => (
          <li key={index}>
            <h2 className="text-lg font-semibold">{q.text}</h2>
            <ul>
              {q.options.map((option, optionIndex) => (
                <li key={optionIndex} className="text-gray-600">
                  Option {optionIndex + 1}: {option}
                </li>
              ))}
            </ul>
            <p className="text-gray-600">Correct Answer: {q.correctAnswer}</p>
            <p className="text-gray-600">Difficulty: {q.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizDetails;
