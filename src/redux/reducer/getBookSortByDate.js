import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosCustomize.js";

// Thunk fetch api
export const fetchBookSortByDate = createAsyncThunk(
    "fetchBookSortByDate",
    async () => {
        try {
            const response = await axios.get("/getBookSortByDate");
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch book sort by date");
        }
    }
);

const getBookSortByDate = createSlice({
    name: "getBookSortByDate",
    initialState: {
        bookOrderByDate: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookSortByDate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookSortByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.bookOrderByDate = action.payload; // Gán dữ liệu từ action payload vào state.books
            })
            .addCase(fetchBookSortByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default getBookSortByDate.reducer;

export const selectBookSortByDate = (state) =>
    state.getBookSortByDate.bookOrderByDate;
