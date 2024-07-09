import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
import axiosInstance from '../../utils/axiosInstance';
import { Tab, Tabs } from 'react-bootstrap';
import { Pagination, Stack } from '@mui/material';

function ManageListBooking() {
  const [allServices, setAllServices] = useState([]);
  const [allDoctorsWorkingHours, setAllDoctorsWorkingHours] = useState([]);
  const [searchPetValue, setSearchPetValue] = useState('');
  const [searchCustomerValue, setSearchCustomerValue] = useState('');
  const [accountOption, setAccountOption] = useState('');
  const [petSearchResults, setPetSearchResults] = useState([]);
  const [accountSearchResults, setAccountSearchResults] = useState([]);
  const availableTimeSlots = [
    { startTime: '08:00', endTime: '09:00' },
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '13:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '17:00' },
  ];

  const [createPetInfo, setCreatePetInfo] = useState({});

  const [createAccountInfo, setCreateAccountInfo] = useState({});
  const [petInfo, setPetInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
  const [allBookings, setAllBookings] = useState([]);
  const [chosenDoctor, setChosenDoctor] = useState('');
  const [errors, setErrors] = useState({
    accountOption: '',
    selectedDate: '',
    selectedTimeSlot: '',
    chosenDoctor: '',
    services: '',
    petName: '',
    petType: '',
    petBreed: '',
    petGender: '',
    petBirthday: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    accountSelect: '',
    petSelect: '',
    searchValueAccount: '',
    searchValuePet: '',
  });
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const now = new Date();

    const utcOffset = now.getTimezoneOffset() * 60000;
    const utcDate = new Date(now.getTime() + utcOffset);

    const formattedDate = utcDate.toISOString().split('T')[0];

    setFilterDate(formattedDate);
  }, []);

  const handleOwnerOptionChange = event => {
    setAccountOption(event.target.value);
    setSearchCustomerValue('');
    setPetInfo({});
    setAccountInfo({});
    setCreateAccountInfo({});
    setCreatePetInfo({});
    setErrors(prev => ({
      ...prev,
      petName: '',
      petType: '',
      petBreed: '',
      petGender: '',
      petBirthday: '',
      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      accountOption: '',
      accountSelect: '',
      petSelect: '',
      searchValueAccount: '',
      searchValuePet: '',
    }));
  };

  useEffect(() => {
    const fetchAllBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/booking/getAllBookings`,
        );
        setAllBookings(response.data.allBookings);
      } catch (error) {
        console.error('Error ManageBooking Get All: ', error);
      }
    };
    fetchAllBooking();
  }, []);

  const reRenderGetAllBookings = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/booking/getAllBookings`,
      );
      setAllBookings(response.data.allBookings);
    } catch (error) {
      console.error('Error ManageBooking Get All: ', error);
    }
  };

  const getAllDoctors = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/doctor/getAllDoctors`,
      );
      setAllDoctorsWorkingHours(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearchCustomer = async () => {
    if (searchCustomerValue === '') {
      return;
    }
    try {
      const accountSearchLists = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/account/searchAccount/${searchCustomerValue}`,
      );
      setAccountSearchResults(accountSearchLists.data);
      setErrors(prev => ({ ...prev, searchValueAccount: '' }));
    } catch (error) {
      console.error('Err:', error);
    }
  };

  const handleAccountSelect = async event => {
    const accountID = event.target.value;
    if (accountID) {
      const account = accountSearchResults.find(
        account => account.accountID === accountID,
      );
      if (account) {
        try {
          const accountSearchLists = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/pet/searchPetOfUserID/${account.accountID}`,
          );
          setPetSearchResults(accountSearchLists.data);
        } catch (error) {
          console.error('Err:', error);
        }
        setAccountInfo(account);
        setErrors(prev => ({ ...prev, accountSelect: '' }));
      }
    }
  };

  const handleSearchPet = async () => {
    if (searchPetValue === '') {
      return;
    }
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/pet/searchPet/${searchPetValue}`,
      );
      setPetSearchResults(response.data);
    } catch (error) {
      console.error('Err:', error);
    }
  };

  const handlePetSelect = event => {
    const petID = event.target.value;
    if (petID) {
      const newPetInfo = petSearchResults.find(pet => pet.petID === petID);
      if (newPetInfo) {
        setCreatePetInfo(newPetInfo);
        setPetInfo(newPetInfo);
        setErrors(prev => ({ ...prev, petSelect: '', searchValuePet: '' }));
      }
    }
  };

  const handleGetAllServicesAndDoctors = async () => {
    try {
      const services = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/service/getAllServices`,
      );
      setAllServices(services.data);
      getAllDoctors();
    } catch (error) {
      console.error('Err:', error);
    }
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    if (field === 'service' && newServices.some(service => service.service === value)) {
      setErrors(prev => ({ ...prev, services: 'This service is already selected' }));
      return;
    }
    newServices[index][field] = value;
    setServices(newServices);
    setErrors(prev => ({ ...prev, services: '' }));
  };

  const addService = () => {
    setServices([...services, { service: '' }]);
  };

  const resetForm = () => {
    setChosenDoctor('');
    setAccountOption('');
    setAccountInfo({});
    setPetInfo({});
    setSearchCustomerValue('');
    setSearchPetValue('');
    setPetSearchResults([]);
    setAccountSearchResults([]);
    setCreatePetInfo({});
    setCreateAccountInfo({});
    setServices([]);
    setSelectedDate('');
    setSelectedTimeSlot({});
    setErrors({});
    document.getElementById('addPetForm').reset();
  };

  const findAvailableDoctor = (date, startTime, endTime) => {
    const availableDoctors = [];
    for (const doctor of allDoctorsWorkingHours) {
      const workingHour = doctor.workingHoursDetails.find(
        wh => wh.date.split('T')[0] === date.split('T')[0] && !wh.isOff,
      );
      if (workingHour) {
        const withinWorkingHours =
          startTime >= workingHour.startTime && endTime <= workingHour.endTime;
        if (withinWorkingHours) {
          const hasNoOverlap = doctor.matchingBookings.every(
            booking =>
              endTime !== booking.endTime && startTime !== booking.startTime,
          );
          if (hasNoOverlap) {
            availableDoctors.push(doctor);
          }
        }
      }
    }
    return availableDoctors.length ? availableDoctors : null;
  };

  const handleDoctorChange = event => {
    setChosenDoctor(event.target.value);
    setErrors(prev => ({ ...prev, chosenDoctor: '' }));
  };

  const handleSave = async bookingID => {
    try {
      await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/manageBooking/updateBookingDoctors`,
        { bookingID, chosenDoctor },
      );
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/booking/getAllBookings`,
      );
      setAllBookings(response.data.allBookings);
    } catch (error) {
      console.error('error Update Manage Booking: ' + error);
    }
    setChosenDoctor('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!accountOption)
      newErrors.accountOption = 'Please select an owner option.';
    if (accountOption === 'noOwnerID') {
      const { name, phone, email } = createAccountInfo;
      if (!name) newErrors.ownerName = 'Owner name is required.';
      if (!phone) newErrors.ownerPhone = 'Owner phone is required.';
      if (!email || !validateEmail(email))
        newErrors.ownerEmail = 'Valid owner email is required.';

      const petName = createPetInfo.name;
      const { type, breed, gender, birthday } = createPetInfo;
      if (!petName) newErrors.petName = 'Pet name is required.';
      if (!type) newErrors.petType = 'Pet type is required.';
      if (!breed) newErrors.petBreed = 'Pet breed is required.';
      if (!gender) newErrors.petGender = 'Pet gender is required.';
      if (!birthday) newErrors.petBirthday = 'Pet birthday is required.';
    } else {
      if (searchCustomerValue === '')
        newErrors.searchValueAccount = 'Please search a accountID or username.';
      if (!accountInfo) newErrors.accountSelect = 'Please select a customer.';
      if (searchPetValue === '' && !petInfo)
        newErrors.searchValuePet = 'Please search a petID or pet name.';
      if (!petInfo.petID) newErrors.petSelect = 'Please select a pet.';
    }

    if (services.length === 0)
      newErrors.services = 'At least one service is required.';
    if (services.some(service => !service.service))
      newErrors.services = 'Please select service.';
    if (!selectedDate) newErrors.selectedDate = 'Date is required.';
    if (!selectedTimeSlot.startTime || !selectedTimeSlot.endTime)
      newErrors.selectedTimeSlot = 'Time slot is required.';
    if (!chosenDoctor) newErrors.chosenDoctor = 'Doctor is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTimeSlotChange = event => {
    const [startTime, endTime] = event.target.value.split('-');
    setSelectedTimeSlot({ startTime, endTime });
    setErrors(prev => ({ ...prev, selectedTimeSlot: '' }));
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateForm()) return;

    if (accountOption === 'hasOwnerID') {
      const newBookingHasCustomer = {
        day: selectedDate,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        petInfo: createPetInfo,
        doctor: allDoctorsWorkingHours.find(
          doctor => doctor.doctorID === chosenDoctor,
        ),
        service: services.map(service => service.service),
      };
      try {
        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/manageBooking/addHaveCustomer`,
          newBookingHasCustomer,
        );
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/booking/getAllBookings`,
        );
        setAllBookings(response.data.allBookings);
      } catch (error) {
        console.error('error Add Manage Booking: ' + error);
      }
    } else {
      const newBookingAndNewCustomer = {
        day: selectedDate,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        userInfo: createAccountInfo,
        petInfo: createPetInfo,
        doctor: allDoctorsWorkingHours.find(
          doctor => doctor.doctorID === chosenDoctor,
        ),
        service: services.map(service => service.service),
      };
      try {
        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/manageBooking/addNotHaveCustomer`,
          newBookingAndNewCustomer,
        );
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/booking/getAllBookings`,
        );
        setAllBookings(response.data.allBookings);
      } catch (error) {
        console.error('error Add Manage Booking: ' + error);
      }
    }

    resetForm();
    document.querySelector('#exampleModal .btn-close').click();
  };

  function truncateText(text) {
    const items = text.split(',');
    if (items.length > 1) {
      return `${items[0]}, ...`;
    }
    return text;
  }

  const handleFilterDateChange = event => {
    setFilterDate(event.target.value);
  };

  const filteredBookings = filterDate
    ? allBookings
        .filter(booking => booking.dateBook.split('T')[0] === filterDate)
        .sort((a, b) => b.bookingID.localeCompare(a.bookingID))
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
    : allBookings
        .sort((a, b) => b.bookingID.localeCompare(a.bookingID))
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .sort((a, b) => new Date(b.dateBook) - new Date(a.dateBook));

  const handleConfirmPayment = async bookingID => {
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/manageBooking/confirmPayment`,
        {
          bookingID,
        },
      );
      reRenderGetAllBookings();
    } catch (error) {
      console.error('Error cancelling booking', error);
    }
  };

  const handleConfirmRefund = async bookingID => {
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/paypal/refundPaymentBooking`,
        {
          bookingID,
        },
      );
      reRenderGetAllBookings();
    } catch (error) {
      console.error('Error cancelling booking', error);
    }
  };

  const handleConfirmCheckIn = async bookingID => {
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/manageBooking/confirmCheckIn`,
        {
          bookingID,
        },
      );
      reRenderGetAllBookings();
    } catch (error) {
      console.error('Error cancelling booking', error);
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
  const currentBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const removeService = index => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className='manage-booking-list container-fluid'>
      <div className='row'>
        <HeaderManager />
        <div className='manage-booking-list-title'>
          <div className='manage-booking-list-title-text'>
            Pet Health Care - Manage Booking Lists
          </div>
        </div>
        <div className='manage-booking-list-content'>
          <Sidebar />
          <div className='manage-booking-main-content'>
            <div className='main-content-header'>
              <div className='main-content-header-search'>
                <div className='main-content-header-search-title'>
                  List of Booking
                </div>
                <div className='main-content-header-search-input-wrapper'>
                  <button
                    type='button'
                    className='search-input-btn'
                  >
                    <img
                      className='search-input-btn-icon'
                      src={search_icon}
                      alt=''
                    />
                  </button>
                  <input
                    type='text'
                    placeholder='Search'
                    className='main-content-header-search-input'
                  />
                </div>
                <div className='booking-page-main-content-header-filter-date'>
                  <input
                    type='date'
                    value={filterDate}
                    onChange={handleFilterDateChange}
                    placeholder='Filter by Date'
                  />
                </div>
              </div>
              <div className='main-content-header-add-booking'>
                <button
                  type='button'
                  className='booking-btn-add'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'
                  onClick={handleGetAllServicesAndDoctors}
                >
                  Add Booking
                </button>
                <div
                  className='modal fade'
                  id='exampleModal'
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog'>
                    <form
                      id='addPetForm'
                      onSubmit={handleSubmit}
                    >
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h1
                            className='modal-title fs-5'
                            id='exampleModalLabel'
                          >
                            Add Booking
                          </h1>
                          <button
                            type='button'
                            onClick={resetForm}
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>
                          <div className='modal-body-section-wrapper'>
                            <div className='modal-body-section-type-user'>
                              <label>Customer:</label>
                              <input
                                type='radio'
                                name='accountOption'
                                value='hasOwnerID'
                                checked={accountOption === 'hasOwnerID'}
                                onChange={handleOwnerOptionChange}
                              />
                              <span>Have CustomerID</span>
                              <input
                                type='radio'
                                name='accountOption'
                                value='noOwnerID'
                                checked={accountOption === 'noOwnerID'}
                                onChange={handleOwnerOptionChange}
                              />
                              <span>Not Have CustomerID</span>
                              {errors.accountOption && (
                                <span className='error'>
                                  {errors.accountOption}
                                </span>
                              )}
                            </div>
                            {accountOption === 'hasOwnerID' && (
                              <div id='searchOwnerSection'>
                                <div className='search-owner-option-section'>
                                  <label>Search Customer:</label>
                                  <input
                                    type='text'
                                    id='searchOwnerInput'
                                    value={searchCustomerValue}
                                    onChange={e =>
                                      setSearchCustomerValue(e.target.value)
                                    }
                                  />
                                  <div className='search-button' onClick={handleSearchCustomer}>
                                    Search
                                  </div>
                                  {errors.searchValueAccount && (
                                    <span className='error'>
                                      {errors.searchValueAccount}
                                    </span>
                                  )}
                                </div>
                                <div className='has-select-option'>
                                  <select onChange={handleAccountSelect}>
                                    <option value=''>Choose Customer</option>
                                    {accountSearchResults &&
                                      accountSearchResults.map(account => (
                                        <option
                                          key={account.accountID}
                                          value={account.accountID}
                                        >
                                          {`${account.accountID} - ${account.username}`}
                                        </option>
                                      ))}
                                  </select>
                                  {errors.accountSelect && (
                                    <span className='error'>
                                      {errors.accountSelect}
                                    </span>
                                  )}
                                </div>

                                <div id='searchPetSection'>
                                  <div className='searchPetSection-child'>
                                    <label>Search Pet ID:</label>
                                    <input
                                      type='text'
                                      value={searchPetValue}
                                      onChange={e =>
                                        setSearchPetValue(e.target.value)
                                      }
                                    />
                                    <div className='search-button' onClick={handleSearchPet}>Search</div>
                                    {errors.searchValuePet && (
                                      <span className='error'>
                                        {errors.searchValuePet}
                                      </span>
                                    )}
                                  </div>
                                  <div className='has-select-option'>
                                    <select onChange={handlePetSelect}>
                                      <option value=''>Choose Pet</option>
                                      {petSearchResults &&
                                        petSearchResults.map(pet => (
                                          <option
                                            key={pet.petID}
                                            value={pet.petID}
                                          >{`${pet.petID} - ${pet.name}`}</option>
                                        ))}
                                    </select>
                                    {errors.petSelect && (
                                      <span className='error'>
                                        {errors.petSelect}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {accountOption === 'noOwnerID' && (
                              <div id='newOwnerSection'>
                                <div>
                                  <div className='modal-body-section'>
                                    <label>Name:</label>
                                    <input
                                      type='text'
                                      value={createAccountInfo.name || ''}
                                      onChange={e => {
                                        setCreateAccountInfo({
                                          ...createAccountInfo,
                                          name: e.target.value,
                                        });
                                        setErrors(prev => ({
                                          ...prev,
                                          ownerName: '',
                                        }));
                                      }}
                                      required
                                    />
                                    {errors.ownerName && (
                                      <span className='error'>
                                        {errors.ownerName}
                                      </span>
                                    )}
                                  </div>
                                  <div className='modal-body-section'>
                                    <label>Email:</label>
                                    <input
                                      type='email'
                                      value={createAccountInfo.email || ''}
                                      onChange={e => {
                                        const email = e.target.value;
                                        setCreateAccountInfo({
                                          ...createAccountInfo,
                                          email,
                                        });
                                        if (!validateEmail(email)) {
                                          setErrors(prev => ({
                                            ...prev,
                                            ownerEmail: 'Invalid email format',
                                          }));
                                        } else {
                                          setErrors(prev => ({
                                            ...prev,
                                            ownerEmail: '',
                                          }));
                                        }
                                      }}
                                      required
                                    />
                                    {errors.ownerEmail && (
                                      <span className='error'>
                                        {errors.ownerEmail}
                                      </span>
                                    )}
                                  </div>
                                  <div className='modal-body-section'>
                                    <label>Phone:</label>
                                    <input
                                      type='text'
                                      value={createAccountInfo.phone || ''}
                                      onChange={e => {
                                        setCreateAccountInfo({
                                          ...createAccountInfo,
                                          phone: e.target.value,
                                        });
                                        setErrors(prev => ({
                                          ...prev,
                                          ownerPhone: '',
                                        }));
                                      }}
                                      required
                                    />
                                    {errors.ownerPhone && (
                                      <span className='error'>
                                        {errors.ownerPhone}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div id='newPetSection'>
                                  <div>
                                    <div className='modal-body-section'>
                                      <label>Pet Name:</label>
                                      <input
                                        type='text'
                                        value={createPetInfo.name || ''}
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            name: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petName: '',
                                          }));
                                        }}
                                        required
                                      />
                                      {errors.petName && (
                                        <span className='error'>
                                          {errors.petName}
                                        </span>
                                      )}
                                    </div>
                                    <div className='modal-body-section'>
                                      <label>Type:</label>
                                      <input
                                        type='radio'
                                        name='petType'
                                        value='Dog'
                                        checked={createPetInfo.type === 'Dog'}
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            type: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petType: '',
                                          }));
                                        }}
                                        required
                                      />{' '}
                                      <span>Dog</span>
                                      <input
                                        type='radio'
                                        name='petType'
                                        value='Cat'
                                        checked={createPetInfo.type === 'Cat'}
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            type: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petType: '',
                                          }));
                                        }}
                                        required
                                      />{' '}
                                      <span>Cat</span>
                                      {errors.petType && (
                                        <span className='error'>
                                          {errors.petType}
                                        </span>
                                      )}
                                    </div>
                                    <div className='modal-body-section'>
                                      <label>Breed:</label>
                                      <input
                                        type='text'
                                        value={createPetInfo.breed}
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            breed: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petBreed: '',
                                          }));
                                        }}
                                        required
                                      />
                                      {errors.petBreed && (
                                        <span className='error'>
                                          {errors.petBreed}
                                        </span>
                                      )}
                                    </div>
                                    <div className='modal-body-section'>
                                      <label>Birthday:</label>
                                      <input
                                        type='date'
                                        value={createPetInfo.birthday || ''}
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            birthday: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petBirthday: '',
                                          }));
                                        }}
                                        required
                                      />
                                      {errors.petBirthday && (
                                        <span className='error'>
                                          {errors.petBirthday}
                                        </span>
                                      )}
                                    </div>
                                    <div className='modal-body-section'>
                                      <label>Gender:</label>
                                      <input
                                        type='radio'
                                        name='gender'
                                        value='Male'
                                        checked={
                                          createPetInfo.gender === 'Male'
                                        }
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            gender: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petGender: '',
                                          }));
                                        }}
                                        required
                                      />
                                      <span>Male</span>
                                      <input
                                        type='radio'
                                        name='gender'
                                        value='Female'
                                        checked={
                                          createPetInfo.gender === 'Female'
                                        }
                                        onChange={e => {
                                          setCreatePetInfo({
                                            ...createPetInfo,
                                            gender: e.target.value,
                                          });
                                          setErrors(prev => ({
                                            ...prev,
                                            petGender: '',
                                          }));
                                        }}
                                        required
                                      />
                                      <span>Female</span>
                                      {errors.petGender && (
                                        <span className='error'>
                                          {errors.petGender}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='modal-body-section-wrapper'>
                          <div>
                            <label>Services used:</label>
                            <table className="services-table">
                              <thead>
                                <tr>
                                  <th>Service</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {services.map((service, index) => (
                                  <tr key={index}>
                                    <td>
                                      <select
                                        value={service.service}
                                        onChange={e => handleServiceChange(index, 'service', e.target.value)}
                                        required
                                      >
                                        <option value=''>Choose Services</option>
                                        {allServices.map(service => (
                                          <option key={service.serviceID} value={service.serviceID}>
                                            {`${service.name} - ${service.price}$`}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn-remove-service"
                                        onClick={() => removeService(index)}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="btn-add-services" onClick={addService}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-plus"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                              </svg>
                              <div>Add service</div>
                            </div>
                            {errors.services && (
                              <span className="error">{errors.services}</span>
                            )}
                          </div>

                          </div>

                          <div className='modal-body-section-wrapper'>
                            <div>
                              <div className='modal-body-section-doctor-date'>
                                <label>Choose Date:</label>
                                <input
                                  type='date'
                                  value={selectedDate}
                                  onChange={e => {
                                    setSelectedDate(e.target.value);
                                    setErrors(prev => ({
                                      ...prev,
                                      selectedDate: '',
                                    }));
                                  }}
                                  required
                                />
                                {errors.selectedDate && (
                                  <span className='error'>
                                    {errors.selectedDate}
                                  </span>
                                )}
                              </div>
                              <div className='modal-body-section-doctor-date'>
                                <label>Choose Time Slot:</label>
                                <select
                                  value={`${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`}
                                  onChange={e => handleTimeSlotChange(e)}
                                  required
                                >
                                  <option value=''>Select Time Slot</option>
                                  {availableTimeSlots &&
                                    availableTimeSlots.map((slot, index) => (
                                      <option
                                        key={index}
                                        value={`${slot.startTime}-${slot.endTime}`}
                                      >{`${slot.startTime} - ${slot.endTime}`}</option>
                                    ))}
                                </select>
                                {errors.selectedTimeSlot && (
                                  <span className='error'>
                                    {errors.selectedTimeSlot}
                                  </span>
                                )}
                              </div>
                              <div className='modal-body-section-doctor-date'>
                                <label>Veterinarian:</label>
                                <div id='veterinarian'>
                                  {findAvailableDoctor(
                                    selectedDate,
                                    selectedTimeSlot.startTime,
                                    selectedTimeSlot.endTime,
                                  ) ? (
                                    findAvailableDoctor(
                                      selectedDate,
                                      selectedTimeSlot.startTime,
                                      selectedTimeSlot.endTime,
                                    ).map((doctor, index) => {
                                      return (
                                        <div
                                          key={doctor.doctorID}
                                          className='choose-Doctor-wrapper'
                                        >
                                          <input
                                            type='radio'
                                            id={`doctor-${index}`}
                                            name='doctor'
                                            value={doctor.doctorID}
                                            onChange={e =>
                                              handleDoctorChange(e)
                                            }
                                          />
                                          <label htmlFor={`doctor-${index}`}>
                                            {doctor.name}
                                          </label>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <div className='choose-Doctor-Not-Found'>
                                      No Doctors Found
                                    </div>
                                  )}
                                </div>
                                {errors.chosenDoctor && (
                                  <span className='error'>
                                    {errors.chosenDoctor}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            onClick={resetForm}
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                          >
                            Close
                          </button>
                          <button
                            type='submit'
                            className='btn btn-success'
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-content-list'>
              <div className='main-content-list-title'>
                <div className='main-content-list-title-text'>BookingID</div>
                <div className='main-content-list-title-text'>Day</div>
                <div className='main-content-list-title-text'>Start Time</div>
                <div className='main-content-list-title-text'>End Time</div>
                <div className='main-content-list-title-text'>Name</div>
                <div className='main-content-list-title-text'>Doctor</div>
                <div className='main-content-list-title-text'>Status</div>{' '}
                <div className='main-content-list-title-text'>View</div>
                <div className='main-content-list-title-text'>Payment</div>{' '}
              </div>
              <div className='main-content-list-body-wrapper'>
                {currentBookings.length !== 0 ? (
                  currentBookings.map(booking => (
                    <div
                      className='content-list-body-info'
                      key={booking.bookingID}
                    >
                      <div className='content-list-body-value'>
                        {booking.bookingID}
                      </div>
                      <div className='content-list-body-value'>
                        {booking.dateBook.split('T')[0]}
                      </div>
                      <div className='content-list-body-value'>
                        {booking.startTime}
                      </div>
                      <div className='content-list-body-value'>
                        {booking.endTime}
                      </div>
                      <div className='content-list-body-value'>
                        <div className='text-content'>
                          {truncateText(booking.name)}
                        </div>
                      </div>
                      <div className='content-list-body-value'>
                        {booking.doctorDetails.length !== 0 ? (
                          booking.doctorDetails[0].name
                        ) : booking.isCancel ? (
                          <div>Cancelled</div>
                        ) : booking.paymentsDetails[0].isCancelPayment ? (
                          <div>Cancelled</div>
                        ) : booking.paymentsDetails[0].isSuccess &&
                          booking.paymentsDetails[0].paymentMethod ===
                            'PAYPAL' &&
                          !booking.isCheckIn ? (
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-toggle='modal'
                            data-bs-target={`#chooseDoctorModal-${booking.bookingID}`}
                            onClick={getAllDoctors}
                          >
                            Choose
                          </button>
                        ) : !booking.paymentsDetails[0].isSuccess &&
                          booking.paymentsDetails[0].paymentMethod ===
                            'COUNTER' &&
                          !booking.isCheckIn ? (
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-toggle='modal'
                            data-bs-target={`#chooseDoctorModal-${booking.bookingID}`}
                            onClick={getAllDoctors}
                          >
                            Choose
                          </button>
                        ) : booking.paymentsDetails[0].isSuccess &&
                          booking.paymentsDetails[0].paymentMethod ===
                            'PAYPAL' &&
                          booking.isCheckIn ? (
                          booking?.doctorDetails[0]?.name
                        ) : booking.paymentsDetails[0].isSuccess &&
                          booking.paymentsDetails[0].paymentMethod ===
                            'COUNTER' &&
                          booking.isCheckIn ? (
                          booking?.doctorDetails[0]?.name
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div
                        className='modal fade'
                        id={`chooseDoctorModal-${booking.bookingID}`}
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='exampleModalLabel'
                              >
                                Choose Doctor
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              {findAvailableDoctor(
                                booking.dateBook,
                                booking.startTime,
                                booking.endTime,
                              ) ? (
                                findAvailableDoctor(
                                  booking.dateBook,
                                  booking.startTime,
                                  booking.endTime,
                                ).map((doctor, index) => {
                                  return (
                                    <div
                                      className='choose-Doctor-wrapper'
                                      key={doctor.doctorID}
                                    >
                                      <input
                                        type='radio'
                                        id={`doctor-${booking.bookingID}-${doctor.name}`}
                                        name='doctor'
                                        value={doctor.doctorID}
                                        onChange={e => handleDoctorChange(e)}
                                      />
                                      <label
                                        htmlFor={`doctor-${booking.bookingID}-${doctor.name}`}
                                      >
                                        {doctor.name}
                                      </label>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className='choose-Doctor-Not-Found'>
                                  No Doctors Found In This Time
                                </div>
                              )}
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
                                onClick={() => handleSave(booking.bookingID)}
                                className='btn btn-primary'
                                data-bs-dismiss='modal'
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='content-list-body-value'>
                        <span
                          className={`${
                            booking.isCancel ? (
                              'status-cancel'
                            ) : booking.paymentsDetails[0].isCancelPayment ||
                              (!booking.paymentsDetails[0].isSuccess &&
                                booking.paymentsDetails[0].paymentMethod ===
                                  'PAYPAL') ? (
                              'status-cancel'
                            ) : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              !booking.isCheckIn ? (
                              'status-waiting'
                            ) : !booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' &&
                              !booking.isCheckIn ? (
                              'status-waiting'
                            ) : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL' &&
                              booking.isCheckIn ? (
                              'status-checked-in'
                            ) : booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'COUNTER' &&
                              booking.isCheckIn ? (
                              'status-checked-in'
                            ) : (
                              <span>NULL</span>
                            )
                          }`}
                        >
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
                          ) : null}
                        </span>
                      </div>

                      <div className='content-list-body-value'>
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target={`#moreinfo-${booking.bookingID}`}
                        >
                          More info
                        </button>
                      </div>

                      {booking.isCancel &&
                      booking.paymentsDetails[0].paymentMethod === 'PAYPAL' &&
                      !booking.isRefund &&
                      calculateDateLeft(
                        booking.dateCancelBook,
                        booking.dateBook,
                      ) >= 3 ? (
                        <div className='content-list-body-value'>
                          <button
                            type='button'
                            className='btn btn-danger'
                            data-bs-toggle='modal'
                            data-bs-target={`#processCancel-${booking.bookingID}`}
                          >
                            Processing
                          </button>
                        </div>
                      ) : booking.paymentsDetails[0].isCancelPayment ? (
                        <div className='content-list-body-value'></div>
                      ) : !booking.paymentsDetails[0].isSuccess &&
                        booking.paymentsDetails[0].paymentMethod ===
                          'COUNTER' &&
                        booking.isCancel ? (
                        <div className='content-list-body-value'></div>
                      ) : !booking.isCancel &&
                        booking.paymentsDetails[0].isSuccess &&
                        booking.paymentsDetails[0].paymentMethod === 'PAYPAL' &&
                        !booking.isRefund &&
                        !booking.isCheckIn ? (
                        <div className='content-list-body-value'>
                          <button
                            type='button'
                            className='btn btn-success'
                            data-bs-toggle='modal'
                            data-bs-target={`#checkIn-${booking.bookingID}`}
                          >
                            Check In
                          </button>
                        </div>
                      ) : !booking.isCancel &&
                        !booking.paymentsDetails[0].isSuccess &&
                        booking.paymentsDetails[0].paymentMethod ===
                          'COUNTER' &&
                        !booking.isCheckIn ? (
                        <div className='content-list-body-value'>
                          <button
                            type='button'
                            className='btn btn-success'
                            data-bs-toggle='modal'
                            data-bs-target={`#paymentModal-${booking.bookingID}`}
                          >
                            Payment
                          </button>
                        </div>
                      ) : (
                        <div className='content-list-body-value'></div>
                      )}

                      <div
                        className='modal fade'
                        id={`moreinfo-${booking.bookingID}`}
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='exampleModalLabel'
                              >
                                Details
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body-manage-booking'>
                              <div className='main-modal-content-manage-booking'>
                                <Tabs
                                  defaultActiveKey='info'
                                  id='manage-booking-tabs'
                                  className='mb-3'
                                >
                                  <Tab
                                    eventKey='info'
                                    title='Info'
                                  >
                                    <div className='grid-container'>
                                      <div className='content-modal-manage-booking'>
                                        <div className='reason-manage-booking'>
                                          <span className='font-weight-bold'>
                                            Customer Information
                                          </span>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            CustomerID:&nbsp;
                                          </small>
                                          <small>{booking.accountID}</small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Name:&nbsp;
                                          </small>
                                          <small>{booking.name}</small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Phone:&nbsp;
                                          </small>
                                          <small>{booking.phone}</small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Email:&nbsp;
                                          </small>
                                          <small>{booking.email}</small>
                                        </div>
                                      </div>

                                      <div className='content-modal-manage-booking'>
                                        <div className='reason-manage-booking'>
                                          <span className='font-weight-bold'>
                                            Pet Information
                                          </span>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Name:&nbsp;
                                          </small>
                                          <small>
                                            {booking.petDetails[0].name}
                                          </small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Type:&nbsp;
                                          </small>
                                          <small>
                                            {booking.petDetails[0].petType}
                                          </small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Breed:&nbsp;
                                          </small>
                                          <small>
                                            {booking.petDetails[0].breed}
                                          </small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Gender:&nbsp;
                                          </small>
                                          <small>
                                            {booking.petDetails[0].gender}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </Tab>
                                  <Tab
                                    eventKey='service'
                                    title='Service'
                                  >
                                    <div className='grid-container'>
                                      <div className='content-modal-manage-booking'>
                                        <div className='reason-manage-booking'>
                                          <span className='font-weight-bold'>
                                            Service Details
                                          </span>
                                        </div>
                                        {booking.servicesInBooking.map(
                                          (service, index) => (
                                            <div
                                              key={index}
                                              className='reason-manage-booking'
                                            >
                                              <small className='title-reason-manage-booking'>
                                                {service.name}:&nbsp;
                                              </small>
                                              <small>{service.price}$</small>
                                            </div>
                                          ),
                                        )}
                                      </div>

                                      <div className='content-modal-manage-booking'>
                                        <div className='reason-manage-booking'>
                                          <span className='font-weight-bold'>
                                            Total Cost
                                          </span>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Total:&nbsp;
                                          </small>
                                          <small>{booking.totalPrice}$</small>
                                        </div>
                                      </div>

                                      <div className='content-modal-manage-booking'>
                                        <div className='reason-manage-booking'>
                                          <span className='font-weight-bold'>
                                            Payment status
                                          </span>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Date pay:&nbsp;
                                          </small>
                                          <small>
                                            {
                                              booking.paymentsDetails[0].date.split(
                                                'T',
                                              )[0]
                                            }
                                          </small>
                                        </div>
                                        {booking?.dateCancelBook && (
                                          <div className='reason-manage-booking'>
                                            <small className='title-reason-manage-booking'>
                                              Date Cancel:&nbsp;
                                            </small>
                                            <small>
                                              {
                                                booking?.dateCancelBook?.split(
                                                  'T',
                                                )[0]
                                              }
                                            </small>
                                          </div>
                                        )}
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Date Booking:&nbsp;
                                          </small>
                                          <small>
                                            {booking.dateBook.split('T')[0]}
                                          </small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Status:&nbsp;
                                          </small>
                                          <small>
                                            {booking.paymentsDetails[0]
                                              .isCancelPayment ? (
                                              <span>Cancelled</span>
                                            ) : booking.paymentsDetails[0]
                                                .isSuccess === false ? (
                                              <span>Not paid</span>
                                            ) : (
                                              <span>Already paid</span>
                                            )}
                                          </small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Method:&nbsp;
                                          </small>
                                          <small>
                                            {booking.paymentsDetails[0]
                                              .paymentMethod === 'PAYPAL' ? (
                                              <span>Online</span>
                                            ) : (
                                              <span>At Counter</span>
                                            )}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </Tab>
                                </Tabs>
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
                      <div
                        className='modal fade'
                        id={`checkIn-${booking.bookingID}`}
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='exampleModalLabel'
                              >
                                Payment Details
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <div className='main-modal-content-manage-booking'>
                                <div className='grid-container'>
                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Service Details
                                      </span>
                                    </div>
                                    {booking.servicesInBooking.map(
                                      (service, index) => (
                                        <div
                                          key={index}
                                          className='reason-manage-booking'
                                        >
                                          <small className='title-reason-manage-booking'>
                                            {service.name}:&nbsp;
                                          </small>
                                          <small>{service.price}$</small>
                                        </div>
                                      ),
                                    )}
                                  </div>

                                  <div className='mb-3'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Total Cost
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Total:&nbsp;
                                      </small>
                                      <small>{booking.totalPrice}$</small>
                                    </div>
                                  </div>

                                  <div className='mb-3'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Payment status
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Date:&nbsp;
                                      </small>
                                      <small>
                                        {
                                          booking.paymentsDetails[0].date.split(
                                            'T',
                                          )[0]
                                        }
                                      </small>
                                    </div>
                                    {booking?.dateCancelBook && (
                                      <div className='reason-manage-booking'>
                                        <small className='title-reason-manage-booking'>
                                          Date Cancel:&nbsp;
                                        </small>
                                        <small>
                                          {
                                            booking?.dateCancelBook?.split(
                                              'T',
                                            )[0]
                                          }
                                        </small>
                                      </div>
                                    )}
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Status:&nbsp;
                                      </small>
                                      <small>
                                        {booking.paymentsDetails[0]
                                          .isCancelPayment ? (
                                          <span>Cancelled</span>
                                        ) : booking.paymentsDetails[0]
                                            .isSuccess === false ? (
                                          <span>Not paid</span>
                                        ) : (
                                          <span>Already paid</span>
                                        )}
                                      </small>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Method:&nbsp;
                                      </small>
                                      <small>
                                        {booking.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL' ? (
                                          <span>Online</span>
                                        ) : (
                                          <span>At Counter</span>
                                        )}
                                      </small>
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
                              <button
                                type='button'
                                className='btn btn-success'
                                data-bs-dismiss='modal'
                                onClick={() => {
                                  if (booking.doctorID === '') {
                                    alert('Choose Doctor First');
                                    return;
                                  }
                                  handleConfirmCheckIn(booking.bookingID);
                                }}
                              >
                                Check In
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='modal fade'
                        id={`paymentModal-${booking.bookingID}`}
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='exampleModalLabel'
                              >
                                Payment Details
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <div className='main-modal-content-manage-booking'>
                                <div className='grid-container'>
                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Service Details
                                      </span>
                                    </div>
                                    {booking.servicesInBooking.map(
                                      (service, index) => (
                                        <div
                                          key={index}
                                          className='reason-manage-booking'
                                        >
                                          <small className='title-reason-manage-booking'>
                                            {service.name}:&nbsp;
                                          </small>
                                          <small>{service.price}$</small>
                                        </div>
                                      ),
                                    )}
                                  </div>

                                  <div className='mb-3'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Total Cost
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Total:&nbsp;
                                      </small>
                                      <small>{booking.totalPrice}$</small>
                                    </div>
                                  </div>

                                  <div className='mb-3'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Payment status
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Date:&nbsp;
                                      </small>
                                      <small>
                                        {
                                          booking.paymentsDetails[0].date.split(
                                            'T',
                                          )[0]
                                        }
                                      </small>
                                    </div>
                                    {booking?.dateCancelBook && (
                                      <div className='reason-manage-booking'>
                                        <small className='title-reason-manage-booking'>
                                          Date Cancel:&nbsp;
                                        </small>
                                        <small>
                                          {
                                            booking?.dateCancelBook?.split(
                                              'T',
                                            )[0]
                                          }
                                        </small>
                                      </div>
                                    )}
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Status:&nbsp;
                                      </small>
                                      <small>
                                        {booking.paymentsDetails[0]
                                          .isCancelPayment ? (
                                          <span>Cancelled</span>
                                        ) : booking.paymentsDetails[0]
                                            .isSuccess === false ? (
                                          <span>Not paid</span>
                                        ) : (
                                          <span>Already paid</span>
                                        )}
                                      </small>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Method:&nbsp;
                                      </small>
                                      <small>
                                        {booking.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL' ? (
                                          <span>Online</span>
                                        ) : (
                                          <span>At Counter</span>
                                        )}
                                      </small>
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
                              <button
                                type='button'
                                className='btn btn-success'
                                data-bs-dismiss='modal'
                                onClick={() => {
                                  if (booking.doctorID === '') {
                                    alert('Choose Doctor First');
                                    return;
                                  }
                                  handleConfirmPayment(booking.bookingID);
                                }}
                              >
                                Confirm Paid
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='modal fade'
                        id={`processCancel-${booking.bookingID}`}
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='exampleModalLabel'
                              >
                                Payment Details
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <div className='main-modal-content-manage-booking'>
                                <div className='grid-container'>
                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Service Details
                                      </span>
                                    </div>
                                    {booking.servicesInBooking.map(
                                      (service, index) => (
                                        <div
                                          key={index}
                                          className='reason-manage-booking'
                                        >
                                          <small className='title-reason-manage-booking'>
                                            {service.name}:&nbsp;
                                          </small>
                                          <small>{service.price}$</small>
                                        </div>
                                      ),
                                    )}
                                  </div>

                                  <div className='mb-1'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Total Cost
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Total:&nbsp;
                                      </small>
                                      <small>{booking.totalPrice}$</small>
                                    </div>
                                  </div>

                                  <div className='mb-1'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Payment status
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Date Paid:&nbsp;
                                      </small>
                                      <small>
                                        {
                                          booking.paymentsDetails[0].date.split(
                                            'T',
                                          )[0]
                                        }
                                      </small>
                                    </div>
                                    {booking?.dateCancelBook && (
                                      <div className='reason-manage-booking'>
                                        <small className='title-reason-manage-booking'>
                                          Date Cancel:&nbsp;
                                        </small>
                                        <small>
                                          {
                                            booking?.dateCancelBook?.split(
                                              'T',
                                            )[0]
                                          }
                                        </small>
                                      </div>
                                    )}
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Date Book:&nbsp;
                                      </small>
                                      <small>
                                        {booking.dateBook.split('T')[0]}
                                      </small>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Status:&nbsp;
                                      </small>
                                      <small>
                                        {booking.paymentsDetails[0]
                                          .isCancelPayment ? (
                                          <span>Cancelled</span>
                                        ) : booking.paymentsDetails[0]
                                            .isSuccess === false ? (
                                          <span>Not paid</span>
                                        ) : (
                                          <span>Already paid</span>
                                        )}
                                      </small>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Method:&nbsp;
                                      </small>
                                      <small>
                                        {booking.paymentsDetails[0]
                                          .paymentMethod === 'PAYPAL' ? (
                                          <span>Online</span>
                                        ) : (
                                          <span>At Counter</span>
                                        )}
                                      </small>
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
                              <button
                                type='button'
                                className='btn btn-danger'
                                data-bs-dismiss='modal'
                                onClick={() =>
                                  handleConfirmRefund(booking.bookingID)
                                }
                              >
                                Confirm Refund
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='no-booking-this-date'>
                    No Bookings This Day
                  </div>
                )}
              </div>
            </div>
            {currentBookings.length > 0 && totalPages > 1 && (
              <Stack
                spacing={2}
                alignItems='center'
                marginTop={3}
                marginBottom={12}
                padding={0}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant='outlined'
                  color='primary'
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageListBooking;
