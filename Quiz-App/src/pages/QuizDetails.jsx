// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizDetails= () => {
  const { title } = useParams();
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

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

  const handleUpdate = () =>{
    navigate(`/update/${quiz._id}`);
  }

  const handleDelete = async () =>{
    try {
      await axios.delete(`http://localhost:8000/api/quizzes/${quiz._id}`);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
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
      <div className="mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
