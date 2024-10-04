import unidecode from "unidecode";

export function changeString(str) {
    // Loại bỏ dấu từ chuỗi sử dụng unidecode
    const unaccented = unidecode(str);

    // Thay thế các ký tự không mong muốn bằng dấu gạch ngang
    const slug = unaccented
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

    return slug;
}

export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        // Tăng khoảng cách
        window.scrollTo(0, c - c / 12);
    }
};

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
