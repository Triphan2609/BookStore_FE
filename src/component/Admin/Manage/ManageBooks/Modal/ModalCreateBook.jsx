import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../../utils/axiosCustomize.js";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllCategory,
    selectAllCategory,
} from "../../../../../redux/reducer/getAllCategory.js";

const ModalCreateBook = (props) => {
    const { show, setShow, fetchAllBooksWithPaginate, setCurrentPage } = props;

    const [tenSach, setTenSach] = useState("");
    const [tacGia, setTacGia] = useState("");
    const [nhaXB, setNhaXB] = useState("");
    const [nguoiDich, setNguoiDich] = useState("");
    const [namXB, setNamXB] = useState(new Date().getFullYear());
    const [ngonNgu, setNgonNgu] = useState("Tiếng việt");
    const [trongLuongGr, setTrongLuongGr] = useState();
    const [kichThuocBaoBi, setKichThuocBaoBi] = useState();
    const [soTrang, setSoTrang] = useState();
    const [giaSach, setGiaSach] = useState();
    const [soLuongTonKho, setSoLuongTonKho] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [hinhThucSach, setHinhThucSach] = useState("Bìa mềm");
    const [maTheLoaiSach, setTheLoaiSach] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const categoryBooks = useSelector(selectAllCategory);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    const handleClose = () => {
        setTenSach("");
        setTacGia("");
        setNhaXB("");
        setNguoiDich("");
        setTrongLuongGr("");
        setKichThuocBaoBi("");
        setSoTrang("");
        setGiaSach("");
        setSoLuongTonKho("");
        setThumbnail("");
        setTheLoaiSach("");
        setValidationErrors({});
        setShow(!show);
    };

    const handleSubmitCreateAccount = async () => {
        let errors = {};
        if (!tenSach) errors.tenSach = true;
        if (!tacGia) errors.tacGia = true;
        if (!nhaXB) errors.nhaXB = true;
        if (!namXB) errors.namXB = true;
        if (!ngonNgu) errors.ngonNgu = true;
        if (!trongLuongGr) errors.trongLuongGr = true;
        if (!kichThuocBaoBi) errors.kichThuocBaoBi = true;
        if (!soTrang) errors.soTrang = true;
        if (!giaSach) errors.giaSach = true;
        if (!soLuongTonKho) errors.soLuongTonKho = true;
        if (!thumbnail) errors.thumbnail = true;
        if (!maTheLoaiSach) errors.maTheLoaiSach = true;

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("tenSach", tenSach);
        formData.append("tacGia", tacGia);
        formData.append("nhaXB", nhaXB);
        formData.append("nguoiDich", nguoiDich);
        formData.append("namXB", namXB);
        formData.append("ngonNgu", ngonNgu);
        formData.append("trongLuongGr", trongLuongGr);
        formData.append("kichThuocBaoBi", kichThuocBaoBi);
        formData.append("soTrang", soTrang);
        formData.append("giaSach", giaSach);
        formData.append("soLuongTonKho", soLuongTonKho);
        formData.append("thumbnail", thumbnail);
        formData.append("hinhThucSach", hinhThucSach);
        formData.append("maTheLoaiSach", maTheLoaiSach);

        let response = await axios.post("/postCreateBook", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            await fetchAllBooksWithPaginate(1);
            toast.success(response.data.EM);
            setCurrentPage(1);
            handleClose();
        }
    };

    const handleInputChange = (setter) => (event) => {
        const { value, files } = event.target;
        const fieldName = setter.name;

        setValidationErrors((prev) => ({
            ...prev,
            [fieldName]: !value && !files?.length,
        }));

        setter(files?.[0] || value);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                className="modal-add-users"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">
                                Tên sách
                                {validationErrors.tenSach && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.tenSach && !tenSach
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: Đam mê hái được tiền"
                                value={tenSach}
                                onChange={handleInputChange(setTenSach)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Tác giả
                                {validationErrors.tacGia && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.tacGia && !tacGia
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: Phan Thanh Trí"
                                value={tacGia}
                                onChange={handleInputChange(setTacGia)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Nhà xuất bản
                                {validationErrors.nhaXB && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.nhaXB && !nhaXB
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: Thế giới"
                                value={nhaXB}
                                onChange={handleInputChange(setNhaXB)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Người dịch {"(nếu có)"}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="VD: Phan Thanh Trí"
                                value={nguoiDich}
                                onChange={handleInputChange(setNguoiDich)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Thể loại sách
                                {validationErrors.maTheLoaiSach && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <select
                                className={`form-select ${
                                    validationErrors.maTheLoaiSach &&
                                    !maTheLoaiSach
                                        ? "is-invalid"
                                        : ""
                                }`}
                                value={maTheLoaiSach}
                                onChange={handleInputChange(setTheLoaiSach)}
                            >
                                <option value="">Chọn thể loại</option>
                                {categoryBooks &&
                                    categoryBooks?.map((book) => (
                                        <option
                                            key={book.maTheLoaiSach}
                                            value={book.maTheLoaiSach}
                                        >
                                            {book.tenTheLoaiSach}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">
                                Năm xuất bản
                                {validationErrors.namXB && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.namXB && !namXB
                                        ? "is-invalid"
                                        : ""
                                }`}
                                value={namXB}
                                onChange={handleInputChange(setNamXB)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Kích thước bao bì
                                {validationErrors.kichThuocBaoBi && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.kichThuocBaoBi &&
                                    !kichThuocBaoBi
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: 21 x 14.5 x 1.1"
                                value={kichThuocBaoBi}
                                onChange={handleInputChange(setKichThuocBaoBi)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                Ngôn ngữ
                                {validationErrors.ngonNgu && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.ngonNgu && !ngonNgu
                                        ? "is-invalid"
                                        : ""
                                }`}
                                value={ngonNgu}
                                onChange={handleInputChange(setNgonNgu)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">
                                Trọng lượng
                                {validationErrors.trongLuongGr && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.trongLuongGr &&
                                    !trongLuongGr
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: 190 (Gr)"
                                value={trongLuongGr}
                                onChange={handleInputChange(setTrongLuongGr)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">
                                Số trang
                                {validationErrors.soTrang && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.soTrang && !soTrang
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: 200"
                                value={soTrang}
                                onChange={handleInputChange(setSoTrang)}
                            />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">
                                Số lượng tồn
                                {validationErrors.soLuongTonKho && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.soLuongTonKho &&
                                    !soLuongTonKho
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: 33"
                                value={soLuongTonKho}
                                onChange={handleInputChange(setSoLuongTonKho)}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">
                                Hình thức sách
                                {validationErrors.hinhThucSach && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <select
                                className="form-select"
                                value={hinhThucSach}
                                onChange={handleInputChange(setHinhThucSach)}
                            >
                                <option value="Bìa mềm">Bìa mềm</option>
                                <option value="Bìa cứng">Bìa cứng</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Giá sách
                                {validationErrors.giaSach && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.giaSach && !giaSach
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: 200,000"
                                value={giaSach}
                                onChange={handleInputChange(setGiaSach)}
                            />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label">
                                Ảnh bìa sách
                                {validationErrors.thumbnail && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="file"
                                multiple
                                className={`form-control ${
                                    validationErrors.thumbnail && !thumbnail
                                        ? "is-invalid"
                                        : ""
                                }`}
                                onChange={(event) =>
                                    setThumbnail(event.target.files[0])
                                }
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmitCreateAccount}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateBook;
