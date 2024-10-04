import axios from "../../../../../utils/axiosCustomize.js";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUpdateAccount = (props) => {
    const [validationErrors, setValidationErrors] = useState({});
    const [tenTaiKhoan, setTenTaiKhoan] = useState();
    const {
        show,
        setShow,
        dataUpdate,
        setCurrentPage,
        fetchAccountWithPaginate,
    } = props;

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setTenTaiKhoan(dataUpdate.tenTaiKhoan);
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

    const handleSubmitUpdateAccount = async () => {
        let errors = {};
        if (!tenTaiKhoan) errors.tenTaiKhoan = true;
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const formData = new URLSearchParams();
        formData.append("tenTaiKhoan", tenTaiKhoan);

        let response = await axios.put(
            `/updateAccount/${dataUpdate.id_taiKhoan}`,
            formData
        );

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchAccountWithPaginate(1);
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
                    <Modal.Title>Cập nhật tài khoản </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">
                                Tài khoản ID
                                {validationErrors.id_taiKhoan && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                disabled
                                className={`form-control`}
                                value={dataUpdate.id_taiKhoan}
                            />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label">
                                Tên tài khoản
                                {validationErrors.tenTaiKhoan && (
                                    <span className="text-danger">*</span>
                                )}
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    validationErrors.tenTaiKhoan && !tenTaiKhoan
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="VD: Trạm hướng nghiệp"
                                value={tenTaiKhoan}
                                onChange={handleInputChange(setTenTaiKhoan)}
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
                        onClick={handleSubmitUpdateAccount}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateAccount;
