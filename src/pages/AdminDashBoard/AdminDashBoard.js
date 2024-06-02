//css
import './AdminDashBoard.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//images
import icon_search from '../../assets/images/img_AdminDashBoard/icon_search.svg'
import logo_pet_health_care from '../../assets/images/img_AdminDashBoard/logo_pethealthcare.png'
function AdminDashBoard() {
    return (

        <div className="Admin-DashBoard container-fluid">

            <div className="row">
                <div className="admin-DashBoard-Header row">
                    <div className='admin-DashBoard-Header-Logo col-md-2'>
                        <img className="admin-DashBoard-Logo " src={logo_pet_health_care} alt="logo-pet" />
                    </div>
                    <div className='admin-DashBoard-Header-Account-Wrapper col-md-10'>
                        <div className="admin-DashBoard-Header-Account">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                            <div className="admin-DashBoard-Header-Account-Text"> Hi Admin</div>
                        </div>
                    </div>
                </div>

                <div className="Admin-DashBoard-Content row">
                    <div className="Admin-DashBoard-Navigate col-md-2">
                        <div className="Admin-DashBoard-Navigate-Text">
                            <div className="Admin-DashBoard-Navigate-Dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                </svg>
                                <div className=" Admin-DashBoard-Navigate-Text-Dashboard"> DashBoard </div>
                            </div>
                            <div className="Admin-DashBoard-Navigate-Text-Rest">
                                <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>Account</div>
                                <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>Booking</div>
                                <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>Settings</div>
                            </div>
                        </div>
                        <div className="Admin-DashBoard-Navigate-Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="42" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg>
                            <span>
                                Logout
                            </span>
                        </div>
                    </div>

                    <div className="Admin-DashBoard-Main col-md-10">
                        <div className="Admin-DashBoard-Main_Title">
                            <div className="Admin-DashBoard-Main_Title-Left">
                                <h2 className='Admin-DashBoard-Main_Title-Left-Intro'>Hi, welcome back!</h2>
                                <p className='Admin-DashBoard-Main_Title-Left-text'>Sales monitoring dashboard template.</p>
                            </div>
                            <div className="Admin-DashBoard-Main_Title-Right">
                                <label className='Admin-DashBoard-title-Star'>Customer Ratings</label>
                                <div className='Admin-DashBoard-Star'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="#fbbc0b" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="#fbbc0b" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="#97a3b9" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="#97a3b9" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="#97a3b9" class="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>
                                    <span>(14.000)</span>
                                </div>
                            </div>
                        </div>
                        <div className="Admin-DashBoard-Main-ChooseDate">
                            <div className="Admin-DashBoard-Main-ChooseDate_Text">Choose Date:</div>
                            <input type="date"
                                id="start"
                                name="trip-start"
                                value="2022-07-22"
                                min="2018-01-01" max="2026-12-31" />

                        </div>

                        <div className="Admin-DashBoard-Main-Header row">
                            <div className="Admin-DashBoard-Main-Header-Income col-md-3">
                                <div className="Admin-DashBoard-Main-Header-Note"> Daily income </div>
                                <div className="Admin-DashBoard-Main-Header-Money"> $5,678.90 </div>
                                <div className="Admin-DashBoard-Main-Header-Percent"> +20% day over day </div>
                            </div>

                            <div className="Admin-DashBoard-Main-Header-Income col-md-3">
                                <div className="Admin-DashBoard-Main-Header-Note">Weekly income </div>
                                <div className="Admin-DashBoard-Main-Header-Money"> $45,678.90 </div>
                                <div className="Admin-DashBoard-Main-Header-Percent"> +10% day over week </div>
                            </div>

                            <div className="Admin-DashBoard-Main-Header-Income col-md-3">
                                <div className="Admin-DashBoard-Main-Header-Note"> Monthly income </div>
                                <div className="Admin-DashBoard-Main-Header-Money"> $230,678.90 </div>
                                <div className="Admin-DashBoard-Main-Header-Percent"> +23% day over month </div>
                            </div>

                            <div className="Admin-DashBoard-Main-Header-Income col-md-3">
                                <div className="Admin-DashBoard-Main-Header-Note"> Total </div>
                                <div className="Admin-DashBoard-Main-Header-Money"> $5,678.90 </div>
                                <div className="Admin-DashBoard-Main-Header-Percent"> +20% day over day </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Wrapper">
                            <div className='Admin-DashBoard-Main-Table'>
                                <div className='Admin-DashBoard-Main-Table-Title'>
                                    Booking List
                                </div>
                                <div className='Admin-DashBoard-Main-Table-Title-Text'>
                                    Recent Booking
                                </div>
                                <div className="Admin-DashBoard-Main-Search">
                                    <input type="text" placeholder="Search Name" className="Admin-DashBoard-Main-Search-Input " />
                                    <button className="Admin-DashBoard-Main-Search-Button"> <img src={icon_search} alt="" /> </button>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Header">
                                    <div className="Admin-DashBoard-Main-Table-Header-Title "> Booking ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title "> Customer ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title "> Pet ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title "> Total Price </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title "> Date </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title-Btn "> Details </div>
                                </div>

                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row "> 2/6/2024 </div>

                                    <div className="Admin-DashBoard-Main-Table-Content-Btn_Wrapper ">
                                        <button type="button" class="Admin-DashBoard-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Details
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>










                                <div className='Admin-DashBoard-Pagination'>
                                    <Stack spacing={2}>
                                        <Pagination count={10} />
                                    </Stack>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default AdminDashBoard;