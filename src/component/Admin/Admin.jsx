import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import { useState } from "react";
import "./Admin.scss";
import axios from "../../utils/axiosCustomize.js";
import { useDispatch, useSelector } from "react-redux";
import {
    ISADMIN,
    LOGIN,
    selectIsAdmin,
} from "../../redux/reducer/accountReducer.js";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isAdmin = useSelector(selectIsAdmin);

    const handleSubmitAdmin = async (event) => {
        event.preventDefault();
        const responseLogin = await axios.post("/login", {
            email,
            password,
        });
        const token = responseLogin.data.token;
        localStorage.setItem("token", token);

        const responseAdmin = await axios.get("/admin", {
            headers: {
                "access-token": token,
            },
        });

        if (responseAdmin.data.EC === 1) {
            navigate("/");
        }

        dispatch(LOGIN(responseLogin.data.DATA));
        dispatch(ISADMIN(responseAdmin.data.isADMIN));
    };

    return (
        <div className="admin-container">
            {isAdmin ? (
                <>
                    <div className="admin-sidebar">
                        <SideBar
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                    </div>
                    <div className="admin-content">
                        <div className="admin-main">
                            <Outlet />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <form className="form-admin">
                        <div className="input-form">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>

                        <div className="input-form">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>

                        <button
                            className="btn btn-submit"
                            onClick={handleSubmitAdmin}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};
export default Admin;
