import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Howl} from 'howler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import MOCK_DATA from '../data.json'
import { addData } from '../redux/features/resultSlice';

const Home = () => {
  const result = useAppSelector(state => state.result)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (result.length === 0) {
      MOCK_DATA.map(data => {
        dispatch(addData(data))
      })
    }
  }, [])

    const navigate = useNavigate();
    const sound = new Howl({
      src: ["play.wav"]
    })

  return (
    <div className="flex flex-col items-center sm:justify-center justify-start h-screen">
      <img
        src="logo192.png" // Replace with the path to your logo image
        alt="Quiz Logo"
        className="h-32 w-32 mb-8"
      />
      <h1 className="sm:text-6xl text-5xl text-slate-600 text-center my-5">The Interactive Quiz</h1>
      <h3 className="sm:text-lg text-md text-slate-400 text-center mb-1">Test your knowledge with our simple quiz</h3>
      <h3 className="sm:text-lg text-md text-slate-400 text-center mb-2">FYI, getting a perfect score here is not as easy as you think!!!</h3>
      <motion.button onClick={() => {
        navigate('/quiz')
        sound.play()
        }} 
        whileHover={{scale:1.05, boxShadow: '2px 4px 10px 0px rgba(0,0,0,0.61)'}}
        whileTap={{scale: 0.9}}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl w-20 h-12 shadow-lg mt-5"
      >
        <FontAwesomeIcon size='xl' icon={faPlay}/>
      </motion.button>
    </div>
  );
};

export default Home;
