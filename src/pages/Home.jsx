import React from 'react';
import logo from '../assets/LOGO2.png'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate=useNavigate()
    const GettingStarted = (e) => {
        e.preventDefault();
        navigate('/login')
  }
  const Features= (e) => {
    e.preventDefault();
    navigate('/features')
}
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="max-w-2xl flex flex-col justify-center items-center text-center">
        <img
          src={logo}
          alt="TrackMyGrowth Logo"
          className="mx-auto mb-6 w-40 h-40 object-contain rounded-2xl"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-500">Track<span className="text-red-500">My</span>Growth</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          This is a platform designed to track your progress across coding platforms and help you stay consistent.
        </p>
        <div className='flex gap-2'>
             <button
                  onClick={GettingStarted}
                  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold">
                   Get Started
             </button>
        
              <button
                  onClick={Features}
                  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold">
               Features
             </button>
        </div>
      </div>
    </div>
  );
}