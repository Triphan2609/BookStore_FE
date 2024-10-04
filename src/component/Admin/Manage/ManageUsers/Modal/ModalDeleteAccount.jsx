import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../../utils/axiosCustomize.js";

const ModalDeleteAccount = (props) => {
    const {
        show,
        setShow,
        dataDelete,
        fetchAccountWithPaginate,
        setCurrentPage,
    } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDelete = async () => {
        let response = await axios.delete(
            `/deleteAccount/${dataDelete.id_taiKhoan}`
        );

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            handleClose();
            await fetchAccountWithPaginate(1);
            setCurrentPage(1);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa:{" "}
                    <b>
                        {dataDelete && dataDelete.email ? dataDelete.email : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDelete}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteAccount;
