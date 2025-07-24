import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { EditHeader } from '../components';
import { setError, logout } from '../store/authSlice';

export default function EditPersonal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    bio: '',
    country: '',
    college: '',
    branch: '',
    graduationYear: ''
  });

  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions')
          .then((res) => res.json())
          .then((res) => res.data);
        setCountries(res);
      } catch (error) {
        console.log("API not working");
      }    
    }
    fetchData();
  }, []);

  useEffect(() => {
    const generatedYears = [];
    const currentYear = new Date().getFullYear() + 4;
    for (let year = 1975; year <= currentYear; year++) {
      generatedYears.push(year);
    }
    setYears(generatedYears);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch/getPersonalInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = response.data;
        setFormData({
          bio: userData.bio || '',
          country: userData.country || '',
          college: userData.college || '',
          branch: userData.branch || '',
          graduationYear: userData.graduationYear || ''
        });
        dispatch(setError(null)); // Clear any previous errors
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to fetch personal info';
        dispatch(setError(errorMessage));
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (email && token) fetchUserData();
  }, [email, token, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/update/editPersonalInfo/${email}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setError(null));
      navigate('/profile');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update personal info';
      dispatch(setError(errorMessage));
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EditHeader backBtn="true" />
      <div className="flex justify-center items-center px-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-xl mt-10">
          <h2 className="text-2xl font-bold mb-3 text-center">Update Personal Information</h2>
          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          {loading
            ? <div className="flex justify-center">
              <div className="w-8 h-8 mb-6 mr-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p>Loading your previous information</p>
              </div>: (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-semibold">Short Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us something about you"
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
                
              <div>
                <label className="block mb-1 text-sm font-semibold">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold">College</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college name"
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
                
              <div>
                <label className="block mb-1 text-sm font-semibold">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Your branch or field"
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold">Graduation Year</label>
                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select graduation year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-lg font-semibold transition"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}