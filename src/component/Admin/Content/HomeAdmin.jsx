import React, { useEffect, useState } from "react";
import "./HomeAdmin.scss";
import axios from "../../../utils/axiosCustomize.js";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "../../../redux/reducer/totalPrice.js";

const HomeAdmin = () => {
    const totalPrice = useSelector(selectTotalPrice);
    const [dataListTotal, setDataListTotal] = useState(null);

    const fetchDataTotal = async () => {
        try {
            const response = await axios.get("/getDataToTal");
            setDataListTotal(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataTotal();
    }, []);
    console.log(dataListTotal);

    return (
        <>
            <div className="admin-home-container">
                <div className="title">
                    <h1>Thống kê cửa hàng bán sách SKYBOOKS</h1>
                </div>
                <div className="content">
                    <div className="Admin-table-value">
                        <div id="Product" className="Admin-card-table-value">
                            <h2>Sách</h2>
                            <div id="" className="Actual-data">
                                <img
                                    width="96"
                                    height="96"
                                    src="https://img.icons8.com/?size=100&id=fH22K8x6Yvz6&format=png&color=000000"
                                    alt="shopping-bag"
                                />
                                <p className="item-data-right">
                                    <strong>{dataListTotal?.tongSoSach}</strong>
                                </p>
                            </div>
                        </div>
                        <div
                            id="statistical"
                            className="Admin-card-table-value"
                        >
                            <h2>Thể loại sách</h2>
                            <div className="Actual-data">
                                <img
                                    width="64"
                                    height="64"
                                    src="https://img.icons8.com/?size=100&id=71733&format=png&color=000000"
                                    alt="price-tag-euro"
                                />
                                <p className="item-data-right">
                                    <strong>
                                        {dataListTotal?.tongSoTheLoaiSach}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div id="User" className="Admin-card-table-value">
                            <h2>Tài khoản</h2>
                            <div className="Actual-data">
                                <img
                                    width="64"
                                    height="64"
                                    src="https://img.icons8.com/?size=100&id=ScJCfhkd77yD&format=png&color=000000"
                                    alt="user"
                                />
                                <p className="item-data-right">
                                    <strong>
                                        {dataListTotal?.tongSoTaiKhoan}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div id="Dealhot" className="Admin-card-table-value">
                            <h2>Đơn hàng</h2>
                            <div className="Actual-data">
                                <img
                                    width="64"
                                    height="64"
                                    src="https://img.icons8.com/cotton/64/mega-sales--v2.png"
                                    alt="mega-sales--v2"
                                />
                                <p className="item-data-right">
                                    <strong>
                                        {dataListTotal?.tongDonHang}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div id="total" className="Admin-card-table-value">
                            <h2>Doanh thu</h2>
                            <div className="Actual-data">
                                <img
                                    width="64"
                                    height="64"
                                    src="https://img.icons8.com/dusk/64/price-tag-euro.png"
                                    alt="mega-sales--v2"
                                />
                                <p className="item-data-right">
                                    <strong>
                                        {Number.parseFloat(
                                            totalPrice
                                        ).toLocaleString("vi-VN")}{" "}
                                        VNĐ
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeAdmin;
