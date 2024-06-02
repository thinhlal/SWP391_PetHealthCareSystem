//CSS link
import './ManageSickPet.css';

// component use in page
import HeaderManager from '../../components/Employee/Header/HeaderManager';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

//images
import search_icon from '../../assets/images/img_ManageBookings/search.svg'
import Sidebar from '../../components/Employee/Sidebar/Sidebar';

function ManageSickPet() {
    return (
        <div className="manage-sick-pet container-fluid">
            <div className="row">
                <HeaderManager></HeaderManager>
                <div className="manage-sick-pet-title">
                    <div className="manage-sick-pet-title-text">Manage Sick Pets</div>
                </div>
                <div className="manage-sick-pet-content">
                    <Sidebar></Sidebar>
                    <div className="manage-booking-main-content">
                        <div className="main-content-header">
                            <div className="main-content-header-search">
                                <div className="main-content-header-search-title">
                                   List of sick pets 
                                </div>
                                <div className="main-content-header-search-input-wrapper">
                                    <button type="button" className="search-input-btn">
                                        <img className="search-input-btn-icon" src={search_icon} alt='' />
                                    </button>
                                    <input type="text" placeholder="Search" className="main-content-header-search-input" />
                                </div>
                            </div>
                            
                        </div>
                        <div className="main-content-list">
                            <div className="main-content-list-title">
                                <div className="main-content-list-title-text">Pet ID</div>
                                <div className="main-content-list-title-text">Pet Name</div>
                                <div className="main-content-list-title-text">Species</div>
                                <div className="main-content-list-title-text">Breeds</div>
                                <div className="main-content-list-title-text">Name</div>
                                <div className="main-content-list-title-text">Cage</div>
                                <div className="main-content-list-title-text">Hospitalized day</div>
                                
                                <div className="main-content-list-title-text-info">View</div>
                            </div>
                            <div className="main-content-list-body-wrapper">
                               
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">PET000001</div>
                                    <div className="content-list-body-value">Luky</div>
                                    <div className="content-list-body-value">Cat</div>
                                    <div className="content-list-body-value">British shorthair</div>
                                    <div className="content-list-body-value">John Nguyen</div>
                                    <div className="content-list-body-value">A02</div>
                                    <div className="content-list-body-value">2024-06-10 09:15</div>

                
                                    <div className="content-list-body-value-button-info">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more-info-sick-pet">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="more-info-sick-pet" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body-sick-pet">
                                                <div className="main-modal-content-sick-pet">
                                                   <i className="fa fa-close close" data-dismiss="modal"></i>
      
                                                   <div className="grid-container">
                                                     <div className="content-modal-sick-pet">
                                                       <div className="reason-sick-pet">
                                                         <span className="font-weight-bold">Reasons hospitalization</span>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Reasons hospitalization:&nbsp;</small>
                                                         <small>Treatment of pneumonia</small>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Current condition:&nbsp;</small>
                                                         <small>Shortness of breath</small>
                                                       </div>
                                                     </div>

                                                     <div className="mb-3">
                                                       <hr className="new1" />
                                                     </div>

                                                     <div className="content-modal-sick-pet">
                                                       <div className="reason-sick-pet">
                                                         <span className="font-weight-bold">Services Used</span>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Services:&nbsp;</small>
                                                         <small>X-ray of the lungs</small>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Services Date:&nbsp;</small>
                                                         <small>2024-06-10</small>
                                                       </div>
                                                     </div>

                                                     <div className="mb-3">
                                                       <hr className="new1" />
                                                     </div>
                                             
                                                     <div className="content-modal-sick-pet">
                                                       <div className="reason-sick-pet">
                                                         <span className="font-weight-bold">Medical records</span>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Diagnostics:&nbsp;</small>
                                                         <small>Pneumonia</small>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Treat:&nbsp;</small>
                                                         <small>Oxygen respiratory support</small>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Notes:&nbsp;</small>
                                                         <small>Good response to treatment</small>
                                                       </div>
                                                     </div>

                                                     <div className="mb-3">
                                                       <hr className="new1" />
                                                     </div>

                                                    <div className="content-modal-sick-pet">
                                                       <div className="reason-sick-pet">
                                                         <span className="font-weight-bold">Update medical records</span>
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Diagnostics:&nbsp;</small>
                                                         <input type="text" className="form-control" placeholder="Enter notes here" />
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Treat:&nbsp;</small>
                                                         <input type="text" className="form-control" placeholder="Enter notes here" />
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                         <small className='title-reason-sick-pet'>Notes:&nbsp;</small>
                                                         <input type="text" className="form-control" placeholder="Enter notes here" />
                                                       </div>
                                                       <div className="reason-sick-pet">
                                                        <small className='title-reason-sick-pet'>Status:&nbsp;</small>
                                                        <select className="form-control">
                                                            <option value="good">Good</option>
                                                            <option value="not_good">Not Good</option>
                                                        </select>
                                                       </div>
                                                    
                                                       
                                                    </div>
                                                   </div>
                                                 </div>                                             
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">PET000002</div>
                                    <div className="content-list-body-value">Chippy</div>
                                    <div className="content-list-body-value">Cat</div>
                                    <div className="content-list-body-value">British shorthair</div>
                                    <div className="content-list-body-value">John Nguyen</div>
                                    <div className="content-list-body-value">A02</div>
                                    <div className="content-list-body-value">2024-06-10 09:15</div>
                                    
                                    <div className="content-list-body-value-button-info">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more-info-sick-pet">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="more-info-sick-pet" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">PET000003</div>
                                    <div className="content-list-body-value">KoKo</div>
                                    <div className="content-list-body-value">Dog</div>
                                    <div className="content-list-body-value">Golden</div>
                                    <div className="content-list-body-value">Alex Nguyen</div>
                                    <div className="content-list-body-value">A03</div>
                                    <div className="content-list-body-value">2024-06-10 09:15</div>
                                    
                                    <div className="content-list-body-value-button-info">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more-info-sick-pet">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="more-info-sick-pet" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">PET000004</div>
                                    <div className="content-list-body-value">LaLa</div>
                                    <div className="content-list-body-value">Dog</div>
                                    <div className="content-list-body-value">Golden</div>
                                    <div className="content-list-body-value">Alex Nguyen</div>
                                    <div className="content-list-body-value">A04</div>
                                    <div className="content-list-body-value">2024-06-10 09:15</div>
                                    
                                    <div className="content-list-body-value-button-info">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more-info-sick-pet">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="more-info-sick-pet" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    );
}

export default ManageSickPet;