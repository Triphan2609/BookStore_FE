import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosCustomize.js";

// Thunk fetch api
export const fetchAllCategory = createAsyncThunk(
    "fetchAllCategory",
    async () => {
        try {
            const response = await axios.get("/getCategoryBook");
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch books");
        }
    }
);

const getAllCategory = createSlice({
    name: "getAllCategory",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload; // Gán dữ liệu từ action payload vào state.books
            })
            .addCase(fetchAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default getAllCategory.reducer;

export const selectAllCategory = (state) => state.getAllCategory.categories;
