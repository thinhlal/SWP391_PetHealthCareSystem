import './css/ManageListBooking.css';
import HeaderManager from './HeaderManager';
import logo from './img/img_Manager/logo3-logo-1.png'
import home_img from './img/img_Manager/home.svg'
import list_icon from './img/img_Manager/icon-list.png'
import search_icon from './img/img_Manager/icon-list.png'
import filter_icon from './img/img_Manager/filter-lines-1.svg'
import trash_icon from './img/img_Manager/trash-01-1.svg'
import download_icon from './img/img_Manager/download-cloud-02-1.svg'

function ManageListBooking() {
    return (
        <div className="manage-booking-cage container-fluid">
            <div className="row">
                <HeaderManager></HeaderManager>
                <div className="manage-booking-cage-header">
                    <div className="div-wrapper">
                        <img className="logo" src={logo} alt='' />
                        <p className="p">Pet Health Care - Manage Booking Cage cancellations</p>
                    </div>
                </div>
                <div className="overlap row">
                    <div className="sidebar col-md-2">
                        <div className="overlap-group-2">
                            <div className="frame-wrapper">
                                <div className="frame-2">
                                    <img className="home" src={home_img} alt='' />
                                    <div className="text-wrapper-3">Home</div>
                                </div>
                            </div>
                            <div className="list">
                                <div className="menu-tittle">
                                    <img className="icon-list" src={list_icon} alt='' />
                                    <div className="text-wrapper-4">Categories</div>
                                </div>
                                <div className="menu-item">
                                    <div className="text-wrapper-5">Booking List</div>
                                </div>
                                <div className="menu-item">
                                    <div className="text-wrapper-5">Booking Cancel</div>
                                </div>
                                <div className="menu-item">
                                    <div className="text-wrapper-5">Orders Booking</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper col-md-10">
                        <div className="card-header-menu">
                            <div className="content">
                                <div className="text-and-supporting">
                                    <div className="text-and-badge">
                                        <p className="text-header-menu">
                                            <span className="span">List of Booking Cancellations </span>
                                        </p>
                                    </div>
                                    <div className="element-search-input">
                                        <button type="button" className="search">
                                            <img className="search-btn-icon" src={search_icon} alt='' />
                                        </button>
                                        <input type="text" placeholder="Search" className="label" />
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="button-base" type="button">
                                        <img className="img-2" src={filter_icon} alt='' />
                                        <div className="text-2">Update</div>
                                    </button>
                                    <button className="button-base" type="button">
                                        <img className="img-2" src={trash_icon} alt='' />
                                        <div className="text-3">Delete</div>
                                    </button>
                                    <button className="button-base" type="button">
                                        <img className="img-2" src={download_icon} alt='' />
                                        <div className="text-2">Export</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="content-2 row">
                            <div className="content_header_title col-md-12">
                                <div className="row">
                                    <div className="content_header col-md-2">BookingID</div>
                                    <div className="content_header col-md-2">Booking date</div>
                                    <div className="content_header col-md-2">Cancel date</div>
                                    <div className="content_header col-md-2">Paid</div>
                                    <div className="content_header col-md-2">Refund</div>
                                    <div className="content_header col-md-2">Success</div>
                                </div>
                            </div>
                            <div className="content_body_row col-md-12">
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                                <form action="">
                                    <div className="row">
                                        <div className="content_body col-md-2">SE123456</div>
                                        <div className="content_body col-md-2">17/12/2222</div>
                                        <div className="content_body col-md-2">18/12/2222</div>
                                        <div className="content_body col-md-2">290$</div>
                                        <div className="content_body col-md-2">250$</div>
                                        <div className="content_body col-md-2">
                                            <input
                                                type="checkbox"
                                                className="content_checkbox"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pagination">
                    <div className="pagination_wrapper">
                        <i
                            className="fa-solid fa-arrow-left pagination_content pagination_arrow"
                        ></i>
                        <div className="pagination_content">1</div>
                        <div className="pagination_content">2</div>
                        <div className="pagination_content">3</div>
                        <div className="pagination_content">4</div>
                        <div className="pagination_content">5</div>
                        <div className="pagination_content">6</div>
                        <div className="pagination_content">7</div>
                        <div className="pagination_content">8</div>
                        <i
                            className="fa-solid fa-arrow-right pagination_content pagination_arrow"
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageListBooking;
