//css
import './AdminDashBoard.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//images
import icon_search from '../../assets/images/img_AdminDashBoard/icon_search.svg'
function AdminDashBoard() {
    return (

        <div className="Admin-DashBoard container-fluid">

            <div className="row">

                <div className="admin-DashBoard-Header row">
                    <div className='admin-DashBoard-Header-Logo col-md-2'>
                        {/* <img className="admin-DashBoard-Logo col-md-2" src={logo_pet_health_care} alt="logo-pet" /> */}
                        Pet Care
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                </svg>
                                <div className=" Admin-DashBoard-Navigate-Text-Dashboard"> DashBoard </div>
                            </div>
                            <div className="Admin-DashBoard-Navigate-Text-Rest">
                                <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>Account</div>
                                <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>Booking</div>
                                <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>Settings</div>
                                <div className="Admin-DashBoard-Navigate-Logout"> Logout </div>
                            </div>
                        </div>
                    </div>

                    <div className="Admin-DashBoard-Main col-md-10">
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
                        </div>

                        <div className="Admin-DashBoard-Main-Search">
                            <input type="text" placeholder="Input ID" className="Admin-DashBoard-Main-Search-Input " />
                            <button className="Admin-DashBoard-Main-Search-Button"> <img src={icon_search} alt="" /> </button>
                        </div>

                        <div className="Admin-DashBoard-Main-Table col-md-10">
                            <div className="Admin-DashBoard-Main-Table-Header col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Booking ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Customer ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Pet ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Pet ID </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Total Price </div>
                                    <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Details </div>
                                </div>
                            </div>

                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                                </div>
                            </div>
                            <div className="Admin-DashBoard-Main-Table-Content-Row-Wrapper col-12-md">
                                <div className="row">
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> C00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> P00001 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                    <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
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