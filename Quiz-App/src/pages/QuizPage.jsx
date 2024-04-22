// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/quizzes/find/${id}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      console.log(typeof(selectedAnswers[index]));
      if (selectedAnswers[index] === question.correctAnswer){
        correctAnswers++;
      }
    });
    const calculatedScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(calculatedScore);
  };
  

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (score !== null) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Your Score:</h2>
          <p>{score}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Questions:</h2>
        {quiz.questions.map((question, index) => (
          <div
            key={index}
            className={index === currentQuestionIndex ? "" : "hidden"}
          >
            <h3 className="text-lg font-semibold">{question.text}</h3>
            <ul className="list-disc list-inside">
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="mt-2">
                  <button
                    key={optionIndex}
                    className={`border ${
                      selectedAnswers[currentQuestionIndex] === optionIndex
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    } py-2 px-4 rounded-full`}
                    onClick={() =>
                      handleOptionSelect(currentQuestionIndex, optionIndex)
                    }
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            {index === currentQuestionIndex && (
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  if (index === quiz.questions.length - 1) {
                    handleSubmitQuiz();
                  } else {
                    handleNextQuestion();
                  }
                }}
              >
                {index === quiz.questions.length - 1
                  ? "Submit Quiz"
                  : "Next Question"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
