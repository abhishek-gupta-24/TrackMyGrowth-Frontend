import React from 'react';
import problems from '../assets/problems.png';
import profile from '../assets/profile.png';
import graph from '../assets/graph.png';
import ratings from '../assets/ratings.png';
import { useNavigate } from 'react-router-dom';

function Features() {
  const navigate = useNavigate();
  const features = [
    {
      title: 'Track Problems Solved',
      description:
        'Check your total problems solved on platforms like LeetCode, CodeForces, and GeeksforGeeks (GFG). Easily track your progress, see your strengths, and get motivated to solve more coding challenges.',
      image: problems,
    },
    {
      title: 'Contest Rating',
      description:
        'Track your contest ratings from platforms like LeetCode, CodeForces, and more all in one convenient place. See how your skills grow over time with a clear, unified view of your performance across different sites',
      image: ratings,
    },
    {
      title: 'Ratings Graph',
      description:
        'View a sample rating graph to see how you can track your contest ratings from platforms like LeetCode, CodeForces, and more in one place, giving you a clear picture of your progress over time',
      image: graph,
    },
    {
      title: 'User Profile',
      description:
        'User can create its own user profile to display his/her social info, college info, bio, and coding platform details, giving them a personalized space to showcase your skills and connect with others—all',
      image: profile,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors "
        >
          Back
        </button>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Features</h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <div className="w-full max-w-[900px] aspect-[9/3] mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain rounded-t-lg"
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3">{feature.title}</h3>
                <p className="text-blue-300 text-sm sm:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;