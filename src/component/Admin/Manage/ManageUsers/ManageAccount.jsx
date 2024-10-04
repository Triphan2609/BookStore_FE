import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosCustomize.js";

// import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteAccount from "./Modal/ModalDeleteAccount.jsx";
import TableAccount from "./TableAccount.jsx";
import ModalCreateAccount from "./Modal/ModalCreateAccount.jsx";
import ModalUpdateAccount from "./Modal/ModalUpdateAccount.jsx";

const ManageAccount = () => {
    const LIMIT_PAGE = 5;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [fetchBook, setFetchBook] = useState(true);
    const [dataSearch, setDataSearch] = useState([]);
    const [listAccount, setListAccount] = useState([]);
    const [dataHandler, setDataHandler] = useState({});
    const [totalPages, settotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAccountWithPaginate = async (page) => {
        let response = await axios.get(
            `/getAllUsersWithPaginations?page=${page}&limit=${LIMIT_PAGE}`
        );

        setListAccount(response.data.data);
        settotalPages(response.data.totalPages);
    };

    const fetchAllSearchAccountWithPaginate = async (dataSearch, page) => {
        let response = await axios.get(
            `/getAllUsersWithPaginations?tenTaiKhoan=${dataSearch}&page=${page}&limit=${LIMIT_PAGE}`
        );

        setListAccount(response.data.data);
        settotalPages(response.data.totalPages);
    };

    useEffect(() => {
        if (fetchBook) fetchAccountWithPaginate(1);
    }, [fetchBook]);

    // Xử lý sự kiện click
    const handleClickDeleteAccount = (user) => {
        setShowModalDelete(true);
        setDataHandler(user);
    };

    const handleClickUpdateAccount = (user) => {
        setShowModalUpdate(true);
        setDataHandler(user);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        await fetchAllSearchAccountWithPaginate(dataSearch, 1);
        setFetchBook(false);
    };

    return (
        <div className="manage-container">
            <h1 className="title text-center">Quản lý tài khoản</h1>
            <div className="content">
                <button
                    className="btn-hs-bg btn btn-primary"
                    onClick={() => setShowModalCreate(!showModalCreate)}
                >
                    Thêm tài khoản
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
                        placeholder="Nhập tên tài khoản..."
                        onChange={(event) => {
                            setDataSearch(event.target.value);
                            if (event.target.value === "") {
                                setFetchBook(true);
                            }
                        }}
                    />
                </form>

                <div className="table-container">
                    <TableAccount
                        listAccount={listAccount}
                        handleClickDeleteAccount={handleClickDeleteAccount}
                        handleClickUpdateAccount={handleClickUpdateAccount}
                        fetchAccountWithPaginate={fetchAccountWithPaginate}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <ModalCreateAccount
                show={showModalCreate}
                setShow={setShowModalCreate}
                fetchAccountWithPaginate={fetchAccountWithPaginate}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateAccount
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                fetchAccountWithPaginate={fetchAccountWithPaginate}
                dataUpdate={dataHandler}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteAccount
                show={showModalDelete}
                setShow={setShowModalDelete}
                fetchAccountWithPaginate={fetchAccountWithPaginate}
                dataDelete={dataHandler}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ManageAccount;
