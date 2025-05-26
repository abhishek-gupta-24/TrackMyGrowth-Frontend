import React from 'react';
import logo from '../assets/LOGO2.png';
import { useNavigate } from 'react-router-dom';

export default function EditHeader(
  {
    backBtn = false
  }
) {
    const navigate=useNavigate()
    const handleBackBtn = (e) => {
      navigate('/edit')
    }
    const handleBtn = (e) => {
      navigate('/profile')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 text-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl">
      <img src={logo} alt="TrackMyGrowth Logo" className="h-10 w-auto rounded-2xl" />
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold hidden sm:inline">Track<span className="text-red-500">My</span>Growth</span>
      </div>
      <div className=" flex space-x-4">
      {
          backBtn ?
          <button
          onClick={handleBackBtn}
           class="flex items-center px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          : ""
        }
        <button
          className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition"
          onClick={handleBtn}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.5-2.1 4.5-4.5S14.7 3 12 3 7.5 5.1 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
