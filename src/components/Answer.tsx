import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import MOCK_DATA from "../data.json"
import { quizIDIncrement } from '../redux/features/quizSlice';
import { setEndOfQuiz } from '../redux/features/quizSlice';
import { v4 as uuidv4 } from 'uuid';
import Feedback from './Feedback';
import { Howl } from 'howler';
import { motion } from 'framer-motion';

interface Props {
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>,
  setPlayCountdown: React.Dispatch<React.SetStateAction<string>>,
  playCountdown: string,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Answer({setShowAnswer, setPlayCountdown, playCountdown, setIsPaused}: Props) {
    const dispatch = useAppDispatch()
    const score = useAppSelector(state => state.score.value);
    const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
    const quizData = MOCK_DATA[currentQuizID]
    const quizLength = MOCK_DATA.length
    const nextSound = new Howl({
      src: ["next.mp3"]
    })

    const handleNext = () => {
        if (currentQuizID < quizLength-1) {
            nextSound.play()
            dispatch(quizIDIncrement())
            setShowAnswer(false)
            setPlayCountdown(uuidv4())
            setIsPaused(false)
          } else {
            nextSound.play()
            setShowAnswer(false)
            dispatch(setEndOfQuiz(true))
          }
        };

  return (
    <>
    {/* {selectedChoice === quizData.correct_answer ? <div>Correct</div> : <div>Incorrect</div>} */}
    <Feedback/>
    <div className="flex items-center justify-between space-x-4">
      <div className="border-blue-500 border rounded px-4 py-2 text-slate-500">
        Score: <span className="font-bold">{score}</span>
      </div>
      <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale: 0.9}}
        disabled={endOfQuiz ? true : false}
        className={`bg-transparent hover:bg-slate-500 text-blue-500 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handleNext}
      >
        Next
      </motion.button>
    </div>
    </>
  )
}
