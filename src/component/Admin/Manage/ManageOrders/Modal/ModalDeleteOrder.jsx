import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../../utils/axiosCustomize.js";

const ModalDeleteOrder = (props) => {
    const {
        show,
        setShowModalDelete,
        dataDelete,
        fetchOrdersWithPaginate,
        setCurrentPage,
    } = props;

    const handleClose = () => {
        setShowModalDelete(false);
    };

    const handleSubmitDelete = async () => {
        let response = await axios.delete(
            `/deleteOrder/${dataDelete.id_donHang}`
        );

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchOrdersWithPaginate(1);
            handleClose();
            setCurrentPage(1);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn xóa</Modal.Body>
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

export default ModalDeleteOrder;
