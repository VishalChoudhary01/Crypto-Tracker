import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaCoins } from "react-icons/fa";
import { toggleSavedCoin } from "../features/savedCoinsSlice";
import { motion, AnimatePresence } from "motion/react";
import Toast from "../components/Toast";

const SavedCoins = () => {
  const dispatch = useDispatch();
  const savedCoins = useSelector((state) => state.savedCoins);
  const [showFeedback, setShowFeedback] = useState(null);

  const handleRemoveSavedCoin = (coin) => {
    dispatch(toggleSavedCoin(coin));
    setShowFeedback(coin.id);
    setTimeout(() => setShowFeedback(null), 1000);
  };

  // Full number formatting with commas
  const formatFullNumber = (num) => {
    if (!num) return "N/A";
    return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  return (
    <div className="min-h-screen md:pt-6 pt-2 px-4 ">
      <Toast
        showFeedback={showFeedback}
        isSaved={(coinId) => savedCoins.some(c => c.id === coinId)}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8 space-x-3">
          <FaCoins className="text-2xl text-amber-400" />
          <h1 className="text-2xl font-bold text-gray-100">Saved Coins</h1>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block rounded-xl overflow-hidden border border-gray-700 bg-gray-800/30 backdrop-blur-lg">
          <table className="w-full">
            <thead className="bg-gray-700/20">
              <tr>
                {["Rank", "Asset", "Price", "24H", "Volume", "Market Cap", ""].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              <AnimatePresence>
                {savedCoins.map((coin) => (
                  <motion.tr
                    key={coin.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-700/10 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-200 font-medium">#{coin.market_cap_rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-10 h-10 rounded-full bg-gray-700 p-1.5"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-100">{coin.name}</div>
                          <div className="text-xs text-gray-400 uppercase">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      ${coin.current_price?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td className={`px-6 py-4 text-sm font-medium ${
                      coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {coin.price_change_percentage_24h?.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      ${formatFullNumber(coin.total_volume)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                      ${formatFullNumber(coin.market_cap)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemoveSavedCoin(coin)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          <AnimatePresence>
            {savedCoins.map((coin) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 rounded-xl bg-gray-800/30 border border-gray-700 backdrop-blur-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-12 h-12 rounded-full bg-gray-700 p-1.5"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-100">{coin.name}</div>
                      <div className="text-xs text-gray-400 uppercase">{coin.symbol}</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Rank: #{coin.market_cap_rank}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSavedCoin(coin)}
                    className="text-red-400 hover:text-red-300 p-2 -mt-1 -mr-2"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">Price</div>
                    <div className="text-sm text-gray-200">
                      ${coin.current_price?.toFixed(2)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">24H Change</div>
                    <div className={`text-sm font-medium ${
                      coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {coin.price_change_percentage_24h?.toFixed(1)}%
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">Volume</div>
                    <div className="text-sm text-gray-200">
                      ${coin.total_volume?.toLocaleString("en-US")}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">Market Cap</div>
                    <div className="text-sm text-gray-200">
                      ${coin.market_cap?.toLocaleString("en-US")}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {savedCoins.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No saved coins found</div>
            <div className="text-sm text-gray-500">
              Add coins to your watchlist from the market page
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCoins;