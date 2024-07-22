import './AdminDashBoard.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../../components/Admin/Header/Header';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import icon_search from '../../assets/images/img_AdminDashBoard/icon_search.svg';
import Statistic from '../../components/Admin/Statistics/Statistics';
import axiosInstance from '../../utils/axiosInstance';
import { useDate } from '../../components/Admin/DateContext/DateContext';

function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [search, setSearch] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [bookingInfoModal, setBookingInfoModal] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    cancel: false,
    done: false,
    beingExamined: false,
    expired: false,
  });
  const { selectedDate } = useDate();

  const openTab = tabName => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getAllBookings`,
        );
        const sortDate = response.data.sort((a, b) =>
          b.bookingID.localeCompare(a.bookingID),
        );
        setBookingData(sortDate);
        setBookingInfoModal(sortDate[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  const searchBookingData = bookingData.filter(booking => {
    const matchesDate = booking.dateBook.split('T')[0] === selectedDate;
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
                !booking.isCheckIn
              ? 'pending'
              : !booking.paymentsDetails[0].isSuccess &&
                  booking.paymentsDetails[0].paymentMethod === 'COUNTER' &&
                  !booking.isCheckIn
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
      matchesDate &&
      matchesSearch &&
      (statusFilters.pending ||
      statusFilters.expired ||
      statusFilters.cancel ||
      statusFilters.done ||
      statusFilters.beingExamined
        ? matchesStatus
        : true)
    );
  });

  const servicePrice = services => {
    return services.map(service => {
      return `${service.name}($${service.price})`;
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = searchBookingData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(searchBookingData.length / itemsPerPage);

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

  return (
    <div className='Admin-DashBoard container-fluid'>
      <div className='row'>
        <Header />
        <div className='Admin-DashBoard-Content row'>
          <div className='Admin-DashBoard-Navigate col-md-2'>
            <Sidebar />
          </div>

          <div className='Admin-DashBoard-Main col-md-10'>
            <Statistic />

            <div className='Admin-DashBoard-Main-Table-Wrapper'>
              <div className='Admin-DashBoard-Main-Table'>
                <div className='Admin-DashBoard-Main-Table-Title'>
                  Booking List
                </div>
                <div className='Admin-DashBoard-Main-Table-Title-Text'>
                  Recent Booking
                </div>
                <div className='filter-wrapper'>
                  <div className='Admin-DashBoard-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search BookingID'
                      className='Admin-DashBoard-Main-Search-Input '
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-DashBoard-Main-Search-Button'>
                      <img
                        src={icon_search}
                        alt=''
                      />
                    </button>
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
                      <li>
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
                      <li>
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
                      <li>
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
                      <li>
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
                      <li>
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
                    </ul>
                  </div>
                </div>
                <div className='Admin-DashBoard-Main-Table-Header'>
                  <div className='Admin-DashBoard-Main-Table-Header-Title '>
                    Booking ID
                  </div>
                  <div className='Admin-DashBoard-Main-Table-Header-Title '>
                    Customer ID
                  </div>
                  <div className='Admin-DashBoard-Main-Table-Header-Title '>
                    Pet ID
                  </div>
                  <div className='Admin-DashBoard-Main-Table-Header-Title '>
                    Total Price
                  </div>
                  <div className='Admin-DashBoard-Main-Table-Header-Title '>
                    Status
                  </div>
                  <div className='Admin-DashBoard-Main-Table-Header-Title '>
                    Date
                  </div>
                  <div className='Admin-DashBoard-Main-Table-Header-Title-Btn '>
                    Details
                  </div>
                </div>
                {currentBookings.length > 0 ? (
                  currentBookings.map(item => (
                    <div
                      className='Admin-DashBoard-Main-Table-Content-Row-Wrapper'
                      key={item.bookingID}
                    >
                      <div className='Admin-DashBoard-Main-Table-Content-Row '>
                        {item.bookingID}
                      </div>
                      <div className='Admin-DashBoard-Main-Table-Content-Row '>
                        {item.customerDetails[0].customerID}
                      </div>
                      <div className='Admin-DashBoard-Main-Table-Content-Row '>
                        {item.petID}
                      </div>
                      <div className='Admin-DashBoard-Main-Table-Content-Row '>
                        {item.totalPrice}
                      </div>
                      <div className='Admin-DashBoard-Main-Table-Content-Row '>
                        <div
                          className={`${
                            item.isCancel
                              ? 'Admin-DashBoard-Table-status-cancel'
                              : item.paymentsDetails[0].isCancelPayment ||
                                  (!item.paymentsDetails[0].isSuccess &&
                                    item.paymentsDetails[0].paymentMethod ===
                                      'PAYPAL')
                                ? 'Admin-DashBoard-Table-status-cancel'
                                : item.paymentsDetails[0].isSuccess &&
                                    item.paymentsDetails[0].paymentMethod ===
                                      'PAYPAL' &&
                                    !item.isCheckIn &&
                                    !item.isCompleted &&
                                    !compareCurrentTimeWithEndTimeAndDateBook(
                                      item.endTime,
                                      item.dateBook,
                                    )
                                  ? 'Admin-DashBoard-Table-status-expired'
                                  : !item.paymentsDetails[0].isSuccess &&
                                      item.paymentsDetails[0].paymentMethod ===
                                        'COUNTER' &&
                                      !item.isCheckIn &&
                                      !item.isCompleted &&
                                      !compareCurrentTimeWithEndTimeAndDateBook(
                                        item.endTime,
                                        item.dateBook,
                                      )
                                    ? 'Admin-DashBoard-Table-status-expired'
                                    : item.paymentsDetails[0].isSuccess &&
                                        item.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL' &&
                                        !item.isCheckIn &&
                                        !item.isCompleted &&
                                        compareCurrentTimeWithEndTimeAndDateBook(
                                          item.endTime,
                                          item.dateBook,
                                        )
                                      ? 'Admin-DashBoard-Table-status-waiting'
                                      : !item.paymentsDetails[0].isSuccess &&
                                          item.paymentsDetails[0]
                                            .paymentMethod === 'COUNTER' &&
                                          !item.isCheckIn &&
                                          !item.isCompleted &&
                                          compareCurrentTimeWithEndTimeAndDateBook(
                                            item.endTime,
                                            item.dateBook,
                                          )
                                        ? 'Admin-DashBoard-Table-status-waiting'
                                        : item.paymentsDetails[0].isSuccess &&
                                            item.paymentsDetails[0]
                                              .paymentMethod === 'PAYPAL' &&
                                            item.isCheckIn &&
                                            !item.isCompleted
                                          ? 'Admin-DashBoard-Table-status-waiting'
                                          : item.paymentsDetails[0].isSuccess &&
                                              item.paymentsDetails[0]
                                                .paymentMethod === 'COUNTER' &&
                                              item.isCheckIn &&
                                              !item.isCompleted
                                            ? 'Admin-DashBoard-Table-status-waiting'
                                            : item.paymentsDetails[0]
                                                  .isSuccess &&
                                                item.paymentsDetails[0]
                                                  .paymentMethod === 'PAYPAL' &&
                                                item.isCheckIn &&
                                                item.isCompleted
                                              ? 'Admin-DashBoard-Table-status-done'
                                              : item.paymentsDetails[0]
                                                    .isSuccess &&
                                                  item.paymentsDetails[0]
                                                    .paymentMethod ===
                                                    'COUNTER' &&
                                                  item.isCheckIn &&
                                                  item.isCompleted
                                                ? 'Admin-DashBoard-Table-status-done'
                                                : null
                          }`}
                        >
                          {item.isCancel ? (
                            <span>Cancel Booking</span>
                          ) : item.paymentsDetails[0].isCancelPayment ||
                            (!item.paymentsDetails[0].isSuccess &&
                              item.paymentsDetails[0].paymentMethod ===
                                'PAYPAL') ? (
                            <span>Cancel Payment</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            !item.isCheckIn &&
                            !item.isCompleted &&
                            !compareCurrentTimeWithEndTimeAndDateBook(
                              item.endTime,
                              item.dateBook,
                            ) ? (
                            <span>Expired</span>
                          ) : !item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            !item.isCheckIn &&
                            !item.isCompleted &&
                            !compareCurrentTimeWithEndTimeAndDateBook(
                              item.endTime,
                              item.dateBook,
                            ) ? (
                            <span>Expired</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            !item.isCheckIn &&
                            !item.isCompleted &&
                            compareCurrentTimeWithEndTimeAndDateBook(
                              item.endTime,
                              item.dateBook,
                            ) ? (
                            <span>Pending</span>
                          ) : !item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            !item.isCheckIn &&
                            !item.isCompleted &&
                            compareCurrentTimeWithEndTimeAndDateBook(
                              item.endTime,
                              item.dateBook,
                            ) ? (
                            <span>Pending</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            item.isCheckIn &&
                            !item.isCompleted ? (
                            <span>Being examined</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            item.isCheckIn &&
                            !item.isCompleted ? (
                            <span>Being examined</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            item.isCheckIn &&
                            item.isCompleted ? (
                            <span>Done</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            item.isCheckIn &&
                            item.isCompleted ? (
                            <span>Done</span>
                          ) : null}
                        </div>
                      </div>
                      <div className='Admin-DashBoard-Main-Table-Content-Row '>
                        {item.dateBook.split('T')[0]}
                      </div>

                      <div className='Admin-DashBoard-Table-Detail'>
                        <div className='Admin-DashBoard-Detail-Btn '>
                          <div className='Admin-DashBoard-Main-Table-Content-Btn_Wrapper '>
                            <button
                              type='button'
                              className='Admin-DashBoard-Main-Table-Content-Btn'
                              data-bs-toggle='modal'
                              data-bs-target='#Admin-DashBoard-exampleModal'
                              onClick={() => setBookingInfoModal(item)}
                            >
                              Details
                            </button>

                            <div
                              className='modal fade'
                              id='Admin-DashBoard-exampleModal'
                              tabIndex='-1'
                              aria-labelledby='exampleModalLabel'
                              aria-hidden='true'
                            >
                              <div className='modal-dialog'>
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h1
                                      className='modal-title fs-5'
                                      id='Admin-DashBoard-exampleModalLabel'
                                    >
                                      More Info
                                    </h1>
                                    <button
                                      type='button'
                                      className='btn-close'
                                      data-bs-dismiss='modal'
                                      aria-label='Close'
                                    ></button>
                                  </div>
                                  <div className='modal-body'>
                                    <div className='Admin-DashBoard-container-modal-body-more-info'>
                                      <div className='Admin-DashBoard-tab-modal-body-more-info'>
                                        <button
                                          className={`tablinks ${activeTab === 'Profile' ? 'active' : ''}`}
                                          onClick={() => openTab('Profile')}
                                        >
                                          Customer Profile
                                        </button>
                                        <button
                                          className={`tablinks ${activeTab === 'Pet' ? 'active' : ''}`}
                                          onClick={() => openTab('Pet')}
                                        >
                                          Pet
                                        </button>
                                        <button
                                          className={`tablinks ${activeTab === 'Services' ? 'active' : ''}`}
                                          onClick={() => openTab('Services')}
                                        >
                                          Services
                                        </button>
                                      </div>
                                      <div
                                        id='Admin-DashBoard-profile-customer'
                                        className='Admin-DashBoard-tabcontent-customer'
                                        style={{
                                          display:
                                            activeTab === 'Profile'
                                              ? 'block'
                                              : 'none',
                                        }}
                                      >
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-customer'>
                                            Name:
                                          </div>
                                          <div>{bookingInfoModal?.name}</div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-customer'>
                                            Email:
                                          </div>
                                          <div>{bookingInfoModal?.email}</div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-customer'>
                                            Phone:
                                          </div>
                                          <div>{bookingInfoModal?.phone}</div>
                                        </div>
                                      </div>
                                      <div
                                        id='Admin-DashBoard-Vacancies'
                                        className='Admin-DashBoard-tabcontent-pet'
                                        style={{
                                          display:
                                            activeTab === 'Pet'
                                              ? 'block'
                                              : 'none',
                                        }}
                                      >
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Name:
                                          </div>
                                          <div>
                                            {
                                              bookingInfoModal?.petDetails[0]
                                                ?.name
                                            }
                                          </div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Breed:
                                          </div>
                                          <div>
                                            {
                                              bookingInfoModal?.petDetails[0]
                                                ?.breed
                                            }
                                          </div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Type:
                                          </div>
                                          <div>
                                            {
                                              bookingInfoModal?.petDetails[0]
                                                ?.petType
                                            }
                                          </div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            BirthDay:
                                          </div>
                                          <div>
                                            {
                                              bookingInfoModal?.petDetails[0]?.birthday.split(
                                                'T',
                                              )[0]
                                            }
                                          </div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Gender:
                                          </div>
                                          <div>
                                            {
                                              bookingInfoModal?.petDetails[0]
                                                ?.gender
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        id='Admin-DashBoard-Vacancies'
                                        className='Admin-DashBoard-tabcontent-services'
                                        style={{
                                          display:
                                            activeTab === 'Services'
                                              ? 'block'
                                              : 'none',
                                        }}
                                      >
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Services:
                                          </div>
                                          <div>
                                            {servicePrice(
                                              bookingInfoModal?.servicesInBooking,
                                            ).join(', ')}
                                          </div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Start time:
                                          </div>
                                          <div>
                                            {bookingInfoModal?.startTime}
                                          </div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            End time:
                                          </div>
                                          <div>{bookingInfoModal?.endTime}</div>
                                        </div>
                                        <div className='Admin-DashBoard-form-group'>
                                          <div className='Admin-DashBoard-sub-title-profile-pet'>
                                            Doctor:
                                          </div>
                                          <div>
                                            {bookingInfoModal?.doctorDetails[0]
                                              ?.name
                                              ? bookingInfoModal
                                                  ?.doctorDetails[0]?.name
                                              : 'No doctor selected'}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='modal-footer'>
                                    <button
                                      type='button'
                                      className='btn btn-secondary'
                                      data-bs-dismiss='modal'
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='Admin-DashBoard-NoContent'>
                    No data available
                  </div>
                )}

                <div className='Admin-DashBoard-Pagination'>
                  {currentBookings.length > 0 && totalPages > 1 && (
                    <Stack
                      spacing={2}
                      marginTop={2}
                      alignItems='center'
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
