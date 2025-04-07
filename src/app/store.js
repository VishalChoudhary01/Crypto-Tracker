import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import filtersReducer from "../features/filterSlice";  // Ensure import matches filename
import savedCoinsReducer from '../features/savedCoinsSlice'
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        filters: filtersReducer, 
        savedCoins:savedCoinsReducer 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware)
});