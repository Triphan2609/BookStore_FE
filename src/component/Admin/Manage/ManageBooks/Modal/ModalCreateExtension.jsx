import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../../../../utils/axiosCustomize.js";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const ModalCreateExtension = (props) => {
    const {
        show,
        setShow,
        dataExtension,
        fetchAllBooksWithPaginate,
        setCurrentPage,
    } = props;
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState("");
    const handleClose = () => {
        setShow(!show);
        setFiles([]);
        setContent("");
    };

    const handleSubmit = async () => {
        const formDataImage = new FormData();
        formDataImage.append("id_sach", dataExtension.id_sach);
        for (let i = 0; i < files.length; i++) {
            formDataImage.append("images", files[i]);
        }

        const responseImg = await axios.post("/postImagesBook", formDataImage);

        if (responseImg.data.EC !== 0) {
            toast.error("Thêm vào hình của bạn");
            return;
        }

        if (responseImg.data.EC === 0) {
            toast.success("Thêm hình ảnh sách thành công!");
        }

        if (content !== "" && content !== "<p><br></p>") {
            const responseDesc = await axios.post("/postDescBook", {
                id_sach: dataExtension.id_sach,
                noiDung: content.trim(),
            });

            if (responseDesc.data.EC !== 0) {
                toast.error("Nội dung sách đã được tạo từ trước!");
                return;
            }
            if (responseDesc.data.EC === 0)
                toast.success("Thêm nội dung sách thành công!");
        }

        await fetchAllBooksWithPaginate(1);
        setCurrentPage(1);
        handleClose();
    };

    // Config Toolbar Quill
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ align: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],

        ["clean"], // remove formatting button
    ];

    const modules = {
        toolbar: toolbarOptions,
    };

    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Thêm mới hình ảnh và nội dung sách
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-2">
                            <label className="form-label ">ID Sách</label>
                            <input
                                type="text"
                                className="form-control text-center"
                                disabled
                                value={dataExtension.id_sach}
                            />
                        </div>
                        <div className="col-md-10">
                            <label className="form-label ">Tên sách</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={dataExtension.tenSach}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">
                                Thêm hình ảnh sách (có thể thêm nhiều cùng lúc)
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                multiple
                                onChange={(event) =>
                                    setFiles(event.target.files)
                                }
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">
                                Thêm nội dung sách (nội dụng đã tạo từ trước
                                không tiếp tục thêm vào, chỉ có thể xóa đi rồi
                                thêm mới hoặc chỉnh sửa nội dụng)
                            </label>
                            <ReactQuill
                                modules={modules}
                                style={{
                                    height: "200px",
                                    marginBottom: "40px",
                                }}
                                value={content}
                                onChange={setContent}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateExtension;
