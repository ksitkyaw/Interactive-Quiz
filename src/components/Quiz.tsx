import React from 'react';
import {useAppDispatch, useAppSelector} from "../redux/app/hooks"
import MOCK_DATA from "../data.json"
import { setSelectedChoice } from '../redux/features/quizSlice';
import { motion } from 'framer-motion';

const Quiz = () => {
  const {currentQuizID, selectedChoice, endOfQuiz} = useAppSelector(state => state.quiz.value)
  const dispatch = useAppDispatch()
  const quizData = MOCK_DATA[currentQuizID]

  const handleChoiceSelection = (choiceID: string) => {
    dispatch(setSelectedChoice(choiceID));
  };

  return (
    <div className="max-w-md mx-auto p-4 text-slate-600">
      {endOfQuiz ? <h1 className='text-3xl'>Well done, this is the end of the quiz. Now let's take some time to check your scores and share it with others</h1> : (
        <>
        <h2 className="text-xl font-bold mb-4">{quizData.question}</h2>
        <ul className="space-y-2">
          {quizData.choices.map((choice, index) => (
            <motion.li
              initial={{y: "100vh", opacity: 0}}
              animate={{ y: 0, opacity: 1}}
              transition={{duration: 2+index*0.5}}
              key={choice.id}
              className={`flex items-center p-2 rounded-md ${
                selectedChoice === choice.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-700'
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
            </motion.li>
          ))}
        </ul>
        </>
      )}
      
    </div>
  );
};

export default Quiz;
