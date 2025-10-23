import React from 'react';

export default function Card({ title, content='', detail='', sourceInfo='' }) {
  // New prop: sourceInfo
  const hasSourceInfo = !!sourceInfo; // Check if the prop is provided and not empty

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto min-h-[200px] rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md border border-gray-700 shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">

      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/20 to-indigo-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500 z-0"></div>

      {/* NEW: Exclamation Mark and Tooltip Container */}
      {hasSourceInfo && (
        <div className="absolute top-2 right-2 z-20">
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 cursor-pointer group/tooltip">
            
            {/* Exclamation Mark Icon */}
            <span className="font-bold text-sm">!</span> 

            {/* Tooltip Content (Hidden by default) */}
            <div className="absolute right-0 top-full mt-2 w-48 p-2 text-xs text-white bg-gray-700 border border-gray-600 rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-opacity duration-300 shadow-lg pointer-events-none">
              <span className="font-semibold text-emerald-300">Data Source:</span> {sourceInfo}
            </div>

          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-1 justify-between items-center h-full text-white py-4 sm:py-6">

        <h3 className="text-base sm:text-lg font-semibold text-indigo-400 text-center">{title}</h3>

        { 
          content ?
            <div className="text-3xl sm:text-4xl font-bold text-emerald-400 tracking-tight">{content}</div>
            :
            <div className="sm:text-xl font-bold text-emerald-400 tracking-tight">No data available</div>
        }
        { 
          detail ?
            <div className="text-sm sm:text-base font-bold text-orange-300 tracking-tight">Max Rating: {detail}</div>
            :
            ''
        }

        <div className="w-12 sm:w-16 h-[3px] bg-gradient-to-r from-emerald-400 to-lime-300 rounded-full mt-2 sm:mt-3" />
      </div>
    </div>
  );
}