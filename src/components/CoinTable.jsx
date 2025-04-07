import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBookmark } from "react-icons/fa";
import { useGetAllCoinsQuery, useGetTrendingCoinsQuery } from "../services/api";
import { setCurrency, setSortBy, setPage, setPerPage } from "../features/filterSlice";
import { toggleSavedCoin } from "../features/savedCoinsSlice";
import Toast from "./Toast";
import Loader from "./Loader";

const CoinTable = () => {
  const dispatch = useDispatch();
  const [showFeedback, setShowFeedback] = useState(null);
  const { currency, activeSection, sortBy, page, perPage } = useSelector((state) => state.filters);
  const savedCoins = useSelector((state) => state.savedCoins);

  const { data: allCoins = [], isLoading: allLoading, isFetching: allFetching } = useGetAllCoinsQuery({
    currency,
    order: sortBy,
    page,
    perPage,
  });

  const { data: trendingData = [], isLoading: trendingLoading } = useGetTrendingCoinsQuery();

  const getCurrentData = () => {
    switch (activeSection) {
      case "all": return allCoins;
      case "trending": return trendingData;
      case "saved": return savedCoins.filter(coin => coin?.id && coin?.image && coin?.current_price !== undefined);
      default: return [];
    }
  };

  const coins = getCurrentData();
  const isLoading = allLoading || trendingLoading;
  const currencySymbol = currency === "inr" ? "₹" : "$";

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    window.scrollTo(0, 0);
  };

  const handleBookMark = (coin) => {
    dispatch(toggleSavedCoin(coin));
    setShowFeedback(coin.id);
    setTimeout(() => setShowFeedback(null), 3500);
  };

  const isSaved = (coinId) => savedCoins.some((coin) => coin.id === coinId);

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="min-h-screen pt-18 md:pt-20 px-3 sm:px-4 bg-gradient-to-br">
      <Toast showFeedback={showFeedback} isSaved={isSaved} />
      {allFetching && <Loader/>}

      {/* Filters Section */}
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-grow min-w-[120px]">
            <select
              className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-[15px] rounded-lg md:rounded-xl 
                        backdrop-blur-sm bg-white/5 border border-white/10 text-[#e2e8f0] 
                        focus:outline-none focus:ring-2 focus:ring-[#5bdf85]/20 transition-all duration-200 
                        cursor-pointer appearance-none"
              value={currency}
              onChange={(e) => dispatch(setCurrency(e.target.value))}
            >
              {["inr", "usd", "eur", "gbp"].map(currency => (
                <option key={currency} value={currency} className="bg-[#080c12cc]/90 backdrop-blur-md text-[#51fabcfa]/80">
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#a0aec0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {activeSection === "all" && (
            <>
              <div className="relative min-w-[150px]">
                <select
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-[15px] rounded-lg md:rounded-xl 
                            backdrop-blur-sm bg-white/5 border border-white/10 text-[#e2e8f0] 
                            focus:outline-none focus:ring-2 focus:ring-[#5bdf85]/20 transition-all duration-200 
                            cursor-pointer appearance-none"
                  value={perPage}
                  onChange={(e) => {
                    dispatch(setPerPage(Number(e.target.value)));
                    dispatch(setPage(1));
                  }}
                >
                  {[10, 20, 50, 100].map(num => (
                    <option key={num} value={num} className="bg-[#080c12cc]/90 backdrop-blur-md text-[#51fabcfa]/80">
                      {num} / Page
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-[#a0aec0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative min-w-[140px]">
                <select
                  className="w-full pl-8 pr-8 py-2 md:pl-10 md:py-2.5 text-sm md:text-[15px] rounded-lg md:rounded-xl 
                            backdrop-blur-sm bg-white/5 border border-white/10 text-[#e2e8f0] 
                            focus:outline-none focus:ring-2 focus:ring-[#5bdf85]/20 transition-all duration-200 
                            cursor-pointer appearance-none"
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                >
                  {["Market_cap_desc", "market_cap_asc", "volume_desc", "volume_asc"].map(option => (
                    <option key={option} value={option} className="bg-[#080c12cc]/90 backdrop-blur-md text-[#51fabcfa]/80">
                      {option.split('_').join(' ').replace('desc', '↓').replace('asc', '↑')}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-[#a0aec0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg md:rounded-xl backdrop-blur-lg bg-white/5 border border-white/10">
        <table className="w-full min-w-[600px] md:min-w-full">
          <thead className="backdrop-blur-sm bg-white/15 border-b border-white/10">
            <tr>
              {["Rank", "Asset", "Price", "Volume", "Market Cap", "24H", ""].map((header, idx) => (
                <th 
                  key={idx} 
                  className="px-3 py-3 md:px-6 md:py-4 text-left text-xs sm:text-sm font-medium text-[#51fabcfa]/80 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {coins.length > 0 ? coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-white/5 transition-colors duration-200 backdrop-blur-sm">
                <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#cbd5e0]">#{coin.market_cap_rank}</td>
                <td className="px-3 py-2 md:px-6 md:py-4 flex items-center min-w-[150px]">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 rounded-full bg-white/10 p-1 backdrop-blur-sm"
                  />
                  <div>
                    <div className="font-medium text-sm md:text-base text-[#e2e8f0] truncate">{coin.name}</div>
                    <div className="text-[#a0aec0] uppercase text-xs md:text-sm">{coin.symbol}</div>
                  </div>
                </td>
                <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#e2e8f0] whitespace-nowrap">
                  {currencySymbol}{coin.current_price?.toLocaleString()}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#e2e8f0] whitespace-nowrap">
                  {currencySymbol}{coin.total_volume?.toLocaleString()}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#e2e8f0] whitespace-nowrap">
                  {currencySymbol}{coin.market_cap?.toLocaleString()}
                </td>
                <td className={`px-3 py-2 md:px-6 md:py-4 text-sm md:text-base ${
                  coin.price_change_percentage_24h >= 0 ? "text-[#51fa86fa]/80" : "text-[#f44f3d]"
                }`}>
                  {coin.price_change_percentage_24h?.toFixed(1)}%
                </td>
                <td className="px-3 py-2 md:px-6 md:py-4">
                  <button 
                    className="p-1.5 md:p-2 rounded-md md:rounded-lg hover:bg-[#222] transition-colors"
                    onClick={() => handleBookMark(coin)}
                  >
                    <FaBookmark className={`text-sm md:text-base ${isSaved(coin.id) ? "fill-[#51fa86]" : "fill-[#a0aec0]"}`}/>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-3 py-4 md:px-6 md:py-4 text-center text-[#e2e8f0]">
                  {activeSection === "saved" ? (
                    <div className="flex flex-col items-center py-4 md:py-8">
                      <FaBookmark className="text-3xl md:text-4xl mb-2 md:mb-4 text-[#51fa86]/50" />
                      <p className="text-sm md:text-base">No saved coins yet!</p>
                      <p className="text-xs md:text-sm mt-1 md:mt-2 text-[#a0aec0]">
                        Click the bookmark icon to save coins
                      </p>
                    </div>
                  ) : "No coins found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {activeSection === "all" && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4 md:mt-6">
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 w-full sm:w-auto text-sm md:text-base rounded-lg backdrop-blur-sm bg-white/10 text-[#e2e8f0] hover:bg-white/15 disabled:bg-white/5 disabled:text-[#a0aec0] disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={coins.length < perPage}
              className="px-4 py-2 w-full sm:w-auto text-sm md:text-base rounded-lg backdrop-blur-sm bg-white/10 text-[#e2e8f0] hover:bg-white/15 disabled:bg-white/5 disabled:text-[#a0aec0] disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
          <div className="text-[#e2e8f0] text-sm md:text-base">Page {page}</div>
        </div>
      )}
    </div>
  );
};

export default CoinTable;