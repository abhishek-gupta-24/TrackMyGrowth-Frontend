import React from 'react';
import logo from '../assets/LOGO2.png';
import { useNavigate } from 'react-router-dom';

export default function EditHeader() {
    const navigate=useNavigate()
    const handleBtn = (e) => {
      navigate('/profile')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl">
      <img src={logo} alt="TrackMyGrowth Logo" className="h-10 w-auto rounded-2xl" />
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold hidden sm:inline">Track<span className="text-red-500">My</span>Growth</span>
      </div>

      <div className="space-x-4">
        <button
          onClick={handleBtn}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded">
          Back to Profile
        </button>
      </div>
    </header>
  );
}
