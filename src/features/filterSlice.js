import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: "inr",
    activeSection: 'all',
    sortBy: 'market_cap_desc',
    perPage: 10,
    page: 1,
    searchQuery: "",
    selectedCoinId: null,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        resetFilters: () => initialState,
        setSelectedCoinId: (state, action) => {
            state.selectedCoinId = action.payload;
        },
    }
});

export const { 
    setCurrency, 
    setActiveSection, 
    setSortBy, 
    setPage, 
    setPerPage, 
    resetFilters,
    setSearchQuery,
    setSelectedCoinId
} = filtersSlice.actions;

export default filtersSlice.reducer;