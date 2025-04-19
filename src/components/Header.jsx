import React from 'react';
import logo from '../assets/LOGO2.png'; // Adjust the path if needed
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    try {
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleEdit = (e) => {
    navigate('/edit');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 text-white shadow-md px-4 py-3 flex justify-between items-center rounded-none">
      <img src={logo} alt="TrackMyGrowth Logo" className="h-10 w-auto" />
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold hidden sm:inline">Track<span className="text-red-500">My</span>Growth</span>
      </div>
      <div className="space-x-4">
        <button
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}