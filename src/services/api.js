import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.coingecko.com/api/v3',
        prepareHeaders: (headers) => {
            return headers;
        }
    }),
    tagTypes: ['Coins', 'Trending'],
    endpoints: (builder) => ({
        getAllCoins: builder.query({
            query: ({ currency = 'usd', order = 'market_cap_desc', perPage=20,page = 1 }) => 
                `/coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}`,
            providesTags: ['Coins'],
            transformErrorResponse: (response) => {
                return response.data?.error || 'Failed to fetch coins';
            }
        }),
        getTrendingCoins: builder.query({
            query: () => '/search/trending',
            providesTags: ['Trending'],
            transformResponse: (response) => response.coins?.map(coin => coin.item) || []
        }),
        getCoinDetails: builder.query({
            query: (id) => `/coins/${id}?localization=false&tickers=false&market_data=true`,
            transformResponse: (response) => ({
                ...response,
            })
        })
    })
});

export const {useGetAllCoinsQuery,useGetCoinDetailsQuery,useGetTrendingCoinsQuery} = api;