import "react-pro-sidebar/dist/css/styles.css";
import { FaBars } from "react-icons/fa";
import { GiReactor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

import { FaTachometerAlt, FaRegLaughWink } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar, setCollapsed } = props;
    const navigate = useNavigate();
    return (
        <>
            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="sm"
                onToggle={handleToggleSidebar}
                backgroundColor="#606266"
            >
                <SidebarHeader>
                    {collapsed === false ? (
                        <div
                            style={{
                                padding: "24px",
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: 14,
                                letterSpacing: "1px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <GiReactor size={"2rem"} />

                            <span className="ms-4">
                                Đồ án cơ sở 1 <Link to="/" />
                            </span>
                            <FaBars
                                cursor={"pointer"}
                                className="ms-3 fs-4"
                                onClick={() => setCollapsed(!collapsed)}
                            />
                        </div>
                    ) : (
                        <div
                            className="text-center mt-3"
                            style={{ height: "50px" }}
                        >
                            <FaBars
                                cursor={"pointer"}
                                className="fs-4 "
                                onClick={() => setCollapsed(!collapsed)}
                            />
                        </div>
                    )}
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaTachometerAlt />}>
                            Trang chủ
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu title={"Quản lý"} icon={<FaRegLaughWink />}>
                            <MenuItem>
                                Quản lý tài khoản
                                <Link to="/admin/quan-ly-tai-khoan" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý sách <Link to="/admin/quan-ly-sach" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý thể loại sách
                                <Link to="/admin/quan-ly-the-loai-sach" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý đơn hàng
                                <Link to="/admin/quan-ly-don-hang" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: "center" }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: "20px 24px",
                        }}
                    >
                        <span
                            className="sidebar-btn"
                            style={{
                                color: "#fff",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/")}
                        >
                            Sky Books
                        </span>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
};

export default SideBar;
