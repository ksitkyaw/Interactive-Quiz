import React, { useState } from 'react';
import MOCK_DATA from "../data.json";

const ButtonGroup = ({data, selectedChoice, currentQuizID, setCurrentQuizID, setEndOfQuiz, endOfQuiz}) => {
  const [score, setScore] = useState(0);
  const quizLength = MOCK_DATA.length
  // console.log(`Q${parseInt(currentQuizID[currentQuizID.length-1]) + 1}`)

  const handlePrevClick = () => {
    setCurrentQuizID(currentQuizID - 1)
    // Logic for previous button click
    // You can add your own implementation here
  };

  const handleNextClick = () => {
    
    if (currentQuizID < quizLength-1) {
      if (selectedChoice === data.correct_answer) {
        alert("that's correct")
        setScore(score + 1)
      } else {
          alert("that's incorrect")
      }
      setCurrentQuizID(currentQuizID + 1)
    } else {
      if (selectedChoice === data.correct_answer) {
        alert("that's correct")
        setScore(score + 1)
    } else {
        alert("that's incorrect")
    }
    setEndOfQuiz(true)
    }
    // Logic for next button click
    // You can add your own implementation here
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        disabled={endOfQuiz ? true : false}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handlePrevClick}
      >
        Prev
      </button>
      <div className="border rounded px-4 py-2">
        Score: <span className="font-bold">{score}</span>
      </div>
      <button
        disabled={endOfQuiz ? true : false}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default ButtonGroup;
