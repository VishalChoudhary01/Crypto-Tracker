import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
    try {
        const savedCoins = JSON.parse(localStorage.getItem('savedCoins')) || [];
        return savedCoins.filter((value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );
    } catch (error) {
        return [];
    }
}

const savedCoinsSlice = createSlice({
    name: 'savedCoins',
    initialState: loadFromLocalStorage(),
    reducers: {
        toggleSavedCoin: (state, action) => {
            const exists = state.some(coin => coin.id === action.payload.id);
            let newState;
            if (exists) {
                newState = state.filter(coin => coin.id !== action.payload.id);
            } else {
                newState = [...state, action.payload];
            }
            localStorage.setItem('savedCoins', JSON.stringify(newState));
            return newState;
        },
    }
});

export const { toggleSavedCoin } = savedCoinsSlice.actions;
export default savedCoinsSlice.reducer;