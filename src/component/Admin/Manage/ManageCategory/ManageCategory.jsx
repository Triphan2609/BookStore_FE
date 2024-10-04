import React, { useEffect, useState } from "react";
import ModalCreateCategory from "./Modal/ModalCreateCategory.jsx";
import { Table } from "react-bootstrap";
import axios from "../../../../utils/axiosCustomize.js";
import { MdDelete, MdSystemUpdateAlt } from "react-icons/md";
import ReactPaginate from "react-paginate";
import ModalDeleteCategory from "./Modal/ModalDeleteCategory.jsx";
import ModalUpdateCategory from "./Modal/ModalUpdateCategory.jsx";

const ManageCategory = () => {
    const LIMIT_PAGE = 4;
    const [fetchBook, setFetchBook] = useState(true);
    const [dataSearch, setDataSearch] = useState([]);
    const [listCategories, setListCategories] = useState();
    const [dataHandler, setDataHandler] = useState();
    const [totalPages, settotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalCreateCategory, setShowModalCreateCategory] =
        useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] =
        useState(false);
    const [showModalUpdateCategory, setShowModalUpdateCategory] =
        useState(false);

    const fetchAllCategoriesWithPaginate = async (page) => {
        let response = await axios.get(
            `/getAllCategoriesWithPaginations?page=${page}&limit=${LIMIT_PAGE}`
        );
        setListCategories(response.data.data);
        settotalPages(response.data.totalPages);
    };

    const fetchAllSearchCategoriesWithPaginate = async (dataSearch, page) => {
        let response = await axios.get(
            `/getAllCategoriesWithPaginations?tenTheLoaiSach=${dataSearch}&page=${page}&limit=${LIMIT_PAGE}`
        );

        setListCategories(response.data.data);
        settotalPages(response.data.totalPages);
    };

    useEffect(() => {
        if (fetchBook) fetchAllCategoriesWithPaginate(1);
    }, [fetchBook]);

    const handlePageClick = async (event) => {
        await fetchAllCategoriesWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    const handleClickDeleteCategory = (user) => {
        setShowModalDeleteCategory(true);
        setDataHandler(user);
    };

    const handleClickUpdateCategory = (user) => {
        setShowModalUpdateCategory(true);
        setDataHandler(user);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        await fetchAllSearchCategoriesWithPaginate(dataSearch, 1);
        setFetchBook(false);
    };

    return (
        <div className="manage-container">
            <h1 className="title text-center">Quản lý thể loại sách</h1>
            <div className="content">
                <button
                    className="btn-hs-bg btn btn-primary"
                    onClick={() =>
                        setShowModalCreateCategory(!showModalCreateCategory)
                    }
                >
                    Tạo thể loại sách mới
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
                        placeholder="Nhập tên thể loại sách..."
                        onChange={(event) => {
                            setDataSearch(event.target.value);
                            if (event.target.value === "") {
                                setFetchBook(true);
                            }
                        }}
                    />
                </form>

                <div className="table-container">
                    <Table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center fs-6" scope="col">
                                    Mã thể loại
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Tên thể loại
                                </th>
                                <th className="text-center fs-6" scope="col">
                                    Chức năng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCategories &&
                                listCategories.length > 0 &&
                                listCategories.map((category, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center col-2">
                                                {category.maTheLoaiSach}
                                            </td>
                                            <td>{category.tenTheLoaiSach}</td>
                                            <td className=" fs-2 col-2 text-center">
                                                <MdSystemUpdateAlt
                                                    size={"1.5rem"}
                                                    className="ms-2"
                                                    cursor={"pointer"}
                                                    onClick={() =>
                                                        handleClickUpdateCategory(
                                                            category
                                                        )
                                                    }
                                                />
                                                <MdDelete
                                                    size={"1.5rem"}
                                                    className="text-danger ms-2"
                                                    cursor={"pointer"}
                                                    onClick={() =>
                                                        handleClickDeleteCategory(
                                                            category
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            {listCategories && listCategories.length === 0 && (
                                <tr>
                                    <td className="text-center" colSpan={8}>
                                        Không tìm thấy bất kỳ thể loại sách nào!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <div
                    className="paginater-container"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <ReactPaginate
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        pageCount={totalPages}
                        nextLabel=">"
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                </div>

                <ModalCreateCategory
                    show={showModalCreateCategory}
                    setShow={setShowModalCreateCategory}
                    fetchAllCategoriesWithPaginate={
                        fetchAllCategoriesWithPaginate
                    }
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateCategory
                    dataUpdate={dataHandler}
                    show={showModalUpdateCategory}
                    setShow={setShowModalUpdateCategory}
                    fetchAllCategoriesWithPaginate={
                        fetchAllCategoriesWithPaginate
                    }
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteCategory
                    dataDelete={dataHandler}
                    show={showModalDeleteCategory}
                    setShow={setShowModalDeleteCategory}
                    fetchAllCategoriesWithPaginate={
                        fetchAllCategoriesWithPaginate
                    }
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageCategory;
