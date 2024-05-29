//css
import './AdminDashBoard.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//images
import logo_pet_health_care from '../../assets/images/img_AdminDashBoard/logo_pethealthcare.png'
import icon_admin from '../../assets/images/img_AdminDashBoard/logo_admin.png'
import icon_home from '../../assets/images/img_AdminDashBoard/icon_home.svg'
import icon_search from '../../assets/images/img_AdminDashBoard/icon_search.svg'
import vector_left from '../../assets/images/img_AdminDashBoard/left_vector-1.svg'
import vector_right from '../../assets/images/img_AdminDashBoard/right_vector.svg'
function AdminDashBoard() {
    return (

        <div className="Admin-DashBoard container-fluid">

        <div className="row">

            <div className="Admin-DashBoard-Header">
                <img className="Admin-DashBoard-Logo-Pet-Health-Care" src={logo_pet_health_care} alt="logo-pet" />
                <div className="Admin-DashBoard-Header-Admin">
                    <img className="Logo-Admin-DashBoard" src={icon_admin} alt="admin-icon"/>
                    <div className="Admin-DashBoard-Header-Admin-Text"> Hi Admin</div>
                </div>
            </div>

            <div className="Admin-DashBoard-Content row">

                <div className="Admin-DashBoard-Navigate col-md-2">
                    <div className="Admin-DashBoard-Navigate-Text">
                        <div className="Admin-DashBoard-Navigate-Dashboard">
                            <img src={icon_home} alt="home-icon"/>
                            <div className=" Admin-DashBoard-Navigate-Text-Dashboard"> DashBoard </div>
                        </div>
                        <div className=" Admin-DashBoard-Navigate-Text-Rest ">
                            <div> Account </div>
                            <div> Booking </div>
                            <div> Settings </div>
                            <div className="Admin-DashBoard-Navigate-Logout"> Logout </div>
                        </div>
                    </div>
                </div>

                <div className="Admin-DashBoard-Main col-md-10">
                    <div className="Admin-DashBoard-Main-Date">
                        ChooseDate <input type="date"/>
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
                        <input type="search" placeholder="Input ID" className="Admin-DashBoard-Main-Search-Input "/>
                        <button className="Admin-DashBoard-Main-Search-Button"> <img src={icon_search} alt=""/> </button>
                    </div>

                    <div className="Admin-DashBoard-Main-Table row">
                        <div className="Admin-DashBoard-Main-Table-Header col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Booking ID </div>
                                <div className="Admin-DashBoard-Main-Table-Header-Title col-md-3"> Customer ID </div>
                                <div className="Admin-DashBoard-Main-Table-Header-Title col-md-3"> Pet ID </div>
                                <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Total Price </div>
                                <div className="Admin-DashBoard-Main-Table-Header-Title col-md-2"> Details </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00001 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00001 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00001 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 120 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00002 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00002 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00002 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 160 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00003 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00003 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00003 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 290 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00004 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00004 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00004 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 100 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00005 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00005 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00005 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 200 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00006 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00006 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00006 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 190 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00007 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00007 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00007 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 90 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00008 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00008 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00008 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 100 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00009 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00009 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00009 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 200 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>

                        <div className="Admin-DashBoard-Main-Table-Content-Row col-12-md">
                            <div className="row">
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> B00010 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> C00010 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-3"> P00010 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> $ 130 </div>
                                <div className="Admin-DashBoard-Main-Table-Content-Row col-md-2"> <a href="#1234"> More </a> </div>
                            </div>
                        </div>
                    </div>

                    <div className="Admin-DashBoard-Main-Pagination">
                        <img className="Admin-DashBoard-Main-Pagination-Vector-Left" src={vector_left}
                            alt="pagination-left-vector"/>
                        <div className="Admin-DashBoard-Main-Table-Pagination-Text">
                            <div className="Admin-DashBoard-Main-Pagination-Number"> 1 </div>
                            <div className="Admin-DashBoard-Main-Pagination-Number"> 2 </div>
                            <div className="Admin-DashBoard-Main-Pagination-Number"> 3 </div>
                            <div className="Admin-DashBoard-Main-Pagination-Number"> 4 </div>
                            <div className="Admin-DashBoard-Main-Pagination-Number"> 5 </div>
                            <div className="Admin-DashBoard-Main-Pagination-Number"> 6 </div>
                        </div>
                        <img className="Admin-DashBoard-Main-Pagination-Vector-Right" src={vector_right} alt="pagination-Right-vector"/>
                    </div>
                </div>
            </div>
        </div>
    </div>


    );

}

export default AdminDashBoard;