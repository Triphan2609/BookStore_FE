import { createSlice } from "@reduxjs/toolkit";

const totalPrice = createSlice({
    name: "totalPrice",
    initialState: {
        total: 0,
    },
    reducers: {
        INCREASEPRICE: (state, actions) => {
            state.total += actions.payload;
        },
        DECREASEPRICE: (state, actions) => {
            if (state.total !== 0) state.total -= actions.payload;
        },
        RESET: (state) => {
            state.total = 0;
        },
    },
});

export const { INCREASEPRICE, DECREASEPRICE, RESET } = totalPrice.actions;
export const selectTotalPrice = (state) => state.totalPrice.total;
export default totalPrice.reducer;
