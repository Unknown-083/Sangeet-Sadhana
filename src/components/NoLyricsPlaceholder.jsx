import React from "react";

const NoLyricsPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl text-white">
      <div className="animate-pulse flex flex-col items-center">
        <svg
          className="w-26 h-30 text-gray-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 22"
        >
          <path d="M12 19l9 2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v16l9-2z" />
        </svg>
        <p className="text-gray-400">No Lyrics Image Available</p>
      </div>
    </div>
  );
};

export default NoLyricsPlaceholder;
