import React, { useState } from "react";
import "./ScroolToTop.scss";
import { scrollToTop } from "../../assets/js/handleFunc";
const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 500) {
            setVisible(true);
        } else if (scrolled <= 500) {
            setVisible(false);
        }
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <button
            className="scroll-top"
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
        >
            <i className="fa fa-angle-up" aria-hidden="true"></i>
        </button>
    );
};

export default ScrollButton;
