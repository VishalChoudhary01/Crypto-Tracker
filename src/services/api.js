// api.js (updated)
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const staggeredBaseQuery = retry(
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({ 
      baseUrl: import.meta.env.VITE_COINGECKO_API_URL,
    })(args, api, extraOptions);

    if (result.error?.status === 429) {
      const retryAfter = result.meta?.response?.headers.get('Retry-After') || 5;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      retry.fail(result.error);
    }
    return result;
  },
  {
    maxRetries: parseInt(import.meta.env.VITE_API_MAX_RETRIES),
  }
);

export const api = createApi({
  reducerPath: 'api',
  baseQuery: staggeredBaseQuery,
  keepUnusedDataFor: parseInt(import.meta.env.VITE_API_CACHE_TIME), 
  endpoints: (builder) => ({
    getAllCoins: builder.query({
      query: ({ currency, order, perPage, page, ids }) => 
        `/coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}${
          ids ? `&ids=${ids}` : ''
        }`,
    }),
    getTrendingCoins: builder.query({
      query: () => '/search/trending',
      transformResponse: (response) => response.coins?.map(coin => coin.item) || []
    }),
    getSearchCoins: builder.query({
      query: (query) => `/search?query=${query}`,
      transformResponse: (response) => response.coins.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        market_cap_rank: coin.market_cap_rank,
        thumb: coin.thumb,
        large: coin.large
      }))
    }),
    getCoinById: builder.query({
      query: (id) => `/coins/${id}`,
    }),
    getCoinMarketChart: builder.query({
      query: ({ id, currency, days }) => 
        `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
      extraOptions: { maxRetries: 2 },
    }),
  })
});

export const {
  useGetAllCoinsQuery,
  useGetTrendingCoinsQuery,
  useGetSearchCoinsQuery,
  useGetCoinMarketChartQuery,
  useGetCoinByIdQuery
} = api;