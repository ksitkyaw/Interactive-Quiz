import React, {useState} from 'react';
import Quiz from './Quiz';
import ButtonGroup from './ButtonGroup';
import MOCK_DATA from "../data.json";

const Container = () => {
  const [endOfQuiz, setEndOfQuiz] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [currentQuizID, setCurrentQuizID] = useState(0);
    const currentQuiz = MOCK_DATA[currentQuizID]
    console.log(currentQuiz)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-5xl mb-3">The Interactive Quiz</h1>
      <h2 className="text-center text-lg text-slate-500 mb-3">Guess the correct answer for each quiz, get a perfect score to receive a present</h2>
      <div className="w-3/5 min-w-1/3 max-w-4/5 bg-gray-200 p-4 my-4">
        <Quiz 
        data={currentQuiz} 
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
        endOfQuiz={endOfQuiz}
        />
        <ButtonGroup
        data={currentQuiz} 
        selectedChoice={selectedChoice}
        currentQuizID={currentQuizID}
        setCurrentQuizID={setCurrentQuizID}
        endOfQuiz={endOfQuiz}
        setEndOfQuiz={setEndOfQuiz}
        />
      </div>
    </div>
  );
};

export default Container;
