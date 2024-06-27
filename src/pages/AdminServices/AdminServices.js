import './AdminServices.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import logo_pet_health_care from '../../assets/images/img_AdminServices/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminServices/icon_search.svg';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../../context/AuthContext';

function AdminServices() {
  const { logOut } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [newService, setNewService] = useState({
    services_name: '',
    describe: '',
    price: '$',
    status: 'Enable',
  });
  const [editService, setEditService] = useState({
    id: null,
    services_id: '',
    services_name: '',
    describe: '',
    price: '',
    status: '',
  });
  const [originalEditService, setOriginalEditService] = useState({
    services_name: '',
    describe: '',
    price: '',
  });
  const [addServiceErrors, setAddServiceErrors] = useState({
    services_name: '',
    describe: '',
    price: '',
  });
  const [editServiceErrors, setEditServiceErrors] = useState({
    services_name: '',
    describe: '',
    price: '',
  });

  const [servicesData, setServicesData] = useState([
    {
      id: 1,
      services_id: 'S00001',
      services_name: 'Vaccinations',
      describe: 'Services Description',
      price: '$40',
      status: 'Enable',
    },
    {
      id: 2,
      services_id: 'S00002',
      services_name: 'Deworm',
      describe: 'Services Description',
      price: '$10',
      status: 'Enable',
    },
    {
      id: 3,
      services_id: 'S00003',
      services_name: 'Surgery',
      describe: 'Services Description',
      price: '$70',
      status: 'Enable',
    },
    {
      id: 4,
      services_id: 'S00004',
      services_name: 'Groom',
      describe: 'Services Description',
      price: '$20',
      status: 'Enable',
    },
    {
      id: 5,
      services_id: 'S00005',
      services_name: 'Bathe',
      describe: 'Services Description',
      price: '$10',
      status: 'Disable',
    },
  ]);

  const modalCloseButtonRef = useRef(null);
  const modalEditCloseButtonRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  const validateInput = (name, value) => {
    let error = '';
    if (name === 'services_name' || name === 'describe') {
      if (!value) {
        error = 'Please enter your information';
      } else {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
          error = 'Only letters and spaces are allowed';
        }
      }
    } else if (name === 'price') {
      if (!value || value === '$') {
        error = 'Please enter your information';
      } else {
        const regex = /^\$\d+$/;
        if (!regex.test(value)) {
          error = 'Price must start with "$" and be followed by numbers';
        }
      }
    }
    return error;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setAddServiceErrors({ ...addServiceErrors, [name]: error });
    setNewService({ ...newService, [name]: value });
  };

  const handleEditInputChange = e => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setEditServiceErrors({ ...editServiceErrors, [name]: error });
    setEditService({ ...editService, [name]: value });
  };

  const handleFormSubmit = () => {
    const newErrors = {
      services_name: validateInput('services_name', newService.services_name),
      describe: validateInput('describe', newService.describe),
      price: validateInput('price', newService.price),
    };

    if (
      Object.values(newErrors).every(error => error === '') &&
      newService.services_name &&
      newService.describe &&
      newService.price !== '$'
    ) {
      const newId = `S0000${servicesData.length + 1}`;
      const newServiceData = {
        ...newService,
        id: servicesData.length + 1,
        services_id: newId,
      };
      setServicesData([...servicesData, newServiceData]);
      setNewService({
        services_name: '',
        describe: '',
        price: '$',
        status: 'Enable',
      });
      setAddServiceErrors({ services_name: '', describe: '', price: '' });

      // Close the modal
      modalCloseButtonRef.current.click();
    } else {
      setAddServiceErrors(newErrors);
    }
  };

  const handleUpdateFormSubmit = () => {
    const newErrors = {
      services_name: validateInput('services_name', editService.services_name),
      describe: validateInput('describe', editService.describe),
      price: validateInput('price', editService.price),
    };

    if (
      Object.values(newErrors).every(error => error === '') &&
      editService.services_name &&
      editService.describe &&
      editService.price !== '$'
    ) {
      const updatedServices = servicesData.map(service => {
        if (service.id === editService.id) {
          return editService;
        }
        return service;
      });
      setServicesData(updatedServices);
      setEditService({
        id: null,
        services_id: '',
        services_name: '',
        describe: '',
        price: '',
        status: '',
      });
      setEditServiceErrors({ services_name: '', describe: '', price: '' });

      // Close the modal
      modalEditCloseButtonRef.current.click();
    } else {
      setEditServiceErrors(newErrors);
    }
  };

  const handleToggleStatus = id => {
    const updatedServices = servicesData.map(service => {
      if (service.id === id) {
        service.status = service.status === 'Enable' ? 'Disable' : 'Enable';
        if (editService.id === id) {
          setEditService({ ...editService, status: service.status });
        }
      }
      return service;
    });
    setServicesData(updatedServices);
  };

  const handleEditClick = service => {
    setEditService(service);
    setOriginalEditService({
      services_name: service.services_name,
      describe: service.describe,
      price: service.price,
    });
  };

  const searchServicesData = servicesData.filter(services => {
    const matchesSearch =
      search === '' ||
      services.services_name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className='Admin-Services container-fluid'>
      <div className='row'>
        <div className='Admin-Services-Header row'>
          <div className='Admin-Services-Header-Logo col-md-2'>
            <img
              className='Admin-Services-Logo'
              src={logo_pet_health_care}
              alt='logo-pet'
            />
          </div>
          <div className='Admin-Services-Header-Account-Wrapper col-md-10'>
            <div className='Admin-Services-Header-Account'>
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
              <div className='Admin-Services-Header-Account-Text'>Hi Admin</div>
            </div>
          </div>

          <div className='Admin-Services-Content row'>
            <div className='Admin-Services-Navigate col-md-2'>
              <div className='Admin-Services-Navigate-Text'>
                <div className='Admin-Services-Navigate-Dashboard'>
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
                    <div className='Admin-Services-Navigate-Text-Dashboard'>
                      DashBoard
                    </div>
                  </a>
                </div>
                <div className='Admin-Services-Navigate-Text-Rest'>
                  <a href='/admin-dashboard'>
                    <div className='Admin-Services-Navigate-Text-Rest-Menu'>
                      Booking
                    </div>
                  </a>
                  <a href='/admin-account'>
                    <div className='Admin-Services-Navigate-Text-Rest-Menu'>
                      Account
                    </div>
                  </a>
                  <a href='/admin-services'>
                    <div className='Admin-Services-Navigate-Text-Rest-Menu'>
                      Services
                    </div>
                  </a>
                  <a href='/admin-cages'>
                    <div className='Admin-Services-Navigate-Text-Rest-Menu'>
                      Cages
                    </div>
                  </a>
                </div>
              </div>
              <div onClick={logOut}>
                <div className='Admin-Services-Navigate-Logout'>
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
                  <span className='Admin-Services-Navigate-Logout-Text'>
                    Logout
                  </span>
                </div>
              </div>
            </div>

            <div className='Admin-Services-Main col-md-10'>
              <div className='Admin-Services-Main_Title'>
                <div className='Admin-Services-Main_Title-Left'>
                  <h2 className='Admin-Services-Main_Title-Left-Intro'>
                    Hi, welcome back!
                  </h2>
                  <p className='Admin-Services-Main_Title-Left-text'>
                    Sales monitoring dashboard template.
                  </p>
                </div>
                <div className='Admin-Services-Main_Title-Right'>
                  <label className='Admin-Services-title-Star'>
                    Customer Ratings
                  </label>
                  <div className='Admin-Services-Star'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='16'
                      fill='#fbbc0b'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='16'
                      fill='#fbbc0b'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='16'
                      fill='#97a3b9'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='16'
                      fill='#97a3b9'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='16'
                      fill='#97a3b9'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    <span>(14.000)</span>
                  </div>
                </div>
              </div>

              <div className='Admin-Services-Main-ChooseDate'>
                <div className='Admin-Services-Main-ChooseDate_Text'>
                  Choose Date:
                </div>
                <input
                  type='date'
                  id='start'
                  name='trip-start'
                  value={currentDate}
                  min='2018-01-01'
                  max='2026-12-31'
                  onChange={e => setCurrentDate(e.target.value)}
                />
              </div>

              <div className='Admin-Services-Main-Header row'>
                <div className='Admin-Services-Main-Header-Income col-md-3'>
                  <div className='Admin-Services-Main-Header-Note'>
                    Daily income
                  </div>
                  <div className='Admin-Services-Main-Header-Money'>
                    $5,678.90
                  </div>
                  <div className='Admin-Services-Main-Header-Percent'>
                    +20% day over day
                  </div>
                </div>

                <div className='Admin-Services-Main-Header-Income col-md-3'>
                  <div className='Admin-Services-Main-Header-Note'>
                    Weekly income
                  </div>
                  <div className='Admin-Services-Main-Header-Money'>
                    $45,678.90
                  </div>
                  <div className='Admin-Services-Main-Header-Percent'>
                    +10% day over week
                  </div>
                </div>

                <div className='Admin-Services-Main-Header-Income col-md-3'>
                  <div className='Admin-Services-Main-Header-Note'>
                    Monthly income
                  </div>
                  <div className='Admin-Services-Main-Header-Money'>
                    $230,678.90
                  </div>
                  <div className='Admin-Services-Main-Header-Percent'>
                    +23% day over month
                  </div>
                </div>

                <div className='Admin-Services-Main-Header-Income col-md-3'>
                  <div className='Admin-Services-Main-Header-Note'> Total </div>
                  <div className='Admin-Services-Main-Header-Money'>
                    $5,678.90
                  </div>
                  <div className='Admin-Services-Main-Header-Percent'>
                    +20% day over day
                  </div>
                </div>
              </div>

              <div className='Admin-Services-Main-Table-Wrapper'>
                <div className='Admin-Services-Main-Table'>
                  <div className='Admin-Services-Main-Table-Title'>
                    Services List
                  </div>
                  <div className='Admin-Services-Main-Table-Title-Text'>
                    Services Information
                  </div>
                  <div className='Admin-Services-Main-Filter-Add'>
                    <div className='Admin-Services-Main-Search'>
                      <input
                        type='text'
                        placeholder='Search Name'
                        className='Admin-Services-Main-Search-Input'
                        onChange={e => setSearch(e.target.value)}
                      />
                      <button className='Admin-Services-Main-Search-Button'>
                        <img
                          src={icon_search}
                          alt=''
                        />
                      </button>
                    </div>
                    <div className='Admin-Services-Add-Services'>
                      <button
                        type='button'
                        className='Admin-Services-add-services-btn'
                        data-bs-toggle='modal'
                        data-bs-target='#addServiceModal'
                      >
                        Add Services
                      </button>

                      <div
                        className='modal fade'
                        id='addServiceModal'
                        tabIndex='-1'
                        aria-labelledby='addServiceModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='addServiceModalLabel'
                              >
                                Add Services
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                                ref={modalCloseButtonRef}
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <div className='Admin-Services-modal-update-name'>
                                <div className='Admin-Services-modal-title'>
                                  Name
                                </div>
                                <label className='Admin-Services-modal-initials'>
                                  Services name:
                                </label>
                                <input
                                  className='Admin-Services-input'
                                  name='services_name'
                                  value={newService.services_name}
                                  onChange={handleInputChange}
                                  placeholder='Services'
                                />
                                {addServiceErrors.services_name && (
                                  <p className='error-message'>
                                    {addServiceErrors.services_name}
                                  </p>
                                )}
                              </div>
                              <div className='Admin-Services-modal-update-name'>
                                <div className='Admin-Services-modal-title'>
                                  Description
                                </div>
                                <label className='Admin-Services-modal-initials'>
                                  Services description:
                                </label>
                                <input
                                  className='Admin-Services-input'
                                  name='describe'
                                  value={newService.describe}
                                  onChange={handleInputChange}
                                  placeholder='Description'
                                />
                                {addServiceErrors.describe && (
                                  <p className='error-message'>
                                    {addServiceErrors.describe}
                                  </p>
                                )}
                              </div>
                              <div className='Admin-Services-modal-update-name'>
                                <div className='Admin-Services-modal-title'>
                                  Price
                                </div>
                                <label className='Admin-Services-modal-initials'>
                                  Services price:
                                </label>
                                <input
                                  className='Admin-Services-input'
                                  name='price'
                                  value={newService.price}
                                  onChange={handleInputChange}
                                  placeholder='Price'
                                />
                                {addServiceErrors.price && (
                                  <p className='error-message'>
                                    {addServiceErrors.price}
                                  </p>
                                )}
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
                              <button
                                type='button'
                                className='btn btn-success'
                                onClick={handleFormSubmit}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='Admin-Services-Main-Table-Header'>
                    <div className='Admin-Services-Main-Table-Header-Title'>
                      Services ID
                    </div>
                    <div className='Admin-Services-Main-Table-Header-Title'>
                      Name Services
                    </div>
                    <div className='Admin-Services-Main-Table-Header-Title'>
                      Description
                    </div>
                    <div className='Admin-Services-Main-Table-Header-Title'>
                      Price
                    </div>
                    <div className='Admin-Services-Main-Table-Header-Title'>
                      Status
                    </div>
                    <div className='Admin-Services-Main-Table-Header-Title-Btn'>
                      Action
                    </div>
                  </div>

                  {searchServicesData.map(item => (
                    <div
                      className={`Admin-Services-Main-Table-Content-Row-Wrapper ${item.status === 'Enable' ? 'row-enable' : 'row-disable'}`}
                      key={item.id}
                    >
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item.services_id}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item.services_name}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item.describe}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item.price}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        <label className='switch'>
                          <input
                            type='checkbox'
                            checked={item.status === 'Enable'}
                            onChange={() => handleToggleStatus(item.id)}
                          />
                          <span className='slider round'></span>
                        </label>
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        <span className='Admin-Services-Main-Table-Content-Btn_Wrapper'>
                          <button
                            type='button'
                            className='Admin-Services-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target={`#editServiceModal${item.id}`}
                            onClick={() => handleEditClick(item)}
                          >
                            <BorderColorOutlinedIcon
                              sx={{
                                color: blue[400],
                              }}
                            />
                          </button>

                          <div
                            className='modal fade'
                            id={`editServiceModal${item.id}`}
                            tabIndex='-1'
                            aria-labelledby={`editServiceModalLabel${item.id}`}
                            aria-hidden='true'
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h1
                                    className='modal-title fs-5'
                                    id={`editServiceModalLabel${item.id}`}
                                  >
                                    Update Information
                                  </h1>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                    ref={modalEditCloseButtonRef}
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <div className='Admin-Services-modal-update-name'>
                                    <div className='Admin-Services-modal-title-name'>
                                      Name
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        Old name:
                                      </div>
                                      {originalEditService.services_name}
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        New name:
                                      </div>
                                      <input
                                        className='Admin-Services-input'
                                        name='services_name'
                                        value={editService.services_name}
                                        onChange={handleEditInputChange}
                                        placeholder='Name'
                                      />
                                    </div>
                                    {editServiceErrors.services_name && (
                                      <p className='error-message'>
                                        {editServiceErrors.services_name}
                                      </p>
                                    )}
                                  </div>
                                  <div className='Admin-Services-modal-update-name'>
                                    <div className='Admin-Services-modal-title'>
                                      Description
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        Old Description:
                                      </div>
                                      {originalEditService.describe}
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        New Description:
                                      </div>
                                      <input
                                        className='Admin-Services-input'
                                        name='describe'
                                        value={editService.describe}
                                        onChange={handleEditInputChange}
                                        placeholder='Description'
                                      />
                                    </div>
                                    {editServiceErrors.describe && (
                                      <p className='error-message'>
                                        {editServiceErrors.describe}
                                      </p>
                                    )}
                                  </div>
                                  <div className='Admin-Services-modal-update-name'>
                                    <div className='Admin-Services-modal-title'>
                                      Price
                                    </div>

                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update'>
                                        <div className='Admin-Services-modal-update-title'>
                                          Old price:
                                        </div>
                                        {originalEditService.price}
                                      </div>
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        New Price:
                                      </div>
                                      <input
                                        className='Admin-Services-input-phone'
                                        name='price'
                                        value={editService.price}
                                        onChange={handleEditInputChange}
                                        placeholder='Price'
                                      />
                                    </div>
                                    {editServiceErrors.price && (
                                      <p className='error-message'>
                                        {editServiceErrors.price}
                                      </p>
                                    )}
                                    <div>
                                      {/* <div className='Admin-Services-modal-title'>
                                                                                Status
                                                                            </div> */}
                                      {/* <div className='Admin-Services-modal-radio'>
                                                                                <div className='Admin-Services-modal-radio-text'>
                                                                                    <input
                                                                                        type='radio'
                                                                                        name='status'
                                                                                        value='Enable'
                                                                                        checked={editService.status === 'Enable'}
                                                                                        onChange={handleEditInputChange}
                                                                                    />
                                                                                    <label> Enable </label>
                                                                                </div>
                                                                                <div>
                                                                                    <input
                                                                                        type='radio'
                                                                                        name='status'
                                                                                        value='Disable'
                                                                                        checked={editService.status === 'Disable'}
                                                                                        onChange={handleEditInputChange}
                                                                                    />
                                                                                    <label> Disable </label>
                                                                                </div>
                                                                            </div> */}
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
                                  <button
                                    type='button'
                                    className='btn btn-success'
                                    onClick={handleUpdateFormSubmit}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className='Admin-Services-Pagination'>
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
    </div>
  );
}

export default AdminServices;
