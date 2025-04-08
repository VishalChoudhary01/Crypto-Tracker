import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCoinByIdQuery, useGetCoinMarketChartQuery } from '../services/api';
import { setSelectedCoinId } from '../features/filterSlice';
import Loader from '../components/Loader';
import { FaTimes } from 'react-icons/fa';

const DetailsCryptoModal = () => {
  const dispatch = useDispatch();
  const selectedCoinId = useSelector((state) => state.filters.selectedCoinId);
  const currency = useSelector((state) => state.filters.currency);
  const [timePeriod, setTimePeriod] = useState('7');
  const [tempTimePeriod, setTempTimePeriod] = useState('7');
  const [chartType, setChartType] = useState('prices');
  const timeoutRef = useRef();
  const modalRef = useRef();

  const { data: coinData, isLoading: coinLoading } = useGetCoinByIdQuery(selectedCoinId, {
    skip: !selectedCoinId
  });
  
  const { data: chartData, isLoading: chartLoading } = useGetCoinMarketChartQuery(
    {
      id: selectedCoinId,
      currency,
      days: timePeriod
    },
    {
      skip: !selectedCoinId
    }
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeModal = () => dispatch(setSelectedCoinId(null));

  const handleTimePeriodChange = (days) => {
    setTempTimePeriod(days);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setTimePeriod(days), 300);
  };

  const formatChartData = (data) => {
    if (!data || !data[chartType]) return [];
    return data[chartType].map(([timestamp, value]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      value: value
    }));
  };

  if (!selectedCoinId) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] transform transition-all"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            {coinLoading ? (
              <>
                <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-white/10 animate-pulse rounded" />
                  <div className="h-4 w-24 bg-white/10 animate-pulse rounded" />
                </div>
              </>
            ) : (
              <>
                <img 
                  src={coinData?.image?.large} 
                  alt={coinData?.name} 
                  className="w-12 h-12 rounded-full bg-white/5 p-1"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {coinData?.name} ({coinData?.symbol?.toUpperCase()})
                  </h2>
                  <p className="text-sm text-white/80">
                    Rank #{coinData?.market_cap_rank}
                  </p>
                </div>
              </>
            )}
          </div>
          <button 
            onClick={closeModal} 
            className="text-white/50 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 custom-scroll">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Price Section */}
            <div className="space-y-2">
              {coinLoading ? (
                <>
                  <div className="h-12 w-48 bg-white/10 animate-pulse rounded" />
                  <div className="h-6 w-24 bg-white/10 animate-pulse rounded" />
                </>
              ) : (
                <>
                  <h3 className="text-4xl font-bold text-white">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(coinData?.market_data?.current_price[currency])}
                  </h3>
                  <PercentageChange 
                    value={coinData?.market_data?.price_change_percentage_24h} 
                    className="text-lg"
                  />
                </>
              )}
            </div>

            {/* Stats Grid */}
            {coinLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl">
                    <div className="h-4 w-20 bg-white/10 animate-pulse rounded mb-2" />
                    <div className="h-6 w-24 bg-white/10 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <StatItem 
                  label="Market Cap" 
                  value={coinData?.market_data?.market_cap[currency]} 
                  currency={currency}
                />
                <StatItem 
                  label="Volume 24h" 
                  value={coinData?.market_data?.total_volume[currency]} 
                  currency={currency}
                />
                <StatItem 
                  label="Circulating Supply" 
                  value={coinData?.market_data?.circulating_supply?.toLocaleString()}
                />
                <StatItem 
                  label="Max Supply" 
                  value={coinData?.market_data?.max_supply?.toLocaleString() || '∞'}
                />
              </div>
            )}

            {/* Price Changes */}
            {coinLoading ? (
              <div className="space-y-4">
                <div className="h-6 w-32 bg-white/10 animate-pulse rounded" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 w-12 bg-white/10 animate-pulse rounded" />
                      <div className="h-4 w-16 bg-white/10 animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white/90">Price Changes</h4>
                <div className="grid grid-cols-2 gap-4">
                  <PercentageChange label="24h" value={coinData?.market_data?.price_change_percentage_24h} />
                  <PercentageChange label="7d" value={coinData?.market_data?.price_change_percentage_7d} />
                  <PercentageChange label="30d" value={coinData?.market_data?.price_change_percentage_30d} />
                  <PercentageChange label="1y" value={coinData?.market_data?.price_change_percentage_1y} />
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Chart Controls */}
            <div className="flex flex-wrap gap-2">
              {['1', '7', '14', '30', '90', '365'].map((days) => (
                <button
                  key={days}
                  onClick={() => handleTimePeriodChange(days)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    tempTimePeriod === days 
                      ? 'bg-blue-600/80 text-white' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {days === '1' ? '24H' : `${days}D`}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="h-64">
              {chartLoading ? (
                <div className="h-full bg-white/10 animate-pulse rounded-lg" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formatChartData(chartData)}>
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={12}
                      width={80}
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: currency,
                          maximumFractionDigits: 5,
                        }).format(value)
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [
                        new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: currency,
                          minimumFractionDigits: 4,
                        }).format(value),
                        chartType === 'prices' ? 'Price' : 
                        chartType === 'market_caps' ? 'Market Cap' : 'Volume'
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Chart Type Selector */}
            <div className="flex flex-wrap gap-4 justify-center">
              {['prices', 'market_caps', 'total_volumes'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`capitalize text-sm px-4 py-2 rounded-full transition-colors ${
                    chartType === type 
                      ? 'bg-blue-600/80 text-white' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById('modal-root'));
};

const StatItem = ({ label, value, currency }) => (
  <div className="bg-white/5 p-4 rounded-xl">
    <p className="text-sm text-white/60 mb-1">{label}</p>
    <p className="text-lg font-medium text-white/90">
      {typeof value === 'number' 
        ? currency 
          ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
              notation: value > 1e9 ? 'compact' : 'standard'
            }).format(value)
          : value.toLocaleString() 
        : value || 'N/A'}
    </p>
  </div>
);

const PercentageChange = ({ label, value, className }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {label && <span className="text-white/60">{label}</span>}
    <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
      {value?.toFixed(2)}%
    </span>
  </div>
);

export default DetailsCryptoModal;