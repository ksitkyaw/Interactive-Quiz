import React from 'react';
import MOCK_DATA from "../data.json";
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
// import { setEndOfQuiz } from '../redux/features/quizSlice';
import { scoreIncrement } from '../redux/features/scoreSlice';

const ButtonGroup = ({setShowAnswer}) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(state => state.score.value);
  const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
  const quizLength = MOCK_DATA.length
  const data = MOCK_DATA[currentQuizID]
  // console.log(`Q${parseInt(currentQuizID[currentQuizID.length-1]) + 1}`)

  // const handlePrevClick = () => {
  //   dispatch(quizIDDecrement())
  // };

  const handleCheck = () => {
    
    if (currentQuizID < quizLength-1) {
      if (selectedChoice === data.correct_answer) {
        // alert("that's correct")
        dispatch(scoreIncrement())
      } 
      setShowAnswer(true)
      // dispatch(quizIDIncrement())
    } else {
      if (selectedChoice === data.correct_answer) {
        // alert("that's correct")
        dispatch(scoreIncrement())
    } 
    setShowAnswer(true)
    // dispatch(setEndOfQuiz(true));
    }
    // Logic for next button click
    // You can add your own implementation here
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      {/* <button
        disabled={endOfQuiz ? true : false}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handlePrevClick}
      >
        Prev
      </button> */}
      <div className="border rounded px-4 py-2">
        Score: <span className="font-bold">{score}</span>
      </div>
      <button
        disabled={endOfQuiz ? true : false}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handleCheck}
      >
        Check Answer
      </button>
    </div>
  );
};

export default ButtonGroup;
