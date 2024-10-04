import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosCustomize.js";

// Thunk fetch api
export const fetchAllImagesBook = createAsyncThunk(
    "fetchAllImagesBook",
    async (id_sach) => {
        try {
            const response = await axios.get(`/getImagesBook/${id_sach}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed");
        }
    }
);

const getAllImagesBook = createSlice({
    name: "getAllImagesBook",
    initialState: {
        images: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllImagesBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllImagesBook.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchAllImagesBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default getAllImagesBook.reducer;

export const selectAllImagesBook = (state) => state.getAllImagesBook.images;
