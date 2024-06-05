import "./YourPet.css"
import React, { useEffect, useState } from "react"
import Header from "../../components/User/Header/Header.js"
import Footer from "../../components/User/Footer/Footer.js";
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Images
import pet_img1 from '../../assets/images/img_YourPet/c2dc9a5328014cead97d6268b688a16e.jpg';
import pet_img2 from '../../assets/images/img_YourPet/30c8eac7d84112a145ab7b06ce9e6eb1.jpg';
import pet_img3 from '../../assets/images/img_YourPet/f86eb143541c5a58b7132ab54d6d1f12.jpg';
import Sidebar from "../../components/User/Sidebar/Sidebar.js";
function YourPet() {
    const [avatar, setAvatar] = useState();
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        }
    }
    return (
        <div className="container-fluid your-pet">
            <div className="row">
                <Header></Header>
                <div className="main-tittle">
                    <div className="overlap-group">
                        <div className="text-tittle">Pet Information</div>
                    </div>
                </div>
                <div className="overlap">
                    <Sidebar></Sidebar>
                    <div className="main-content">
                        <div className="your-Pet-Header">
                            <div className="search-pet">
                                <div className="search-pet-txt">
                                    Search Your Pet Name
                                </div>
                                <div className="search-pet-input">
                                    <input type="text" placeholder="Search" className="label-input" />
                                    <div className="search-pet-input-icons">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="add-pet-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div className="text-wrapper-3">
                                    Add Pet
                                </div>
                            </div>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Pet Information Form</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="box">
                                                <div className="pop-up-form">
                                                    <div className="overlap-group">
                                                        <div className="form">
                                                            <div className="pet-image-upload">

                                                                {avatar && (<img className="cloud-upload" src={avatar.preview} alt="" />)}

                                                            </div>
                                                            <div className="pet-image-upload-choose-file">
                                                                <input type="file" onChange={handlePreviewAvatar} className="pet-image-upload-choose-file-input"></input>
                                                            </div>

                                                            <div className="pet-update-text">
                                                                <label className="pet-update-text-label" htmlFor="input-1">Pet name</label>
                                                                <div className="pet-update-text-input">
                                                                    <input className="type-here" placeholder="Enter pet name" type="text" id="input-1" />
                                                                </div>
                                                            </div>

                                                            <div className="pet-update-text">
                                                                <label className="pet-update-text-label" htmlFor="input-1">Pet name</label>
                                                                <div className="pet-update-text-input">
                                                                    <input className="type-here" placeholder="Enter pet name" type="text" id="input-1" />
                                                                </div>
                                                            </div>

                                                            <div className="pet-update-text">
                                                                <label className="pet-update-text-label" htmlFor="input-1">Pet name</label>
                                                                <div className="pet-update-text-input">
                                                                    <input className="type-here" placeholder="Enter pet name" type="text" id="input-1" />
                                                                </div>
                                                            </div>
                                                            <div className="pet-update-text">
                                                                <label className="pet-update-text-label" htmlFor="input-1">Pet name</label>
                                                                <div className="pet-update-text-input">
                                                                    <input className="type-here" placeholder="Enter pet name" type="text" id="input-1" />
                                                                </div>
                                                            </div>

                                                            <div className="pet-update-type">
                                                                <div className="pet-update-type-header">
                                                                    <div className="radio-selection">Type</div>
                                                                </div>

                                                                <div className="pet-update-type-radio">
                                                                    <div className="radio">
                                                                        <input type="radio" id="dog" name="type" value="dog" />

                                                                    </div>
                                                                    <div className="radio-selection">Dog</div>
                                                                </div>
                                                                <div className="pet-update-type-radio">
                                                                    <div className="radio">
                                                                        <input type="radio" id="cat" name="type" value="cat" />

                                                                    </div>
                                                                    <div className="radio-selection">Cat</div>
                                                                </div>
                                                            </div>

                                                            <div className="pet-update-type">
                                                                <div className="pet-update-type-header">
                                                                    <div className="radio-selection">Gender</div>
                                                                </div>

                                                                <div className="pet-update-type-radio">
                                                                    <div className="radio">
                                                                        <input type="radio" id="male" name="gender" value="male" />
                                                                    </div>
                                                                    <div className="radio-selection">Male</div>
                                                                </div>

                                                                <div className="pet-update-type-radio">
                                                                    <div className="radio">
                                                                        <input type="radio" id="female" name="gender" value="female" />

                                                                    </div>
                                                                    <div className="radio-selection">Female</div>
                                                                </div>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" style={{ fontFamily: "Montserrat, sans-serif" }}>Close</button>
                                            <button type="button" className="btn btn-success" style={{ fontFamily: "Montserrat, sans-serif" }}>Add Pet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-information">
                            {/* img 1 */}
                            <a href="/pet-profile" className="profile-card-link">
                            <div className="profile-card-pet">
                              <div className="profile-pet-image">
                                <img src={pet_img1} alt="Profile" />
                              </div>
                              <div className="profile-info-pet">
                                <h2>KiKi</h2>
                                <span className="status-pet">Active</span>
                              </div>
                            </div>
                            </a>

                            {/* img 2 */}
                            <a href="http://example.com" className="profile-card-link">
                            <div className="profile-card-pet">
                              <div className="profile-pet-image">
                                <img src={pet_img2} alt="Profile" />
                              </div>
                              <div className="profile-info-pet">
                                <h2>MiMi</h2>
                                <span className="status-pet">Active</span>
                              </div>
                            </div>
                            </a>

                            {/* img 3 */}
                            <a href="http://example.com" className="profile-card-link">
                            <div className="profile-card-pet">
                              <div className="profile-pet-image">
                                <img src={pet_img3} alt="Profile" />
                              </div>
                              <div className="profile-info-pet">
                                <h2>LaLa</h2>
                                <span className="status-pet">Active</span>
                              </div>
                            </div>
                            </a>

                        </div>
                    </div>
                </div>
                
                <Footer></Footer>
            </div>
        </div>
    )
}

export default YourPet;