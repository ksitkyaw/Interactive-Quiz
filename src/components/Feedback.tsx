import React from 'react'
import { useAppSelector } from '../redux/app/hooks'
import { motion } from 'framer-motion'

export default function Feedback() {
    const {currentQuizID, selectedChoice} = useAppSelector(state => state.quiz.value)
    const result = useAppSelector(state => state.result)
    const correct = selectedChoice === result[currentQuizID].correct_answer
  return (
    <div className="text-slate-600 flex flex-col justify-start items-center mt-5">
        <p>Your Answer is ...</p>
        <motion.img 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2}}
        className="my-5 w-1/4 rounded-full"
        src={correct ? "correct.jpg" : "incorrect.jpg"}
        alt="correct or incorrect"
        />
        <motion.p
        initial={{scale: 0, rotate: 0}}
        animate={{scale:1, rotate: 360}}
        transition={{duration: 1.5}}
        className="text-5xl mb-5">{correct ? "Correct" : "Incorrect"}</motion.p>
    </div>
  )
}
