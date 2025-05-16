import React, { useState, useEffect } from 'react';
import InputBtn from '../components/InputBtn';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { EditHeader } from '../components';
import { setError, logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const socials = ['Linkedin', 'Instagram', 'Twitter', 'Portfolio'];

export default function EditSocial() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [usernames, setUsernames] = useState(
    socials.reduce((acc, social) => {
      acc[social.toLowerCase()] = '';
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
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch/getSocialInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        setUsernames({
          linkedin: data.linkedin || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          portfolio: data.portfolio || ''
        });
        dispatch(setError(null)); // Clear any previous errors
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed to fetch social info';
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
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/update/editSocialInfo/${email}`, {
        linkedin: usernames.linkedin,
        instagram: usernames.instagram,
        twitter: usernames.twitter,
        portfolio: usernames.portfolio
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setError(null)); // Clear any previous errors
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to submit social info';
      dispatch(setError(errorMessage));
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EditHeader />
      <div className="flex justify-center items-start px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 mt-10"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Update Social Platforms
          </h2>
          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            socials.map((social) => (
              <div key={social} className="mb-4">
                <label
                  htmlFor={social.toLowerCase()}
                  className="block text-sm font-semibold text-white mb-1"
                >
                  {social}
                </label>
                <InputBtn
                  id={social.toLowerCase()}
                  name={social.toLowerCase()}
                  type="text"
                  placeholder={`${social} Link`}
                  value={usernames[social.toLowerCase()]}
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