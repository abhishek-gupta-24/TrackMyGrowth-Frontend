import React, { useState } from 'react';
import logo from '../assets/LOGO2.png'; 
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // New state to control the modal visibility
  const [showModal, setShowModal] = useState(false);
  // New state to control the loader during the logout process
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Helper function for the 2-second delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Function to open the confirmation modal
  const handleShowConfirm = () => {
    setShowModal(true);
  };

  // 2. Function to execute logout with delay
  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Pause for 2 seconds to show the circular loader
      await delay(2000); 

      // 3. Perform logout after the delay
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      // Clean up state whether success or failure
      setIsLoggingOut(false);
      setShowModal(false);
    }
  };

  // 3. Function to cancel and close the modal (moves back to current route)
  const handleCancel = () => {
    // Simply close the modal, keeping the user on the current route
    setShowModal(false);
  };

  const handleEdit = () => {
    navigate('/edit');
  };

  return (
    <>
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
          {/* CRITICAL CHANGE: The button is untouched, calls handleShowConfirm */}
          <button
            onClick={handleShowConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* NEW: Custom Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 max-w-sm w-full text-white">
            
            {/* Modal Content / Loader */}
            {isLoggingOut ? (
              <div className="flex flex-col items-center p-4">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-lg font-semibold text-red-400">Logging out...</p>
              </div>
            ) : (
              // Confirmation Message
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-red-400">Confirm Logout</h3>
                <p className="mb-6">Are you sure you want to log out of your account?</p>
                
                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded font-medium transition duration-200"
                  >
                    No
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition duration-200"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}