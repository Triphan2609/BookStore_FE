import { Button, Modal, Table } from "react-bootstrap";

const ModalViewBooksInOrder = (props) => {
    const { show, setShow, dataView } = props;
    const handleClose = () => {
        setShow(false);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sách đã được đặt </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className="table table-hover table-bordered mt-3">
                        <thead>
                            <tr>
                                <th className="text-center fs-6" scope="col">
                                    ID
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Thumbnail
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Tên sách
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Tác giả
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Nhà XB
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    SL
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Giá sách
                                </th>
                            </tr>
                        </thead>

                        <tbody className="list-books-order">
                            {dataView &&
                                dataView?.length > 0 &&
                                dataView?.map((book, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">
                                                {book.id_sach}
                                            </td>
                                            <td className="text-center">
                                                <img
                                                    src={`http://localhost:8080/images/${book.thumbnail}`}
                                                    alt={book.tenSach}
                                                />
                                            </td>
                                            <td>{book.tenSach}</td>
                                            <td>{book.tacGia}</td>
                                            <td>{book.nhaXB}</td>
                                            <td className="text-center">
                                                {book.soLuongSach}
                                            </td>
                                            <td className="text-center">
                                                {Number.parseFloat(
                                                    book.giaSach
                                                ).toLocaleString("vi-VN")}{" "}
                                                VNĐ
                                            </td>
                                        </tr>
                                    );
                                })}
                            {dataView && dataView?.length === 0 && (
                                <tr>
                                    <td className="text-center" colSpan={8}>
                                        Không tìm thấy bất kỳ thể loại sách nào!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalViewBooksInOrder;
