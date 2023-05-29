import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="logo192.png" // Replace with the path to your logo image
        alt="Quiz Logo"
        className="h-32 w-32 mb-8" // Adjust the height and width of the logo
      />
      <button onClick={() => navigate('/quiz')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play
      </button>
    </div>
  );
};

export default Home;
