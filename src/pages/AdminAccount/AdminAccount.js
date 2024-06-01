//css
import './AdminAccount.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//images
import logo_pet_health_care from '../../assets/images/img_AdminAccount/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminAccount/icon_search.svg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function AdminAccount() {
    return (

        <div className="Admin-Account container-fluid">
            <div className="row">

                <div className="Admin-Account-Header row">
                    <div className='Admin-Account-Header-Logo col-md-2'>
                        <img className="Admin-Account-Logo " src={logo_pet_health_care} alt="logo-pet" />
                    </div>
                    <div className='Admin-Account-Header-Account-Wrapper col-md-10'>
                        <div className="Admin-Account-Header-Account">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                            <div className="Admin-Account-Header-Account-Text"> Hi Admin</div>
                        </div>
                    </div>
                </div>

                <div className="Admin-Account-Content row">
                    <div className="Admin-Account-Navigate col-md-2">
                        <div className="Admin-Account-Navigate-Text">
                            <div className="Admin-Account-Navigate-Dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                </svg>
                                <div className=" Admin-Account-Navigate-Text-Dashboard"> DashBoard </div>
                            </div>
                            <div className="Admin-Account-Navigate-Text-Rest">
                                <div className='Admin-Account-Navigate-Text-Rest-Menu'>Account</div>
                                <div className='Admin-Account-Navigate-Text-Rest-Menu'>Booking</div>
                                <div className='Admin-Account-Navigate-Text-Rest-Menu'>Settings</div>
                            </div>
                        </div>
                        <div className="Admin-Account-Navigate-Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="42" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg>
                            <span>
                                Logout
                            </span>
                        </div>
                    </div>


                    <div className="Admin-Account-Main col-md-10">

                        <div className="Admin-Account-Main-Table-Wrapper">
                            <div className='Admin-Account-Main-Table'>
                                <div className='Admin-Account-Main-Table-Title'>
                                    Account List
                                </div>
                                <div className='Admin-Account-Main-Table-Title-Text'>
                                    Account Information
                                </div>
                                <div className="Admin-Account-Main-Filter">
                                    <div className="Admin-Account-Main-Search">
                                        <input type="text" placeholder="Search Name" className="Admin-Account-Main-Search-Input " />
                                        <button className="Admin-Account-Main-Search-Button"> <img src={icon_search} alt="" /> </button>
                                    </div>
                                    <div className="Admin-Account-Select-Role">
                                        <FilterAltIcon />
                                        Select Role:
                                        <select className="Admin-Account-Select-Filter" name="role">
                                            <option>All</option>
                                            <option>Customer</option>
                                            <option>Veterinarians</option>
                                            <option>Staff</option>
                                            <option>Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="Admin-Account-Main-Table-Header">
                                    <div className="Admin-Account-Main-Table-Header-Title "> Account ID </div>
                                    <div className="Admin-Account-Main-Table-Header-Title "> Name </div>
                                    <div className="Admin-Account-Main-Table-Header-Title "> Role </div>
                                    <div className="Admin-Account-Main-Table-Header-Title-Btn "> Action </div>

                                </div>

                                <div className="Admin-Account-Main-Table-Content-Row-Wrapper">
                                    <div className="Admin-Account-Main-Table-Content-Row "> A00001 </div>
                                    <div className="Admin-Account-Main-Table-Content-Row "> Leslie </div>
                                    <div className="Admin-Account-Main-Table-Content-Row "> Veterinarians </div>
                                    <div className="Admin-Account-Main-Table-Content-Row ">


                                        <span className="Admin-Account-Main-Table-Content-Btn_Wrapper ">
                                            <button type="button" class="Admin-Account-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" >
                                                <BorderColorOutlinedIcon
                                                    sx={{
                                                        color: blue[400],
                                                    }}
                                                />
                                            </button>

                                            <div class="modal fade" id="exampleModalEdit" tabindex="-1" aria-labelledby="exampleModalLabelEdit" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabelEdit">Update Information</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className="Admin-Account-modal-update-name">
                                                                <div className="Admin-Account-modal-title"> Name </div>
                                                                <div className="Admin-Account-modal-update" ><div className="Admin-Account-modal-initials">Old name: </div> Leslie </div>
                                                                <div className="Admin-Account-modal-update"  ><div className="Admin-Account-modal-initials">New name: </div><input className="Admin-Account-input" placeholder="Name" /> </div>
                                                            </div>
                                                            <div className="Admin-Account-modal-update-email">
                                                                <div className="Admin-Account-modal-title"> Email </div>
                                                                <div className="Admin-Account-modal-update"  ><div className="Admin-Account-modal-initials">Old email: </div> Leslie23@gmail.com </div>
                                                                <div className="Admin-Account-modal-update"  ><div className="Admin-Account-modal-initials">New email: </div> <input className="Admin-Account-input" type="email" placeholder="Example@gmail.com" /> </div>
                                                            </div>
                                                            <div className="Admin-Account-modal-update-phone">
                                                                <div className="Admin-Account-modal-title"> Phone </div>

                                                                <div className="Admin-Account-modal-update"  ><div className="Admin-Account-modal-initials">Old Phone number: </div> 0777123456</div>
                                                                <div className="Admin-Account-modal-update"  > <div className="Admin-Account-modal-initials">New phone number: </div> <input className="Admin-Account-input-phone" placeholder="XXXXXXXXXX" /> </div>
                                                            </div>

                                                            <div className="Admin-Account-modal-update-role">
                                                                <div className="Admin-Account-modal-title"> Role </div>

                                                                <div className="Admin-Account-modal-update"  > <div className="Admin-Account-modal-initials">Old role: </div> Veterinarians </div>
                                                                <div className="Admin-Account-modal-update"  ><div className="Admin-Account-modal-initials">New role: </div>
                                                                    <select className="Admin-Account-input-role">
                                                                        <option>Customer</option>
                                                                        <option>Veterinarians</option>
                                                                        <option>Staff</option>
                                                                        <option>Admin</option>
                                                                    </select>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-success">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        <span className="Admin-Account-Main-Table-Content-Btn_Wrapper ">
                                            <button type="button" class="Admin-Account-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModalDelete">
                                                <DeleteOutlineIcon
                                                    sx={{
                                                        color: red[400]
                                                    }}
                                                />
                                            </button>

                                            <div class="modal fade" id="exampleModalDelete" tabindex="-1" aria-labelledby="exampleModalLabelDelete" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabelDelete">Delete Account</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className="Admin-Account-modal-more" > <div className="Admin-Account-modal-initials">Name: </div> Leslie </div>
                                                            <div className="Admin-Account-modal-more" ><div className="Admin-Account-modal-initials">Email: </div> Leslie23@gmail.com </div>
                                                            <div className="Admin-Account-modal-more" ><div className="Admin-Account-modal-initials">Phone number: </div> 0777123456 </div>
                                                            <div className="Admin-Account-modal-more" ><div className="Admin-Account-modal-initials">Role: </div> Veterinarians </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-danger">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        <span className="Admin-Account-Main-Table-Content-Btn_Wrapper ">
                                            <button type="button" class="Admin-Account-Main-Table-Content-Btn" data-bs-toggle="modal" data-bs-target="#exampleModalMore" >
                                                <MoreVertOutlinedIcon
                                                    sx={{
                                                        color: green[400]
                                                    }}
                                                />
                                            </button>

                                            <div class="modal fade" id="exampleModalMore" tabindex="-1" aria-labelledby="exampleModalLabelMore" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabelMore">Account Information</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className="Admin-Account-modal-more" > <div className="Admin-Account-modal-initials">Name: </div> Leslie </div>
                                                            <div className="Admin-Account-modal-more" ><div className="Admin-Account-modal-initials">Email: </div> Leslie23@gmail.com </div>
                                                            <div className="Admin-Account-modal-more" ><div className="Admin-Account-modal-initials">Phone number: </div> 0777123456 </div>
                                                            <div className="Admin-Account-modal-more" ><div className="Admin-Account-modal-initials">Role: </div> Veterinarians </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>






                                <div className='Admin-Account-Pagination'>
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

export default AdminAccount;