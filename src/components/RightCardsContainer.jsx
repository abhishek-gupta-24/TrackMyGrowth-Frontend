import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError, logout } from '../store/authSlice';
import Loader from './Load';
import BarChart from './BarChart';

export default function RightCardsContainer() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [dsaQuestions, setDsaQuestions] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      let newTotal = 0;
      let dsaQuestions = 0;
      try {
        const res = await axios.get(`/api/stats/leetcodeInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
        dsaQuestions += res.data.dsaQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch LeetCode data'));
      }
      try {
        const res = await axios.get(`/api/stats/codeforcesInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch CodeForces data'));
      }
      try {
        const res = await axios.get(`/api/stats/gfgInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
        dsaQuestions += res.data.totalQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch GFG data'));
      }
      try {
        const res = await axios.get(`/api/stats/atcoderInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch AtCoder data'));
      }
      setTotalQuestions(newTotal);
      setDsaQuestions(dsaQuestions);
      setLoader(false);
    };
    fetchUserData();
  }, []);

  return (
    <div className="w-full">
      {loader ? (
        <div className="bg-gray-900 h-64 p-6 flex justify-center items-center rounded-2xl">
          <Loader text="Problems Stats" />
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-2xl flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-indigo-300 text-center">Problems Solved</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Questions" content={totalQuestions} />
            <Card title="DSA Questions" content={dsaQuestions} />
            <Card title="Competitive Programming" content={totalQuestions - dsaQuestions} />
            <BarChart
              totalQuestions={totalQuestions}
              dsaQuestions={dsaQuestions}
              cpQuestions={totalQuestions - dsaQuestions}
            />
          </div>
        </div>
      )}
    </div>
  );
}