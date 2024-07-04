import './YourBooking.css';
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Images
import Sidebar from '../../components/User/Sidebar/Sidebar.js';
// component
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useState, useEffect, useContext } from 'react';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.js';

function YourBooking() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [yourBookings, setYourBookings] = useState([]);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [currentBookingID, setCurrentBookingID] = useState(null);
  const [currentBookingData, setCurrentBookingData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const dataBookings = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/booking/getAllBookings/${user.accountID}`,
        );
        const sortDataBookings = dataBookings.data.allBookings.sort((a, b) =>
          a.dateBook.localeCompare(b.dateBook),
        );
        const sortTimeBookings = sortDataBookings.sort((a, b) =>
          b.startTime.localeCompare(a.startTime),
        );
        console.log(sortTimeBookings);
        setYourBookings(sortTimeBookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllBookings();
  }, [user.accountID]);

  const handleCancelBooking = async bookingID => {
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/booking/cancelBooking`,
        { bookingID },
      );
      const dataBookings = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/booking/getAllBookings/${user.accountID}`,
      );
      const sortDataBookings = dataBookings.data.allBookings.sort((a, b) =>
        a.dateBook.localeCompare(b.dateBook),
      );
      const sortTimeBookings = sortDataBookings.sort((a, b) =>
        b.startTime.localeCompare(a.startTime),
      );
      setYourBookings(sortTimeBookings);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <AnimationComponent />;
  }

  const formatService = data => {
    return data.map(service => service.name);
  };

  const handleRatingChange = e => {
    setRating(e.target.value);
  };

  const handleFeedbackChange = e => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    try {
      axiosInstance.post(`${process.env.REACT_APP_API_URL}/rate/addRateStart`, {
        rating,
        feedback,
        customerID: user.customerDetails[0].customerID,
        bookingID: currentBookingID,
      });
    } catch (error) {}
  };

  return (
    <div className='main-container-your-booking-page'>
      <div className='row-your-booking'>
        <Header></Header>
        <div className='main-tittle-your-booking'>
          <div className='overlap-group-booking'>
            <div className='text-tittle-your-booking'>Your Booking</div>
          </div>
        </div>
        <div className='overlap-booking'>
          <Sidebar />
          <div className='main-content-booking'>
            <div className='your-Pet-Header-booking'>
              <div className='search-pet-booking'>
                <div className='search-pet-txt-booking'>
                  Search Your Booking
                </div>
                <div className='search-pet-input-booking'>
                  <input
                    type='text'
                    placeholder='Search'
                    className='label-input-booking'
                  />
                  <div className='search-pet-input-icons-booking'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-search'
                      viewBox='0 0 16 16'
                    >
                      <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='detail-information-booking'>
              {yourBookings.length === 0 ? (
                <div className='no-bookings-message'>
                  You don't have any appointments at the moment.
                </div>
              ) : (
                yourBookings.map((booking, index) => (
                  <div
                    key={index}
                    className='info-detail-booking'
                  >
                    <div className='detail-booking-confirm-booking'>
                      <div className='card-detail-booking-confirm-booking'>
                        <div className='card-ID-booking'>
                          <div className='detail-number-ID'>
                            ID: {booking.bookingID}
                            <div
                              className={`status-booking
                              ${
                                booking.isCancel
                                  ? 'status-cancel'
                                  : booking.paymentsDetails[0].isCancelPayment
                                    ? 'status-cancel'
                                    : booking.paymentsDetails[0].isSuccess &&
                                        booking.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL' &&
                                        !booking.isCheckIn
                                      ? 'status-pending'
                                      : !booking.paymentsDetails[0].isSuccess &&
                                          booking.paymentsDetails[0]
                                            .paymentMethod === 'COUNTER' &&
                                          !booking.isCheckIn
                                        ? 'status-pending'
                                        : booking.paymentsDetails[0]
                                              .isSuccess &&
                                            booking.paymentsDetails[0]
                                              .paymentMethod === 'PAYPAL' &&
                                            booking.isCheckIn
                                          ? 'status-completed'
                                          : booking.paymentsDetails[0]
                                                .isSuccess &&
                                              booking.paymentsDetails[0]
                                                .paymentMethod === 'COUNTER' &&
                                              booking.isCheckIn
                                            ? 'status-completed'
                                            : null
                              }
                                }`}
                            >
                              Status:&nbsp;
                              {booking.isCancel ? (
                                <span>Cancel Booking</span>
                              ) : booking.paymentsDetails[0].isCancelPayment ? (
                                <span>Cancel Payment</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL' &&
                                !booking.isCheckIn ? (
                                <span>Pending</span>
                              ) : !booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'COUNTER' &&
                                !booking.isCheckIn ? (
                                <span>Pending</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL' &&
                                booking.isCheckIn ? (
                                <span>Done</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'COUNTER' &&
                                booking.isCheckIn ? (
                                <span>Done</span>
                              ) : (
                                <span>NULL</span>
                              )}
                            </div>
                          </div>
                          <div className='card-body-content-booking'>
                            <div className='text-card-body-content-booking'>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Date Booking:
                                </div>{' '}
                                <br />
                                {booking.dateBook.split('T')[0]}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Time:
                                </div>{' '}
                                <br />
                                {`${booking.startTime} - ${booking.endTime}`}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Pet Name:
                                </div>{' '}
                                <br />
                                {booking?.petDetails[0]?.name}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Pet Type:
                                </div>{' '}
                                <br />
                                {booking?.petDetails[0]?.petType}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Doctor:
                                </div>{' '}
                                <br />
                                {booking?.doctorDetails[0]?.name ? (
                                  booking.doctorDetails[0].name
                                ) : (
                                  <span>No Doctor</span>
                                )}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Services:
                                </div>{' '}
                                <br />
                                {formatService(booking.servicesInBooking).join(
                                  ', ',
                                )}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Payment:
                                </div>{' '}
                                <br />
                                {booking.paymentsDetails[0].paymentMethod}
                              </div>
                            </div>
                          </div>

                          <div className='price-cancel-rate-booking'>
                            <div className='total-price-booking'>
                              Total Price:&nbsp;
                              <div className='detail-price-booking'>
                                {booking.totalPrice}
                              </div>
                            </div>
                            {booking.isCancel ? null : booking
                                .paymentsDetails[0]
                                .isCancelPayment ? null : booking
                                .paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              new Date(booking.dateBook) > new Date() &&
                              !booking.isRate &&
                              !booking.isCheckIn ? (
                              <div
                                onClick={() =>
                                  handleCancelBooking(booking.bookingID)
                                }
                                className='cancel-booking-button-1'
                              >
                                <div className='text-sign-in-button-booking'>
                                  Cancel Booking
                                </div>
                              </div>
                            ) : !booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' &&
                              new Date(booking.dateBook) > new Date() &&
                              !booking.isRate &&
                              !booking.isCheckIn ? (
                              <div
                                onClick={() =>
                                  handleCancelBooking(booking.bookingID)
                                }
                                className='cancel-booking-button-1'
                              >
                                <div className='text-sign-in-button-booking'>
                                  Cancel Booking
                                </div>
                              </div>
                            ) : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              booking.isCheckIn &&
                              !booking.isRate ? (
                              <button
                                type='button'
                                className='btn btn-primary feedback-rate-booking'
                                data-bs-toggle='modal'
                                data-bs-target='#newModal'
                                onClick={() =>
                                  setCurrentBookingID(booking.bookingID)
                                }
                              >
                                <div className='text-feedback-rate-booking'>
                                  Feedback
                                </div>
                              </button>
                            ) : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' &&
                              booking.isCheckIn &&
                              !booking.isRate ? (
                              <button
                                type='button'
                                className='btn btn-primary feedback-rate-booking'
                                data-bs-toggle='modal'
                                data-bs-target='#newModal'
                                onClick={() =>
                                  setCurrentBookingID(booking.bookingID)
                                }
                              >
                                <div className='text-feedback-rate-booking'>
                                  Feedback
                                </div>
                              </button>
                            ) : (
                              <button
                                type='button'
                                className='btn btn-primary feedback-rate-booking'
                                data-bs-toggle='modal'
                                data-bs-target='#yourRate'
                                onClick={() => {
                                  setCurrentBookingData(booking);
                                }}
                              >
                                <div className='text-feedback-rate-booking'>
                                  Your Rate
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {yourBookings.length > 0 && (
                <div className='add-pet_pagination'>
                  <nav aria-label='...'>
                    <ul className='pagination'>
                      <li className='page-item disabled'>
                        <a
                          className='page-link'
                          href='#123'
                        >
                          Previous
                        </a>
                      </li>
                      <li className='page-item'>
                        <a
                          className='page-link'
                          href='#123'
                        >
                          1
                        </a>
                      </li>
                      <li
                        className='page-item active'
                        aria-current='page'
                      >
                        <a
                          className='page-link'
                          href='123'
                        >
                          2
                        </a>
                      </li>
                      <li className='page-item'>
                        <a
                          className='page-link'
                          href='#123'
                        >
                          3
                        </a>
                      </li>
                      <li className='page-item'>
                        <a
                          className='page-link'
                          href='123'
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>

            <div
              className='modal fade'
              id='newModal'
              tabIndex='-1'
              aria-labelledby='newModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1
                      className='modal-title fs-5'
                      id='newModalLabel'
                    >
                      Your opinion matters to us!
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <div className='rating-container'>
                      <div className='main-title-rate'>
                        How was the quality of the service?
                      </div>
                      <div className='rate-success'>
                        <div className='rating'>
                          <input
                            type='radio'
                            name='rating'
                            value='5'
                            id='5'
                            onChange={handleRatingChange}
                          />
                          <label htmlFor='5'>☆</label>
                          <input
                            type='radio'
                            name='rating'
                            value='4'
                            id='4'
                            onChange={handleRatingChange}
                          />
                          <label htmlFor='4'>☆</label>
                          <input
                            type='radio'
                            name='rating'
                            value='3'
                            id='3'
                            onChange={handleRatingChange}
                          />
                          <label htmlFor='3'>☆</label>
                          <input
                            type='radio'
                            name='rating'
                            value='2'
                            id='2'
                            onChange={handleRatingChange}
                          />
                          <label htmlFor='2'>☆</label>
                          <input
                            type='radio'
                            name='rating'
                            value='1'
                            id='1'
                            onChange={handleRatingChange}
                          />
                          <label htmlFor='1'>☆</label>
                        </div>
                      </div>

                      <textarea
                        placeholder='Leave a message, if you want'
                        value={feedback}
                        onChange={handleFeedbackChange}
                      ></textarea>
                      <button
                        className='rating-button'
                        onClick={handleSubmitFeedback}
                      >
                        Rate now
                      </button>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='button-secondary'
                      data-bs-dismiss='modal'
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='modal fade'
              id='yourRate'
              tabIndex='-1'
              aria-labelledby='newModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1
                      className='modal-title fs-5'
                      id='newModalLabel'
                    >
                      Your Rate!
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <h1>Rating</h1>
                    <div>
                      Rate Star: {currentBookingData?.rateDetails[0]?.rate}
                    </div>
                    <div>
                      Rate Comment:{' '}
                      {currentBookingData?.rateDetails[0]?.comment}
                    </div>
                  </div>
                  <div className='modal-footer'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default YourBooking;
