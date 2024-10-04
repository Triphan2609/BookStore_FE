import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosCustomize.js";

// Thunk fetch api
export const fetchAllCarts = createAsyncThunk(
    "fetchAllCarts",
    async (id_taiKhoan) => {
        try {
            const response = await axios(`/getCart/${id_taiKhoan}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed");
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    "updateCartQuantity",
    async ({ id_gioHang, soLuongSach }) => {
        try {
            const response = await axios.put(
                `/updateCartQuantity/${id_gioHang}`,
                {
                    soLuongSach,
                }
            );
            return response.data;
        } catch (error) {
            throw new Error("Failed to update quantity");
        }
    }
);

const getCarts = createSlice({
    name: "getCarts",
    initialState: {
        carts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCarts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCarts.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = action.payload;
            })
            .addCase(fetchAllCarts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const index = state.carts.findIndex(
                    (cart) => cart.id_gioHang === action.payload.id_gioHang
                );
                if (index !== -1) {
                    state.carts[index].soLuongSach = action.payload.soLuongSach;
                }
            });
    },
});

export default getCarts.reducer;

export const selectAllCarts = (state) => state.getCarts.carts;
