import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../../utils/axiosCustomize.js";

const ModalDeleteBook = (props) => {
    const {
        show,
        setShowModalDelete,
        dataDelete,
        fetchAllBooksWithPaginate,
        setCurrentPage,
    } = props;

    const handleClose = () => {
        setShowModalDelete(false);
    };

    const handleSubmitDelete = async () => {
        let response = await axios.delete(`/deleteBook/${dataDelete.id_sach}`);

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }
        if (response.data && response.data.EC === 0) {
            toast.success(response.data.EM);
            handleClose();
            await fetchAllBooksWithPaginate(1);
            setCurrentPage(1);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa:{" "}
                    <b>
                        {dataDelete && dataDelete.tenSach
                            ? dataDelete.tenSach
                            : ""}
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

export default ModalDeleteBook;
