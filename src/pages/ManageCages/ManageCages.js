import './ManageCages.css';
import { useEffect, useState } from 'react';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import axiosInstance from '../../utils/axiosInstance';
import { Slider } from '@mui/material';

function ManageCages() {
  const [searchBookingIDValue, setSearchBookingValue] = useState('');
  const [bookingSearchResult, setBookingSearchResult] = useState({});
  const [paymentUpdatePrice, setPaymentUpdatePrice] = useState({});
  const [sliderValue, setSliderValue] = useState(1);
  const [petCondition, setPetCondition] = useState('NotRecover');
  const [petInfoStatus, setPetInfoStatus] = useState('');
  const [allDoctorsWorkingHours, setAllDoctorsWorkingHours] = useState([]);
  const [reasonForAdmission, setReasonForAdmission] = useState('');
  const [chosenDoctor, setChosenDoctor] = useState('');
  const [activeTab, setActiveTab] = useState('Profile');
  const [cageData, setCageData] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [errors, setErrors] = useState({
    chosenDoctor: '',
    bookingResult: '',
  });

  useEffect(() => {
    const handleGetAllCages = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/cage/getAllCages`,
        );
        setCageData(response.data);
      } catch (error) {
        console.error('Error fetching cages:', error);
      }
    };
    handleGetAllCages();
  }, []);

  const handleSearchBooking = async () => {
    if (searchBookingIDValue === '') {
      setBookingSearchResult({});
      return;
    }
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/booking/getBookingID/${searchBookingIDValue}`,
      );
      if (response.data.length !== 0) {
        setErrors(prev => ({ ...prev, bookingResult: '' }));
        setPaymentUpdatePrice(response.data[0].paymentDetails[0]);
        setBookingSearchResult(response.data[0]);
      } else {
        setPaymentUpdatePrice({});
        setBookingSearchResult({});
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleGetAllDoctors = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/doctor/getAllDoctors`,
      );
      setAllDoctorsWorkingHours(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const payUpdateByPaymentID = async paymentID => {
    try {
      const response = await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/payment/updatePaymentByID`,
        { paymentID },
      );
      setPaymentUpdatePrice(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDoctorChange = event => {
    setChosenDoctor(event.target.value);
    setErrors(prev => ({ ...prev, chosenDoctor: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!chosenDoctor) newErrors.chosenDoctor = 'Choose doctor to care';
    if (Object.keys(bookingSearchResult).length === 0)
      newErrors.bookingResult = 'Search valid bookingID';
    if (bookingSearchResult?.paymentDetails[0]?.isCancelPayment)
      newErrors.cancelPayment =
        'Your payment is cancelled. Can not add pet to cages!!!';
    if (bookingSearchResult.isCancel)
      newErrors.cancelBooking =
        'Your booking is cancelled. Can not add pet to cages!!!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!validateForm()) return;
    const formData = {
      bookingID: searchBookingIDValue,
      reasonForAdmission: reasonForAdmission,
      cageID: selectedCage.cageID,
      doctorID: chosenDoctor,
    };
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/cage/addPetToCage`,
        { formData },
      );

      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/cage/getAllCages`,
      );
      setCageData(response.data);
    } catch (error) {
      console.error('Error fetching cage:', error);
    }
    resetForm();
    document.querySelector('#exampleModal .btn-close').click();
  };

  const resetForm = () => {
    setBookingSearchResult([]);
    setSearchBookingValue('');
    setReasonForAdmission('');
    setChosenDoctor('');
    setErrors({});
    document.getElementById('addPetForm').reset();
  };

  const openTab = tabName => {
    setActiveTab(tabName);
  };

  const resetFormUpdate = () => {
    setPetCondition('NotRecover');
    setSliderValue(1);
    setPetInfoStatus('');
  };

  const handleSubmitUpdate = async (e, cage) => {
    e.preventDefault();
    const infoPetUpdate = e.target['update-info-of-pet'].value;
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/cage/updateCageInfo`,
        {
          cageDiseaseID: cage.cageDiseaseDetails.cageDiseaseID,
          statusPet: petCondition,
          petCondition: sliderValue,
          textPetInfo: infoPetUpdate,
        },
      );

      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/cage/getAllCages`,
      );
      setCageData(response.data);
    } catch (error) {
      console.error('Error fetching cage:', error);
    }

    resetFormUpdate();
    document.querySelector(`#update_status_${cage.cageID} .btn-close`).click();
  };

  const handleStatusFilterChange = event => {
    setStatusFilter(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      if (newValue === 5) {
        setPetCondition('Recover');
      } else {
        setPetCondition('NotRecover');
      }
    }
  };

  const handleRadioChange = event => {
    if (event.target.value === 'Recover') {
      setSliderValue(5);
    } else if (event.target.value === 'Not Recover') {
      setSliderValue(1);
    }
    setPetCondition(event.target.value);
  };

  useEffect(() => {
    if (petCondition === 'Recover') {
      setSliderValue(5);
    } else {
      setSliderValue(1);
    }
  }, [petCondition]);

  function petStatus(value) {
    switch (value) {
      case 1:
        return 'Critical';
      case 2:
        return 'Severe';
      case 3:
        return 'Moderate';
      case 4:
        return 'Mild';
      case 5:
        return 'Healthy';
      default:
        return '';
    }
  }

  const filteredCageData = cageData.filter(cage => {
    if (statusFilter === 'All') return true;
    const status = cage.isEmpty ? 'Empty' : 'Using';
    return status === statusFilter;
  });

  return (
    <div className='manage-cages container-fluid'>
      <div className='row'>
        <HeaderManager />
        <div className='manage-cages-title'>
          <div className='manage-cages-title-text'>
            Pet Health Care - Manage Cages
          </div>
        </div>
        <div className='manage-cages-content'>
          <Sidebar />
          <div className='manage-booking-main-content'>
            <div className='main-content-header'>
              <div className='main-content-header-search'>
                <div className='main-content-header-search-title'>
                  Search Cage Number
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

                <div className='filter-cage-number'>
                  Status:&nbsp;
                  <select
                    className='Status-Select-Filter'
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                  >
                    <option value='All'>All</option>
                    <option value='Using'>Using</option>
                    <option value='Empty'>Empty</option>
                  </select>
                </div>
              </div>
              <div className='main-content-header-add-booking'>
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
                            Add Pet To Cage
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
                          <div className='search-owner-option-section'>
                            <label>Cage ID:</label>
                            <div>{selectedCage?.cageID}</div>
                          </div>
                          <div className='search-owner-option-section'>
                            <label>Cage name:</label>
                            <div>{selectedCage?.name}</div>
                          </div>
                          <div className='search-owner-option-section'>
                            <label>Search BookingID:</label>
                            <input
                              type='text'
                              id='searchBookingID'
                              value={searchBookingIDValue}
                              onChange={e => {
                                setSearchBookingValue(e.target.value);
                                setErrors(prev => ({
                                  ...prev,
                                  bookingResult: '',
                                  cancelPayment: '',
                                  cancelBooking: '',
                                }));
                              }}
                              required
                            />
                            <div
                              className='manage-cage-search-button'
                              onClick={handleSearchBooking}
                            >
                              Search
                            </div>
                            {errors.bookingResult && (
                              <span className='error'>
                                {errors.bookingResult}
                              </span>
                            )}
                          </div>
                          <div className='search-owner-option-section'>
                            {Object.keys(bookingSearchResult).length > 0 ? (
                              bookingSearchResult.paymentDetails[0]
                                .isCancelPayment ? (
                                <div>Cancel payment</div>
                              ) : bookingSearchResult.isCancel ? (
                                <div>Cancel Booking</div>
                              ) : (
                                <div>
                                  <div>
                                    <div>
                                      <span>Name:&nbsp;</span>
                                      <span>{bookingSearchResult.name}</span>
                                    </div>
                                    <div>
                                      <span>Phone:&nbsp;</span>
                                      <span>{bookingSearchResult.phone}</span>
                                    </div>
                                    <div>
                                      <span>Email:&nbsp;</span>
                                      <span>{bookingSearchResult.email}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span>Payment Status:&nbsp;</span>
                                      <span>
                                        {paymentUpdatePrice.isSuccess ? (
                                          <div>Already paid</div>
                                        ) : (
                                          <span>Not paid</span>
                                        )}
                                      </span>
                                    </div>
                                    {paymentUpdatePrice.isSuccess ? (
                                      <div></div>
                                    ) : (
                                      <div>
                                        <span>TotalPrice:&nbsp;</span>
                                        <span>
                                          {paymentUpdatePrice.totalPrice}
                                        </span>
                                        <div
                                          onClick={() =>
                                            payUpdateByPaymentID(
                                              paymentUpdatePrice.paymentID,
                                            )
                                          }
                                        >
                                          Pay
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            ) : (
                              <div>No Data Found</div>
                            )}
                          </div>
                          <div className='modal-body-section-wrapper'>
                            <div>
                              <div className='modal-body-section-doctor-date'>
                                <label>Doctor:</label>
                                <div id='veterinarian'>
                                  {allDoctorsWorkingHours ? (
                                    allDoctorsWorkingHours.map(
                                      (doctor, index) => {
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
                                      },
                                    )
                                  ) : (
                                    <div className='choose-Doctor-Not-Found'>
                                      No available doctors
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
                          <div className='search-owner-option-section'>
                            <label>Reason for admission:</label>
                            <input
                              type='text'
                              id='reasonForAdmission'
                              value={reasonForAdmission}
                              onChange={e => {
                                setReasonForAdmission(e.target.value);
                              }}
                              required
                            />
                          </div>

                          {errors.cancelPayment && (
                            <span className='error'>
                              {errors.cancelPayment}
                            </span>
                          )}
                          {errors.cancelBooking && (
                            <span className='error'>
                              {errors.cancelBooking}
                            </span>
                          )}
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
                <div className='main-content-list-title-text'>CageID</div>
                <div className='main-content-list-title-text'>Cage Name</div>
                <div className='main-content-list-title-text'>Description</div>
                <div className='main-content-list-title-text'>Status</div>
                <div className='main-content-list-title-text-button'>
                  Details
                </div>
                <div className='main-content-list-title-text-button'>
                  Update
                </div>
              </div>

              {filteredCageData.map(cage => (
                <div
                  className='main-content-list-body-wrapper'
                  key={cage.cageID}
                >
                  <div className='content-list-body-info'>
                    <div className='content-list-body-value'>{cage.cageID}</div>
                    <div className='content-list-body-value'>{cage.name}</div>
                    <div className='content-list-body-value'>
                      {cage.description}
                    </div>
                    <div
                      className={`content-list-body-value ${cage.isEmpty === false ? 'status-using' : 'status-empty'}`}
                    >
                      {cage.isEmpty ? <span>Empty</span> : <span>Using</span>}
                    </div>
                    <div className='content-list-body-value-button'>
                      {!cage.isEmpty && (
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target={`#more_info_${cage.cageID}`}
                          onClick={() => setSelectedCage(cage)}
                        >
                          More Details
                        </button>
                      )}
                    </div>

                    <div
                      className='modal fade'
                      id={`more_info_${cage.cageID}`}
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
                            <div className='container-modal-body-more-info'>
                              <div className='tab-modal-body-more-info'>
                                <button
                                  className={`tablinks ${activeTab === 'Profile' ? 'active' : ''}`}
                                  onClick={() => openTab('Profile')}
                                >
                                  Customer Profile
                                </button>
                                <button
                                  className={`tablinks ${activeTab === 'Vacancies' ? 'active' : ''}`}
                                  onClick={() => openTab('Vacancies')}
                                >
                                  Pet
                                </button>
                                <button
                                  className={`tablinks ${activeTab === 'More' ? 'active' : ''}`}
                                  onClick={() => openTab('More')}
                                >
                                  More
                                </button>
                              </div>

                              <div
                                id='profile-customer'
                                className='tabcontent-customer'
                                style={{
                                  display:
                                    activeTab === 'Profile' ? 'flex' : 'none',
                                }}
                              >
                                <form className='profile-form'>
                                  <div className='form-group'>
                                    <div className='sub-title-profile'>
                                      Name:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-customer'
                                      name='name'
                                      value={
                                        selectedCage?.customerDetails[0]
                                          ?.name || ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile'>
                                      Email:
                                    </div>
                                    <input
                                      type='email'
                                      className='edit-customer'
                                      name='email'
                                      value={
                                        selectedCage?.customerDetails[0]
                                          ?.email || ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile'>
                                      Phone:
                                    </div>
                                    <input
                                      type='tel'
                                      className='edit-customer'
                                      name='phone'
                                      value={
                                        selectedCage?.customerDetails[0]
                                          ?.phone || ''
                                      }
                                      readOnly
                                    />
                                  </div>
                                </form>
                              </div>

                              <div
                                id='Vacancies'
                                className='tabcontent-pet'
                                style={{
                                  display:
                                    activeTab === 'Vacancies' ? 'flex' : 'none',
                                }}
                              >
                                <form className='pet-profile-form'>
                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Name:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='name'
                                      value={
                                        selectedCage?.petDetails[0]?.name || ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Breed:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='breed'
                                      value={
                                        selectedCage?.petDetails[0]?.breed || ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Birthday:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='species'
                                      value={
                                        selectedCage?.petDetails[0]?.birthday.split(
                                          'T',
                                        )[0] || ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Gender:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='gender'
                                      value={
                                        selectedCage?.petDetails[0]?.gender.toLowerCase() ||
                                        ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Pet type:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='in-cage'
                                      value={
                                        selectedCage?.petDetails[0]?.petType.toLowerCase() ||
                                        ''
                                      }
                                      readOnly
                                    />
                                  </div>
                                </form>
                              </div>

                              <div
                                id='More'
                                className='tabcontent-pet-more'
                                style={{
                                  display:
                                    activeTab === 'More' ? 'flex' : 'none',
                                }}
                              >
                                <form className='pet-profile-form'>
                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Doctor:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='doctor'
                                      value={
                                        selectedCage?.doctorDetailCage[0]
                                          ?.name || ''
                                      }
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Cage Number:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='cageNumber'
                                      value={selectedCage?.cageID || ''}
                                      readOnly
                                    />
                                  </div>
                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Admission Time:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='admissionTime'
                                      value={
                                        selectedCage?.cageDiseaseDetails?.startDate.split(
                                          'T',
                                        )[0] || ''
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Reason for admission:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='admissionTime'
                                      value={
                                        selectedCage?.cageDiseaseDetails
                                          ?.reasonForAdmission || ''
                                      }
                                      readOnly
                                    />
                                  </div>
                                </form>
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
                              className='btn btn-primary'
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='content-list-body-value-button'>
                      {cage.isEmpty ? (
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-bs-toggle='modal'
                          data-bs-target='#exampleModal'
                          onClick={() => {
                            handleGetAllDoctors();
                            setSelectedCage(cage);
                          }}
                        >
                          Add Pet
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target={`#update_status_${cage.cageID}`}
                          onClick={() => setSelectedCage(cage)}
                        >
                          Update
                        </button>
                      )}
                    </div>
                    <div
                      className='modal fade'
                      id={`update_status_${cage.cageID}`}
                      aria-labelledby='exampleModalLabel'
                      aria-hidden='true'
                    >
                      <div className='modal-dialog'>
                        <form onSubmit={e => handleSubmitUpdate(e, cage)}>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id='exampleModalLabel'
                              >
                                Update Status
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <div className='modal-body-update-status'>
                                <div className='modal-body-update-status-title'>
                                  Status of pet:
                                </div>
                                <div className='modal-body-update-status-empty'>
                                  <input
                                    type='radio'
                                    id='NotRecover'
                                    name='status-of-pet'
                                    value='NotRecover'
                                    checked={petCondition === 'NotRecover'}
                                    onChange={handleRadioChange}
                                  />
                                  <div className='modal-body-update-status-empty-text'>
                                    Not Recover
                                  </div>
                                </div>
                                <div className='modal-body-update-status-using'>
                                  <input
                                    type='radio'
                                    id='Recover'
                                    name='status-of-pet'
                                    value='Recover'
                                    checked={petCondition === 'Recover'}
                                    onChange={handleRadioChange}
                                  />
                                  <div className='modal-body-update-status-using-text'>
                                    Recover
                                  </div>
                                </div>
                              </div>
                              <div className='modal-body-update-text'>
                                <div className='modal-body-update-text-title'>
                                  Pet Condition:
                                </div>
                                <Slider
                                  aria-label='Pet Health Status'
                                  value={sliderValue}
                                  onChange={handleSliderChange}
                                  getAriaValueText={petStatus}
                                  valueLabelDisplay='auto'
                                  step={1}
                                  marks={[
                                    { value: 1, label: 'Critical' },
                                    { value: 2, label: 'Mild' },
                                    { value: 3, label: 'Moderate' },
                                    { value: 4, label: 'Severe' },
                                    { value: 5, label: 'Healthy' },
                                  ]}
                                  min={1}
                                  max={5}
                                />
                              </div>
                              <div className='modal-body-update-text'>
                                <div className='modal-body-update-text-title'>
                                  Update Info Of Pet:
                                </div>
                                <div className='modal-body-update-text-info'>
                                  <div className='mb-3'>
                                    <textarea
                                      className='form-control'
                                      rows='3'
                                      name='update-info-of-pet'
                                      value={petInfoStatus}
                                      onChange={e =>
                                        setPetInfoStatus(e.target.value)
                                      }
                                      required
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-secondary'
                                data-bs-dismiss='modal'
                                onClick={resetFormUpdate}
                              >
                                Close
                              </button>
                              <button
                                type='submit'
                                className='btn btn-primary'
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default ManageCages;
