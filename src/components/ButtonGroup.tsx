import React from 'react';
import MOCK_DATA from "../data.json";
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
// import { setEndOfQuiz } from '../redux/features/quizSlice';
import { scoreIncrement, scoreReset } from '../redux/features/scoreSlice';
import { quizIDReset, setEndOfQuiz } from '../redux/features/quizSlice';
import { useNavigate } from 'react-router-dom';
import { addResult } from '../redux/features/resultSlice';

interface ButtonProps {
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>,
  isPaused: boolean,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonGroup = ({setShowAnswer, isPaused, setIsPaused} : ButtonProps) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(state => state.score.value);
  const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
  const navigate = useNavigate()
  const quizLength = MOCK_DATA.length
  const data = MOCK_DATA[currentQuizID]
  const newdata = useAppSelector(state => state.result)
  console.log(newdata)
  // console.log(`Q${parseInt(currentQuizID[currentQuizID.length-1]) + 1}`)

  // const handlePrevClick = () => {
  //   dispatch(quizIDDecrement())
  // };

  const handleCheck = () => {
    
    if (currentQuizID <= quizLength-1) {
      if (selectedChoice === data.correct_answer) {
        // alert("that's correct")
        dispatch(scoreIncrement())
      } 
      setShowAnswer(true)
      setIsPaused(!isPaused)
      dispatch(addResult({id: MOCK_DATA[currentQuizID]?.id, selectedChoice: selectedChoice}))
      // dispatch(quizIDIncrement())
    }
  };

  const handleRestart = () => {
    dispatch(quizIDReset())
    dispatch(setEndOfQuiz(false))
    dispatch(scoreReset())
    setIsPaused(false)
  }

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
      {endOfQuiz ? 
      <>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded`}
          onClick={handleRestart}
        >
          Restart Quiz
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded`}
          onClick={() => navigate('/results')}
        >
          See Results
        </button>
      </> : 
      <button
      disabled={endOfQuiz ? true : false}
      className={`bg-blue-500 text-white px-4 py-2 rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
      onClick={handleCheck}
    >
      Check Answer
    </button>}
      
    </div>
  );
};

export default ButtonGroup;
