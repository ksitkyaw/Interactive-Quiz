import React from 'react';
import MOCK_DATA from "../data.json";
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
// import { setEndOfQuiz } from '../redux/features/quizSlice';
import { scoreIncrement, scoreReset } from '../redux/features/scoreSlice';
import { quizIDReset, setEndOfQuiz } from '../redux/features/quizSlice';
import { useNavigate } from 'react-router-dom';
import { addResult } from '../redux/features/resultSlice';
import { Howl } from "howler";

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
      dispatch(addResult({id: MOCK_DATA[currentQuizID]?.id, selectedChoice: selectedChoice}))
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
      <div className="border rounded px-4 py-2 text-slate-600">
        Score: <span className="font-bold text-slate-600">{score}</span>
      </div>
      {endOfQuiz ? 
      <>
        <button
          className={"bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
          onClick={handleRestart}
        >
          Restart Quiz
        </button>
        <button
          className={`bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}
          onClick={() => {
            navigate('/results')
            soundCue(resultSound)
          }}
        >
          See Results
        </button>
      </> : 
      <button
      disabled={endOfQuiz ? true : false}
      className={`bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${endOfQuiz ? "cursor-not-allowed opacity-50" : ''}`}
      onClick={handleCheck}
    >
      Check Answer
    </button>}
      
    </div>
  );
};

export default ButtonGroup;
