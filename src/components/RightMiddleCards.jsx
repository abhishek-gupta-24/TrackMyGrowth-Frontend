import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError, logout } from '../store/authSlice';
import Loader from './Load';
import BarChart from './BarChart';

export default function RightMiddleCards() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [userRatings, setUserRatings] = useState({
    leetcodeCurrRating: 0,
    leetcodeMaxRating: 0,
    codeforcesCurrRating: 0,
    codeforcesMaxRating: 0,
    codechefCurrRating: 0,
    codechefMaxRating: 0,
    atcoderCurrRating: 0,
    atcoderMaxRating: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/codeforcesRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRatings(prev => ({
          ...prev,
          codeforcesCurrRating: res.data.rating,
          codeforcesMaxRating: res.data.maxRating,
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch CodeForces data'));
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/codechefRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRatings(prev => ({
          ...prev,
          codechefCurrRating: res.data.rating,
          codechefMaxRating: res.data.maxRating,
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch CodeChef data'));
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/atcoderRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRatings(prev => ({
          ...prev,
          atcoderCurrRating: res.data.rating,
          atcoderMaxRating: res.data.maxRating,
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch AtCoder data'));
      }
      setLoader(false);
    };
    fetchUserData();
  }, [dispatch]);

  return (
    <div className="w-full">
      {loader ? (
        <div className="bg-gray-900 h-64 p-6 flex justify-center items-center rounded-2xl">
          <Loader text="Ratings" />
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-2xl flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-indigo-300 text-center">Ratings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card title="LeetCode Rating" content={Math.floor(userRatings.leetcodeCurrRating)}
              detail={Math.floor(userRatings.leetcodeMaxRating)} />
            <Card title="CodeForces Rating" content={Math.floor(userRatings.codeforcesCurrRating)}
              detail={Math.floor(userRatings.codeforcesMaxRating)} />
            <Card title="CodeChef Rating" content={Math.floor(userRatings.codechefCurrRating)}
              detail={Math.floor(userRatings.codechefMaxRating)} />
            <Card title="AtCoder Rating" content={Math.floor(userRatings.atcoderCurrRating)}
              detail={Math.floor(userRatings.atcoderMaxRating)} />
          </div>
        </div>
      )}
    </div>
  );
}