import React, { useState, useEffect } from 'react';
import InputBtn from '../components/InputBtn';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setError, logout } from '../store/authSlice';

export default function PersonalInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    bio: '',
    country: '',
    college: '',
    branch: '',
    graduationYear: ''
  });

  const [years, setYears] = useState([]);
  const [countries, setCountries] = useState([]);

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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/update/personalInfo/${email}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setError(null)); // Clear any previous errors
      navigate('/info');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to submit personal info';
      dispatch(setError(errorMessage));
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(logout());
        navigate('/login');
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-2xl text-gray-200 font-bold mb-4 text-center">User Information</h2>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300 font-medium">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300 font-medium">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your country</option>
              {countries.map((country) => 
                <option key={country.name} value={country.name}>{country.name}</option>
              )}
            </select>
          </div>
          <InputBtn
            label="College"
            name="college"
            value={formData.college}
            placeholder="Enter college name"
            onChange={handleChange}
          />

          <InputBtn
            label="Branch"
            name="branch"
            value={formData.branch}
            placeholder="Enter your branch"
            onChange={handleChange}
          />
          <div>
            <label className="block mb-1 text-sm text-gray-300 font-medium">Year of Graduation</label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select graduation year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => navigate('/info')}
            className="w-full mt-0.5 text-sm text-gray-400 hover:text-white transition"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
}