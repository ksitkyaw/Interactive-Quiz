import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Howl} from 'howler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Home = () => {

    const navigate = useNavigate();
    const sound = new Howl({
      src: ["play.wav"]
    })

  return (
    <div className="flex flex-col items-center sm:justify-center justify-start h-screen">
      <img
        src="logo192.png" // Replace with the path to your logo image
        alt="Quiz Logo"
        className="h-32 w-32 mb-8" // Adjust the height and width of the logo
      />
      <h1 className="sm:text-6xl text-5xl text-slate-600 text-center my-5">The Interactive Quiz</h1>
      <h3 className="sm:text-lg text-md text-slate-400 text-center mb-1">Test your knowledge with our simple quiz</h3>
      <h3 className="sm:text-lg text-md text-slate-400 text-center mb-2">FYI, getting a perfect score here is not as easy as you think!!!</h3>
      <motion.button onClick={() => {
        navigate('/quiz')
        sound.play()
        }} 
        whileHover={{scale:1.05}}
        whileTap={{scale: 0.9}}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-24 h-24"
      >
        <FontAwesomeIcon size='xl' icon={faPlay}/>
      </motion.button>
    </div>
  );
};

export default Home;
