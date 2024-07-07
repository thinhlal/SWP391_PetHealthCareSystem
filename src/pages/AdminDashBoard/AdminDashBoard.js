//css
import './AdminDashBoard.css';
//React
import React, { useEffect, useState } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Components
import Header from '../../components/Admin/Header/Header';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//images
import icon_search from '../../assets/images/img_AdminDashBoard/icon_search.svg';
import Statistic from '../../components/Admin/Statistics/Statistics';
import axiosInstance from '../../utils/axiosInstance';
function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [search, setSearch] = useState('');
  const openTab = tabName => setActiveTab(tabName);
  const [bookingData, setBookingData] = useState([]);
  const [bookingInfoModal, setBookingInfoModal] = useState({});

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
    const matchesSearch =
      search === '' ||
      booking.bookingID.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const servicePrice = services => {
    return services.map(service => {
      return `${service.name}($${service.price})`;
    });
  };

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
                {searchBookingData.length > 0 ? (
                  searchBookingData.map(item => (
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
                          className={`Admin-DashBoard-Table-status-booking
                              ${
                                item.isCancel
                                  ? 'Admin-DashBoard-Table-status-cancel'
                                  : item.paymentsDetails[0].isCancelPayment
                                    ? 'Admin-DashBoard-Table-status-cancel'
                                    : item.paymentsDetails[0].isSuccess &&
                                        item.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL' &&
                                        !item.isCheckIn
                                      ? 'Admin-DashBoard-Table-status-waiting'
                                      : !item.paymentsDetails[0].isSuccess &&
                                          item.paymentsDetails[0]
                                            .paymentMethod === 'COUNTER' &&
                                          !item.isCheckIn
                                        ? 'Admin-DashBoard-Table-status-waiting'
                                        : item.paymentsDetails[0].isSuccess &&
                                            item.paymentsDetails[0]
                                              .paymentMethod === 'PAYPAL' &&
                                            item.isCheckIn
                                          ? 'Admin-DashBoard-Table-status-done'
                                          : item.paymentsDetails[0].isSuccess &&
                                              item.paymentsDetails[0]
                                                .paymentMethod === 'COUNTER' &&
                                              item.isCheckIn
                                            ? 'Admin-DashBoard-Table-status-done'
                                            : null
                              }`}
                        >
                          {item.isCancel ? (
                            <span>Cancel Booking</span>
                          ) : item.paymentsDetails[0].isCancelPayment ? (
                            <span>Cancel Payment</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            !item.isCheckIn ? (
                            <span>Pending</span>
                          ) : !item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            !item.isCheckIn ? (
                            <span>Pending</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            item.isCheckIn ? (
                            <span>Done</span>
                          ) : item.paymentsDetails[0].isSuccess &&
                            item.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            item.isCheckIn ? (
                            <span>Done</span>
                          ) : (
                            <span>NULL</span>
                          )}
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
                                            {
                                              bookingInfoModal?.doctorDetails[0]
                                                ?.name
                                            }
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
                  <Stack spacing={2}>
                    <Pagination count={10} />
                  </Stack>
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
