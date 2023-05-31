import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
// import { setEndOfQuiz } from '../redux/features/quizSlice';
import { scoreIncrement, scoreReset } from '../redux/features/scoreSlice';
import { quizIDReset, setEndOfQuiz } from '../redux/features/quizSlice';
import { useNavigate } from 'react-router-dom';
import { addResult } from '../redux/features/resultSlice';
import { Howl } from "howler";
import { motion } from 'framer-motion';

interface ButtonProps {
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>,
  isPaused: boolean,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonGroup = ({setShowAnswer, isPaused, setIsPaused} : ButtonProps) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(state => state.score.value);
  const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
  const result = useAppSelector(state => state.result)
  const navigate = useNavigate()
  const quizLength = result.length
  const data = result[currentQuizID]
  const correctSound = new Howl({
    src: ["correct.wav"]
  })
  const playSound = new Howl({
    src: ["play.wav"]
  })
  const incorrectSound = new Howl({
    src: ["incorrect.mp3"]
  })
  const resultSound = new Howl({
    src: ["result.wav"]
  })
  const soundCue = (sound: Howl) => {
    sound.play()
  }

  const handleCheck = () => {

    if (currentQuizID <= quizLength-1) {
      if (selectedChoice === data.correct_answer) {
        // alert("that's correct")
        dispatch(scoreIncrement())
        soundCue(correctSound)
      } else {
        soundCue(incorrectSound)
      }
      setShowAnswer(true)
      setIsPaused(!isPaused)
      dispatch(addResult({id: result[currentQuizID]?.id, selectedChoice: selectedChoice}))
      // dispatch(quizIDIncrement())
    }
  };

  const handleRestart = () => {
    soundCue(playSound)
    dispatch(quizIDReset())
    dispatch(setEndOfQuiz(false))
    dispatch(scoreReset())
    setIsPaused(false)
  }

  return (
    <div className="flex items-center justify-between space-x-4">
      {/* <button
        disabled={endOfQuiz ? true : false}
        className={`"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
        onClick={handlePrevClick}
      >
        Prev
      </button> */}
      <div className="border-blue-500 rounded px-4 py-2 text-slate-600">
        Score: <span className="font-bold text-slate-600">{score}</span>
      </div>
      {endOfQuiz ? 
      <div className='flex flex-wrap sm:block'>
        <motion.button
          whileHover={{scale:1.05, shadow: '2px 4px 10px 0px rgba(0,0,0,0.61)'}}
          whileTap={{scale: 0.9}}
          className={" mb-2 mr-3 bg-transparent hover:bg-slate-500 text-slate-500 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
          onClick={handleRestart}
        >
          Restart Quiz
        </motion.button>
        <motion.button
          whileHover={{scale:1.05, boxShadow: '2px 4px 10px 0px rgba(0,0,0,0.61)'}}
          whileTap={{scale: 0.9}}
          className={`mb-2 mr-3 bg-transparent hover:bg-slate-500 text-slate-500 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
          onClick={() => {
            navigate('/results')
            soundCue(resultSound)
          }}
        >
          See Results
        </motion.button>
      </div> : 
      <motion.button
        whileHover={{scale:1.05, boxShadow: '2px 4px 10px 0px rgba(0,0,0,0.61)'}}
        whileTap={{scale: 0.9}}
      disabled={endOfQuiz ? true : false}
      className={`bg-transparent hover:bg-slate-500 text-slate-500 font-semibold hover:text-blue-300 py-2 px-4 border border-blue-500 hover:border-transparent rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
      onClick={handleCheck}
    >
      Check Answer
    </motion.button>}
      
    </div>
  );
};

export default ButtonGroup;
