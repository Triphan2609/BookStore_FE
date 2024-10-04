import { NavLink, useNavigate } from "react-router-dom";
import "../Account.scss";
import { useState } from "react";
import axios from "../../../../utils/axiosCustomize.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ISADMIN, LOGIN } from "../../../../redux/reducer/accountReducer.js";
import { validateEmail } from "../../../../assets/js/handleFunc.js";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email) {
            toast.error("Vui lòng nhập email");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Vui lòng nhập email chính xác!");
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập password");
            return;
        }
        if (password.length <= 8) {
            toast.error("Mật khẩu phải lớn hơn hoặc bằng 8 kí tự");
            return;
        }

        const responseLogin = await axios.post("/login", {
            email,
            password,
        });

        if (responseLogin.data && responseLogin.data.EC === 1) {
            toast.error(responseLogin.data.EM);
        }

        if (responseLogin.data && responseLogin.data.EC === 0) {
            localStorage.setItem("token", responseLogin.data.token);
            const responseAdmin = await axios.get("/admin", {
                headers: {
                    "access-token": responseLogin.data.token,
                },
            });
            if (responseAdmin.data.EC === 1) {
                navigate("/");
            }
            dispatch(LOGIN(responseLogin.data.DATA));
            dispatch(ISADMIN(responseAdmin.data.isADMIN));
            navigate("/");
        }
    };

    return (
        <>
            <section className="login">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
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
                                            placeholder="Nhập mật khẩu tối thiểu 8 kí tự"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button
                                            className="btn btn-primary btn-lg px-5 btn-login"
                                            onClick={handleSubmit}
                                        >
                                            Đăng nhập
                                        </button>
                                        <p className="small fw-bold mt-3 pt-1 mb-0">
                                            Bạn chưa có tài khoản?{" "}
                                            <NavLink to="/dang-ky">
                                                Đăng ký
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

export default Login;
