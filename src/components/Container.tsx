import React, {useState, useEffect} from 'react';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import MOCK_DATA from "../data.json";
import Answer from './Answer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setSelectedChoice } from '../redux/features/quizSlice';
import { addData } from '../redux/features/resultSlice';

const Container = () => {
  const dispatch = useAppDispatch()
  const {endOfQuiz} = useAppSelector(state => state.quiz.value)
  const [showAnswer, setShowAnswer] = useState(false)
  const [playCountdown, setPlayCountdown] = useState("")
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    MOCK_DATA.map(data => {
      dispatch(addData(data))
    })
  }, [])


  const renderTime = (remainingTime : number) => {
    if (remainingTime === 0) {
      return <div className="timer">Time's up!</div>;
    }

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-5xl mb-3">The Interactive Quiz</h1>
      <h2 className="text-center text-lg text-slate-500 mb-3">Guess the correct answer for each quiz, get a perfect score to receive a present</h2>
      <div className="w-3/5 min-w-1/3 max-w-4/5 bg-gray-200 p-4 my-4">
        {showAnswer ? 
          <Answer 
          setShowAnswer={setShowAnswer}
          playCountdown={playCountdown}
          setPlayCountdown={setPlayCountdown}
          setIsPaused={setIsPaused}
          /> : (
          <>
          {endOfQuiz ? <></> : 
          <>
            <CountdownCircleTimer
              key={playCountdown}
              isPlaying={!isPaused}
              duration={7}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={handleTimeUp}
            >
              {({ remainingTime }) => renderTime(remainingTime)}
            </CountdownCircleTimer>
          </>}
            <Quiz />
            <ButtonGroup
            setShowAnswer={setShowAnswer}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Container;
