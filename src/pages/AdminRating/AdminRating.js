//css
import './AdminRating.css';
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
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { green } from '@mui/material/colors';

//images
import icon_search from '../../assets/images/img_AdminRating/icon_search.svg';
import logo_pet_health_care from '../../assets/images/img_AdminRating/logo_pethealthcare.png';
import { AuthContext } from '../../context/AuthContext';
import Statistic from '../../components/Admin/Statistics/Statistics';
import axiosInstance from '../../utils/axiosInstance';
function AdminRating() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Profile');
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const openTab = tabName => setActiveTab(tabName);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getAllBookings`,
        );
        const sortDate = response.data.sort((a, b) =>
          b.bookingID.localeCompare(a.bookingID),
        );
        setRatingData(sortDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  const handleRatingFilterChange = event => {
    setRatingFilter(event.target.value);
  };

  const filteredRatingData = ratingData.filter(rating => {
    const matchesRole =
      ratingFilter === 'All' || rating.ratingstar === ratingFilter;
    const matchesSearch =
      search === '' ||
      rating.ratingstar.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const servicePrice = services => {
    return services.map(service => {
      return `${service.name}($${service.price})`;
    });
  };

  return (
    <div className='Admin-Rating container-fluid'>
      <div className='row'>
        <div className='Admin-Rating-Header row'>
          <div className='Admin-Rating-Header-Logo col-md-2'>
            <img
              className='Admin-Rating-Logo '
              src={logo_pet_health_care}
              alt='logo-pet'
            />
          </div>
          <div className='Admin-Rating-Header-Account-Wrapper col-md-10'>
            <div className='Admin-Rating-Header-Account'>
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
              <div className='Admin-Rating-Header-Account-Text'>
                Hi {user.adminDetails[0].name}
              </div>
            </div>
          </div>
        </div>

        <div className='Admin-Rating-Content row'>
          <div className='Admin-Rating-Navigate col-md-2'>
            <Sidebar />
          </div>

          <div className='Admin-Rating-Main col-md-10'>
            <Statistic />

            <div className='Admin-Rating-Main-Table-Wrapper'>
              <div className='Admin-Rating-Main-Table'>
                <div className='Admin-Rating-Main-Table-Title'>Rating List</div>
                <div className='Admin-Rating-Main-Table-Title-Text'>
                  Rating Information
                </div>
                <div className='Admin-Rating-Main-Filter'>
                  <div className='Admin-Rating-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Name'
                      className='Admin-Rating-Main-Search-Input'
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-Rating-Main-Search-Button'>
                      <img
                        src={icon_search}
                        alt=''
                      />
                    </button>
                  </div>
                  <div className='Admin-Rating-Select-Rating'>
                    <FilterAltIcon sx={{ fontSize: 20 }} />
                    Select rating:
                    <select
                      className='Admin-Rating-Select-Filter'
                      name='rating'
                      onChange={handleRatingFilterChange}
                      value={ratingFilter}
                    >
                      <option>All</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
                <div className='Admin-Rating-Main-Table-Header'>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    Rating ID
                  </div>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    Rating star
                  </div>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    Comment
                  </div>
                  <div className='Admin-Rating-Main-Table-Header-Title-Btn '>
                    Action
                  </div>
                </div>
                {filteredRatingData.map(item => (
                  <div
                    className='Admin-Rating-Main-Table-Content-Row-Wrapper'
                    key={item.ratingID}
                  >
                    <div className='Admin-Rating-Main-Table-Content-Row '>
                      {item.ratingstar}
                    </div>
                    <div className='Admin-Rating-Main-Table-Content-Row '>
                      {item.comment}
                    </div>

                    <div className='Admin-Rating-Table-Detail'>
                      <div className='Admin-Rating-Detail-Btn '>
                        <div className='Admin-Rating-Main-Table-Content-Btn_Wrapper '>
                          <button
                            type='button'
                            className='Admin-Rating-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target='#Admin-DashBoard-exampleModal'
                          >
                            <MoreVertOutlinedIcon sx={{ color: green[400] }} />
                          </button>

                          <div
                            className='modal fade'
                            id='Admin-Rating-exampleModal'
                            tabIndex='-1'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h1
                                    className='modal-title fs-5'
                                    id='Admin-Rating-exampleModalLabel'
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
                                  <div className='Admin-Rating-container-modal-body-more-info'>
                                    <div className='Admin-Rating-tab-modal-body-more-info'>
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
                                      id='Admin-Rating-profile-customer'
                                      className='Admin-Rating-tabcontent-customer'
                                      style={{
                                        display:
                                          activeTab === 'Profile'
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-customer'>
                                          Name:
                                        </div>
                                        <div>{item?.name}</div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-customer'>
                                          Email:
                                        </div>
                                        <div>{item?.email}</div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-customer'>
                                          Phone:
                                        </div>
                                        <div>{item?.phone}</div>
                                      </div>
                                    </div>
                                    <div
                                      id='Admin-Rating-Vacancies'
                                      className='Admin-Rating-tabcontent-pet'
                                      style={{
                                        display:
                                          activeTab === 'Pet'
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          Name:
                                        </div>
                                        <div>{item?.petDetails[0]?.name}</div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          Breed:
                                        </div>
                                        <div>{item?.petDetails[0]?.breed}</div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          Type:
                                        </div>
                                        <div>
                                          {item?.petDetails[0]?.petType}
                                        </div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
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
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          Gender:
                                        </div>
                                        <div>{item?.petDetails[0]?.gender}</div>
                                      </div>
                                    </div>
                                    <div
                                      id='Admin-Rating-Vacancies'
                                      className='Admin-Rating-tabcontent-services'
                                      style={{
                                        display:
                                          activeTab === 'Services'
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          Services:
                                        </div>
                                        <div>
                                          {servicePrice(
                                            item?.servicesInBooking,
                                          ).join(', ')}
                                        </div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          Start time:
                                        </div>
                                        <div>{item?.startTime}</div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
                                          End time:
                                        </div>
                                        <div>{item?.endTime}</div>
                                      </div>
                                      <div className='Admin-Rating-form-group'>
                                        <div className='Admin-Rating-sub-title-profile-pet'>
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

                <div className='Admin-Rating-Pagination'>
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

export default AdminRating;