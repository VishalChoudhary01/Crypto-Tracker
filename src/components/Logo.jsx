import React from 'react'
import { TbBrandCoinbase } from "react-icons/tb";
import { SiBitcoinsv } from "react-icons/si";
import { Link } from 'react-router';
const Logo = () => {
  return (
    <div className="flex-shrink-0 flex items-center space-x-2 text-white">
            <Link to="/">
            
            <SiBitcoinsv className="h-9 w-9 text-[#51fabcfa]/80" />
            </Link>
            <div className="hidden md:flex items-center">
              <span className="text-xl font-bold">CryptoTracker</span>
            </div>
          </div>
  )
}

export default Logo