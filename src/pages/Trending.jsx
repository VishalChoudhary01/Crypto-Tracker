import React,{useState} from "react";
import { useGetTrendingCoinsQuery } from "../services/api";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedCoin } from "../features/savedCoinsSlice"; // Redux action to save/remove coins
import Toast from "../components/Toast";
const TrendingCoins = () => {
    const [showFeedback, setShowFeedback] = useState(null);
  
  const dispatch = useDispatch();
  const { data: trendingCoins, isLoading, isError } = useGetTrendingCoinsQuery();

  const savedCoins = useSelector((state) => state.savedCoins);

  // transform coin data
  const transformCoinData=(trendingCoin)=>({
    id:trendingCoin.id,
    symbol:trendingCoin.symbol,
    name:trendingCoin.name,
    image:trendingCoin.large||trendingCoin.thumb,
    current_price: trendingCoin.price_btc, 
    market_cap: trendingCoin.market_cap || 0,
    total_volume: trendingCoin.total_volume || 0,
    price_change_percentage_24h: trendingCoin.price_change_percentage_24h || 0,
    market_cap_rank: trendingCoin.market_cap_rank,
  })

  const trendingSaveCoin=(coin)=>{
    dispatch(toggleSavedCoin(transformCoinData(coin)));
    setShowFeedback(coin.id);
    setTimeout(() => setShowFeedback(null), 3500);
  }

  const isSaved = (coinId) => {
    return savedCoins.some((coin) => coin.id === coinId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center">
        <div className="text-[#e2e8f0]">Loading Trending Coins...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center">
        <div className="text-[#e2e8f0]">Failed to load trending coins.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-blue-600 to-purple-800">
      {/* Toast Component */}
      <Toast showFeedback={showFeedback} isSaved={isSaved} />
      {/* Filters Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-3xl text-[#e2e8f0] font-semibold mb-6">Trending Coins</h2>
      </div>

      {/* Trending Coins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trendingCoins.map((coin) => (
          <div
            key={coin.id}
            className="relative bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/5 transition-colors duration-200"
          >
            {/* Save Button */}
            <button
        onClick={() => trendingSaveCoin(coin)}
        className="absolute top-2 right-2 p-2 rounded-full text-[#e2e8f0] hover:text-[#51fa86] transition-all duration-300"
      >
        <FaBookmark
          className={`transition-colors duration-300 text-[1rem] ${
            isSaved(coin.id) ? "fill-[#51fa86]" : "fill-[#a0aec0]"
          }`}
        />
      </button>

            {/* Coin Details */}
            <div className="flex items-center mb-4">
              <img
                src={coin.thumb}
                alt={coin.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl text-[#e2e8f0] font-medium">{coin.name}</h3>
                <p className="text-sm text-[#a0aec0]">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-[#a0aec0]">Rank: #{coin.market_cap_rank}</div>
              <div className="text-sm text-[#a0aec0]">
                <span className="font-medium">Price in BTC:</span> {coin.price_btc.toFixed(6)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
