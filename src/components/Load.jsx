import React from 'react';

export default function Loader({text=''}){

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-900 rounded-2xl p-6">
      <div className="flex items-center space-x-4">
        {/* Spinning Loader */}
        <div
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        ></div>
        {/* Text */}
        <p className="text-gray-400 text-lg font-semibold">
          Fetching your {text}...
        </p>
      </div>
    </div>
  );
};

