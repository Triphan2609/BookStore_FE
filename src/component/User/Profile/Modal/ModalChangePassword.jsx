import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../utils/axiosCustomize.js";
import { useState } from "react";

const ModalChangePassword = (props) => {
    const { show, setShowModalChangePassword } = props;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleClose = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowModalChangePassword(!show);
    };
    const handleSubmitChangePassword = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const response = await axios.post(
            "/changePassword",
            {
                oldPassword,
                newPassword,
                confirmNewPassword,
            },
            {
                headers: {
                    "access-token": `Bearer ${token}`,
                },
            }
        );

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            handleClose();
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label">
                                    Mật khẩu cũ
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(event) =>
                                        setOldPassword(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(event) =>
                                        setNewPassword(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(event) =>
                                        setConfirmNewPassword(
                                            event.target.value
                                        )
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
                        onClick={handleSubmitChangePassword}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalChangePassword;
