import axios from "../../../../../utils/axiosCustomize.js";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ModalCreateCategory = (props) => {
    const [validationErrors, setValidationErrors] = useState({});
    const [maTheLoaiSach, setMaTheLoaiSach] = useState();
    const [tenTheLoaiSach, setTenTheLoaiSach] = useState();
    const { show, setShow, fetchAllCategoriesWithPaginate, setCurrentPage } =
        props;

    const handleInputChange = (setter) => (event) => {
        const { value, files } = event.target;
        const fieldName = setter.name;

        setValidationErrors((prev) => ({
            ...prev,
            [fieldName]: !value && !files?.length,
        }));

        setter(files?.[0] || value);
    };

    const handleSubmitCreateCategory = async () => {
        let errors = {};
        if (!maTheLoaiSach) errors.maTheLoaiSach = true;
        if (!tenTheLoaiSach) errors.tenTheLoaiSach = true;
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const formData = new URLSearchParams();
        formData.append("maTheLoaiSach", maTheLoaiSach);
        formData.append("tenTheLoaiSach", tenTheLoaiSach);

        let response = await axios.post("/postCreateCategory", formData);

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchAllCategoriesWithPaginate(1);
            setCurrentPage(1);
            handleClose();
        }
    };

    const handleClose = () => {
        setShow(false);

        setValidationErrors({});
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tạo thể loại sách mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-5">
                            <label className="form-label">
                                Mã thể loại sách
                                {validationErrors.maTheLoaiSach && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.maTheLoaiSach &&
                                    !maTheLoaiSach
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: SJob"
                                value={maTheLoaiSach}
                                onChange={handleInputChange(setMaTheLoaiSach)}
                            />
                        </div>
                        <div className="col-md-7">
                            <label className="form-label">
                                Tên thể loại sách
                                {validationErrors.tenTheLoaiSach && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.tenTheLoaiSach &&
                                    !tenTheLoaiSach
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: Trạm hướng nghiệp"
                                value={tenTheLoaiSach}
                                onChange={handleInputChange(setTenTheLoaiSach)}
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
                        onClick={handleSubmitCreateCategory}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateCategory;
