import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import MOCK_DATA from "../data.json"
import { quizIDIncrement } from '../redux/features/quizSlice';
import { setEndOfQuiz } from '../redux/features/quizSlice';

export default function Answer({setShowAnswer}) {
    const dispatch = useAppDispatch()
    const score = useAppSelector(state => state.score.value);
    const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
    const quizData = MOCK_DATA[currentQuizID]
    const quizLength = MOCK_DATA.length
    const handleNext = () => {
        if (currentQuizID < quizLength-1) {
            dispatch(quizIDIncrement())
            setShowAnswer(false)
          } else {
            setShowAnswer(false)
            dispatch(setEndOfQuiz(true))
          }
        };

  return (
    <>
    {selectedChoice === quizData.correct_answer ? <div>Correct</div> : <div>Incorrect</div>}
    <div className="flex items-center justify-between space-x-4">
      <div className="border rounded px-4 py-2">
        Score: <span className="font-bold">{score}</span>
      </div>
      <button
        disabled={endOfQuiz ? true : false}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
    </>
  )
}
