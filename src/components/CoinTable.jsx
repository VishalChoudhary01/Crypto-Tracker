import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBookmark } from "react-icons/fa";
import { motion } from "motion/react";
import { useGetAllCoinsQuery } from "../services/api";
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen py-10 md:py-8 px-3 sm:px-4">
      {/* Animated Header Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mb-6 md:mb-8 px-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-green-500 to-[#430000] bg-clip-text text-transparent pb-2">
          Crypto Tracker
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-2">
          Track real-time cryptocurrency market movements
        </p>
        <p><span className="block md:inline md:ml-2 text-xs text-gray-500">
            Powered by CoinGecko API
          </span></p>
      </motion.div>

      {/* Filters and Search Section */}
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-[35%] md:order-last  md:mx-0">
          <SearchBar 
            onCoinSelect={(coin) => dispatch(setSelectedCoinId(coin?.id))}
          />
        </div>

        <div className="w-full md:w-[65%]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {/* Currency Selector */}
            <div className="w-full">
              <select
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all cursor-pointer"
                value={currency}
                onChange={(e) => dispatch(setCurrency(e.target.value))}
              >
                {["inr", "usd", "eur", "gbp"].map((curr) => (
                  <option key={curr} value={curr} className="bg-gray-800">
                    {curr.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Items Per Page */}
            <div className="w-full">
              <select
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all cursor-pointer"
                value={perPage}
                onChange={(e) => {
                  dispatch(setPerPage(Number(e.target.value)));
                  dispatch(setPage(1));
                }}
              >
                {[10, 20, 50, 100].map((num) => (
                  <option key={num} value={num} className="bg-gray-800">
                    Show {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector - Full width on mobile */}
            <div className="col-span-2 md:col-span-1 w-full">
              <select
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all cursor-pointer"
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value))}
              >
                {["Market_Cap_desc", "Market_Cap_asc", "Volume_desc", "Volume_asc"].map((option) => (
                  <option key={option} value={option} className="bg-gray-800">
                    {option.split("_").join(" ").replace("desc", "↓").replace("asc", "↑")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {allFetching && <Loader />}

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
                        className={`text-sm md:text-base ${isSaved(coin.id) ? "fill-[#51fa86] glow" : "fill-[#a0aec0]"}`}
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

      {/* Pagination */}
      {!selectedCoinId && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-5 py-2 text-sm rounded-xl bg-white/10 text-gray-200 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={coins.length < perPage}
              className="px-5 py-2 text-sm rounded-xl bg-white/10 text-gray-200 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Toast showFeedback={showFeedback} isSaved={isSaved} />
    </div>
  );
};

export default CoinTable;