import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../utils/axiosCustomize.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    UPDATEINFO,
    selectAccount,
} from "../../../../redux/reducer/accountReducer.js";

const ModalChangeInformation = (props) => {
    const dispatch = useDispatch();
    const account = useSelector(selectAccount);
    const { show, setShowModalChangeInformation } = props;
    const [tenNhanHang, setTenNhanHang] = useState(account?.tenNhanHang);
    const [diaChiNhanHang, setDiaChiNhanHang] = useState(
        account?.diaChiNhanHang
    );
    const [SDTNhanHang, setSDTNhanHang] = useState(account?.SDTNhanHang);
    const handleClose = () => {
        setShowModalChangeInformation(!show);
    };

    const handleSubmitAddInfor = async (event) => {
        event.preventDefault();

        const response = await axios.put(
            `/addInformations/${account.id_taiKhoan}`,
            {
                tenNhanHang,
                diaChiNhanHang,
                SDTNhanHang,
            }
        );
        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            dispatch(UPDATEINFO(response.data.DATA));
            toast.success(response.data.EM);
            handleClose();
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin giao hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label">
                                    Họ và tên người nhận hàng
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={tenNhanHang}
                                    onChange={(event) =>
                                        setTenNhanHang(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={SDTNhanHang}
                                    onChange={(event) =>
                                        setSDTNhanHang(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">
                                    Địa chỉ nhận hàng
                                </label>
                                <textarea
                                    className="form-control"
                                    value={diaChiNhanHang}
                                    onChange={(event) =>
                                        setDiaChiNhanHang(event.target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{
                            fontWeight: "700",
                            color: "#38a8ea",
                            background: "#fff",
                        }}
                        onClick={handleClose}
                    >
                        Hủy
                    </Button>
                    <Button
                        style={{
                            fontWeight: "700",
                            color: "#fff",
                            background: "#38a8ea",
                        }}
                        onClick={handleSubmitAddInfor}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalChangeInformation;
