// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/quizzes/${id}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <h2>Questions:</h2>
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={index}>
            <h3>{question.text}</h3>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>Correct Answer: {question.correctAnswer}</p>
            <p>Difficulty: {question.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizPage;
