import "./Contact.scss";

const Contact = () => {
    return (
        <>
            <div className="page_contact section">
                <div className="container">
                    <div className="wrapcontactin">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12"></div>
                            <div className="col-xl-6 col-lg-6 col-sm-12 col-xs-12 right_col">
                                <div className="section right_contact">
                                    <div className="heading text-start">
                                        <h4>
                                            <span>LIÊN HỆ GỬI BẢN THẢO</span>
                                        </h4>
                                    </div>
                                    <p className="des_1">
                                        Để trở thành tác giả của Skybooks
                                        <br />
                                        <b>
                                            CÔNG TY TNHH VĂN HÓA &amp; TRUYỀN
                                            THÔNG SKYBOOKS VIỆT NAM
                                        </b>
                                    </p>
                                    <div className="time_work">
                                        <div className="itemfooter cont">
                                            <div className="r">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <div>
                                                    <b>Địa chỉ:</b> 168, Nguyễn
                                                    Văn Cừ (nối dài), Phường An
                                                    Bình, Quận Ninh Kiều, Thành
                                                    phố Cần Thơ
                                                </div>
                                            </div>
                                            <div className="r">
                                                <i className="fas fa-envelope"></i>
                                                <div>
                                                    <b>Email:</b>{" "}
                                                    <a href="mailto:dnc@moet.edu.vn">
                                                        dnc@moet.edu.vn
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="r">
                                                <i className="fas fa-phone"></i>
                                                <div>
                                                    <b>Hotline:</b>{" "}
                                                    <a
                                                        className="fone"
                                                        href="tel:84 0292 3 798 222"
                                                    >
                                                        +84 0292 3 798 222
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div
                                        id="pagelogin"
                                        className="margin-bottom-50"
                                    >
                                        <form action="">
                                            <div className="form-signup clearfix">
                                                <div className="row group_contact">
                                                    <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <fieldset className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <input
                                                                    placeholder="Họ và tên*"
                                                                    type="text"
                                                                    className="form-control  form-control-lg"
                                                                    required=""
                                                                    value=""
                                                                    name="contact[Name]"
                                                                />
                                                            </fieldset>
                                                            <fieldset className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <input
                                                                    placeholder="Email*"
                                                                    type="email"
                                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                                    required=""
                                                                    id="email1"
                                                                    className="form-control form-control-lg"
                                                                    value=""
                                                                    name="contact[email]"
                                                                />
                                                            </fieldset>
                                                            <fieldset className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Điện thoại*"
                                                                    name="contact[phone]"
                                                                    className="form-control form-control-lg"
                                                                    required=""
                                                                />
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <fieldset>
                                                        <textarea
                                                            placeholder="Nội dung*"
                                                            name="contact[body]"
                                                            id="comment"
                                                            className="form-control content-area form-control-lg"
                                                            rows="5"
                                                            required=""
                                                        ></textarea>
                                                    </fieldset>
                                                    <fieldset>
                                                        <button
                                                            type="submit"
                                                            className="margin-top-20 btn btn-main btn-primary bg_gradient btn-lienhe"
                                                        >
                                                            Gửi thông tin
                                                        </button>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </form>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ;
        </>
    );
};

export default Contact;
