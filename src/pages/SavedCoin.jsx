import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { toggleSavedCoin } from "../features/savedCoinsSlice";  // Import your slice action
import {motion,AnimatePresence} from 'motion/react'
import Toast from "../components/Toast";
const SavedCoins = () => {
  const dispatch = useDispatch();
  const savedCoins = useSelector((state) => state.savedCoins);  // Access savedCoins from the state
  const [showFeedback, setShowFeedback] = useState(null);

  
  const handleRemoveSavedCoin = (coin) => {
    dispatch(toggleSavedCoin(coin));  
    setShowFeedback(coin.id);
    setTimeout(() => setShowFeedback(null), 1000);
  };

  return (
    <div className="min-h-screen pt-12 md:pt-20 px-2 sm:px-4 bg-gradient-to-br">
      <Toast 
        showFeedback={showFeedback} 
        isSaved={(coinId) => savedCoins.some(c => c.id === coinId)}
      />
      <h2 className="text-lg sm:text-xl md:text-2xl text-[#e2e8f0] mb-4 sm:mb-6 px-2 sm:px-0">Saved Coins</h2>

      {/* Saved Coins Table */}
      <div className="overflow-x-auto rounded-lg md:rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 mx-2 sm:mx-0 custom-scroll">
        <table className="w-full">
          <thead className="backdrop-blur-sm bg-white/15 border-b border-white/10">
            <tr>
              {["Rank", "Asset", "Price", "Volume", "Market Cap", "24H", ""].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="px-2 sm:px-4 md:px-6 py-3 text-left text-xs sm:text-sm font-medium text-[#51fabcfa]/80 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {savedCoins.length > 0 ? (
              savedCoins.map((coin) => (
                <AnimatePresence key={coin.id}>
                  <motion.tr
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hover:bg-white/5 transition-colors duration-200 backdrop-blur-sm"
                  >
                    <td className="px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm text-[#cbd5e0]">#{coin.market_cap_rank}</td>
                    <td className="px-2 sm:px-4 md:px-6 py-3 flex items-center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 rounded-full bg-white/10 p-0.5 sm:p-1 backdrop-blur-sm"
                      />
                      <div>
                        <div className="font-medium text-sm sm:text-base text-[#e2e8f0]">{coin.name}</div>
                        <div className="text-[#a0aec0] uppercase text-xs sm:text-sm">{coin.symbol}</div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm text-[#e2e8f0]">
                      ${coin.current_price?.toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm text-[#e2e8f0]">
                      ${coin.total_volume?.toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm text-[#e2e8f0]">
                      ${coin.market_cap?.toLocaleString()}
                    </td>
                    <td
                      className={`px-2 sm:px-4 md:px-6 py-3 text-xs sm:text-sm ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-[#51fa86fa]/80"
                          : "text-[#f44f3d]"
                      }`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(1)}%
                    </td>
                    <td className="px-2 sm:px-4 md:px-6 py-3">
                      <button
                        className="text-[#f44f3d] hover:text-[#f44f3d] transition-colors p-1 sm:p-2 rounded-lg hover:bg-[#222] cursor-pointer backdrop-blur-sm"
                        onClick={() => handleRemoveSavedCoin(coin)}
                      >
                        <FaTrash className="text-sm sm:text-base" />
                      </button>
                    </td>
                  </motion.tr>
                </AnimatePresence>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-sm sm:text-base text-[#e2e8f0]">
                  No saved coins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  
  );
};

export default SavedCoins;
