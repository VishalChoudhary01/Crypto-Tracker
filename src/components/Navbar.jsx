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
              aria-label="Toggle menu"
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

      {/* Mobile Sidebar with Right-to-Left Animation */}
      <div className="md:hidden">
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none -z-10"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Glassmorphism Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full w-64 transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="h-full  bg-gradient-to-br from-teal-800/15 to-gray-950 backdrop-blur-2xl border-l border-teal-700/30 shadow-2xl">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-gray-700/30">
              <Logo />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-gray-700/40 transition-colors"
              >
                <FaTimes className="h-5 w-5 text-gray-300" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              <NavLink
                to="/"
                onClick={() => handleSectionChange('all')}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600/30 to-cyan-500/20 text-white shadow-inner border border-emerald-400/20'
                      : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
                  }`
                }
              >
                <FaCoins className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Top Coins</span>
              </NavLink>

              <NavLink
                to="/trending"
                onClick={() => handleSectionChange('trending')}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600/30 to-red-500/20 text-white shadow-inner border border-amber-400/20'
                      : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
                  }`
                }
              >
                <FaFire className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-medium">Trending</span>
              </NavLink>

              <NavLink
                to="/savedcoins"
                onClick={() => handleSectionChange('saved')}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-teal-500/20 text-white shadow-inner border border-blue-400/20'
                      : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
                  }`
                }
              >
                <FaBookmark className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Saved Coins</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;