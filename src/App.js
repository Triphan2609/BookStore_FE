import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import User from "./component/User/User";
import HomePage from "./component/User/Home/HomePage";
import Login from "./component/User/Account/Login/Login";
import Register from "./component/User/Account/Register/Register";
import AllBooks from "./component/User/Books/AllBooks/AllBooks";
import Contact from "./component/User/Contact/Contact";
import BookDetail from "./component/User/Books/BookDetail/BookDetail";
import Cart from "./component/User/Cart/Cart";
import AllBooksOfCategory from "./component/User/Books/AllBooksOfCategory/AllBooksOfCategory";
import Admin from "./component/Admin/Admin";
import ManageBooks from "./component/Admin/Manage/ManageBooks/ManageBooks";
import ManageAccount from "./component/Admin/Manage/ManageUsers/ManageAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageCategory from "./component/Admin/Manage/ManageCategory/ManageCategory";
import SearchBook from "./component/User/Search/SearchBook";
import ManageOrders from "./component/Admin/Manage/ManageOrders/ManageOrders";
import Paid from "./component/User/Paid/Paid";
import Profile from "./component/User/Profile/Profile";
import HomeAdmin from "./component/Admin/Content/HomeAdmin";

function App() {
    let currentUrl = window.location.href;
    let newUrl = currentUrl.replace(/%20/g, "-");
    window.history.replaceState(null, "", newUrl);

    const [dataSearch, setDataSearch] = useState("");

    return (
        <>
            <Routes>
                <Route
                    path=""
                    exact
                    element={
                        <User
                            setDataSearch={setDataSearch}
                            dataSearch={dataSearch}
                        />
                    }
                >
                    <Route index element={<HomePage />} />
                    <Route path="tat-ca-san-pham" element={<AllBooks />} />
                    <Route
                        path="/the-loai/:maTheLoai"
                        element={<AllBooksOfCategory />}
                    />
                    <Route path="lien-he" element={<Contact />} />
                    <Route path="gio-hang" element={<Cart />} />
                    <Route path="/:tenSach" element={<BookDetail />} />
                    <Route
                        path="tim-kiem"
                        element={<SearchBook dataSearch={dataSearch} />}
                    />
                    <Route path="thanh-toan-thanh-cong" element={<Paid />} />
                    <Route path="trang-khach-hang" element={<Profile />} />
                </Route>

                <Route path="dang-nhap" element={<Login />} />
                <Route path="dang-ky" element={<Register />} />

                <Route path="admin" exact element={<Admin />}>
                    <Route index element={<HomeAdmin />} />
                    <Route
                        path="/admin/quan-ly-tai-khoan"
                        element={<ManageAccount />}
                    />
                    <Route
                        path="/admin/quan-ly-sach"
                        element={<ManageBooks />}
                    />
                    <Route
                        path="/admin/quan-ly-the-loai-sach"
                        element={<ManageCategory />}
                    />
                    <Route
                        path="/admin/quan-ly-don-hang"
                        element={<ManageOrders />}
                    />
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
