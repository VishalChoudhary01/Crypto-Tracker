import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: "usd",
    activeSection: 'all',
    sortBy: 'market_cap_desc',
    perPage: 20,
    page: 1,
    
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
        resetFilters: (state) => {
            return initialState;
        }
    }
});

export const { setCurrency, setActiveSection, setPage, setSortBy, setPerPage, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
