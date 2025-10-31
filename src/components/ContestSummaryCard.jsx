import React from 'react';

// Reusing your icon placeholders.
// If you have actual SVG or image components for these, you'd import them here.
const CodeChefIcon = () => (
<span className="font-bold text-lg text-red-500">CC</span>
);
const CodeForcesIcon = () => (
   <span className="font-bold text-lg text-blue-500">CF</span>
);
const LeetCodeIcon = () => (
  <span className="font-bold text-lg text-green-500">LC</span> // Adjusted size and color
);
const AtCoderIcon = () => (
  <span className="font-bold text-lg text-yellow-500">AC</span> // Adjusted size and color
);


export default function ContestSummaryCard({ data }) {
  const {
    leetcodeRatings = [],
    codeforcesRatings = [],
    codechefRatings = [],
    atcoderRatings = [],
  } = data;

  const leetcodeCount = leetcodeRatings.length;
  const codeforcesCount = codeforcesRatings.length;
  const codechefCount = codechefRatings.length;
  const atcoderCount = atcoderRatings.length;
  
  const totalContests = leetcodeCount + codeforcesCount + codechefCount + atcoderCount;

  return (
    <div className="bg-gray-900 p-6 rounded-2xl w-full md:w-1/3 flex flex-col items-center"> {/* Added flex-col and items-center for centering */}
      
      {/* Centered Total Contests title and value */}
      <h3 className="text-gray-400 text-xl font-semibold mb-2">Total Contests</h3>
      <p className="text-6xl font-extrabold text-white mb-8">{totalContests}</p> {/* Larger, bolder text */}
      
      {/* Contest breakdown - Adjusted layout and styling */}
      <div className="w-full flex flex-col space-y-4"> {/* Increased space-y */}
        
        {/* LeetCode Entry */}
        <div className="flex justify-between items-center text-gray-200">
          <div className="flex items-center gap-4"> {/* Increased gap */}
            <LeetCodeIcon />
            <p className="text-lg font-medium text-white">LeetCode</p> {/* Bolder, whiter text */}
          </div>
          <p className="text-xl font-bold text-white">{leetcodeCount}</p> {/* Larger count */}
        </div>

        {/* CodeForces Entry */}
        <div className="flex justify-between items-center text-gray-200">
          <div className="flex items-center gap-4">
            <CodeForcesIcon />
            <p className="text-lg font-medium text-white">CodeForces</p>
          </div>
          <p className="text-xl font-bold text-white">{codeforcesCount}</p>
        </div>

        {/* CodeChef Entry */}
        <div className="flex justify-between items-center text-gray-200">
          <div className="flex items-center gap-4">
            <CodeChefIcon />
            <p className="text-lg font-medium text-white">CodeChef</p>
          </div>
          <p className="text-xl font-bold text-white">{codechefCount}</p>
        </div>

        {/* AtCoder Entry */}
        <div className="flex justify-between items-center text-gray-200">
          <div className="flex items-center gap-4">
            <AtCoderIcon />
            <p className="text-lg font-medium text-white">AtCoder</p>
          </div>
          <p className="text-xl font-bold text-white">{atcoderCount}</p>
        </div>
      </div>
    </div>
  );
}