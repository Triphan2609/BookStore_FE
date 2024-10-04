import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./ExclusiveBook.scss";
import { Autoplay } from "swiper/modules";
const ExclusiveBook = () => {
    return (
        <>
            <div className="col-xl-12 col-lg-12 col-12">
                <div className="exclusive-book-container">
                    <div className="swiper-container">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={0}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            breakpoints={{
                                344: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                },
                                820: {
                                    slidesPerView: 3,
                                    spaceBetween: 0,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 0,
                                },
                                1500: { slidesPerView: 5, spaceBetween: 0 },
                            }}
                            className="mySwiper2"
                        >
                            <SwiperSlide>
                                <div className="image">
                                    <img
                                        className="lazyload img-responsive loaded"
                                        src="//bizweb.dktcdn.net/thumb/large/100/465/223/themes/877050/assets/picture_1.jpg?1714959329989"
                                        alt="Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="image">
                                    <img
                                        className="lazyload img-responsive loaded"
                                        src="//bizweb.dktcdn.net/thumb/large/100/465/223/themes/877050/assets/picture_2.jpg?1714959329989"
                                        alt="Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="image">
                                    <img
                                        className="lazyload img-responsive loaded"
                                        src="//bizweb.dktcdn.net/thumb/large/100/465/223/themes/877050/assets/picture_3.jpg?1714959329989"
                                        alt="Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="image">
                                    <img
                                        className="lazyload img-responsive loaded"
                                        src="//bizweb.dktcdn.net/thumb/large/100/465/223/themes/877050/assets/picture_4.jpg?1714959329989"
                                        alt="Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="image">
                                    <img
                                        className="lazyload img-responsive loaded"
                                        src="//bizweb.dktcdn.net/thumb/large/100/465/223/themes/877050/assets/picture_5.jpg?1714959329989"
                                        alt="Công ty TNHH văn hóa &amp; truyền thông Skybooks Việt Nam"
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExclusiveBook;
