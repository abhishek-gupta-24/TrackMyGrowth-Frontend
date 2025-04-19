import React from 'react';
import problems from '../assets/problems.png'
import profile from '../assets/profile.png'
import graph from '../assets/graph.png'
import ratings from '../assets/ratings.png'
import { useNavigate } from 'react-router-dom';
function Features() {
  const navigate=useNavigate()
    const features = [
    {
      title: 'Track Problems Solved',
      description: 'Check your total problems solved on platforms like LeetCode, CodeForces, and GeeksforGeeks (GFG). Easily track your progress, see your strengths, and get motivated to solve more coding challenges.',
      image:problems,
    },
    {
      title: 'Contest Rating',
      description: 'Track your contest ratings from platforms like LeetCode, CodeForces, and more all in one convenient place. See how your skills grow over time with a clear, unified view of your performance across different sites',
      image: ratings,
    },
    {
      title: 'Ratings Graph',
      description: 'View a sample rating graph to see how you can track your contest ratings from platforms like LeetCode, CodeForces, and more in one place, giving you a clear picture of your progress over time',
      image: graph,
      },
      {
        title: 'User Profile',
        description: 'User can create its own user profile to display his/her social info, college info, bio, and coding platform details, giving them a personalized space to showcase your skills and connect with others—all',
        image:profile,
      },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-6 sm:py-8">
      <div className="max-w-5xl  mx-auto px-2 sm:px-4">
      <button
          onClick={() => navigate('/')}
          className="w-25 mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
        >
          Back
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Features</h2>
        <div className="flex flex-row flex-wrap gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 flex justify-center p-2 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src={feature.image} alt={feature.title} className="w-200 h-100 sm:h-48 object-cover rounded-t-lg" />
              <div className="p-2 sm:p-4 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-400 mb-2">{feature.title}</h3>
                <p className="text-blue-300 text-xs sm:text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;