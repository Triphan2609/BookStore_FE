import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosCustomize.js";

// Thunk fetch api
export const fetchAllBook = createAsyncThunk("fetchAllBook", async () => {
    try {
        const response = await axios.get("/getAllBooks");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch books");
    }
});

const getAllBooks = createSlice({
    name: "getAllBooks",
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchAllBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default getAllBooks.reducer;

export const selectAllBooks = (state) => state.getAllBooks.books;
