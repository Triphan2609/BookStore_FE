import { Table } from "react-bootstrap";
import React from "react";
import ReactPaginate from "react-paginate";
import { MdDelete, MdSystemUpdateAlt } from "react-icons/md";

const TableAccount = (props) => {
    const {
        listAccount,
        handleClickDeleteAccount,
        handleClickUpdateAccount,
        fetchAccountWithPaginate,
        totalPages,
        currentPage,
        setCurrentPage,
    } = props;

    /* Paginate */
    const handlePageClick = async (event) => {
        await fetchAccountWithPaginate(+event.selected + 1);
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
                                Tên tài khoản
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Email
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Vai trò
                            </th>
                            <th className="text-center fs-6" scope="col">
                                Chức năng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listAccount &&
                            listAccount.length > 0 &&
                            listAccount?.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center col-1">
                                            {user.id_taiKhoan}
                                        </td>
                                        <td>{user.tenTaiKhoan}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center">
                                            {user.vaiTro}
                                        </td>
                                        <td className=" fs-2 col-2 text-center">
                                            <MdSystemUpdateAlt
                                                size={"1.5rem"}
                                                className="ms-2"
                                                cursor={"pointer"}
                                                onClick={() =>
                                                    handleClickUpdateAccount(
                                                        user
                                                    )
                                                }
                                            />
                                            <MdDelete
                                                size={"1.5rem"}
                                                className="text-danger ms-2"
                                                onClick={() =>
                                                    handleClickDeleteAccount(
                                                        user
                                                    )
                                                }
                                                cursor={"pointer"}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        {listAccount && listAccount.length === 0 && (
                            <tr>
                                <td className="text-center" colSpan={4}>
                                    Không tìm thấy bất kỳ tài khoản nào!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            {/* Paginate */}
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

export default TableAccount;
