import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBookmark, FaTimes } from "react-icons/fa";
import { useGetAllCoinsQuery, } from "../services/api";
import { setCurrency, setSortBy, setPage, setPerPage, setSelectedCoinId } from "../features/filterSlice";
import { toggleSavedCoin } from "../features/savedCoinsSlice";
import Toast from "./Toast";
import Loader from "./Loader";
import SearchBar from "./Searchbar";
const CoinTable = () => {
  const dispatch = useDispatch();
  const [showFeedback, setShowFeedback] = useState(null);
  const { currency, sortBy, page, perPage, selectedCoinId } = useSelector((state) => state.filters);
  const savedCoins = useSelector((state) => state.savedCoins);

  const { data: allCoins = [], isFetching: allFetching } = useGetAllCoinsQuery({
    currency,
    order: sortBy,
    page,
    perPage,
    ids: selectedCoinId
  });

  const coins = allCoins;
  const currencySymbol = currency === "inr" ? "₹" : "$";

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    window.scrollTo(0, 0);
  };

  const handleBookMark = (coin) => {
    dispatch(toggleSavedCoin(coin));
    setShowFeedback(coin.id);
    setTimeout(() => setShowFeedback(null), 1000);
  };

  const isSaved = (coinId) => savedCoins.some((coin) => coin.id === coinId);

  const clearCoinSelection = () => {
    dispatch(setSelectedCoinId(null));
    dispatch(setPage(1));
  };

  return (
    <div className="min-h-screen pt-10 md:pt-8 px-3 sm:px-4 bg-gradient-to-br">
      <Toast showFeedback={showFeedback} isSaved={isSaved} />

      {/* Search Bar */}
      <div className="mb-6 md:mb-8 max-w-2xl mx-auto">
        <SearchBar onCoinSelect={(coin) => dispatch(setSelectedCoinId(coin?.id))} />
      </div>

      {/* Filters Section */}
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Currency Selector */}
          <div className="relative flex-grow min-w-[120px]">
            <select
              className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-[15px] rounded-lg md:rounded-xl 
                        backdrop-blur-sm bg-white/5 border border-white/10 text-[#e2e8f0] 
                        focus:outline-none focus:ring-2 focus:ring-[#5bdf85]/20 transition-all duration-200 
                        cursor-pointer appearance-none"
              value={currency}
              onChange={(e) => dispatch(setCurrency(e.target.value))}
            >
              {["inr", "usd", "eur", "gbp"].map((currency) => (
                <option
                  key={currency}
                  value={currency}
                  className="bg-[#080c12cc]/90 backdrop-blur-md text-[#51fabcfa]/80"
                >
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-[#a0aec0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Items Per Page */}
          <div className="relative min-w-[80px]">
            <select
              className="w-[95%] px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-[15px] rounded-lg md:rounded-xl 
                        backdrop-blur-sm bg-white/5 border border-white/10 text-[#e2e8f0] 
                        focus:outline-none focus:ring-2 focus:ring-[#5bdf85]/20 transition-all duration-200 
                        cursor-pointer appearance-none"
              value={perPage}
              onChange={(e) => {
                dispatch(setPerPage(Number(e.target.value)));
                dispatch(setPage(1));
              }}
            >
              {[10, 20, 50, 100].map((num) => (
                <option
                  key={num}
                  value={num}
                  className="bg-[#080c12cc]/90 backdrop-blur-md text-[#51fabcfa]/80"
                >
                  {num}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-[#a0aec0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="relative min-w-[140px]">
            <select
              className="w-full pl-8 pr-8 py-2 md:pl-10 md:py-2.5 text-sm md:text-[15px] rounded-lg md:rounded-xl 
                        backdrop-blur-sm bg-white/5 border border-white/10 text-[#e2e8f0] 
                        focus:outline-none focus:ring-2 focus:ring-[#5bdf85]/20 transition-all duration-200 
                        cursor-pointer appearance-none"
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              {["Market_Cap_desc", "Market_Cap_asc", "Volume_desc", "Volume_asc"].map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-[#080c12cc]/90  backdrop-blur-md text-[#51fabcfa]/80"
                >
                  {option.split("_").join(" ").replace("desc", "↓").replace("asc", "↑")}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-[#a0aec0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Clear Selection Button */}
        {selectedCoinId && (
          <button
            onClick={clearCoinSelection}
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-base 
                     text-red-400 hover:text-red-300 transition-colors"
          >
            <FaTimes className="inline-block" />
            Clear Selection
          </button>
        )}
      </div>

      {allFetching ? <Loader /> : null}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg md:rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 custom-scroll">
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
            {coins.length > 0 ? (
              coins.map((coin) => (
                <tr key={coin.id}  className="hover:bg-white/5 transition-colors cursor-pointer duration-200 backdrop-blur-sm">
                  <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#cbd5e0]">
                    #{coin.market_cap_rank}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 flex items-center min-w-[150px]">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 rounded-full bg-white/10 p-1 backdrop-blur-sm"
                    />
                    <div>
                      <div onClick={() => dispatch(setSelectedCoinId(coin.id))} className="font-medium text-sm md:text-base text-[#e2e8f0] truncate">{coin.name}</div>
                      <div className="text-[#a0aec0] uppercase text-xs md:text-sm">{coin.symbol}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#e2e8f0] whitespace-nowrap">
                    {currencySymbol}
                    {coin.current_price?.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#e2e8f0] whitespace-nowrap">
                    {currencySymbol}
                    {coin.total_volume?.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4 text-sm md:text-base text-[#e2e8f0] whitespace-nowrap">
                    {currencySymbol}
                    {coin.market_cap?.toLocaleString()}
                  </td>
                  <td
                    className={`px-3 py-2 md:px-6 md:py-4 text-sm md:text-base ${
                      coin.price_change_percentage_24h >= 0 ? "text-[#51fa86fa]/80" : "text-[#f44f3d]"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4">
                    <button
                      className="p-1.5 md:p-2 rounded-md md:rounded-lg hover:bg-[#222] transition-colors"
                      onClick={() => handleBookMark(coin)}
                    >
                      <FaBookmark
                        className={`text-sm md:text-base ${isSaved(coin.id) ? "fill-[#51fa86]" : "fill-[#a0aec0]"}`}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-3 py-4 md:px-6 md:py-4 text-center text-[#e2e8f0]">
                  No coins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Only show when not viewing single coin */}
      {!selectedCoinId && (
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