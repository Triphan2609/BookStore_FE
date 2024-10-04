import "./BookDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    fetchAllBook,
    selectAllBooks,
} from "../../../../redux/reducer/getAllBooks";
import {
    fetchAllImagesBook,
    selectAllImagesBook,
} from "../../../../redux/reducer/getAllImagesBook";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeString, scrollToTop } from "../../../../assets/js/handleFunc";
import { useEffect, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import BookNewRelease from "../../Home/Contents/BookNewRelease/BookNewRelease";
import axios from "../../../../utils/axiosCustomize.js";
import {
    selectAccount,
    selectIsAuthenticated,
} from "../../../../redux/reducer/accountReducer.js";
import { fetchAllCarts } from "../../../../redux/reducer/getCarts.js";

const BookDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { tenSach } = useParams();
    const [descBook, setDescBook] = useState();
    const [quantity, setQuantity] = useState(1);
    const account = useSelector(selectAccount);
    const books = useSelector(selectAllBooks);
    const imgsBook = useSelector(selectAllImagesBook);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const updatedBooks = books.filter((book) => {
        return changeString(book.tenSach) === tenSach;
    });
    const [data, setData] = useState(
        updatedBooks.length > 0 ? updatedBooks[0] : {}
    );
    // fetchAPI
    const fetchDescription = async (id) => {
        const response = await axios.get(`/getDescriptionBook/${id}`);
        setDescBook(
            response.data[0]?.noiDung || "Hiện tại nội dung chưa cập nhật"
        );
    };

    useEffect(() => {
        if (updatedBooks.length > 0) {
            setData(updatedBooks[0]);
        }
    }, [updatedBooks]);

    useEffect(() => {
        dispatch(fetchAllBook());
        dispatch(fetchAllImagesBook(data.id_sach));
    }, [dispatch, data.id_sach, tenSach]);

    useEffect(() => {
        fetchDescription(data.id_sach);
    }, [data.id_sach, tenSach]);

    const handleIncrease = (max) => {
        if (quantity <= max) setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
    };

    const handleChange = (event) => {
        const value = Math.max(1, Number(event.target.value));
        setQuantity(value);
    };

    const handleAddToCart = async (book) => {
        if (isAuthenticated) {
            const formData = new URLSearchParams();
            formData.append("id_taiKhoan", account.id_taiKhoan);
            formData.append("id_sach", book.id_sach);
            formData.append("soLuongSach", quantity);
            await axios.post("/postCreateCart", formData);
            dispatch(fetchAllCarts(account.id_taiKhoan));
        } else navigate("/dang-nhap");
    };

    const handleBuyBook = async (book) => {
        if (isAuthenticated) {
            const formData = new URLSearchParams();
            formData.append("id_taiKhoan", account.id_taiKhoan);
            formData.append("id_sach", book.id_sach);
            formData.append("soLuongSach", quantity);
            const response = await axios.post("/postCreateCart", formData);
            dispatch(fetchAllCarts(account.id_taiKhoan));
            if (response.data.EC === 0) {
                navigate("/gio-hang");
            }
        } else navigate("/dang-nhap");
    };
    return (
        <>
            <div className="section wrap-padding-15 wp_product_main clearfix">
                <div className="details-product section">
                    <div
                        className="bg_product clearfix lazyload"
                        style={{
                            backgroundImage:
                                "url('//bizweb.dktcdn.net/100/465/223/themes/877050/assets/bg-top-product.jpg?1715681543062')",
                        }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="product-detail-left product-images col-xs-12 col-sm-12 col-md-12 col-lg-5 col-lg-5-pro">
                                    <div className="wrapbb">
                                        <div className="clearfix mb-5">
                                            <div className="swiper-container slide-show-images">
                                                <Swiper
                                                    style={{
                                                        "--swiper-navigation-color":
                                                            "#38a8ea",
                                                        "--swiper-pagination-color":
                                                            "#38a8ea",
                                                    }}
                                                    spaceBetween={5}
                                                    navigation={true}
                                                    modules={[
                                                        FreeMode,
                                                        Navigation,
                                                    ]}
                                                    className="mySwiper2"
                                                >
                                                    {imgsBook &&
                                                        imgsBook?.map(
                                                            (img, index) => (
                                                                <SwiperSlide>
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={`http://localhost:8080/images/${img.hinhAnh}`}
                                                                        alt=""
                                                                    />
                                                                </SwiperSlide>
                                                            )
                                                        )}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {updatedBooks.map((book) => (
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 col-lg-7-pro details-pro">
                                        <form
                                            id="add-to-cart-form"
                                            className="form-inline"
                                        >
                                            <div className="fw w_100">
                                                <div className="title_p clearfix">
                                                    <h1 className="title-product">
                                                        {book.tenSach}
                                                    </h1>
                                                </div>

                                                <div className="product-summary">
                                                    <div className="rte">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <th>
                                                                        Thể loại
                                                                        sách
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.tenTheLoaiSach
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Tác giả
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.tacGia
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                {book.nguoiDich && (
                                                                    <tr>
                                                                        <th>
                                                                            Người
                                                                            dịch
                                                                        </th>
                                                                        <td>
                                                                            {
                                                                                book.nguoiDich
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                                <tr>
                                                                    <th>NXB</th>
                                                                    <td>
                                                                        {
                                                                            book.nhaXB
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Năm XB
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.namXB
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Ngôn Ngữ
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.ngonNgu
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Trọng
                                                                        lượng
                                                                        (gr)
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.trongLuongGr
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Kích
                                                                        Thước
                                                                        Bao Bì
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.kichThuocBaoBi
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Số trang
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.soTrang
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        Hình
                                                                        thức
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            book.hinhThucSach
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-product">
                                                <div className="price_quantity">
                                                    <div className="clearfix form-group  ">
                                                        <div className="custom custom-btn-number show">
                                                            <label className="sl section">
                                                                Số lượng:
                                                            </label>
                                                            <div className="input_number_product custom-btn-number form-control">
                                                                <button
                                                                    className="btn_num num_1"
                                                                    type="button"
                                                                    onClick={
                                                                        handleDecrease
                                                                    }
                                                                >
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    id="qtym"
                                                                    min={1}
                                                                    value={
                                                                        quantity
                                                                    }
                                                                    maxLength="3"
                                                                    className="form-control prd_quantity"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                />
                                                                <button
                                                                    className="btn_num num_2"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleIncrease(
                                                                            book.soLuongTonKho
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="special-price">
                                                        <span className="price product-price">
                                                            {Number.parseFloat(
                                                                book.giaSach
                                                            ).toLocaleString(
                                                                "vi-VN"
                                                            )}{" "}
                                                            VNĐ
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btn-mua button_actions clearfix">
                                                <button
                                                    className="btn btn_base"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        scrollToTop();
                                                        handleAddToCart(book);
                                                    }}
                                                >
                                                    <span className="txt-main text_1">
                                                        Thêm vào giỏ hàng
                                                    </span>
                                                </button>
                                                <button
                                                    className="btn  btn_base"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        scrollToTop();
                                                        handleBuyBook(book);
                                                    }}
                                                >
                                                    <span className="txt-main text_1">
                                                        Mua ngay
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-12">
                                <div className="tab_h">
                                    <div className="section bg_white">
                                        <div className="product-tab e-tabs not-dqtab">
                                            <ul className="tabs tabs-title clearfix">
                                                <li
                                                    className="tab-link active"
                                                    data-tab="#tab-1"
                                                >
                                                    <h2 className="title-head margin-top-0 cate">
                                                        <span>
                                                            Mô tả sản phẩm
                                                        </span>
                                                    </h2>
                                                </li>
                                            </ul>
                                            <div className="tab-float">
                                                <div
                                                    id="tab-1"
                                                    className="tab-content active content_extab"
                                                >
                                                    <div className="rte product_getcontent">
                                                        <div id="content">
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: descBook,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-12">
                                    <BookNewRelease />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookDetail;
