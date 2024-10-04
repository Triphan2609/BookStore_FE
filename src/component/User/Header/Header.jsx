import "./Header.scss";
// --- Icon ---
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllCategory,
    selectAllCategory,
} from "../../../redux/reducer/getAllCategory";
import { fetchBookSortByDate } from "../../../redux/reducer/getBookSortByDate";
import { changeString } from "../../../assets/js/handleFunc";
import {
    LOGOUT,
    selectAccount,
    selectIsAdmin,
    selectIsAuthenticated,
} from "../../../redux/reducer/accountReducer";
import axios from "../../../utils/axiosCustomize.js";
import {
    fetchAllCarts,
    selectAllCarts,
} from "../../../redux/reducer/getCarts.js";

export default function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataSearch, setDataSearch] = useState();
    const [isShowMenuRight, setShowMenuRight] = useState(true);
    const [isShowListBookSelf, setShowListBookSelf] = useState(true);
    const categoryBooks = useSelector(selectAllCategory);
    const account = useSelector(selectAccount);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const dataBooksCart = useSelector(selectAllCarts);

    useEffect(() => {
        dispatch(fetchAllCategory());
        dispatch(fetchAllCarts(account.id_taiKhoan));
    }, [dispatch, account.id_taiKhoan]);

    const handleShowListBookSelf = () => {
        const listBookself = document.querySelector(".list-bookself");
        if (isShowListBookSelf) {
            listBookself.style.display = "block";
            setShowListBookSelf(!isShowListBookSelf);
        } else {
            listBookself.style.display = "none";
            setShowListBookSelf(!isShowListBookSelf);
        }
    };
    const handleShowWrapMenuRight = (event) => {
        const wrapMenuRight = document.querySelector(".wrapmenu_right");
        const opacityMenu = document.querySelector(".opacity_menu");
        if (isShowMenuRight) {
            wrapMenuRight.classList.add("open_sidebar_menu");
            opacityMenu.classList.add("open_opacity");
            setShowMenuRight(!isShowMenuRight);
        } else {
            wrapMenuRight.classList.remove("open_sidebar_menu");
            opacityMenu.classList.remove("open_opacity");
            setShowMenuRight(!isShowMenuRight);
        }
        opacityMenu.addEventListener("click", (event) => {
            event.stopPropagation();
            wrapMenuRight.classList.remove("open_sidebar_menu");
            opacityMenu.classList.remove("open_opacity");
            setShowMenuRight(true);
        });
    };

    const handleLogout = (event) => {
        localStorage.removeItem("token");
        dispatch(LOGOUT());
    };

    const handleSubmitSearch = (event) => {
        props.setDataSearch(dataSearch);
        navigate("/tim-kiem");
    };

    const handleDeleteCart = async (book) => {
        await axios.delete(`/deleteCart/${book.id_gioHang}`);
        dispatch(fetchAllCarts(account.id_taiKhoan));
    };
    return (
        <header>
            <div className="opacity_menu"></div>
            {/* --- Topbar --- */}
            <div className="clearfix topbar d-none d-lg-block d-xl-block">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6  col-md-none d-lg-block d-sm-none">
                            <div className="time_contact">
                                <p className="hotline">
                                    <FaPhoneVolume />
                                    <span
                                        className="mx-2"
                                        style={{ margin: "0 5px" }}
                                    >
                                        Hotline:
                                    </span>
                                    <a
                                        className="phonenumber"
                                        href="tel:0398944226"
                                    >
                                        0398944226
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="cartsearch">
                                <div className="search d-flex align-items-center">
                                    <IoIosSearch size={"1.5em"} />
                                    <span>Tìm kiếm</span>
                                    <div className="boxsearch">
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                handleSubmitSearch();
                                            }}
                                            className="input-group search-bar"
                                        >
                                            <input
                                                type="text"
                                                name="query"
                                                required
                                                placeholder="Tìm kiếm..."
                                                className="input-group-field auto-search"
                                                onChange={(event) => {
                                                    setDataSearch(
                                                        event.target.value
                                                    );
                                                }}
                                            ></input>
                                            <button className=" btn icon-fallback-text">
                                                {props.dataSearch ? (
                                                    <Link
                                                        to={"/tim-kiem"}
                                                        onClick={
                                                            handleSubmitSearch
                                                        }
                                                    >
                                                        <IoSearch
                                                            size={"1.7em"}
                                                            color="#000"
                                                        />
                                                    </Link>
                                                ) : (
                                                    <IoSearch
                                                        size={"1.7em"}
                                                        color="#000"
                                                    />
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="account d-flex align-items-center">
                                    <FaRegUser size={"1.1em"} />
                                    <span
                                        className="mx-1"
                                        style={{ cursor: "default" }}
                                    >
                                        {isAuthenticated
                                            ? account.tenTaiKhoan
                                            : "Tài khoản"}
                                    </span>
                                    <div className="group_ac">
                                        {isAuthenticated ? (
                                            <>
                                                {isAdmin ? (
                                                    <NavLink
                                                        className="btnx"
                                                        to="/admin"
                                                    >
                                                        Quản lý
                                                    </NavLink>
                                                ) : (
                                                    ""
                                                )}
                                                <NavLink
                                                    to={"/trang-khach-hang"}
                                                >
                                                    Tài khoản
                                                </NavLink>
                                                <NavLink onClick={handleLogout}>
                                                    Đăng xuất
                                                </NavLink>
                                            </>
                                        ) : (
                                            <div>
                                                <NavLink
                                                    className="btnx"
                                                    to="/dang-nhap"
                                                >
                                                    Đăng nhập
                                                </NavLink>
                                                <NavLink to="/dang-ky">
                                                    Đăng ký
                                                </NavLink>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="cart d-flex align-items-center">
                                    <span className="count_item">
                                        {dataBooksCart?.length}
                                    </span>
                                    <NavLink
                                        className="text-light"
                                        to="/gio-hang"
                                    >
                                        <IoCartOutline size={"1.4em"} />

                                        <span className="mx-1 ">Giỏ hàng</span>
                                    </NavLink>

                                    <div className="top-cart-content">
                                        <ul
                                            id="cart-sidebar"
                                            className="mini-products-list count_li"
                                        >
                                            {dataBooksCart?.length > 0 ? (
                                                dataBooksCart?.map((book) => (
                                                    <li className="cart-item">
                                                        <div className="thumbnail">
                                                            <img
                                                                src={`http://localhost:8080/images/${book.thumbnail}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="detail">
                                                            <p
                                                                style={{
                                                                    lineHeight:
                                                                        "1.3",
                                                                }}
                                                            >
                                                                {book.tenSach}
                                                            </p>
                                                        </div>
                                                        <div className="quantity">
                                                            {book.soLuongSach}
                                                        </div>
                                                        <div className="price">
                                                            {Number.parseFloat(
                                                                book.giaSach
                                                            ).toLocaleString(
                                                                "vi-VN"
                                                            )}{" "}
                                                            VNĐ
                                                        </div>
                                                        <div className="action">
                                                            <MdDelete
                                                                size={"1.5rem"}
                                                                className="text-danger ms-2"
                                                                cursor={
                                                                    "pointer"
                                                                }
                                                                onClick={() =>
                                                                    handleDeleteCart(
                                                                        book
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </li>
                                                ))
                                            ) : (
                                                <div className="no-item">
                                                    <p>
                                                        Không có sản phẩm nào.
                                                    </p>
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- Main Header --- */}
            <div className="wraphead_mobile clearfix d-none d-lg-block d-xl-block">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="header-main">
                                <div className="wrap_main d-none d-lg-block d-xl-block">
                                    <div className="header-nav">
                                        <ul className="item_big nav-left hidden-xs hidden-sm">
                                            <li className="nav-item ">
                                                <NavLink
                                                    className="a-img"
                                                    to="/"
                                                    onClick={() => {
                                                        dispatch(
                                                            fetchBookSortByDate()
                                                        );
                                                    }}
                                                >
                                                    <span>Trang chủ</span>
                                                </NavLink>
                                            </li>

                                            <li className="nav-item ">
                                                <div className="list-brand">
                                                    <span>
                                                        Tủ sách thương hiệu
                                                    </span>
                                                    <i className="fa fa-caret-down"></i>
                                                </div>
                                                <ul className="item_small hidden-sm hidden-xs">
                                                    {categoryBooks?.map(
                                                        (category, index) => (
                                                            <li key={index}>
                                                                <NavLink
                                                                    to={`/the-loai/${category.maTheLoaiSach}`}
                                                                >
                                                                    {
                                                                        category.tenTheLoaiSach
                                                                    }
                                                                </NavLink>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul className="logo_center">
                                            <li className="logo">
                                                <NavLink
                                                    to="/"
                                                    className="logo-wrapper d-none d-sm-none d-md-none d-lg-block d-xl-block"
                                                >
                                                    <img
                                                        src="//bizweb.dktcdn.net/100/465/223/themes/877050/assets/logo.png?1714706765233"
                                                        alt="logo Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                                    />
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <ul className="item_big nav-right hidden-xs hidden-sm">
                                            <li className="nav-item ">
                                                <NavLink
                                                    className="a-img"
                                                    to="/tat-ca-san-pham"
                                                >
                                                    <span>Tất cả sản phẩm</span>
                                                </NavLink>
                                            </li>

                                            <li className="nav-item ">
                                                <NavLink
                                                    className="arguments-img"
                                                    to="/lien-he"
                                                >
                                                    <span>Liên hệ</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive */}
            <div className="wraphead_mobile clearfix d-sm-block d-md-block d-lg-none d-xl-none">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="header-main">
                                <div className="wrap_main d-sm-block d-md-block d-lg-none d-xl-none">
                                    <div className="header-nav">
                                        <ul className="logo_center">
                                            <li className="logo">
                                                <NavLink
                                                    to="/"
                                                    className="logo-wrapper"
                                                >
                                                    <img
                                                        src="//bizweb.dktcdn.net/100/465/223/themes/877050/assets/logo_mobi.png?1714706765233"
                                                        alt="logo Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                                    />
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="header_r d-sm-block d-md-block">
                                    <div className="cartsearch">
                                        <div className="carthd">
                                            <div className="mini-cart text-xs-center">
                                                <div className="heading-cart cart_header">
                                                    <Link
                                                        className="img_hover_cart"
                                                        to="/gio-hang"
                                                        title="Giỏ hàng"
                                                    >
                                                        <div className="icon_hotline">
                                                            <i>
                                                                <img
                                                                    src="//bizweb.dktcdn.net/100/465/223/themes/877050/assets/i_cart.png?1714706765233"
                                                                    alt="Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                                                />
                                                                <span className="count_item count_item_pr">
                                                                    {
                                                                        dataBooksCart?.length
                                                                    }
                                                                </span>
                                                            </i>
                                                            <span className="bolds cartext d-none d-sm-block d-md-block">
                                                                Giỏ hàng
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapmenu">
                                <div className="section margin-bottom-10 margin-top-15 a-left">
                                    <form
                                        className="input-group search-bar"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            handleSubmitSearch();
                                        }}
                                    >
                                        <input
                                            type="text"
                                            name="query"
                                            required
                                            placeholder="Tìm sản phẩm bạn mong muốn..."
                                            className="input-group-field auto-search"
                                            onChange={(event) => {
                                                setDataSearch(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        <button className=" btn icon-fallback-text">
                                            {props.dataSearch ? (
                                                <Link
                                                    to={"/tim-kiem"}
                                                    onClick={handleSubmitSearch}
                                                >
                                                    <IoSearch
                                                        size={"1.7em"}
                                                        color="#000"
                                                    />
                                                </Link>
                                            ) : (
                                                <IoSearch
                                                    size={"1.7em"}
                                                    color="#000"
                                                />
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <span className="menubutton d-block d-lg-none d-xl-none">
                <i
                    className="fas fa-bars"
                    onClick={(event) => handleShowWrapMenuRight(event)}
                ></i>
            </span>

            <div className="wrapmenu_right d-lg">
                <div className="wrapmenu">
                    <div className="wrapmenu_full menumain_full">
                        <div className="containers">
                            <div className="contenttop">
                                {isAuthenticated ? (
                                    <div className="section mb-2 mt-1">
                                        <Link
                                            to={"/trang-khach-hang"}
                                            className="btnx"
                                            onClick={handleShowWrapMenuRight}
                                        >
                                            {account.tenTaiKhoan}
                                        </Link>
                                        &nbsp;/&nbsp;
                                        <Link onClick={handleLogout}>
                                            Đăng xuất
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="section mb-2 mt-1">
                                        <Link className="btnx" to="/dang-nhap">
                                            Đăng nhập
                                        </Link>
                                        &nbsp;/&nbsp;
                                        <Link to="/dang-ky">Đăng ký</Link>
                                    </div>
                                )}
                            </div>
                            <div className="menu_mobile">
                                <ul className="ul_collections">
                                    <li className="level0 level-top parent">
                                        <NavLink
                                            to="/"
                                            onClick={handleShowWrapMenuRight}
                                        >
                                            Trang chủ
                                        </NavLink>
                                    </li>

                                    <li className="level0 level-top parent">
                                        <NavLink
                                            to="/tat-ca-san-pham"
                                            onClick={handleShowWrapMenuRight}
                                        >
                                            Tủ sách thương hiệu
                                        </NavLink>

                                        <i
                                            className="cursor-pointer fa fa-plus show-list-bookself"
                                            onClick={handleShowListBookSelf}
                                        ></i>
                                        <ul
                                            className="level0 list-bookself"
                                            style={{ display: "none" }}
                                        >
                                            {categoryBooks &&
                                                categoryBooks?.map(
                                                    (category, index) => (
                                                        <li
                                                            key={index}
                                                            className="level1 "
                                                        >
                                                            <NavLink
                                                                to={`/the-loai/${category.maTheLoaiSach}`}
                                                            >
                                                                {
                                                                    category.tenTheLoaiSach
                                                                }
                                                            </NavLink>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </li>

                                    <li className="level0 level-top parent">
                                        <Link
                                            onClick={handleShowWrapMenuRight}
                                            to="/lien-he"
                                        >
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
