import React from "react";
import "./DoctorInfo.css"
import Header from '../../components/User/Header/Header.js'
import Footer from '../../components/User/Footer/Footer.js'
//images
import doctor1 from '../../assets/images/img_Doctors/2.jpg';
// import doctor2 from '../../assets/images/img_Doctors/3.jpg';
function DoctorInfo() {
    return (
        <React.Fragment>
            <Header></Header>
            <div className="row veterinarian-overlay">
                <div class="veterinarian-name">Doctor Chen</div>
                <div class="veterinarian-wrapper">
                    <div class=" veterinarian">
                        <img src={doctor1} className="veterinarian-img" alt="" />
                        <div class="veterinarian-email">veterinarian1@gmail.com</div>
                    </div>
                    <div>
                        <div className="veterinarian-info">
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>
    )
}

export default DoctorInfo;