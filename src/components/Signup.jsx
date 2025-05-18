import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../store/authSlice';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const handleLogin=()=>{
    e.preventDefault();
    dispatch(setError(''))
    navigate('/login')
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
        username,
        email,
        password
      });
      
      dispatch(login({ email, token: res.data.token }));
      navigate('/personalInfo');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Signup failed';
      dispatch(setError(errorMessage));
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="max-w-md p-6 border border-gray-700 rounded-lg shadow-xl bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        
        <input
          className="w-full mb-4 px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          required
        />
        
        <input
          className="w-full mb-4 px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        
        <input
          className="w-full mb-4 px-4 py-2 border border-gray-600 bg-gray-900 text-white rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        
        <button className="w-full bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700">
          Register
        </button>

        <div className="mt-4 text-sm text-center">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={handleLogin}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}