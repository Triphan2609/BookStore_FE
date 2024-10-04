import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const User = (props) => {
    return (
        <>
            <div className="user-container">
                <div className="header-container">
                    <Header
                        setSelectedCategory={props.setSelectedCategory}
                        setSelectedCategoryID={props.setSelectedCategoryID}
                        setNameCategory={props.setNameCategory}
                        isAdmin={props.isAdmin}
                        setDataSearch={props.setDataSearch}
                        dataSearch={props.dataSearch}
                    />
                </div>
                <div className="main-container">
                    <div className="sidebar-container"></div>
                    <div className="app-content">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="footer-container">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default User;
