import { combineReducers } from "redux";
import getAllBooks from "./getAllBooks.js";
import getAllCategory from "./getAllCategory.js";
import getBookSortByDate from "./getBookSortByDate.js";
import getAllImagesBook from "./getAllImagesBook.js";
import accountReducer from "./accountReducer.js";
import getCarts from "./getCarts.js";
import totalPrice from "./totalPrice.js";

const rootReducer = combineReducers({
    getAllBooks: getAllBooks,
    getAllCategory: getAllCategory,
    getBookSortByDate: getBookSortByDate,
    getAllImagesBook: getAllImagesBook,
    getCarts: getCarts,
    accountReducer: accountReducer,
    totalPrice: totalPrice,
});

export default rootReducer;
