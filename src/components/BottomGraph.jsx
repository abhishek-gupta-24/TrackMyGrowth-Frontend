import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError, logout } from '../store/authSlice';
import Loader from './Load';
import ContestGraph from './ContestGraph';
import ContestSummaryCard from './ContestSummaryCard'; // Import the new component

export default function BottomGraph() {
  const [loader, setLoader] = useState(true); // Set to true initially
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [contestData, setContestData] = useState({
    contests: [],
    leetcodeRatings: [],
    codeforcesRatings: [],
    codechefRatings: [],
    atcoderRatings: [],
  });

  useEffect(() => {
    // This function now uses your original sequential try...catch logic
    const fetchContestData = async () => {
      if (!email || !token) {
        dispatch(setError('Please log in to view ratings'));
        navigate('/login');
        return;
      }

      let maxContests = 0;

      try {
        const leetcodeRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/leetcodeRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lcContests = leetcodeRes.data.contestRating ? leetcodeRes.data.contestRating.length : 0;
        maxContests = Math.max(maxContests, lcContests);
        setContestData((prev) => ({
          ...prev,
          leetcodeRatings: leetcodeRes.data.contestRating ?
            leetcodeRes.data.contestRating.map(c => Math.floor(c) || 0)
            : [],
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch leetcode rating graph'));
        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      }

      try {
        const codeforcesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/codeforcesRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cfContests = codeforcesRes.data.contestRating ? codeforcesRes.data.contestRating.length : 0;
        maxContests = Math.max(maxContests, cfContests);
        setContestData((prev) => ({
          ...prev,
          codeforcesRatings: codeforcesRes.data.contestRating
            ? codeforcesRes.data.contestRating.map(c => c.newRating || 0)
            : [],
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch Codeforces rating graph'));
        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      }

      try {
        const codechefRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/codechefRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ccContests = codechefRes.data.contestRating ? codechefRes.data.contestRating.length : 0;
        maxContests = Math.max(maxContests, ccContests);
        setContestData((prev) => ({
          ...prev,
          codechefRatings: codechefRes.data.contestRating
            ? codechefRes.data.contestRating.map(c => c.rating || 0)
            : [],
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch Codechef rating graph'));
        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      }

      try {
        const atcoderRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/atcoderRating/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const atContests = atcoderRes.data.contestRating ? atcoderRes.data.contestRating.length : 0;
        maxContests = Math.max(maxContests, atContests);
        setContestData((prev) => ({
          ...prev,
          atcoderRatings: atcoderRes.data.contestRating
            ? atcoderRes.data.contestRating.map(c => c.NewRating)
            : [],
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch atCoder rating graph'));
        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      }

      const contests = Array.from({ length: maxContests }, (_, i) => `${i + 1}`);
      setContestData((prev) => ({
        ...prev,
        contests,
      }));

      setLoader(false);
    };
    fetchContestData();
  }, [email, token, dispatch, navigate]); // Dependencies for re-fetching data

  return (
    <div className="w-full">
      {loader ? (
        <div className="bg-gray-900 h-80 p-6 flex justify-center items-center rounded-2xl">
          <Loader text='ratings' />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* LEFT CARD: New Contest Summary Card */}
          <ContestSummaryCard data={contestData} />

          {/* RIGHT CARD: Existing Ratings Graph */}
          <div className="bg-gray-900 p-6 rounded-2xl flex-1 w-full">
            <div className='flex justify-center'>
              <ContestGraph data={contestData} title="Ratings Graph" />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}