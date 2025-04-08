import React, { useState } from "react";
import { useGetTrendingCoinsQuery } from "../services/api";
import { FaBookmark, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from '../features/filterSlice';
import { toggleSavedCoin } from '../features/savedCoinsSlice';
import Toast from "../components/Toast";
import Loader from "../components/Loader";

const TrendingCoins = () => {
  const [showFeedback, setShowFeedback] = useState(null);
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.filters);
  const { data: trendingCoins, isLoading } = useGetTrendingCoinsQuery();
  const savedCoins = useSelector((state) => state.savedCoins);

  const transformCoinData = (trendingCoin) => ({
    id: trendingCoin.id,
    symbol: trendingCoin.symbol,
    name: trendingCoin.name,
    image: trendingCoin.large || trendingCoin.thumb,
    current_price: trendingCoin.data?.price || 0,
    price_btc: trendingCoin.price_btc,
    market_cap: trendingCoin.data?.market_cap || "$0",
    total_volume: trendingCoin.data?.total_volume || "$0",
    price_change_percentage_24h: trendingCoin.data?.price_change_percentage_24h?.usd || 0,
    market_cap_rank: trendingCoin.market_cap_rank,
  });

  const handleSaveCoin = (coin) => {
    dispatch(toggleSavedCoin(transformCoinData(coin)));
    setShowFeedback(coin.id);
    setTimeout(() => setShowFeedback(null), 1000);
  };

  const isSaved = (coinId) => savedCoins.some((coin) => coin.id === coinId);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen pt-20 px-4 pb-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <Toast showFeedback={showFeedback} isSaved={isSaved} />
      
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 md:gap-4">
          

          {/* Currency Selector */}
          <div className="w-full md:w-auto">
            <div className="relative group">
              <select
                className="w-full md:w-48 px-4 py-2.5 rounded-lg backdrop-blur-sm bg-white/5 border-2 border-gray-400/20 text-gray-200 focus:outline-none focus:border-cyan-400/40 transition-all text-sm md:text-base appearance-none"
                value={currency}
                onChange={(e) => dispatch(setCurrency(e.target.value))}
              >
                {["inr", "usd", "eur", "gbp", "jpy"].map((curr) => (
                  <option 
                    key={curr} 
                    value={curr}
                    className="bg-gray-800 text-gray-200"
                  >
                    {curr.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 custom-scroll">
          {trendingCoins.map((coin) => {
            const priceChange = coin.data?.price_change_percentage_24h?.usd || 0;
            const isPositive = priceChange >= 0;

            return (
              <div
                key={coin.id}
                className="relative bg-white/5 rounded-xl p-4 md:p-6 backdrop-blur-sm border border-gray-400/10 hover:border-cyan-400/20 transition-all group"
              >
                {/* Bookmark Button */}
                <button
                  onClick={() => handleSaveCoin(coin)}
                  className="absolute top-3 right-3 z-10 p-1.5 hover:bg-white/5 rounded-full transition-colors"
                  aria-label={isSaved(coin.id) ? "Remove from watchlist" : "Add to watchlist"}
                >
                  <FaBookmark
                    className={`text-lg ${
                      isSaved(coin.id) 
                        ? "text-teal-400 fill-current glow" 
                        : "text-gray-400 hover:text-teal-100"
                    } transition-colors`}
                  />
                </button>

                {/* Coin Header with Visible Heading */}
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={coin.thumb}
                      alt={coin.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full mr-3 border-2 border-gray-400/20 object-cover"
                      loading="lazy"
                    />
                    <span className="absolute -top-2 -left-2 bg-cyan-600 text-gray-100 text-xs font-medium rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                      #{coin.market_cap_rank}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-medium text-gray-100 truncate">
                      {coin.name}
                    </h3>
                    <p className="text-gray-400 uppercase text-sm font-mono tracking-wider">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                {/* Price Data */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-gray-100 font-medium text-base md:text-lg truncate ml-2">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5
                      }).format(coin.data?.price || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">24h Change</span>
                    <div className={`flex items-center ${isPositive ? "text-green-400" : "text-red-400"}`}>
                      {isPositive ? (
                        <FaArrowUp className="mr-1 text-sm" />
                      ) : (
                        <FaArrowDown className="mr-1 text-sm" />
                      )}
                      <span className="font-medium text-sm md:text-base">
                        {Math.abs(priceChange).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Market Cap</span>
                    <span className="text-gray-200 font-normal text-sm md:text-base truncate ml-2">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: currency.toUpperCase(),
                        notation: 'compact',
                        maximumFractionDigits: 2
                      }).format(coin.data?.market_cap?.replace(/[^0-9.]/g, '') || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">BTC Price</span>
                    <span className="text-gray-200 font-mono text-sm md:text-base truncate">
                      {coin.price_btc?.toFixed(6) || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingCoins;