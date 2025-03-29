import React, { useEffect, useState } from "react";
import { fetchCoinData } from "../services/fetchCoinData";
import { NavLink, Outlet } from "react-router";
import FlareSection from "./Flarebackground";
import { FaCoins, FaFire, FaBookmark, FaSearch, FaSortAmountDown } from "react-icons/fa";
const CoinTable = () => {
  const [currency, setCurrency] = useState("usd");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap");
  const [coins, setCoins] = useState([]);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        price: 50000,
        market_cap: 950000000000,
        total_volume: 25000000000,
        price_change_1h: 0.5,
        price_change_24h: 1.2,
        price_change_7d: -0.8,
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      },
      // Add more mock data...
    ];
    setCoins(mockData);
  }, []);
  useEffect(() => {
    // fetchCoinData(1,'usd')
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1a202c] to-[#2d3748]">
      {/* <FlareSection /> */}
      
      {/* Tabs */}
      <div className="flex justify-center mb-8 relative">
        <div className="flex space-x-4 bg-[#2d3748] p-2 rounded-2xl backdrop-blur-lg">
          <NavLink
            to="/"
            className={({ isActive }) => `
              px-8 font-semibold py-3 rounded-2xl transition-all duration-300
              flex items-center space-x-2 group
              ${
                isActive 
                  ? "bg-[#363c43] text-[#e2e8f0] shadow-lg scale-105"
                  : "text-[#a0aec0] hover:bg-[#363c43]/50 hover:text-[#cbd5e0]"
              }
            `}
          >
            <FaCoins  />
            <span>Crypto</span>
          </NavLink>

          <NavLink
            to="trending"
            className={({ isActive }) => `
              px-8 font-semibold py-3 rounded-2xl transition-all duration-300
              flex items-center space-x-2 group
              ${
                isActive 
                  ? "bg-[#363c43] text-[#e2e8f0] shadow-lg scale-105"
                  : "text-[#a0aec0] hover:bg-[#363c43]/50 hover:text-[#cbd5e0]"
              }
            `}
          >
            <FaFire  />
            <span>Trending</span>
          </NavLink>

          <NavLink
            to="savedcoins"
            className={({ isActive }) => `
              px-8 font-semibold py-3 rounded-2xl transition-all duration-300
              flex items-center space-x-2 group
              ${
                isActive 
                  ? "bg-[#363c43] text-[#e2e8f0] shadow-lg scale-105"
                  : "text-[#a0aec0] hover:bg-[#363c43]/50 hover:text-[#cbd5e0]"
              }
            `}
          >
            <FaBookmark  />
            <span>Saved</span>
          </NavLink>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3 top-3 text-[#718096]" />
          <input
            type="text"
            placeholder="Search coins..."
            className="pl-10 pr-4 py-3 w-full rounded-xl bg-[#2d3748] border border-[#4a5568] text-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#9f7aea]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="px-4 py-3 rounded-xl bg-[#2d3748] border border-[#4a5568] text-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#9f7aea]"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>

          <div className="relative">
            <FaSortAmountDown className="absolute left-3 top-3 text-[#718096]" />
            <select
              className="pl-10 pr-4 py-3 rounded-xl bg-[#2d3748] border border-[#4a5568] text-[#cbd5e0] focus:outline-none focus:ring-2 focus:ring-[#9f7aea]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="market_cap">Market Cap</option>
              <option value="volume">Volume</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-2xl">
        <table className="w-full bg-[#2d3748]">
          <thead className="bg-[#1a202c]">
            <tr>
              {["Rank", "Asset", "Price", "Volume", "Market Cap", "1H", "24H", "7D", ""].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-sm font-medium text-[#e2e8f0] uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a5568]">
            {coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-[#363c43] transition-colors">
                <td className="px-6 py-4 text-[#cbd5e0]">#{coin.id}</td>
                <td className="px-6 py-4 flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3 rounded-full" />
                  <div>
                    <div className="font-medium text-[#e2e8f0]">{coin.name}</div>
                    <div className="text-[#a0aec0] uppercase text-sm">{coin.symbol}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#cbd5e0]">${coin.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-[#cbd5e0]">${coin.total_volume.toLocaleString()}</td>
                <td className="px-6 py-4 text-[#cbd5e0]">${coin.market_cap.toLocaleString()}</td>
                <td className={`px-6 py-4 ${coin.price_change_1h >= 0 ? "text-[#48bb78]" : "text-[#9f7aea]"}`}>
                  {coin.price_change_1h}%
                </td>
                <td className={`px-6 py-4 ${coin.price_change_24h >= 0 ? "text-[#48bb78]" : "text-[#9f7aea]"}`}>
                  {coin.price_change_24h}%
                </td>
                <td className={`px-6 py-4 ${coin.price_change_7d >= 0 ? "text-[#48bb78]" : "text-[#9f7aea]"}`}>
                  {coin.price_change_7d}%
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#9f7aea] hover:text-[#b795ff] transition-colors">
                    <FaBookmark />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CoinTable;
