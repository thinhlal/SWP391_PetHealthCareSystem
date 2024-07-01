import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
import axiosInstance from '../../utils/axiosInstance';

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
      console.log(chosenDoctor);
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
      console.log(newBookingAndNewCustomer);
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
        .sort((a, b) => b.startTime.localeCompare(a.startTime))
    : allBookings;

  const handleConfirmPayment = bookingID => {
    setAllBookings(
      allBookings.map(booking => {
        if (booking.bookingID === bookingID) {
          return { ...booking, isCheckIn: true };
        } else {
          return booking;
        }
      }),
    );
  };

  const getStatusClass = (isCheckIn, isCancel) => {
    if (isCancel) {
      return 'status-cancel';
    }
    if (isCheckIn) {
      return 'status-checked-in';
    } else if (!isCheckIn) {
      return 'status-waiting';
    }
    return '';
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
                                  <div onClick={handleSearchCustomer}>
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
                                    <div onClick={handleSearchPet}>Search</div>
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
                              {services &&
                                services.map((service, index) => (
                                  <div
                                    key={index}
                                    className='service'
                                  >
                                    <label>Service:</label>
                                    <select
                                      value={service.service}
                                      onChange={e =>
                                        handleServiceChange(
                                          index,
                                          'service',
                                          e.target.value,
                                        )
                                      }
                                      required
                                    >
                                      <option value=''>Choose Services</option>
                                      {allServices &&
                                        allServices.map(service => (
                                          <option
                                            key={service.serviceID}
                                            value={service.serviceID}
                                          >
                                            {`${service.name} - ${service.price}$`}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                ))}
                              <div
                                className='btn-add-services'
                                onClick={addService}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  fill='currentColor'
                                  className='bi bi-plus'
                                  viewBox='0 0 16 16'
                                >
                                  <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
                                </svg>
                                <div>Add service</div>
                              </div>
                              {errors.services && (
                                <span className='error'>{errors.services}</span>
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
                <div className='main-content-list-title-text'>Service</div>
                <div className='main-content-list-title-text'>Doctor</div>
                <div className='main-content-list-title-text'>Status</div>{' '}
                <div className='main-content-list-title-text'>View</div>
                <div className='main-content-list-title-text'>Payment</div>{' '}
              </div>
              <div className='main-content-list-body-wrapper'>
                {filteredBookings.length !== 0 ? (
                  filteredBookings.map(booking => (
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
                        <div className='text-content'>
                          {booking.servicesDetails &&
                            booking.servicesDetails
                              .map(service => service.name)
                              .join(', ')}
                        </div>
                      </div>
                      <div className='content-list-body-value'>
                        {booking.doctorDetails.length !== 0 ? (
                          booking.doctorDetails[0].name
                        ) : (
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-toggle='modal'
                            data-bs-target={`#chooseDoctorModal-${booking.bookingID}`}
                            onClick={getAllDoctors}
                          >
                            Choose
                          </button>
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
                          className={getStatusClass(
                            booking.isCheckIn,
                            booking.isCancel,
                          )}
                        >
                          {booking.isCancel ? (
                            <span>Cancel</span>
                          ) : booking.isCheckIn ? (
                            <span>Checked In</span>
                          ) : (
                            <span>Waiting</span>
                          )}
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

                      {/* Payment Button */}
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

                      {/* Modal for more info */}
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
                                <i
                                  className='fa fa-close close'
                                  data-dismiss='modal'
                                ></i>

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

                                  <div className='mb-3'>
                                    <hr className='new1' />
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

                                  <div className='mb-3'>
                                    <hr className='new1' />
                                  </div>

                                  <div className='content-modal-manage-booking'>
                                    <div className='reason-manage-booking'>
                                      <span className='font-weight-bold'>
                                        Service Information
                                      </span>
                                    </div>
                                    <div className='reason-manage-booking'>
                                      <small className='title-reason-manage-booking'>
                                        Service:&nbsp;
                                      </small>
                                      <small>
                                        {booking.servicesDetails &&
                                          booking.servicesDetails
                                            .map(service => service.name)
                                            .join(', ')}
                                      </small>
                                    </div>
                                  </div>

                                  <div className='mb-3'>
                                    <hr className='new1' />
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

                      {/* Modal for Payment */}
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
                                    {booking.servicesDetails.map(
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
                                        Trạng thái thanh toán
                                      </span>
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
                                className='btn btn-success'
                                onClick={() =>
                                  handleConfirmPayment(booking.bookingID)
                                }
                              >
                                Xác nhận đã thanh toán
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No Bookings This Day</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='pagination_wrapper'>
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
              <li
                className='page-item active'
                aria-current='page'
              >
                <a
                  className='page-link'
                  href='#123'
                >
                  1
                </a>
              </li>
              <li className='page-item'>
                <a
                  className='page-link'
                  href='#123'
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
                  href='#123'
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ManageListBooking;
