//css
import './AdminDashBoard.css';
//React
import React, { useContext, useEffect, useState } from 'react';
//import React, { useState, useEffect, useRef } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
//MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//images
import icon_search from '../../assets/images/img_AdminDashBoard/icon_search.svg';
import logo_pet_health_care from '../../assets/images/img_AdminDashBoard/logo_pethealthcare.png';
import { AuthContext } from '../../context/AuthContext';
import Statistic from '../../components/Admin/Statistics/Statistics';
import axiosInstance from '../../utils/axiosInstance';
function AdminDashBoard() {
  const { logOut, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Profile');
  const [search, setSearch] = useState('');
  const openTab = tabName => setActiveTab(tabName);
  const [bookingData, setBookingData] = useState([]);

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
        <div className='admin-DashBoard-Header row'>
          <div className='admin-DashBoard-Header-Logo col-md-2'>
            <img
              className='admin-DashBoard-Logo '
              src={logo_pet_health_care}
              alt='logo-pet'
            />
          </div>
          <div className='admin-DashBoard-Header-Account-Wrapper col-md-10'>
            <div className='admin-DashBoard-Header-Account'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='#000'
                className='bi bi-person'
                viewBox='0 0 16 16'
              >
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
              </svg>
              <div className='admin-DashBoard-Header-Account-Text'>
                Hi {user.adminDetails[0].name}
              </div>
            </div>
          </div>
        </div>

        <div className='Admin-DashBoard-Content row'>
          <div className='Admin-DashBoard-Navigate col-md-2'>
            <div className='Admin-DashBoard-Navigate-Text'>
              <div className='Admin-DashBoard-Navigate-Dashboard'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-house-door'
                  viewBox='0 0 16 16'
                >
                  <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z' />
                </svg>
                <a href='/admin-dashboard'>
                  <div className=' Admin-DashBoard-Navigate-Text-Dashboard'>
                    DashBoard
                  </div>
                </a>
              </div>
              <div className='Admin-DashBoard-Navigate-Text-Rest'>
                <a href='/admin-dashboard'>
                  <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>
                    Booking
                  </div>
                </a>
                <a href='/admin-account'>
                  <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>
                    Account
                  </div>
                </a>
                <a href='/admin-services'>
                  <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>
                    Services
                  </div>
                </a>
                <a href='/admin-cages'>
                  <div className='Admin-DashBoard-Navigate-Text-Rest-Menu'>
                    Cages
                  </div>
                </a>
              </div>
            </div>

            <div onClick={logOut}>
              <div className='Admin-DashBoard-Navigate-Logout'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='42'
                  fill='currentColor'
                  className='bi bi-box-arrow-left'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z'
                  />
                  <path
                    fillRule='evenodd'
                    d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
                  />
                </svg>
                <span>Logout</span>
              </div>
            </div>
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
                {searchBookingData.map(item => (
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
                              ${item.isCancel
                            ? 'Admin-DashBoard-Table-status-cancel'
                            : item.paymentsDetails[0].isCancelPayment
                              ? 'Admin-DashBoard-Table-status-cancel'
                              : item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'PAYPAL'
                                ? 'Admin-DashBoard-Table-status-waiting'
                                : !item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'COUNTER'
                                  ? 'Admin-DashBoard-Table-status-waiting'
                                  : item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'PAYPAL' && item.isCheckIn
                                    ? 'Admin-DashBoard-Table-status-done'
                                    : item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'COUNTER' && item.isCheckIn
                                      ? 'Admin-DashBoard-Table-status-done'
                                      : null
                          }`}
                      >
                        {item.isCancel
                          ? <span>Cancel Booking</span>
                          : item.paymentsDetails[0].isCancelPayment
                            ? <span>Cancel Payment</span>
                            : item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'PAYPAL'
                              ? <span>Pending</span>
                              : !item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'COUNTER'
                                ? <span>Pending</span>
                                : item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'PAYPAL' && item.isCheckIn
                                  ? <span>Done</span>
                                  : item.paymentsDetails[0].isSuccess && item.paymentsDetails[0].paymentMethod === 'COUNTER' && item.isCheckIn
                                    ? <span>Done</span>
                                    : <span>NULL</span>}
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
                                        <div>{item?.name}</div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-customer'>
                                          Email:
                                        </div>
                                        <div>{item?.email}</div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-customer'>
                                          Phone:
                                        </div>
                                        <div>{item?.phone}</div>
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
                                        <div>{item?.petDetails[0]?.name}</div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          Breed:
                                        </div>
                                        <div>{item?.petDetails[0]?.breed}</div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          Type:
                                        </div>
                                        <div>
                                          {item?.petDetails[0]?.petType}
                                        </div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          BirthDay:
                                        </div>
                                        <div>
                                          {
                                            item?.petDetails[0]?.birthday.split(
                                              'T',
                                            )[0]
                                          }
                                        </div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          Gender:
                                        </div>
                                        <div>{item?.petDetails[0]?.gender}</div>
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
                                            item?.servicesInBooking,
                                          ).join(', ')}
                                        </div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          Start time:
                                        </div>
                                        <div>{item?.startTime}</div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          End time:
                                        </div>
                                        <div>{item?.endTime}</div>
                                      </div>
                                      <div className='Admin-DashBoard-form-group'>
                                        <div className='Admin-DashBoard-sub-title-profile-pet'>
                                          Doctor:
                                        </div>
                                        <div>
                                          {item?.doctorDetails[0]?.name}
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
                ))}

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
