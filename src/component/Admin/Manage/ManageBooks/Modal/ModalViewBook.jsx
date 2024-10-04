import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Button, Modal } from "react-bootstrap";
import {
    fetchAllImagesBook,
    selectAllImagesBook,
} from "../../../../../redux/reducer/getAllImagesBook";

const ModalViewBook = (props) => {
    const dispatch = useDispatch();
    const { show, setShowModalView, dataView } = props;
    const imgsBook = useSelector(selectAllImagesBook);
    const handleClose = () => {
        setShowModalView(!show);
    };

    useEffect(() => {
        dispatch(fetchAllImagesBook(dataView.id_sach));
    }, [dispatch, dataView.id_sach]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                className="modal-view-book"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên sách</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.tenSach}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Tác giả</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.tacGia}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Nhà xuất bản</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.nhaXB}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Người dịch</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control`}
                                value={
                                    dataView.nguoiDich
                                        ? dataView.nguoiDich
                                        : "Không có"
                                }
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Thể loại sách</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control`}
                                value={dataView.tenTheLoaiSach}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Năm xuất bản</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.namXB}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Kích thước bao bì
                            </label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.kichThuocBaoBi}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Ngôn ngữ</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.ngonNgu}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Trọng lượng</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.trongLuongGr}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Số trang</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.soTrang}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Số lượng tồn</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.soLuongTonKho}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Hình thức sách</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={dataView.hinhThucSach}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label">Giá sách(VNĐ)</label>
                            <input
                                type="text"
                                disabled
                                className={`form-control text-center`}
                                value={Number.parseFloat(
                                    dataView.giaSach
                                ).toLocaleString("vi-VN")}
                            />
                        </div>
                        <div className="col-md-12 img-slide">
                            <label className="form-label">Hình ảnh sách</label>
                            <div className="swiper-container slide-show-images">
                                <Swiper
                                    style={{
                                        "--swiper-navigation-color": "#38a8ea",
                                        "--swiper-pagination-color": "#38a8ea",
                                    }}
                                    spaceBetween={5}
                                    navigation={true}
                                    modules={[FreeMode, Navigation]}
                                    className="mySwiper2"
                                >
                                    {imgsBook &&
                                        imgsBook?.map((img) => (
                                            <SwiperSlide key={img.id_hinhAnh}>
                                                <img
                                                    src={`http://localhost:8080/images/${img.hinhAnh}`}
                                                    alt=""
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#fff",
                            backgroundColor: "#38a8ea",
                        }}
                    >
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalViewBook;
