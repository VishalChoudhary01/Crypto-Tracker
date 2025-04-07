import React, { useState } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { FaCoins, FaFire, FaBookmark, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { setActiveSection } from '../features/filterSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSectionChange = (section) => {
    dispatch(setActiveSection(section));
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-black to-stone-900 shadow-sm sticky top-0 w-full z-50">
      <div className="mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <NavLink
              to="/"
              onClick={() => handleSectionChange('all')}
              className={({ isActive }) =>
                `px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-br from-emerald-600/70 to-cyan-500/80 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700/40 hover:text-white"
                }`
              }
            >
              <FaCoins className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Top Coins</span>
            </NavLink>

            <NavLink
              to="/trending"
              onClick={() => handleSectionChange('trending')}
              className={({ isActive }) =>
                `px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-br from-amber-600/60 to-red-500/80 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700/40 hover:text-white"
                }`
              }
            >
              <FaFire className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Trending</span>
            </NavLink>

            <NavLink
              to="/savedcoins"
              onClick={() => handleSectionChange('saved')}
              className={({ isActive }) =>
                `px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-br from-blue-600/60 to-teal-500/80 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700/40 hover:text-white"
                }`
              }
            >
              <FaBookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Saved Coins</span>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md bg-gray-800/40 hover:bg-gray-700/50 transition-all duration-200"
            >
              {isOpen ? (
                <FaTimes className="h-5 w-5 text-white" />
              ) : (
                <FaBars className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Container */}
        <div 
          className={`relative right-0 top-14 w-56 max-w-[90%] ml-auto bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transform transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="px-3 py-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => handleSectionChange('all')}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  isActive
                    ? ' bg-gradient-to-br from-emerald-600/70 to-cyan-500/80 text-white shadow-md scale-[1.02]'
                    : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                }`
              }
            >
              <FaCoins className="h-4 w-4" />
              <span className="text-sm font-medium">Top Coins</span>
            </NavLink>

            <NavLink
              to="/trending"
              onClick={() => handleSectionChange('trending')}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-600/60 to-red-500/80 text-white shadow-md scale-[1.02]'
                    : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                }`
              }
            >
              <FaFire className="h-4 w-4" />
              <span className="text-sm font-medium">Trending</span>
            </NavLink>

            <NavLink
              to="/savedcoins"
              onClick={() => handleSectionChange('saved')}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-600/60 to-teal-500/80 text-white shadow-md scale-[1.02]'
                    : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                }`
              }
            >
              <FaBookmark className="h-4 w-4" />
              <span className="text-sm font-medium">Saved Coins</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;