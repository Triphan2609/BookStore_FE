import React from "react";
import "./Paid.scss";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Paid = () => {
    return (
        <div className="paid-container">
            <FaCheckCircle size={"5rem"} color="#38a8ea" className="mb-3" />
            <h2>Thanh toán thành công</h2>
            <p>
                Đơn hàng của quý khách đã thanh toán thành công, cảm ơn quý
                khách đã tin tưởng sử dụng dịch phụ cung cấp sản phảm của chúng
                tôi
            </p>
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    );
};

export default Paid;
