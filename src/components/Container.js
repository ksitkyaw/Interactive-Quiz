import React, {useState} from 'react';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import MOCK_DATA from "../data.json";
import Answer from './Answer';

const Container = () => {
  const [showAnswer, setShowAnswer] = useState(null)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-5xl mb-3">The Interactive Quiz</h1>
      <h2 className="text-center text-lg text-slate-500 mb-3">Guess the correct answer for each quiz, get a perfect score to receive a present</h2>
      <div className="w-3/5 min-w-1/3 max-w-4/5 bg-gray-200 p-4 my-4">
        {showAnswer ? <Answer setShowAnswer={setShowAnswer}/> : (
          <>
            <Quiz />
            <ButtonGroup
            setShowAnswer={setShowAnswer}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Container;
