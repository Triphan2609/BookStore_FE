import axios from "../../../../../utils/axiosCustomize.js";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUpdateCategory = (props) => {
    const [validationErrors, setValidationErrors] = useState({});
    const [maTheLoaiSach, setMaTheLoaiSach] = useState();
    const [tenTheLoaiSach, setTenTheLoaiSach] = useState();
    const {
        show,
        setShow,
        dataUpdate,
        setCurrentPage,
        fetchAllCategoriesWithPaginate,
    } = props;

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setMaTheLoaiSach(dataUpdate.maTheLoaiSach);
            setTenTheLoaiSach(dataUpdate.tenTheLoaiSach);
        }
    }, [dataUpdate]);

    const handleInputChange = (setter) => (event) => {
        const { value, files } = event.target;
        const fieldName = setter.name;

        setValidationErrors((prev) => ({
            ...prev,
            [fieldName]: !value && !files?.length,
        }));

        setter(files?.[0] || value);
    };

    const handleSubmitUpdateCategory = async () => {
        let errors = {};
        if (!maTheLoaiSach) errors.maTheLoaiSach = true;
        if (!tenTheLoaiSach) errors.tenTheLoaiSach = true;
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const formData = new URLSearchParams();
        formData.append("tenTheLoaiSach", tenTheLoaiSach);

        let response = await axios.put(
            `/updateCategory/${maTheLoaiSach}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

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
            <Modal show={show} onHide={handleClose} size="none">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thể loại sách </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">
                                Mã thể loại sách
                            </label>
                            <input
                                type="text"
                                disabled
                                className={`form-control `}
                                placeholder="VD: SJob"
                                value={maTheLoaiSach}
                            />
                        </div>
                        <div className="col-md-8">
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
                        onClick={handleSubmitUpdateCategory}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateCategory;
