import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { NavLink } from "react-router-dom";
import axios from "../../../utils/axiosCustomize.js";
import { useSelector } from "react-redux";
import { selectAccount } from "../../../redux/reducer/accountReducer.js";
import ModalChangePassword from "./Modal/ModalChangePassword.jsx";
import ModalAddInformations from "./Modal/ModalAddInformations.jsx";
import ModalChangeInformation from "./Modal/ModalChangeInformation.jsx";
const Profile = () => {
    const account = useSelector(selectAccount);
    const [listOrder, setListOrders] = useState([]);
    const [bookDetails, setBookDetails] = useState({});
    const [showModalChangePassword, setShowModalChangePassword] =
        useState(false);
    const [showModalAddInformations, setShowModalAddInformations] =
        useState(false);
    const [showModalChangeInformation, setShowModalChangeInformation] =
        useState(false);

    const fetchAllOrdersWithAccount = async (id) => {
        const response = await axios.get(`/getOrderWithAccount/${id}`);
        const orders = response.data;
        setListOrders(orders);

        // Lấy từng sách với từng đơn hàng bằng gọi api với từng id đơn hàng
        const bookDetailsPromises = orders.map((order) =>
            axios.get(`/getBooksInOrder/${order.id_donHang}`)
        );

        // await Promise.all đợi đến khi tất cả yêu cầu hoàn thành
        const bookDetailsResponses = await Promise.all(bookDetailsPromises);

        // Với mỗi phản hồi, ID của đơn hàng tương ứng được sử dụng làm khóa trong đối tượng bookDetailsMap, và response.data (chi tiết sách) được đặt làm giá trị.
        const bookDetailsMap = {};
        bookDetailsResponses.forEach((response, index) => {
            bookDetailsMap[orders[index].id_donHang] = response.data;
        });

        setBookDetails(bookDetailsMap);
    };

    useEffect(() => {
        fetchAllOrdersWithAccount(account.id_taiKhoan);
    }, [account.id_taiKhoan]);

    const handleClickShowChangePassword = () => {
        setShowModalChangePassword(true);
    };
    const handleClickShowAddInfor = () => {
        setShowModalAddInformations(true);
    };
    const handleClickShowChangeInfor = () => {
        setShowModalChangeInformation(true);
    };
    return (
        <div>
            <section className="bread-crumb">
                <span className="crumb-border"></span>
                <div className="container">
                    <div className="rows">
                        <div className="col-xs-12 a-left">
                            <ul className="breadcrumb">
                                <li className="home">
                                    <NavLink to="/">
                                        <span>Trang Chủ</span>
                                    </NavLink>
                                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                                </li>

                                <li>
                                    <span>Trang khách hàng</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="signup page_customer_account">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                            <div className="block-account">
                                <h5 className="title-account">Tài khoản</h5>
                                <p>
                                    Xin chào,{" "}
                                    <span style={{ color: "#38a8ea" }}>
                                        {account.tenTaiKhoan}
                                    </span>
                                </p>
                                <p>
                                    <span>{account.email}</span>
                                </p>
                                <p className="feature-info">
                                    <button
                                        className="change-password"
                                        onClick={handleClickShowChangePassword}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </p>

                                <hr />

                                <p className="feature-address">
                                    {account?.tenNhanHang === null && (
                                        <button
                                            className="add-address"
                                            onClick={handleClickShowAddInfor}
                                        >
                                            Thêm thông tin giao hàng
                                        </button>
                                    )}
                                    {account?.tenNhanHang !== null && (
                                        <>
                                            <p>Thông tin người giao hàng</p>
                                            <p>
                                                <span>
                                                    {account?.tenNhanHang}
                                                </span>
                                                <span>
                                                    {account?.SDTNhanHang}
                                                </span>
                                                <span>
                                                    {account?.diaChiNhanHang}
                                                </span>
                                                <button
                                                    className="change-address"
                                                    onClick={
                                                        handleClickShowChangeInfor
                                                    }
                                                >
                                                    Thay đổi thông tin
                                                </button>
                                            </p>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                            <h5 className="title-head margin-top-0">
                                Đơn hàng của bạn
                            </h5>
                            <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
                                <div className="my-account">
                                    <div className="dashboard">
                                        <div className="recent-orders">
                                            <div
                                                className="table-responsive-block tab-all"
                                                style={{ overflowX: "auto" }}
                                            >
                                                <table className="table">
                                                    <thead className="text-center">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>
                                                                Thông tin sách
                                                            </th>
                                                            <th>
                                                                Thông tin đặt
                                                                hàng
                                                            </th>
                                                            <th>
                                                                Ngày đặt hàng
                                                            </th>
                                                            <th>
                                                                Tổng đơn hàng
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {listOrder.length > 0 &&
                                                            listOrder.map(
                                                                (
                                                                    order,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            order.id_donHang
                                                                        }
                                                                    >
                                                                        <td>
                                                                            <p className="text-center">
                                                                                {index +
                                                                                    1}
                                                                            </p>
                                                                        </td>
                                                                        <td className="list-book text-center">
                                                                            <ul>
                                                                                {bookDetails[
                                                                                    order
                                                                                        .id_donHang
                                                                                ]?.map(
                                                                                    (
                                                                                        book
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                book.id_sach
                                                                                            }
                                                                                        >
                                                                                            <p
                                                                                                style={{
                                                                                                    marginBottom:
                                                                                                        "4px",
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    book.tenSach
                                                                                                }
                                                                                            </p>
                                                                                            <p>
                                                                                                (SL:{" "}
                                                                                                {
                                                                                                    book.soLuongSach
                                                                                                }

                                                                                                )
                                                                                            </p>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </td>
                                                                        <td>
                                                                            <p>
                                                                                Họ
                                                                                tên:{" "}
                                                                                {
                                                                                    order.hoTenKH
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                SĐT:{" "}
                                                                                {
                                                                                    order.SDT
                                                                                }
                                                                            </p>

                                                                            <p>
                                                                                Địa
                                                                                chỉ:{" "}
                                                                                {
                                                                                    order.diaChiKH
                                                                                }
                                                                            </p>
                                                                        </td>
                                                                        <td>
                                                                            <p>
                                                                                {
                                                                                    order.ngayDatHang
                                                                                }
                                                                            </p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="special">
                                                                                {Number.parseFloat(
                                                                                    order.tongTien
                                                                                ).toLocaleString(
                                                                                    "vi-VN"
                                                                                )}{" "}
                                                                                VNĐ
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        {listOrder.length ===
                                                            0 && (
                                                            <tr>
                                                                <td
                                                                    colSpan="5"
                                                                    className="text-center"
                                                                >
                                                                    <p>
                                                                        Không có
                                                                        đơn hàng
                                                                        nào.
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalChangePassword
                show={showModalChangePassword}
                setShowModalChangePassword={setShowModalChangePassword}
            />
            <ModalAddInformations
                show={showModalAddInformations}
                setShowModalAddInformations={setShowModalAddInformations}
            />
            <ModalChangeInformation
                show={showModalChangeInformation}
                setShowModalChangeInformation={setShowModalChangeInformation}
            />
        </div>
    );
};

export default Profile;
