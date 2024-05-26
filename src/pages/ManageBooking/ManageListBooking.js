import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from '../../assets/images/img_Manager/logo.png'
import home_img from '../../assets/images/img_Manager/home.svg'
import list_icon from '../../assets/images/img_Manager/icon-list.png'
import search_icon from '../../assets/images/img_Manager/search.svg'

function ManageListBooking() {
    return (
        <div className="manage-booking-cage container-fluid">
            <div className="row">
                <HeaderManager></HeaderManager>
                <div className="manage-booking-cage-header">
                    <img className="logo" src={logo} alt='' />
                    <p className="p">Pet Health Care - Manage Booking Lists</p>
                </div>
                <div className="overlap">
                    <div className="sidebar">
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
                                    <div className="text-wrapper-5">Cages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <div className="card-header-menu">
                            <div className="content">
                                <div className="text-and-supporting">
                                    <div className="text-and-badge">
                                        <p className="text-header-menu">
                                            <span className="span">List of Booking</span>
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
                                    <button type="button" className="booking-btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Add Booking
                                    </button>
                                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    sadsadas
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-success">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-2">
                            <div className="content_header_title">
                                <div className="content_header">BookingID</div>
                                <div className="content_header">Booking date</div>
                                <div className="content_header">Name</div>
                                <div className="content_header">Pet Name</div>
                                <div className="content_header">Service</div>
                                <div className="content_header">Doctor</div>
                                <div className="content_header">Check In</div>
                                <div className="content_header">Cancel Booking</div>
                                <div className="content_header">View</div>
                            </div>
                            <div className="content_body_wrapper">
                                <div className="content_body-info">
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">ssss</div>
                                    <div className="content_body">Dog</div>
                                    <div className="content_body">Blooming</div>
                                    <div className="content_body">Chen
                                    </div><div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content_body-info">
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">ssss</div>
                                    <div className="content_body">Dog</div>
                                    <div className="content_body">Blooming</div>
                                    <div className="content_body">Chen
                                    </div><div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content_body-info">
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">ssss</div>
                                    <div className="content_body">Dog</div>
                                    <div className="content_body">Blooming</div>
                                    <div className="content_body">Chen
                                    </div><div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content_body-info">
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">SE123456</div>
                                    <div className="content_body">ssss</div>
                                    <div className="content_body">Dog</div>
                                    <div className="content_body">Blooming</div>
                                    <div className="content_body">Chen
                                    </div><div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <input
                                            type="checkbox"
                                            className="content_checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content_body">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pagination_wrapper'>
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#123">Previous</a>
                            </li>
                            <li className="page-item active" aria-current="page">
                                <a className="page-link" href="#123">1</a>
                            </li>
                            <li className="page-item" >
                                <a className="page-link" href="#123" >2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#123">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#123">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ManageListBooking;
