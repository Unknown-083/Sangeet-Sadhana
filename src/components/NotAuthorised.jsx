import React from "react";
import { Lock, Music } from "lucide-react";
import { Link } from "react-router-dom";

const NotAuthorised = () => {
  return (
    <div className="flex flex-col items-center mt-10 justify-center min-h-[70vh] bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 rounded-none sm:rounded-2xl shadow-lg mx-auto w-full sm:max-w-3xl">
      {/* Music + Lock combined */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6">
        <div className="bg-red-500/20 p-4 sm:p-5 rounded-full">
          <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
        </div>
        <Music className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
      </div>

      {/* Headline */}
      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center px-2">
        Oops! You’re Not Tuned In Yet 🎧
      </h1>

      {/* Project feel */}
      <p className="text-gray-300 text-center text-base sm:text-lg max-w-xl mb-6 px-2">
        This part of <span className="font-semibold text-white">Your Mega Music Project</span>  
        is reserved for authorised listeners only.  
        Think of it as a backstage pass — you’ll need to log in to access your personalised playlists,  
        upload tracks, and enjoy the full beat.
      </p>

      {/* Call to Action */}
      <Link
        to={'/login'}
        className="px-5 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition transform font-medium text-base sm:text-lg"
      >
        🎵 Login & Join the Jam
      </Link>
    </div>
  );
};

export default NotAuthorised;
