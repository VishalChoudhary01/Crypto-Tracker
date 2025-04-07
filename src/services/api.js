import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.coingecko.com/api/v3',
        prepareHeaders: (headers) => {
            return headers;
        }
    }),
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
        
    })
});

export const {useGetAllCoinsQuery,useGetTrendingCoinsQuery,useGetSearchCoinsQuery} = api;