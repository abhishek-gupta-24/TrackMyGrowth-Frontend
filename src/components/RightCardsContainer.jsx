import React, { useState, useEffect } from 'react';
import Card from './Card'; // Assuming Card is the component you updated
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

  // Define the source information text
  const sourceInfoTextfortotalQuestions ='this includes data only from LeetCode, CodeForces, GeeksforGeeks (GFG), and AtCoder.';
  const sourceInfoTextfordsaQuestions = 'this includes data only from LeetCode and GeeksforGeeks (GFG)';
  const sourceInfoTextforcompetitiveProgramming = 'this includes data only from codeforces and atcoder';

  useEffect(() => {
    const fetchUserData = async () => {
      let newTotal = 0;
      let dsaQuestionsSolved = 0; // Renamed to avoid confusion with state variable
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/leetcodeInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
        dsaQuestionsSolved += res.data.dsaQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch LeetCode data'));
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/codeforcesInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch CodeForces data'));
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/gfgInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
        dsaQuestionsSolved += res.data.totalQuestions || 0; 
      } catch (err) {
        dispatch(setError('Failed to fetch GFG data'));
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/atcoderInfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        newTotal += res.data.totalQuestions || 0;
      } catch (err) {
        dispatch(setError('Failed to fetch AtCoder data'));
      }
      setTotalQuestions(newTotal);
      setDsaQuestions(dsaQuestionsSolved); // Use the collected DSA total
      setLoader(false);
    };
    
    // Only fetch data if email and token are available
    if (email && token) {
        fetchUserData();
    } else {
        // Handle case where user data is not yet in Redux state if necessary
        setLoader(false); 
    }
  }, [email, token, dispatch]);

  return (
    <div className="w-full">
      {loader ? (
        <div className="bg-gray-900 h-64 p-6 flex justify-center items-center rounded-2xl">
          <Loader text="Problems Stats" />
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold text-indigo-300 text-center">Problems Solved</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {/* Card 1: Total Questions */}
            <Card 
              title="Total Questions" 
              content={totalQuestions} 
              sourceInfo={sourceInfoTextfortotalQuestions} // Added sourceInfo prop
            />

            {/* Card 2: DSA Questions */}
            <Card 
              title="DSA Questions" 
              content={dsaQuestions} 
              sourceInfo={sourceInfoTextfordsaQuestions} // Added sourceInfo prop
            />

            {/* Card 3: Competitive Programming (CP) Questions */}
            <Card 
              title="Competitive Programming" 
              content={totalQuestions - dsaQuestions} 
              sourceInfo={sourceInfoTextforcompetitiveProgramming} // Added sourceInfo prop
            />

            {/* Bar Chart Component */}
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