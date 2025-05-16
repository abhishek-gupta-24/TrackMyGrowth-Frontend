import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setError } from '../store/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password }
      );
      navigate('/profile');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      dispatch(setError(errorMessage));
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="max-w-md p-6 border border-gray-700 rounded-lg shadow-xl bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <button className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700">Login</button>
        
        <div className="mt-4 text-sm text-center">
            <span>Don't have an account? </span>
              <button
              type="button"
              onClick={goToSignup}
              className="text-blue-500 hover:underline"
        >
    Sign up
  </button>
</div>
      </form>
    </div>
  );
}