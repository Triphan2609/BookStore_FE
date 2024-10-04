import { NavLink, useNavigate } from "react-router-dom";
import "../Account.scss";
import axios from "../../../../utils/axiosCustomize.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../../assets/js/handleFunc.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Vui lòng nhập email chính xác!");
            return;
        }
        if (!username) {
            toast.error("Vui lòng nhập tên tài khoản!");
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu!");
            return;
        }
        if (password.length <= 8) {
            toast.error("Mật khẩu phải lớn hơn hoặc bằng 8 kí tự");
            return;
        }

        const response = await axios.post("/register", {
            email,
            username,
            password,
        });

        if (response.data && response.data.EC !== 0) {
            toast.error(response.data.EM);
        }

        if (response.data && response.data.EC === 0) {
            navigate("/dang-nhap");
        }
    };

    return (
        <>
            <section className="register">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div>
                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <div className="form-outline mb-4">
                                        <label
                                            className="form-label"
                                            for="email"
                                        >
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="Nhập địa chỉ email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label
                                            className="form-label"
                                            for="username"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control form-control-lg"
                                            placeholder="Vui lòng nhập tên người dùng"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-outline mb-3">
                                        <label
                                            className="form-label"
                                            for="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="Nhập mật khẩu"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="text-center text-lg-start mt-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="btn btn-primary btn-lg px-5 btn-register"
                                        >
                                            Register
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                            Bạn đã có tài khoản?{" "}
                                            <NavLink to="/dang-nhap">
                                                Đăng nhập
                                            </NavLink>
                                        </p>
                                        <div className="return-home">
                                            <NavLink
                                                to="/"
                                                className="btn-return-home"
                                            >
                                                {"<-- Trở về trang chủ"}
                                            </NavLink>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        © 2024 Copyright: PhanThanhTri.
                    </div>

                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </footer>
            </section>
        </>
    );
};

export default Register;
