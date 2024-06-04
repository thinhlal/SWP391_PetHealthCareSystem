import "./SelectPet.css"

import React, { useEffect, useState } from "react"
import Header from "../../components/User/Header/Header.js"
import Footer from "../../components/User/Footer/Footer.js";
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import select_dog from '../../assets/images/img_SelectPet/dog.jpg';
import select_cat from '../../assets/images/img_SelectPet/cat.jpg';
import select_add from '../../assets/images/img_SelectPet/select_add.jpg';

function SelectPet() {
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
return(
    <div className="all-select-pet">
        <Header></Header>
        <div className="select-pet-title">
            <p className="select-pet-title-content">
              Select Pet                         
            </p>
            <p className="select-pet-title-content-1">
                Choose which pet to have an appointment                        
            </p>
        </div>
        <div className="select-pet-body">
            <div className="pet-card">
            <div className="image-container">
            <img className="pet-image" src={select_add} alt=""></img>
                </div>
                <div className="select-add-pet-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div className="text-add-pet-card">
                                    Add Pet
                                </div>
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
           
            <div class="pet-card">
                <div class="image-container">
                <img className="pet-image" src={select_cat} alt=""></img>
                </div>
                     <p class="pet-id">123</p>
                    <button class="select-button">Select</button>
            </div>
            <div class="pet-card">
                 <div class="image-container">
                     <img className="pet-image"src={select_dog} alt=""></img>
                </div>
                    <p class="pet-id">123</p>
                    <button class="select-button">Select</button>
            </div>
        </div>
        <Footer></Footer>

    </div>
)
}
export default SelectPet;