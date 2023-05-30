import React, {useState, useEffect} from 'react';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import MOCK_DATA from "../data.json";
import Answer from './Answer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ProgressBar from '@ramonak/react-progress-bar';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setSelectedChoice } from '../redux/features/quizSlice';
import { addData, resetData } from '../redux/features/resultSlice';
import { motion } from 'framer-motion';

const Container = () => {
  const dispatch = useAppDispatch()
  const {currentQuizID, endOfQuiz} = useAppSelector(state => state.quiz.value)
  const result = useAppSelector(state => state.result)
  const [showAnswer, setShowAnswer] = useState(false)
  const [playCountdown, setPlayCountdown] = useState("")
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (result.length === 0) {
      MOCK_DATA.map(data => {
        dispatch(addData(data))
      })
    }
  }, [])


  const renderTime = (remainingTime : number) => {
    if (remainingTime === 0) {
      return <div className="timer">Time's up!</div>;
    }

    //todo - styling
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const handleTimeUp = () =>  {
    dispatch(setSelectedChoice(''))
    setTimeout(() => setShowAnswer(true), 1000)
  }

  return (
    
    <div className="flex flex-col items-center justify-center  min-h-screen"> 
      <motion.h1 
      initial={{x : "-100vw"}}
      animate={{ x : 0}} 
      className="text-center text-5xl mb-3 text-slate-700">
        The Interactive Quiz
      </motion.h1>
      {/* <h2 className="text-center text-lg text-slate-500 mb-3">Guess the correct answer for each quiz, get a perfect score to receive a present</h2> */}
      <motion.div 
      id="quiz"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
      className="w-3/5 min p-4 my-4 rounded-3xl bg-[#C4DFDF] shadow-[-4px -5px 12px 0px rgba(0,0,0,0.46) inset]">
        <ProgressBar bgColor='#9BA4B5' completed={(currentQuizID + 1) * 10}/>
        {showAnswer ? 
          <Answer 
          setShowAnswer={setShowAnswer}
          playCountdown={playCountdown}
          setPlayCountdown={setPlayCountdown}
          setIsPaused={setIsPaused}
          /> : (
          <>
          {endOfQuiz ? <></> : 
          <div className="flex justify-center items-center my-3">
            <CountdownCircleTimer
              key={playCountdown}
              isPlaying={!isPaused}
              duration={700}
              colors={['#009EFF', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={handleTimeUp}
            >
              {({ remainingTime }) => renderTime(remainingTime)}
            </CountdownCircleTimer>
          </div>}
            <Quiz />
            <ButtonGroup
            setShowAnswer={setShowAnswer}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Container;
