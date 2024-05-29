import "./FeedbackBooking.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/User/Header/Header.js";
import Footer from "../../components/User/Footer/Footer.js";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Images
import dog_icon from "../../assets/images/img_YourPet/dog_icon.png";
function YourPet() {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <Header></Header>
        <div className="main-tittle">
          <div className="overlap-group">
            <div className="text-tittle">Pet Information</div>
          </div>
        </div>
        <div className="overlap">
          <div className="your-pet-sidebar">
            <div>
              <div className="category-Header_wrapper">
                <div className="category-Header">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#000"
                    className="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                  <div className="category-Header-Txt">Categories</div>
                </div>
              </div>
              <div className="list-items-category">
                <div className="menu-item">
                  <img className="menu-icons" src={dog_icon} alt="" />
                  <div className="menu-item_txt">Your pet</div>
                </div>

                <div className="menu-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-calendar-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                  <div className="menu-item_txt">Your booking</div>
                </div>

                <div className="menu-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-house-door"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                  </svg>
                  <div className="menu-item_txt">Pet are staying in cages</div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content">
            <div className="your-Pet-Header">
              <div className="search-pet">
                <div className="search-pet-txt">Search Your Booking</div>
                <div className="search-pet-input">
                  <input
                    type="text"
                    placeholder="Search"
                    className="label-input"
                  />
                  <div className="search-pet-input-icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="add-pet-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="text-wrapper-3">Add Pet</div>
              </div>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Pet Information Form
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="box">
                        <div className="pop-up-form">
                          <div className="overlap-group">
                            <div className="form">
                              <div className="pet-image-upload">
                                {avatar && (
                                  <img
                                    className="cloud-upload"
                                    src={avatar.preview}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="pet-image-upload-choose-file">
                                <input
                                  type="file"
                                  onChange={handlePreviewAvatar}
                                  className="pet-image-upload-choose-file-input"
                                ></input>
                              </div>

                              <div className="pet-update-text">
                                <label
                                  className="pet-update-text-label"
                                  htmlFor="input-1"
                                >
                                  Pet name
                                </label>
                                <div className="pet-update-text-input">
                                  <input
                                    className="type-here"
                                    placeholder="Enter pet name"
                                    type="text"
                                    id="input-1"
                                  />
                                </div>
                              </div>

                              <div className="pet-update-text">
                                <label
                                  className="pet-update-text-label"
                                  htmlFor="input-1"
                                >
                                  Pet name
                                </label>
                                <div className="pet-update-text-input">
                                  <input
                                    className="type-here"
                                    placeholder="Enter pet name"
                                    type="text"
                                    id="input-1"
                                  />
                                </div>
                              </div>

                              <div className="pet-update-text">
                                <label
                                  className="pet-update-text-label"
                                  htmlFor="input-1"
                                >
                                  Pet name
                                </label>
                                <div className="pet-update-text-input">
                                  <input
                                    className="type-here"
                                    placeholder="Enter pet name"
                                    type="text"
                                    id="input-1"
                                  />
                                </div>
                              </div>
                              <div className="pet-update-text">
                                <label
                                  className="pet-update-text-label"
                                  htmlFor="input-1"
                                >
                                  Pet name
                                </label>
                                <div className="pet-update-text-input">
                                  <input
                                    className="type-here"
                                    placeholder="Enter pet name"
                                    type="text"
                                    id="input-1"
                                  />
                                </div>
                              </div>

                              <div className="pet-update-type">
                                <div className="pet-update-type-header">
                                  <div className="radio-selection">Type</div>
                                </div>

                                <div className="pet-update-type-radio">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="dog"
                                      name="type"
                                      value="dog"
                                    />
                                  </div>
                                  <div className="radio-selection">Dog</div>
                                </div>
                                <div className="pet-update-type-radio">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="cat"
                                      name="type"
                                      value="cat"
                                    />
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
                                    <input
                                      type="radio"
                                      id="male"
                                      name="gender"
                                      value="male"
                                    />
                                  </div>
                                  <div className="radio-selection">Male</div>
                                </div>

                                <div className="pet-update-type-radio">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="female"
                                      name="gender"
                                      value="female"
                                    />
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
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Add Pet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-information">
              {/* column 1 */}
              <div className="info-detail-booking">
                <div className="detail-booking-confirm">
                  <div className="card-detail-booking-confirm">
                    
                    <div className="card-ID-booking">
                      <div>ID: OD45345345435</div>
                      <div className="card-body-content">
                        <div className="text-card-body-content">
                          <div className="col">
                            <div>Date Booking:</div> <br />
                            29 nov 2019
                          </div>
                          <div className="col">
                            <div>Time:</div> <br />
                            10:00
                          </div>
                          <div className="col">
                            <div>Selected Doctor:</div> <br />
                            Picked by the courier
                          </div>
                          <div className="col">
                            <div>Services:</div> <br />
                            Periodic health check-ups for dogs
                          </div>
                        </div>
                      </div>

                      <div className="price-cancel-rate-booking">
                        <div className="total-price-booking">
                          Total Price: <div className="detail-price">50$</div>
                        </div>
                        <a href="/" className="cancel-booking-button">
                          <div className="text-sign-in-button">
                            Cancel Booking
                          </div>
                        </a>
                        <a href="/" className="feedback-rate-booking">
                          <div className="text-feedback-rate-booking">
                            Feedback
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* column 2 */}
              <div className="info-detail-booking">
                <div className="detail-booking-confirm">
                  <div className="card-detail-booking-confirm">
                  
                    <div className="card-ID-booking">
                      <div>ID: OD45345345435</div>
                      <div className="card-body-content">
                        <div className="text-card-body-content">
                          <div className="col">
                            <div>Date Booking:</div> <br />
                            29 nov 2019
                          </div>
                          <div className="col">
                            <div>Time:</div> <br />
                            12:00
                          </div>
                          <div className="col">
                            <div>Selected Doctor:</div> <br />
                            Picked by the courier
                          </div>
                          <div className="col">
                            <div>Services:</div> <br />
                            Periodic health check-ups for dogs
                          </div>
                        </div>
                      </div>

                      <div className="price-cancel-rate-booking">
                        <div className="total-price-booking">
                          Total Price: <div className="detail-price">50$</div>
                        </div>
                        <a href="/" className="cancel-booking-button">
                          <div className="text-sign-in-button">
                            Cancel Booking
                          </div>
                        </a>
                        <a href="/" className="feedback-rate-booking">
                          <div className="text-feedback-rate-booking">
                            Feedback
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* column 3 */}
              <div className="info-detail-booking">
                <div className="detail-booking-confirm">
                  <div className="card-detail-booking-confirm">
                   
                    <div className="card-ID-booking">
                      <>ID: OD45345345435</>
                      <div className="card-body-content">
                        <div className="text-card-body-content">
                          <div className="col">
                            <div>Date Booking:</div> <br />
                            29 nov 2019
                          </div>
                          <div className="col">
                            <div>Time:</div> <br />
                            15:00
                          </div>
                          <div className="col">
                            <div>Selected Doctor:</div> <br />
                            Picked by the courier
                          </div>
                          <div className="col">
                            <div>Services:</div> <br />
                            Periodic health check-ups for dogs
                          </div>
                        </div>
                      </div>

                      <div className="price-cancel-rate-booking">
                        <div className="total-price-booking">
                          Total Price: <div className="detail-price">50$</div>
                        </div>
                        <a href="/" className="cancel-booking-button">
                          <div className="text-sign-in-button">
                            Cancel Booking
                          </div>
                        </a>
                        <a href="/" className="feedback-rate-booking">
                          <div className="text-feedback-rate-booking">
                            Feedback
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="add-pet_pagination">
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#123">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#123">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <a className="page-link" href="123">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#123">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="123">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default YourPet;
