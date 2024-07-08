import './YourBooking.css';
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
import StarRate from '../../components/Admin/StarRate/StarRate.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../../components/User/Sidebar/Sidebar.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useState, useEffect, useContext } from 'react';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function YourBooking() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [yourBookings, setYourBookings] = useState([]);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [currentBookingID, setCurrentBookingID] = useState(null);
  const [currentBookingData, setCurrentBookingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
        const sortTimeBookings = dataBookings.data.allBookings.sort((a, b) =>
          b.startTime.localeCompare(a.startTime),
        );
        const sortDataBookings = sortTimeBookings.sort((a, b) =>
          b.dateBook.localeCompare(a.dateBook),
        );
        setYourBookings(sortDataBookings);
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
    setFeedback('');
    setRating(0);
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

  const handleSubmitFeedback = async () => {
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/rate/addRateStart`,
        {
          rating,
          feedback,
          customerID: user.customerDetails[0].customerID,
          bookingID: currentBookingID,
        },
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
      console.error(error);
    }
  };

  const calculateDateLeft = (dateCancelBook, dateBook) => {
    const bookDate = new Date(dateBook);
    const cancelDate = new Date(dateCancelBook);

    const timeDifference = cancelDate - bookDate;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const remainingDays = Math.ceil(timeDifference / millisecondsInDay);
    return remainingDays;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = yourBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(yourBookings.length / itemsPerPage);

  return (
    <div className='main-container-your-booking-page'>
      <div className='row-your-booking'>
        <Header />
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
              {currentBookings.length === 0 ? (
                <div className='no-bookings-message'>
                  You don't have any appointments at the moment.
                </div>
              ) : (
                currentBookings.map((booking, index) => (
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
                              className={`status-booking ${
                                booking.isCancel
                                  ? 'status-cancel'
                                  : booking.paymentsDetails[0]
                                        .isCancelPayment ||
                                      (!booking.paymentsDetails[0].isSuccess &&
                                        booking.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL')
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
                              }`}
                            >
                              Status:&nbsp;
                              {booking.isCancel ? (
                                <span>Cancel Booking</span>
                              ) : booking.paymentsDetails[0].isCancelPayment ||
                                (!booking.paymentsDetails[0].isSuccess &&
                                  booking.paymentsDetails[0].paymentMethod ===
                                    'PAYPAL') ? (
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
                                </div>
                                <br />
                                {booking.dateBook.split('T')[0]}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Time:
                                </div>
                                <br />
                                {`${booking.startTime} - ${booking.endTime}`}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Pet Name:
                                </div>
                                <br />
                                {booking?.petDetails[0]?.name}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Pet Type:
                                </div>
                                <br />
                                {booking?.petDetails[0]?.petType}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Doctor:
                                </div>
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
                                </div>
                                <br />
                                {formatService(booking.servicesInBooking).join(
                                  ', ',
                                )}
                              </div>
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Payment:
                                </div>
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
                            {booking.isCancel &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            booking.isRefund ? (
                              <div className='status-cancel'>
                                Refunded {booking.refundPrice}$
                              </div>
                            ) : booking.isCancel &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              calculateDateLeft(
                                booking.dateCancelBook,
                                booking.dateBook,
                              ) < 3 &&
                              !booking.isRefund ? (
                              <div className='status-cancel'>Refunded 0$</div>
                            ) : booking.isCancel &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              calculateDateLeft(
                                booking.dateCancelBook,
                                booking.dateBook,
                              ) >= 3 &&
                              !booking.isRefund ? (
                              <div className='status-cancel'>...Processing</div>
                            ) : booking.isCancel ? null : booking
                                .paymentsDetails[0].isCancelPayment ||
                              (!booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL') ? null : booking.paymentsDetails[0]
                                .isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              new Date(booking.dateBook) > new Date() &&
                              !booking.isRate &&
                              !booking.isCheckIn ? (
                              <div
                                data-bs-toggle='modal'
                                data-bs-target='#CancelBooking'
                                className='cancel-booking-button-1'
                                onClick={() =>
                                  setCurrentBookingID(booking.bookingID)
                                }
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
                                className='cancel-booking-button-1'
                                data-bs-toggle='modal'
                                data-bs-target='#CancelBooking'
                                onClick={() =>
                                  setCurrentBookingID(booking.bookingID)
                                }
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
                                data-bs-target='#feedbackRatestar'
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
                                data-bs-target='#feedbackRatestar'
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
                <Stack
                  spacing={2}
                  alignItems='center'
                  marginTop={2}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color='primary'
                  />
                </Stack>
              )}
            </div>

            <div
              className='modal fade'
              id={`CancelBooking`}
              tabIndex='-1'
              aria-labelledby='exampleModalLabelMore'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-body'>
                    <div className='modal-confirmCancel'>
                      <div className='change-user-password-modal-header'>
                        Confirm Delete
                      </div>
                      <div>Are you sure you want to cancel booking?</div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <div className='modal-confirmCancel-footer'>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-bs-dismiss='modal'
                        onClick={() => handleCancelBooking(currentBookingID)}
                      >
                        Yes
                      </button>
                      <button
                        type='button'
                        className='btn btn-light'
                        data-bs-dismiss='modal'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='modal fade'
              id='feedbackRatestar'
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
                        data-bs-dismiss='modal'
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
                  <div className='modal-body rating-modal'>
                    <div
                      style={{ display: 'flex', alignItems: 'center' }}
                      className='rating-text'
                    >
                      Rate Star:&nbsp;
                      <StarRate
                        rating={currentBookingData?.rateDetails[0]?.rate}
                        totalStars={5}
                      />
                    </div>
                    <div className='rating-text'>
                      Rate Comment:&nbsp;
                      {currentBookingData?.rateDetails[0]?.comment}
                    </div>
                  </div>
                  <div className='modal-footer'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default YourBooking;
