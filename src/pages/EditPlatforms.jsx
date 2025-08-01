import React, { useState, useEffect } from 'react';
import InputBtn from '../components/InputBtn';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setError, logout } from '../store/authSlice';
import { EditHeader } from '../components';

const platforms = ['LeetCode', 'Codeforces', 'GeeksforGeeks', 'CodeStudio', 'CodeChef', 'HackerRank', 'AtCoder'];

export default function EditPlatforms() {
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

  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsernames({ ...usernames, [name]: value });
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch/getPlatformInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;

        setUsernames({
          leetcode: data.leetcode || '',
          codeforces: data.codeforces || '',
          geeksforgeeks: data.geeksforgeeks || '',
          codestudio: data.codestudio || '',
          codechef: data.codechef || '',
          hackerrank: data.hackerrank || '',
          atcoder: data.atcoder || '',
        });
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed to fetch platform info';
        dispatch(setError(errorMessage));
        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (email && token) fetchUsernames();
  }, [email, token, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/update/platforms/userinfo/${email}`, {
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
      const errorMessage = err.response?.data?.error || 'Failed to submit platform info';
      dispatch(setError(errorMessage));
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EditHeader backBtn="true"/>
      <div className="flex justify-center items-start px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 mt-10"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Update Platform Usernames
          </h2>
          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          {loading
            ? <div className="flex justify-center">
              <div className="w-8 h-8 mb-6 mr-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p>Loading your previous information</p>
              </div>: (
            platforms.map((platform) => (
              <div key={platform} className="mb-4">
                <label
                  htmlFor={platform.toLowerCase()}
                  className="block text-sm font-semibold text-white mb-1"
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
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={false}
                />
              </div>
            ))
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}