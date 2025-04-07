import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from 'use-debounce';
import { setSearchQuery, setSelectedCoinId } from "../features/filterSlice";
import { useGetSearchCoinsQuery } from "../services/api";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState('');
  const [debouncedSearch] = useDebounce(localSearch, 300);
  const [isFocused, setIsFocused] = useState(false);
  const { selectedCoinId } = useSelector((state) => state.filters);
  
  const { data: searchResults = [], isFetching: isSearching } = 
    useGetSearchCoinsQuery(debouncedSearch, { skip: !debouncedSearch });

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    if (!e.target.value) clearSearch();
  };

  const handleSuggestionClick = (coin) => {
    dispatch(setSelectedCoinId(coin.id));
    setLocalSearch(coin.name);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setLocalSearch('');
    dispatch(setSelectedCoinId(null));
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search coins..."
          value={localSearch}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full px-4 py-3 text-base rounded-full bg-gray-800/70 border border-gray-600 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 
                    backdrop-blur-sm transition-all duration-200 pl-12 pr-12"
        />
        
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {(localSearch || selectedCoinId) && (
          <button 
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-300 transition-colors"
          >
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isFocused && localSearch && (
        <div className="absolute z-20 mt-2 w-full rounded-xl shadow-xl bg-gray-800/95 backdrop-blur-xl 
                      border border-gray-700 overflow-hidden">
          {isSearching ? (
            <div className="px-4 py-3 text-gray-400 text-center animate-pulse">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto">
                {searchResults.slice(0, 8).map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => handleSuggestionClick(coin)}
                    className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700/30 
                              transition-colors border-b border-gray-700 last:border-b-0"
                  >
                    <img
                      src={coin.large || coin.thumb}
                      alt={coin.name}
                      className="w-8 h-8 mr-3 rounded-full bg-gray-700 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium truncate">{coin.name}</span>
                        <span className="ml-2 text-xs text-emerald-400 uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Rank: {coin.market_cap_rank || 'N/A'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {searchResults.length > 8 && (
                <div className="px-4 py-2 text-xs text-center text-gray-400 border-t border-gray-700">
                  Showing top 8 of {searchResults.length} results
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-3 text-gray-400 text-center">
              No results found for "{localSearch}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;