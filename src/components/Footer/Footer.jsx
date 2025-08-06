import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left text-sm">© 2025 Sangeet Sadhana. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-violet-400 text-sm">Privacy Policy</a>
          <a href="/terms" className="hover:text-violet-400 text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
