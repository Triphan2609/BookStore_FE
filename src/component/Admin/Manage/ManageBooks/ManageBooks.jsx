import React from "react";
import "./ManageBooks.scss";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosCustomize.js";
import TableBooks from "./TableBooks";
import ModalDeleteBook from "./Modal/ModalDeleteBook.jsx";
import ModalCreateBook from "./Modal/ModalCreateBook.jsx";
import ModalCreateExtension from "./Modal/ModalCreateExtension.jsx";
import ModalViewBook from "./Modal/ModalViewBook.jsx";
import ModalUpdateBook from "./Modal/ModalUpdateBook.jsx";

const ManageBooks = () => {
    const LIMIT_PAGE = 3;
    const [fetchBook, setFetchBook] = useState(true);
    const [showModalCreateBook, setShowModalCreateBook] = useState(false);
    const [showModalCreateImages, setShowModalCreateImages] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [listBooks, setListBooks] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [dataDelete, setDataDelete] = useState({});
    const [dataExtension, setDataExtension] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [dataFilter, setDataFilter] = useState("");
    const [isFiltering, setIsFiltering] = useState(false);
    const [totalPages, settotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAllBooksWithPaginate = async (page) => {
        let response = await axios.get(
            `/getAllBooksWithPaginations?page=${page}&limit=${LIMIT_PAGE}`
        );

        setListBooks(response.data.data);
        settotalPages(response.data.totalPages);
    };

    const fetchAllSearchBooksWithPaginate = async (dataSearch, page) => {
        let response = await axios.get(
            `/getAllBooksWithPaginations?tenSach=${dataSearch}&page=${page}&limit=${LIMIT_PAGE}`
        );

        setListBooks(response.data.data);
        settotalPages(response.data.totalPages);
    };

    useEffect(() => {
        // fetchBook lần đầu chạy set = true để call API
        if (fetchBook) fetchAllBooksWithPaginate(1);
    }, [fetchBook]);

    const handleClickCreateImages = (book) => {
        setShowModalCreateImages(true);
        setDataExtension(book);
    };

    const handleClickDeleteBook = (book) => {
        setShowModalDelete(true);
        setDataDelete(book);
    };

    const handleClickUpdateBook = (book) => {
        setShowModalUpdate(true);
        setDataUpdate(book);
    };

    const handleClickViewBook = (book) => {
        setShowModalView(true);
        setDataView(book);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        await fetchAllSearchBooksWithPaginate(dataSearch, 1);
        setFetchBook(false);
    };

    return (
        <div className="manage-container">
            <h1 className="title text-center">Quản lý sách</h1>
            <div className="content">
                <button
                    className="btn-hs-bg btn btn-primary"
                    onClick={() => setShowModalCreateBook(!showModalCreateBook)}
                >
                    Tạo sách mới
                </button>

                <form
                    className="form-search"
                    style={{
                        display: "inline-block",
                        width: "30%",
                        float: "right",
                        marginTop: "30px",
                    }}
                    onSubmit={handleSubmitSearch}
                >
                    <input
                        type="text"
                        className="input-search-book form-control"
                        style={{ width: "100%" }}
                        placeholder="Nhập tên sách..."
                        onChange={(event) => {
                            setDataSearch(event.target.value);
                            if (event.target.value === "") {
                                setFetchBook(true);
                            }
                        }}
                    />
                </form>

                <div className="table-container">
                    <TableBooks
                        listBooks={listBooks}
                        handleClickDeleteBook={handleClickDeleteBook}
                        handleClickViewBook={handleClickViewBook}
                        handleClickCreateImages={handleClickCreateImages}
                        handleClickUpdateBook={handleClickUpdateBook}
                        fetchAllBooksWithPaginate={fetchAllBooksWithPaginate}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <ModalCreateBook
                show={showModalCreateBook}
                setShow={setShowModalCreateBook}
                fetchAllBooksWithPaginate={fetchAllBooksWithPaginate}
                setCurrentPage={setCurrentPage}
            />

            <ModalCreateExtension
                show={showModalCreateImages}
                setShow={setShowModalCreateImages}
                dataExtension={dataExtension}
                fetchAllBooksWithPaginate={fetchAllBooksWithPaginate}
                setCurrentPage={setCurrentPage}
            />
            <ModalViewBook
                show={showModalView}
                setShowModalView={setShowModalView}
                dataView={dataView}
            />
            <ModalUpdateBook
                show={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                dataUpdate={dataUpdate}
                fetchAllBooksWithPaginate={fetchAllBooksWithPaginate}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteBook
                show={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                dataDelete={dataDelete}
                fetchAllBooksWithPaginate={fetchAllBooksWithPaginate}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ManageBooks;
