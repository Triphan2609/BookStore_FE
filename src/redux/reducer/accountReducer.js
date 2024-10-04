import { createSlice } from "@reduxjs/toolkit";

const accountReducer = createSlice({
    name: "accountReducer",
    initialState: {
        account: {
            id_taiKhoan: 0,
            email: "",
            tenTaiKhoan: "",
            tenNhanHang: "",
            diaChiNhanHang: "",
            SDTNhanHang: "",
        },
        isAuthenticated: false,
        isAdmin: false,
    },
    reducers: {
        LOGIN: (state, action) => {
            state.account.id_taiKhoan = action.payload.id_taiKhoan;
            state.account.email = action.payload.email;
            state.account.tenTaiKhoan = action.payload.tenTaiKhoan;
            state.account.tenNhanHang = action.payload.tenNhanHang;
            state.account.diaChiNhanHang = action.payload.diaChiNhanHang;
            state.account.SDTNhanHang = action.payload.SDTNhanHang;
            state.isAuthenticated = true;
        },
        ISADMIN: (state, action) => {
            state.isAdmin = action.payload;
        },
        LOGOUT: (state) => {
            state.account = {};
            state.isAuthenticated = false;
            state.isAdmin = false;
        },
        UPDATEINFO: (state, action) => {
            state.account.tenNhanHang = action.payload.tenNhanHang;
            state.account.diaChiNhanHang = action.payload.diaChiNhanHang;
            state.account.SDTNhanHang = action.payload.SDTNhanHang;
        },
    },
});

export const { LOGIN, LOGOUT, ISADMIN, UPDATEINFO } = accountReducer.actions;

export const selectAccount = (state) => state.accountReducer.account;
export const selectIsAuthenticated = (state) =>
    state.accountReducer.isAuthenticated;
export const selectIsAdmin = (state) => state.accountReducer.isAdmin;

export default accountReducer.reducer;
