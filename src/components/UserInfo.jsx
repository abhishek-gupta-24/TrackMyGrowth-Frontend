import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setError, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";


export default function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, token } = useSelector((state) => state.auth.userData) || {};
  const error = useSelector((state) => state.auth.error);

  const [userInfo, setUserInfo] = useState({
    username: '',
    bio: '',
    college: '',
    country: '',
    platforms: {
      leetcode: '',
      codeforces: '',
      geeksforgeeks: '',
      codestudio: '',
      codechef: '',
      hackerrank: '',
      atcoder: ''
    },
    socials: {
      linkedin: '',
      instagram: '',
      twitter: '',
      portfolio: ''
    }
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/fetch/userinfo/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo(res.data);
      } catch (err) {
        const errorMessage = err.response?.data?.error || "Failed to fetch user info";
        dispatch(setError(errorMessage));
        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
      }
    };

    if (email && token) fetchUserInfo();
  }, [email, token, dispatch, navigate]);

  const { username, bio, college, country, platforms, socials } = userInfo;

  return (
    <div className="w-full max-w-xs bg-gray-900 text-white p-4 sm:p-6 shadow-xl rounded-2xl min-h-full">
      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl font-extrabold shadow-md">
          {username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <h2 className="text-2xl font-semibold mt-3 tracking-wide">
          {username?.toUpperCase() || 'Username'}
        </h2>
        <p className="text-blue-400 text-sm font-medium mt-1 opacity-80">
          @{username?.toLowerCase() || 'user'}
        </p>
      </div>
      <p className="text-center text-sm text-gray-300 mb-6 italic px-1 leading-relaxed">
        {bio || "No bio available."}
      </p>
      <div className="space-y-2 text-sm text-gray-300 mb-6">
        <p><span className="text-gray-400 font-medium">Email:</span> <span className="text-white">{email}</span></p>
        <p><span className="text-gray-400 font-medium">Location:</span> <span className="text-white">{country || "N/A"}</span></p>
        <p><span className="text-gray-400 font-medium">College:</span> <span className="text-white">{college || "N/A"}</span></p>
      </div>
      <div className="my-8">
        <h3 className="font-semibold text-lg mb-6 text-white">Social Media</h3>
        <div className="flex justify-between text-2xl text-gray-400">
          <button
            onClick={() => window.open(`${socials.linkedin}`, "_blank")}
            disabled={!socials.linkedin}
            className={socials.linkedin ? "hover:text-white" : "opacity-30 cursor-not-allowed"}
          >
            <i className="fab fa-linkedin"></i>
          </button>
          <button
            onClick={() => window.open(`${socials.instagram}`, "_blank")}
            disabled={!socials.instagram}
            className={socials.instagram ? "hover:text-white" : "opacity-30 cursor-not-allowed"}
          >
            <i className="fab fa-instagram"></i>
          </button>
          <button
            onClick={() => window.open(`${socials.twitter}`, "_blank")}
            disabled={!socials.twitter}
            className={socials.twitter ? "hover:text-white" : "opacity-30 cursor-not-allowed"}
          >
            <i className="fab fa-x-twitter"></i>
          </button>
          <button
            onClick={() => window.open(`${socials.portfolio}`, "_blank")}
            disabled={!socials.portfolio}
            className={socials.portfolio ? "hover:text-white" : "opacity-30 cursor-not-allowed"}
          >
            <i className="fas fa-globe"></i>
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-5 text-white">Problem Solving Statistics</h3>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.leetcode}
              className={`w-40 flex justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.leetcode
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              LeetCode
            </button>
            <button
              disabled={!platforms.leetcode}
              onClick={() => window.open(`https://leetcode.com/${platforms.leetcode}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.leetcode
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.codeforces}
              className={`w-40 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.codeforces
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              CodeForces
            </button>
            <button
              disabled={!platforms.codeforces}
              onClick={() => window.open(`https://codeforces.com/profile/${platforms.codeforces}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.codeforces
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.geeksforgeeks}
              className={`w-40 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.geeksforgeeks
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              GeeksForGeeks
            </button>
            <button
              disabled={!platforms.geeksforgeeks}
              onClick={() => window.open(`https://auth.geeksforgeeks.org/user/${platforms.geeksforgeeks}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.geeksforgeeks
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.codestudio}
              className={`w-40 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.codestudio
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              CodeStudio
            </button>
            <button
              disabled={!platforms.codestudio}
              onClick={() => window.open(`https://www.naukri.com/code360/profile/${platforms.codestudio}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.codestudio
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.codechef}
              className={`w-40 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.codechef
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              CodeChef
            </button>
            <button
              disabled={!platforms.codechef}
              onClick={() => window.open(`https://www.codechef.com/users/${platforms.codechef}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.codechef
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.hackerrank}
              className={`w-40 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.hackerrank
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              HackerRank
            </button>
            <button
              disabled={!platforms.hackerrank}
              onClick={() => window.open(`https://www.hackerrank.com/profile/${platforms.hackerrank}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.hackerrank
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>         
          <div className="flex items-center gap-3">
            <button
              disabled={!platforms.atcoder}
              className={`w-40 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.atcoder
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              AtCoder
            </button>
            <button
              disabled={!platforms.atcoder}
              onClick={() => window.open(`https://atcoder.jp/users/${platforms.atcoder}`, "_blank")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                platforms.atcoder
                  ? "bg-gray-800 hover:bg-gray-700 text-white shadow"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="fas fa-chart-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}