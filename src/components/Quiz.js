import React, { useState } from 'react';
import {useAppDispatch, useAppSelector} from "../redux/app/hooks.ts"
import MOCK_DATA from "../data.json"
import { setSelectedChoice } from '../redux/features/quizSlice';

const Quiz = () => {
  const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
  const dispatch = useAppDispatch()
  const quizData = MOCK_DATA[currentQuizID]

  const handleChoiceSelection = (choiceID) => {
    dispatch(setSelectedChoice(choiceID));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {endOfQuiz ? <h1>Congratulations, you have completed all the quizzes.</h1> : (
        <>
        <h2 className="text-xl font-bold mb-4">{quizData.question}</h2>
        <ul className="space-y-2">
          {quizData.choices.map((choice) => (
            <li
              key={choice.id}
              className={`flex items-center p-2 rounded-md ${
                selectedChoice === choice.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleChoiceSelection(choice.id)}
            >
              <input
                type="radio"
                className="mr-2"
                checked={selectedChoice === choice.id}
                onChange={() => {}}
              />
              {choice.value}
            </li>
          ))}
        </ul>
        </>
      )}
      
    </div>
  );
};

export default Quiz;
