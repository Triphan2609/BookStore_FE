import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../../utils/axiosCustomize.js";

const ModalDeleteCategory = (props) => {
    const {
        show,
        setShow,
        dataDelete,
        fetchAllCategoriesWithPaginate,
        setCurrentPage,
    } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDelete = async () => {
        let response = await axios.delete(
            `/deleteCategory/${dataDelete.maTheLoaiSach}`
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

export default ModalDeleteCategory;
