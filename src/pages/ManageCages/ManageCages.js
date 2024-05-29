//css
import './ManageCages.css';
//Component
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//images
import search_icon from '../../assets/images/img_ManageBookings/search.svg'

function ManageCages() {
    return (
        <div className="manage-cages container-fluid">
            <div className="row">
                <HeaderManager></HeaderManager>
                <div className="manage-cages-title">
                    <div className="manage-cages-title-text">Pet Health Care - Manage Cages</div>
                </div>
                <div className="manage-cages-content">
                    <Sidebar></Sidebar>
                    <div className="manage-booking-main-content">
                        <div className="main-content-header">
                            <div className="main-content-header-search">
                                <div className="main-content-header-search-title">
                                    List of Cages
                                </div>
                                <div className="main-content-header-search-input-wrapper">
                                    <button type="button" className="search-input-btn">
                                        <img className="search-input-btn-icon" src={search_icon} alt='' />
                                    </button>
                                    <input type="text" placeholder="Search" className="main-content-header-search-input" />
                                </div>
                            </div>
                            <div className="main-content-header-add-booking">
                                <button type="button" className="booking-btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add Pet
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
                        <div className="main-content-list">
                            <div className="main-content-list-title">
                                <div className="main-content-list-title-text">CageID</div>
                                <div className="main-content-list-title-text">Cage Name</div>
                                <div className="main-content-list-title-text">Description</div>
                                <div className="main-content-list-title-text">Status</div>
                                <div className="main-content-list-title-text">Details</div>
                                <div className="main-content-list-title-text">Update</div>
                            </div>
                            <div className="main-content-list-body-wrapper">
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">A1</div>
                                    <div className="content-list-body-value">Large Cage</div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more_info">
                                            More Details
                                        </button>
                                    </div>
                                    <div className="modal fade" id="more_info" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update information and treatment process</h1>
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
                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update">
                                            Update
                                        </button>
                                    </div>
                                    <div className="modal fade" id="update" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        </div >
    )
}

export default ManageCages;