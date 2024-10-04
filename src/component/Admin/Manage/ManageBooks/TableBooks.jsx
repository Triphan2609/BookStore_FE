import { Table } from "react-bootstrap";
import React from "react";
import ReactPaginate from "react-paginate";
import { MdDelete, MdSystemUpdateAlt, MdRemoveRedEye } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
const TableBooks = (props) => {
    const {
        listBooks,
        handleClickDeleteBook,
        handleClickViewBook,
        handleClickUpdateBook,
        handleClickCreateImages,
        fetchAllBooksWithPaginate,
        totalPages,
        currentPage,
        setCurrentPage,
    } = props;

    /* Paginate */
    const handlePageClick = async (event) => {
        await fetchAllBooksWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <div
                className="table-container"
                style={{ height: "650px", marginBottom: "20px" }}
            >
                <Table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center fs-6" scope="col">
                                ID
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Tên sách
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Tác giả
                            </th>
                            <th className="text-center fs-6" scope="col">
                                NXB
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Năm XB
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Thể loại sách
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Hình thức
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Ngôn ngữ
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Giá sách
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Chức năng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBooks &&
                            listBooks.length > 0 &&
                            listBooks?.map((book) => {
                                return (
                                    <tr key={book.id_sach}>
                                        <td className="text-center col-1">
                                            {book.id_sach}
                                        </td>
                                        <td>{book.tenSach}</td>
                                        <td>{book.tacGia}</td>
                                        <td className="text-center">
                                            {book.nhaXB}
                                        </td>
                                        <td className="text-center">
                                            {book.namXB}
                                        </td>
                                        <td className="text-center">
                                            {book.tenTheLoaiSach}
                                        </td>
                                        <td
                                            style={{
                                                width: "115px",
                                            }}
                                        >
                                            {book.hinhThucSach}
                                        </td>
                                        <td className="text-center">
                                            {book.ngonNgu}
                                        </td>
                                        <td>
                                            {Number.parseFloat(
                                                book.giaSach
                                            ).toLocaleString("vi-VN")}{" "}
                                            VNĐ
                                        </td>
                                        <td className=" fs-2 col-2 text-center">
                                            <FaRegPlusSquare
                                                size={"1.5rem"}
                                                className="text-success ms-2"
                                                onClick={() =>
                                                    handleClickCreateImages(
                                                        book
                                                    )
                                                }
                                                cursor={"pointer"}
                                            />
                                            <MdRemoveRedEye
                                                size={"1.5rem"}
                                                className="text-info ms-2"
                                                onClick={() =>
                                                    handleClickViewBook(book)
                                                }
                                                cursor={"pointer"}
                                            />
                                            <MdSystemUpdateAlt
                                                size={"1.5rem"}
                                                className="ms-2"
                                                onClick={() =>
                                                    handleClickUpdateBook(book)
                                                }
                                                cursor={"pointer"}
                                            />
                                            <MdDelete
                                                size={"1.5rem"}
                                                className="text-danger ms-2"
                                                onClick={() =>
                                                    handleClickDeleteBook(book)
                                                }
                                                cursor={"pointer"}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        {listBooks && listBooks.length === 0 && (
                            <tr>
                                <td className="text-center" colSpan={8}>
                                    Không tìm thấy bất kỳ sách nào!
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
        </>
    );
};

export default TableBooks;
