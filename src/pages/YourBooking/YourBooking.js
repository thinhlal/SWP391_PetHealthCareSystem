import './YourBooking.css';
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
import StarRate from '../../components/Admin/StarRate/StarRate.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../../components/User/Sidebar/Sidebar.js';
import React, { useState, useEffect, useContext } from 'react';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function YourBooking() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [yourBookings, setYourBookings] = useState([]);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [currentBookingID, setCurrentBookingID] = useState(null);
  const [currentBookingData, setCurrentBookingData] = useState(null);
  const [currentBookingCancel, setCurrentBookingCancel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    cancel: false,
    done: false,
    expired: false,
    beingExamined: false,
  });

  useEffect(() => {
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
        const sortBookings = dataBookings.data.allBookings.sort((a, b) => {
          const dateComparison = b.dateBook.localeCompare(a.dateBook);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return b.bookingID.localeCompare(a.bookingID);
        });
        setYourBookings(sortBookings);
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
      const sortBookings = dataBookings.data.allBookings.sort((a, b) => {
        const dateComparison = b.dateBook.localeCompare(a.dateBook);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return b.bookingID.localeCompare(a.bookingID);
      });
      setYourBookings(sortBookings);
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
      const sortBookings = dataBookings.data.allBookings.sort((a, b) => {
        const dateComparison = b.dateBook.localeCompare(a.dateBook);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return b.bookingID.localeCompare(a.bookingID);
      });
      setYourBookings(sortBookings);
      setFeedback('');
      setRating('');
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDateLeft = (dateCancelBook, dateBook) => {
    const bookDate = new Date(dateBook);
    const cancelDate = new Date(dateCancelBook);

    const timeDifference = bookDate - cancelDate;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const remainingDays = Math.ceil(timeDifference / millisecondsInDay);
    return remainingDays;
  };

  const showDateLeft = dateBook => {
    const bookDate = new Date(dateBook);

    const currentDate = new Date();
    const vietnamTimezoneOffset = 7 * 60;
    const localTimezoneOffset = currentDate.getTimezoneOffset();

    const vietnamDate = new Date(
      currentDate.getTime() +
        (vietnamTimezoneOffset - localTimezoneOffset) * 60000,
    );

    const timeDifference = bookDate - vietnamDate;

    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const remainingDays = Math.ceil(timeDifference / millisecondsInDay);

    return remainingDays;
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredBookingData = yourBookings.filter(booking => {
    const matchesSearch =
      search === '' ||
      booking.bookingID.toLowerCase().includes(search.toLowerCase());

    const bookingStatus = booking.isCancel
      ? 'cancel'
      : booking.paymentsDetails[0].isCancelPayment ||
          (!booking.paymentsDetails[0].isSuccess &&
            booking.paymentsDetails[0].paymentMethod === 'PAYPAL')
        ? 'cancel'
        : booking.paymentsDetails[0].isSuccess &&
            booking.paymentsDetails[0].paymentMethod === 'PAYPAL' &&
            !booking.isCheckIn &&
            !booking.isCompleted &&
            !compareCurrentTimeWithEndTimeAndDateBook(
              booking.endTime,
              booking.dateBook,
            )
          ? 'expired'
          : !booking.paymentsDetails[0].isSuccess &&
              booking.paymentsDetails[0].paymentMethod === 'COUNTER' &&
              !booking.isCheckIn &&
              !booking.isCompleted &&
              !compareCurrentTimeWithEndTimeAndDateBook(
                booking.endTime,
                booking.dateBook,
              )
            ? 'expired'
            : booking.paymentsDetails[0].isSuccess &&
                booking.paymentsDetails[0].paymentMethod === 'PAYPAL' &&
                !booking.isCheckIn &&
                !booking.isCompleted &&
                compareCurrentTimeWithEndTimeAndDateBook(
                  booking.endTime,
                  booking.dateBook,
                )
              ? 'pending'
              : !booking.paymentsDetails[0].isSuccess &&
                  booking.paymentsDetails[0].paymentMethod === 'COUNTER' &&
                  !booking.isCheckIn &&
                  !booking.isCompleted &&
                  compareCurrentTimeWithEndTimeAndDateBook(
                    booking.endTime,
                    booking.dateBook,
                  )
                ? 'pending'
                : booking.paymentsDetails[0].isSuccess &&
                    booking.paymentsDetails[0].paymentMethod === 'PAYPAL' &&
                    booking.isCheckIn &&
                    !booking.isCompleted
                  ? 'beingExamined'
                  : booking.paymentsDetails[0].isSuccess &&
                      booking.paymentsDetails[0].paymentMethod === 'COUNTER' &&
                      booking.isCheckIn &&
                      !booking.isCompleted
                    ? 'beingExamined'
                    : booking.paymentsDetails[0].isSuccess &&
                        booking.paymentsDetails[0].paymentMethod === 'PAYPAL' &&
                        booking.isCheckIn &&
                        booking.isCompleted
                      ? 'done'
                      : booking.paymentsDetails[0].isSuccess &&
                          booking.paymentsDetails[0].paymentMethod ===
                            'COUNTER' &&
                          booking.isCheckIn &&
                          booking.isCompleted
                        ? 'done'
                        : null;

    const matchesStatus =
      (statusFilters.pending && bookingStatus === 'pending') ||
      (statusFilters.expired && bookingStatus === 'expired') ||
      (statusFilters.cancel && bookingStatus === 'cancel') ||
      (statusFilters.done && bookingStatus === 'done') ||
      (statusFilters.beingExamined && bookingStatus === 'beingExamined');

    return (
      matchesSearch &&
      (statusFilters.pending ||
      statusFilters.cancel ||
      statusFilters.expired ||
      statusFilters.done ||
      statusFilters.beingExamined
        ? matchesStatus
        : true)
    );
  });

  function getCurrentTimeInVietnam() {
    const currentDate = new Date();
    const vietnamTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).formatToParts(currentDate);

    const formattedVietnamTime = vietnamTime.reduce((acc, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

    return new Date(
      `${formattedVietnamTime.year}-${formattedVietnamTime.month}-${formattedVietnamTime.day}T${formattedVietnamTime.hour}:${formattedVietnamTime.minute}:${formattedVietnamTime.second}+07:00`,
    );
  }

  function compareCurrentTimeWithEndTimeAndDateBook(endTime, dateBook) {
    const currentTime = getCurrentTimeInVietnam();
    const endDateTime = new Date(
      `${dateBook.split('T')[0]}T${endTime}:00+07:00`,
    );

    if (currentTime > endDateTime) {
      return false;
    } else {
      return true;
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = filteredBookingData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(filteredBookingData.length / itemsPerPage);

  return (
    <div className='container-fluid main-container-your-booking-page'>
      <div className='row'>
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
                    onChange={e => setSearch(e.target.value)}
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
              <div className='dropdown-filter'>
                <button
                  className='menu-filter dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Filter by Status
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'
                >
                  <li className='filter-dropdown'>
                    <input
                      type='checkbox'
                      checked={statusFilters.pending}
                      onChange={() =>
                        setStatusFilters({
                          ...statusFilters,
                          pending: !statusFilters.pending,
                        })
                      }
                    />{' '}
                    Pending
                  </li>
                  <li className='filter-dropdown'>
                    <input
                      type='checkbox'
                      checked={statusFilters.beingExamined}
                      onChange={() =>
                        setStatusFilters({
                          ...statusFilters,
                          beingExamined: !statusFilters.beingExamined,
                        })
                      }
                    />{' '}
                    Being examined
                  </li>
                  <li className='filter-dropdown'>
                    <input
                      type='checkbox'
                      checked={statusFilters.cancel}
                      onChange={() =>
                        setStatusFilters({
                          ...statusFilters,
                          cancel: !statusFilters.cancel,
                        })
                      }
                    />{' '}
                    Cancel
                  </li>
                  <li className='filter-dropdown'>
                    <input
                      type='checkbox'
                      checked={statusFilters.expired}
                      onChange={() =>
                        setStatusFilters({
                          ...statusFilters,
                          expired: !statusFilters.expired,
                        })
                      }
                    />{' '}
                    Expired
                  </li>
                  <li className='filter-dropdown'>
                    <input
                      type='checkbox'
                      checked={statusFilters.done}
                      onChange={() =>
                        setStatusFilters({
                          ...statusFilters,
                          done: !statusFilters.done,
                        })
                      }
                    />{' '}
                    Done
                  </li>
                </ul>
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
                                booking.isCancel && !booking.dateBook
                                  ? 'status-cancel'
                                  : booking.isCancel && booking.dateBook
                                    ? 'status-cancel'
                                    : booking.paymentsDetails[0]
                                          .isCancelPayment ||
                                        (!booking.paymentsDetails[0]
                                          .isSuccess &&
                                          booking.paymentsDetails[0]
                                            .paymentMethod === 'PAYPAL')
                                      ? 'status-cancel'
                                      : booking.paymentsDetails[0].isSuccess &&
                                          booking.paymentsDetails[0]
                                            .paymentMethod === 'PAYPAL' &&
                                          !booking.isCheckIn &&
                                          !booking.isCompleted &&
                                          !compareCurrentTimeWithEndTimeAndDateBook(
                                            booking.endTime,
                                            booking.dateBook,
                                          )
                                        ? 'status-over'
                                        : !booking.paymentsDetails[0]
                                              .isSuccess &&
                                            booking.paymentsDetails[0]
                                              .paymentMethod === 'COUNTER' &&
                                            !booking.isCheckIn &&
                                            !booking.isCompleted &&
                                            !compareCurrentTimeWithEndTimeAndDateBook(
                                              booking.endTime,
                                              booking.dateBook,
                                            )
                                          ? 'status-over'
                                          : booking.paymentsDetails[0]
                                                .isSuccess &&
                                              booking.paymentsDetails[0]
                                                .paymentMethod === 'PAYPAL' &&
                                              !booking.isCheckIn &&
                                              !booking.isCompleted &&
                                              compareCurrentTimeWithEndTimeAndDateBook(
                                                booking.endTime,
                                                booking.dateBook,
                                              )
                                            ? 'status-pending'
                                            : !booking.paymentsDetails[0]
                                                  .isSuccess &&
                                                booking.paymentsDetails[0]
                                                  .paymentMethod ===
                                                  'COUNTER' &&
                                                !booking.isCheckIn &&
                                                !booking.isCompleted &&
                                                compareCurrentTimeWithEndTimeAndDateBook(
                                                  booking.endTime,
                                                  booking.dateBook,
                                                )
                                              ? 'status-pending'
                                              : booking.paymentsDetails[0]
                                                    .isSuccess &&
                                                  booking.paymentsDetails[0]
                                                    .paymentMethod ===
                                                    'PAYPAL' &&
                                                  booking.isCheckIn &&
                                                  !booking.isCompleted
                                                ? 'status-pending'
                                                : booking.paymentsDetails[0]
                                                      .isSuccess &&
                                                    booking.paymentsDetails[0]
                                                      .paymentMethod ===
                                                      'COUNTER' &&
                                                    booking.isCheckIn &&
                                                    !booking.isCompleted
                                                  ? 'status-pending'
                                                  : booking.paymentsDetails[0]
                                                        .isSuccess &&
                                                      booking.paymentsDetails[0]
                                                        .paymentMethod ===
                                                        'PAYPAL' &&
                                                      booking.isCheckIn
                                                    ? 'status-completed'
                                                    : booking.paymentsDetails[0]
                                                          .isSuccess &&
                                                        booking
                                                          .paymentsDetails[0]
                                                          .paymentMethod ===
                                                          'COUNTER' &&
                                                        booking.isCheckIn
                                                      ? 'status-completed'
                                                      : null
                              }`}
                            >
                              Status:&nbsp;
                              {booking.isCancel && !booking.isRefund ? (
                                <span>Cancel Booking</span>
                              ) : booking.isCancel && booking.isRefund ? (
                                <span>Refunded</span>
                              ) : booking.paymentsDetails[0].isCancelPayment ||
                                (!booking.paymentsDetails[0].isSuccess &&
                                  booking.paymentsDetails[0].paymentMethod ===
                                    'PAYPAL') ? (
                                <span>Cancel Payment</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL' &&
                                !booking.isCheckIn &&
                                !booking.isCompleted &&
                                !compareCurrentTimeWithEndTimeAndDateBook(
                                  booking.endTime,
                                  booking.dateBook,
                                ) ? (
                                <span>Expired</span>
                              ) : !booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'COUNTER' &&
                                !booking.isCheckIn &&
                                !booking.isCompleted &&
                                !compareCurrentTimeWithEndTimeAndDateBook(
                                  booking.endTime,
                                  booking.dateBook,
                                ) ? (
                                <span>Expired</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL' &&
                                !booking.isCheckIn &&
                                !booking.isCompleted &&
                                compareCurrentTimeWithEndTimeAndDateBook(
                                  booking.endTime,
                                  booking.dateBook,
                                ) ? (
                                <span>Pending</span>
                              ) : !booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'COUNTER' &&
                                !booking.isCheckIn &&
                                !booking.isCompleted &&
                                compareCurrentTimeWithEndTimeAndDateBook(
                                  booking.endTime,
                                  booking.dateBook,
                                ) ? (
                                <span>Pending</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL' &&
                                booking.isCheckIn &&
                                !booking.isCompleted ? (
                                <span>Being examined</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'COUNTER' &&
                                booking.isCheckIn &&
                                !booking.isCompleted ? (
                                <span>Being examined</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL' &&
                                booking.isCheckIn &&
                                booking.isCompleted ? (
                                <span>Done</span>
                              ) : booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'COUNTER' &&
                                booking.isCheckIn &&
                                booking.isCompleted ? (
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
                              <div className='col-booking'>
                                <div className='mini-title-detail-booking'>
                                  Vaccination:
                                </div>
                                <br />
                                {booking.isCheckedVaccinate ? 'Yes' : 'No'}
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
                              !booking.isRate &&
                              !booking.isCheckIn &&
                              !compareCurrentTimeWithEndTimeAndDateBook(
                                booking.endTime,
                                booking.dateBook,
                              ) ? null : !booking.paymentsDetails[0]
                                .isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' &&
                              !booking.isRate &&
                              !booking.isCheckIn &&
                              !compareCurrentTimeWithEndTimeAndDateBook(
                                booking.endTime,
                                booking.dateBook,
                              ) ? null : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              !booking.isRate &&
                              !booking.isCheckIn &&
                              compareCurrentTimeWithEndTimeAndDateBook(
                                booking.endTime,
                                booking.dateBook,
                              ) ? (
                              <div
                                data-bs-toggle='modal'
                                data-bs-target='#CancelBooking'
                                className='cancel-booking-button-1'
                                onClick={() => {
                                  setCurrentBookingID(booking.bookingID);
                                  setCurrentBookingCancel(booking);
                                }}
                              >
                                <div className='text-sign-in-button-booking'>
                                  Cancel Booking
                                </div>
                              </div>
                            ) : !booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' &&
                              !booking.isRate &&
                              !booking.isCheckIn &&
                              compareCurrentTimeWithEndTimeAndDateBook(
                                booking.endTime,
                                booking.dateBook,
                              ) ? (
                              <div
                                className='cancel-booking-button-1'
                                data-bs-toggle='modal'
                                data-bs-target='#CancelBooking'
                                onClick={() => {
                                  setCurrentBookingID(booking.bookingID);
                                  setCurrentBookingCancel(booking);
                                }}
                              >
                                <div className='text-sign-in-button-booking'>
                                  Cancel Booking
                                </div>
                              </div>
                            ) : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              booking.isCheckIn &&
                              booking.isCompleted &&
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
                              booking.isCompleted &&
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
                              (booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' ||
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL') &&
                              booking.isCheckIn &&
                              !booking.isCompleted &&
                              !booking.isRate ? null : (
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

              {yourBookings.length > 0 && totalPages > 1 && (
                <Stack
                  spacing={2}
                  alignItems='center'
                  marginTop={3}
                  marginBottom={3}
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
                        Confirm Refund
                      </div>
                      <div className='refund-policy'>
                        <h3>Refund Policy</h3>
                        <p>
                          We will refund <span className='highlight'>100%</span>{' '}
                          if you cancel your booking more than 6 days in
                          advance, <span className='highlight'>75%</span> if you
                          cancel within 3 to 6 days, and{' '}
                          <span className='no-refund-highlight'>no refund</span>{' '}
                          if you cancel less than 3 days in advance.
                        </p>
                        <p className='days-left'>
                          {currentBookingCancel &&
                          showDateLeft(currentBookingCancel?.dateBook) > 1
                            ? `${showDateLeft(currentBookingCancel?.dateBook)} days left`
                            : `${showDateLeft(currentBookingCancel?.dateBook)} day left`}
                        </p>
                        <div className='refund-policy'>
                          <p>
                            If you sure cancel we will refund to you&nbsp;
                            <span className='highlight'>
                              {currentBookingCancel &&
                              showDateLeft(currentBookingCancel?.dateBook) >= 7
                                ? '100%'
                                : showDateLeft(
                                      currentBookingCancel?.dateBook,
                                    ) >= 3 &&
                                    showDateLeft(
                                      currentBookingCancel?.dateBook,
                                    ) < 7
                                  ? '75%'
                                  : showDateLeft(
                                        currentBookingCancel?.dateBook,
                                      ) < 3
                                    ? '0%'
                                    : null}
                            </span>
                            &nbsp;of total (
                            <span className='amount'>{`${currentBookingCancel?.totalPrice}$`}</span>
                            )
                          </p>
                        </div>
                      </div>
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
