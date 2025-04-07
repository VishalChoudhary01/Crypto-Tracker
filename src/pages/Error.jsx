import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode = 404, message = "Page Not Found", showRedirect = true }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#080001] via-[#0D0003] to-[#020000]">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Code */}
        <div className="text-[#51fa86]">
          <span className="text-9xl font-bold">{errorCode}</span>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-3xl font-extrabold text-[#e2e8f0]">
          {message}
        </h2>

        {/* Return Button */}
        {showRedirect && (
          <div className="mt-10">
            <Link
              to="/"
              className="w-full max-w-xs mx-auto px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 
                        text-[#51fa86] hover:bg-white/10 transition-all duration-300 flex items-center 
                        justify-center space-x-2 text-lg"
            >
              <span>Return Home</span>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
        )}

        <p className="mt-8 text-sm text-[#a0aec0]">
          If you think this is a mistake, contact our support team
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;