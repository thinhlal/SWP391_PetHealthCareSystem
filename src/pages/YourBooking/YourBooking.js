import "./YourBooking.css";
import React from "react";
import Header from "../../components/User/Header/Header.js";
import Footer from "../../components/User/Footer/Footer.js";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Images
import dog_icon from "../../assets/images/img_YourPet/dog_icon.png";


function YourBooking() {

  return (
    <div className="container-your-booking">
      <div className="row-your-booking">
        <Header></Header>
        <div className="main-tittle-your-booking">
          <div className="overlap-group-booking">
            <div className="text-tittle-your-booking">Booking</div>
          </div>
        </div>
        <div className="overlap-booking">
          <div className="your-booking-sidebar">
            <div>
              <div className="category-main-header-booking">
                <div className="category-header-booking">
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
                  <div className="category-header-text-booking">Categories</div>
                </div>
              </div>
              <div className="list-booking-items-category-booking">
                <div className="menu-item-your-booking">
                  <img
                    className="menu-icons-your-booking"
                    src={dog_icon}
                    alt=""
                  />
                  <div className="menu-item_text-booking">Your pet</div>
                </div>

                <div className="menu-item-your-booking">
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
                  <div className="menu-item_text-booking">Your booking</div>
                </div>

                <div className="menu-item-your-booking">
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
                  <div className="menu-item_text-booking">
                    Pet are staying in cages
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-content-booking">
            <div className="your-Pet-Header-booking">
              <div className="search-pet-booking">
                <div className="search-pet-txt-booking">
                  Search Your Booking
                </div>
                <div className="search-pet-input-booking">
                  <input
                    type="text"
                    placeholder="Search"
                    className="label-input-booking"
                  />
                  <div className="search-pet-input-icons-booking">
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
            </div>

            <div className="detail-information-booking">
              {/* column 1 */}
              <div className="info-detail-booking">
                <div className="detail-booking-confirm-booking">
                  <div className="card-detail-booking-confirm-booking">
                    <div className="card-ID-booking">
                      <div className="detail-number-ID">ID: OD45345345435
                        <div className="status-booking-1">Status: Pending</div>
                      </div>
                      <div className="card-body-content-booking">
                        <div className="text-card-body-content-booking">
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Date Booking:
                            </div>{" "}
                            <br />
                            29 nov 2024
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Time:
                            </div>{" "}
                            <br />
                            10:00
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Pet Name:
                            </div>{" "}
                            <br />
                            ABC
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Pet Type:
                            </div>{" "}
                            <br />
                            Dog
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Selected Doctor:
                            </div>{" "}
                            <br />
                            Alex
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Services:
                            </div>{" "}
                            <br />
                            Periodic health check-ups for dogs
                          </div>
                        </div>
                      </div>

                      <div className="price-cancel-rate-booking">
                        <div className="total-price-booking">
                          Total Price:&nbsp;{" "}
                          <div className="detail-price-booking">70$</div>
                        </div>
                        <a href="/" className="cancel-booking-button-1">
                          <div className="text-sign-in-button-booking">
                            Cancel Booking
                          </div>
                        </a>
                        {/* button feedback */}
                        <button type="button" className="btn btn-primary feedback-rate-booking" data-bs-toggle="modal" data-bs-target="#newModal">
                          <div className="text-feedback-rate-booking">Feedback</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* column 2 */}
              <div className="info-detail-booking">
                <div className="detail-booking-confirm-booking">
                  <div className="card-detail-booking-confirm-booking">
                    <div className="card-ID-booking">
                      <div className="detail-number-ID">ID: OD45345345435
                        <div className="status-booking-2">Status: Completed booking</div>
                      </div>
                      <div className="card-body-content-booking">
                        <div className="text-card-body-content-booking">
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Date Booking:
                            </div>{" "}
                            <br />
                            10 nov 2024
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Time:
                            </div>{" "}
                            <br />
                            12:00
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Selected Doctor:
                            </div>{" "}
                            <br />
                            Alex
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Services:
                            </div>{" "}
                            <br />
                            Periodic health check-ups for dogs
                          </div>
                        </div>
                      </div>

                      <div className="price-cancel-rate-booking">
                        <div className="total-price-booking">
                          Total Price:&nbsp;{" "}
                          <div className="detail-price-booking">50$</div>
                        </div>
                        <a href="/" className="cancel-booking-button-2">
                          <div className="text-sign-in-button-booking">
                            Cancel Booking
                          </div>
                        </a>
                        {/* button feedback */}
                        <button type="button" className="btn btn-primary feedback-rate-booking" data-bs-toggle="modal" data-bs-target="#newModal">
                          <div className="text-feedback-rate-booking">Feedback</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* column 3 */}
              <div className="info-detail-booking">
                <div className="detail-booking-confirm-booking">
                  <div className="card-detail-booking-confirm-booking">
                    <div className="card-ID-booking">
                      <div className="detail-number-ID">ID: OD45345345435
                        <div className="status-booking-3">Status: Completed booking</div>
                      </div>
                      <div className="card-body-content-booking">
                        <div className="text-card-body-content-booking">
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Date Booking:
                            </div>{" "}
                            <br />
                            20 nov 2024
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Time:
                            </div>{" "}
                            <br />
                            15:00
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Selected Doctor:
                            </div>{" "}
                            <br />
                            Alex
                          </div>
                          <div className="col-booking">
                            <div className="mini-title-detail-booking">
                              Services:
                            </div>{" "}
                            <br />
                            Periodic health check-ups for dogs
                          </div>
                        </div>
                      </div>

                      <div className="price-cancel-rate-booking">
                        <div className="total-price-booking">
                          Total Price:&nbsp;{" "}
                          <div className="detail-price-booking">45$</div>
                        </div>
                        <a href="/" className="cancel-booking-button-3">
                          <div className="text-sign-in-button-booking">
                            Cancel Booking
                          </div>
                        </a>
                        {/* button feedback */}
                        <button type="button" className="btn btn-primary feedback-rate-booking" data-bs-toggle="modal" data-bs-target="#newModal">
                          <div className="text-feedback-rate-booking">Feedback</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modal rating */}

            <div class="modal fade" id="newModal" tabindex="-1" aria-labelledby="newModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="newModalLabel">Your opinion matters to us!</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className="rating-container">
                      <div className="main-title-rate">How was quality of the call?</div>
                      <div className="rate-success">

                        <div className="rating">
                          <input type="radio" name="rating" value="5" id="5" />
                          <label htmlFor="5">☆</label>
                          <input type="radio" name="rating" value="4" id="4" />
                          <label htmlFor="4">☆</label>
                          <input type="radio" name="rating" value="3" id="3" />
                          <label htmlFor="3">☆</label>
                          <input type="radio" name="rating" value="2" id="2" />
                          <label htmlFor="2">☆</label>
                          <input type="radio" name="rating" value="1" id="1" />
                          <label htmlFor="1">☆</label>
                        </div>
                      </div>

                      <textarea placeholder="Leave a message, if you want"></textarea>
                      <button className="rating-button">Rate now</button>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="button-secondary" data-bs-dismiss="modal">Maybe later</button>
                  </div>
                </div>
              </div>
            </div>

            {/* modal confirm  */}

          </div>
        </div>

        {/* pagination */}
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

export default YourBooking;
