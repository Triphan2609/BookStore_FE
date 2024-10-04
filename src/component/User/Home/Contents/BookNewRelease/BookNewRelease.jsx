import "./BookNewRelease.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBookSortByDate,
    selectBookSortByDate,
} from "../../../../../redux/reducer/getBookSortByDate";
import { useEffect } from "react";
import { changeString, scrollToTop } from "../../../../../assets/js/handleFunc";
import { NavLink } from "react-router-dom";
// import "./SlideShow.scss";
const BookNewRelease = () => {
    const dispatch = useDispatch();
    const booksNewRelease = useSelector(selectBookSortByDate);

    useEffect(() => {
        dispatch(fetchBookSortByDate());
    }, [dispatch]);

    return (
        <>
            <section className="book-new-release">
                <section className="section_category clearfix">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-12">
                                <div className="heading clearfix text-center">
                                    <h2>
                                        <span>SÁCH MỚI PHÁT HÀNH </span>
                                    </h2>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-12">
                                <div className="swiper-container">
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={20}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        breakpoints={{
                                            390: {
                                                slidesPerView: 2,
                                                spaceBetween: 5,
                                            },
                                            820: {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 15,
                                            },
                                        }}
                                        modules={[Pagination]}
                                        className="mySwiper2"
                                    >
                                        {booksNewRelease &&
                                            booksNewRelease.map((book) => (
                                                <SwiperSlide key={book.maSach}>
                                                    <div className="image">
                                                        <NavLink
                                                            to={`/${changeString(
                                                                book.tenSach
                                                            )}`}
                                                            title={book.tenSach}
                                                            onClick={
                                                                scrollToTop
                                                            }
                                                        >
                                                            <img
                                                                className="image_cate_thumb lazyload loaded"
                                                                src={`http://localhost:8080/images/${book.thumbnail}`}
                                                                alt={
                                                                    book.tenSach
                                                                }
                                                            />
                                                        </NavLink>

                                                        <div className="cate-content">
                                                            <NavLink
                                                                to={`/${changeString(
                                                                    book.tenSach
                                                                )}`}
                                                                title={
                                                                    book.tenSach
                                                                }
                                                                onClick={
                                                                    scrollToTop
                                                                }
                                                            >
                                                                <h3 className="title_cate">
                                                                    {
                                                                        book.tenSach
                                                                    }
                                                                </h3>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default BookNewRelease;
