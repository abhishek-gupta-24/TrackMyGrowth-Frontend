import React, { useState } from 'react';
import InputBtn from '../components/InputBtn';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setError, logout } from '../store/authSlice';

const platforms = ['LeetCode', 'Codeforces', 'GeeksforGeeks', 'CodeStudio', 'CodeChef', 'HackerRank', 'AtCoder'];

export default function Info() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [usernames, setUsernames] = useState(
    platforms.reduce((acc, platform) => {
      acc[platform.toLowerCase()] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsernames({ ...usernames, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/update/platforms/userinfo/${email}`, {
        leetcode: usernames.leetcode,
        codeforces: usernames.codeforces,
        geeksforgeeks: usernames.geeksforgeeks,
        codestudio: usernames.codestudio,
        codechef: usernames.codechef,
        hackerrank: usernames.hackerrank,
        atcoder: usernames.atcoder,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setError(null)); // Clear any previous errors
      navigate('/profile');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to submit platform usernames';
      dispatch(setError(errorMessage));
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Enter your platform usernames
        </h2>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        {platforms.map((platform) => (
          <div key={platform} className="mb-4">
            <label
              htmlFor={platform.toLowerCase()}
              className="block text-sm font-medium text-gray-100 mb-1"
            >
              {platform}
            </label>
            <InputBtn
              id={platform.toLowerCase()}
              name={platform.toLowerCase()}
              type="text"
              placeholder={`${platform} username`}
              value={usernames[platform.toLowerCase()]}
              onChange={handleChange}
              className="w-full px-4 py-1 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >    
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="w-full mt-2 text-sm text-gray-400 hover:text-white transition"
        >
          Skip for now
        </button>             
      </form>
    </div>
  );
}