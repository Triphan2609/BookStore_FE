import ReactPaginate from "react-paginate";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosCustomize.js";
import { changeString, scrollToTop } from "../../../../assets/js/handleFunc.js";
import "../Books.scss";
import { useSelector } from "react-redux";
import { selectAllCategory } from "../../../../redux/reducer/getAllCategory.js";
const AllBooksOfCategory = (props) => {
    const LIMIT_PAGE = 5;
    const { maTheLoai } = useParams();
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const categories = useSelector(selectAllCategory);

    const fetchAllBooksOfCategoryWithPaginate = async (data, page) => {
        let response = await axios.get(
            `/getAllBooksOfCategoryWithPag/${data}?page=${page}&limit=${LIMIT_PAGE}`
        );
        setBooks(response.data.data);
        setTotalPages(response.data.totalPages);
    };

    useEffect(() => {
        fetchAllBooksOfCategoryWithPaginate(maTheLoai, 1);
    }, [maTheLoai]);

    const handlePageClick = async (event) => {
        await fetchAllBooksOfCategoryWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    const categoryName = categories.filter(
        (category) => category.maTheLoaiSach === maTheLoai
    );

    return (
        <>
            <section className="bread-crumb">
                <span className="crumb-border"></span>
                <div className="container">
                    <div className="rows">
                        <div className="col-xs-12 a-left">
                            <ul className="breadcrumb">
                                <li className="home">
                                    <NavLink to="/">
                                        <span>Trang Chủ</span>
                                    </NavLink>
                                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                                </li>

                                <li>
                                    <span>
                                        {categoryName[0].tenTheLoaiSach}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div className="section wrap_background">
                <div className="container ">
                    <div className="bg_collection section">
                        <div className="row">
                            <div className="main_container collection col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="slider-items-products section">
                                    <div className="collectiontitle">
                                        <h1 className="cat-heading">
                                            {categoryName[0].tenTheLoaiSach}
                                        </h1>
                                    </div>
                                </div>
                                <div className="category-products products">
                                    <section className="products-view products-view-grid collection_reponsive list_hover_pro">
                                        <div className="row">
                                            {books?.map((book) => (
                                                <div
                                                    key={book.id_sach}
                                                    className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 product-col mb-3 "
                                                >
                                                    <div className="item_product_main item_option margin-bottom-15">
                                                        <div className="variants product-action">
                                                            <div className="product-thumbnail">
                                                                <NavLink
                                                                    className="image_thumb scale_hover"
                                                                    to={`/${changeString(
                                                                        book.tenSach
                                                                    )}`}
                                                                    onClick={
                                                                        scrollToTop
                                                                    }
                                                                >
                                                                    <img
                                                                        className="lazyload loaded"
                                                                        src={`http://localhost:8080/images/${book.thumbnail}`}
                                                                        alt={
                                                                            book.tenSach
                                                                        }
                                                                    />
                                                                </NavLink>
                                                            </div>
                                                            <div className="product-info">
                                                                <h3 className="product-name">
                                                                    <NavLink
                                                                        to={`/${changeString(
                                                                            book.tenSach
                                                                        )}`}
                                                                        onClick={
                                                                            scrollToTop
                                                                        }
                                                                    >
                                                                        {
                                                                            book.tenSach
                                                                        }
                                                                    </NavLink>
                                                                </h3>
                                                                <div className="price-box">
                                                                    <span>
                                                                        {Number.parseFloat(
                                                                            book.giaSach
                                                                        ).toLocaleString(
                                                                            "vi-VN"
                                                                        )}
                                                                        &nbsp;VNĐ
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="paginater-container"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={3}
                    pageCount={totalPages}
                    nextLabel=">"
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
};

export default AllBooksOfCategory;
