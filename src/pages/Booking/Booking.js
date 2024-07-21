import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext';
import './Booking.css';
import Footer from '../../components/User/Footer/Footer.js';
import Header from '../../components/User/Header/Header.js';
import red from '../../assets/images/img_Booking/red_square.png';
import green from '../../assets/images/img_Booking/green_square.png';
import gray from '../../assets/images/img_Booking/gray-color-solid-background-1920x1080.png';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';
import { Checkbox, FormControlLabel } from '@mui/material';
import dayjs from 'dayjs';

const Booking = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { petID } = location.state || {};
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isDayOff, setIsDayOff] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [services, setServices] = useState([]);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessagePhone, setErrorMessagePhone] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageServices, setErrorMessageServices] = useState('');
  const [errorMessageDate, setErrorMessageDate] = useState('');
  const [errorMessageChooseSlot, setErrorMessageChooseSlot] = useState('');
  const [errorMessagePaymentMethod, setErrorMessagePaymentMethod] =
    useState('');
  const [userInfo, setUserInfo] = useState({
    name: user?.customerDetails[0]?.name || '',
    phone: user?.customerDetails[0]?.phone || '',
    email: user?.customerDetails[0]?.email || '',
    serviceID: '',
  });
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [vaccinationChecked, setVaccinationChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getAllServices = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/service/getAllServices`,
      );
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const getAllDoctors = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/doctor/getAllDoctors`,
      );
      const sortDoctor = response.data.sort((a,b) => a.name.localeCompare(b.name));
      setDoctors(sortDoctor);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    if (!petID) {
      alert('No pet selected. Please go back and select a pet.');
      navigate('/choose');
    }
  }, [petID, navigate]);

  const handleDoctorChange = e => {
    const newDoctorId = e.target.value;
    setSelectedDoctor(newDoctorId);
    updateAvailableSlots(newDoctorId, selectedDate);
  };

  const handleDateChange = e => {
    const newDate = e.target.value;
    const today = dayjs().startOf('day');
    const selected = dayjs(newDate);

    if (selected.isBefore(today)) {
      setErrorMessageDate('Date cannot be in the past');
      return;
    }
    setSelectedDate(newDate);
    updateAvailableSlots(selectedDoctor, newDate);
    setErrorMessageDate('');
  };

  const handlePaymentChange = event => {
    setPaymentMethod(event.target.value);
    setErrorMessagePaymentMethod('');
  };

  const handleSlotClick = slot => {
    if (!slot.isBooked) {
      setSelectedSlot(slot);
      setErrorMessageChooseSlot('');
    }
  };

  const updateAvailableSlots = (doctorID, date) => {
    if (date) {
      if (doctorID) {
        const doctor = doctors.find(doc => doc.doctorID === doctorID);
        const workingDay = doctor.workingHoursDetails.find(
          wh => wh.date.split('T')[0] === date,
        );
        if (workingDay) {
          setIsDayOff(workingDay.isOff);
          setAvailableSlots(generateSlots(doctor, date));
        } else {
          setIsDayOff(false);
          setAvailableSlots([]);
        }
      } else {
        setIsDayOff(false);
        setAvailableSlots(generateDefaultSlots());
      }
    } else {
      setAvailableSlots([]);
    }
  };

  const generateDefaultSlots = () => {
    const slots = [];
    const start = new Date('1970-01-01T08:00:00');
    const end = new Date('1970-01-01T17:00:00');

    for (
      let current = new Date(start);
      current < end;
      current = new Date(current.getTime() + 60 * 60 * 1000)
    ) {
      const next = new Date(current.getTime() + 60 * 60 * 1000);
      slots.push({
        startTime: new Date(current),
        endTime: new Date(next),
        isBooked: false,
        isWithinWorkingHours: true,
      });
    }
    return slots;
  };

  const generateSlots = (doctor, date) => {
    const slots = [];
    const workingDay = doctor.workingHoursDetails.find(
      wh => wh.date.split('T')[0] === date,
    );
    const start = new Date(`1970-01-01T08:00:00`);
    const end = new Date(`1970-01-01T17:00:00`);

    let workStart, workEnd;
    if (workingDay && !workingDay.isOff) {
      workStart = new Date(`1970-01-01T${workingDay.startTime}:00`);
      workEnd = new Date(`1970-01-01T${workingDay.endTime}:00`);
    } else {
      workStart = workEnd = null;
    }

    for (
      let current = new Date(start);
      current < end;
      current = new Date(current.getTime() + 60 * 60 * 1000)
    ) {
      const next = new Date(current.getTime() + 60 * 60 * 1000);

      let isBooked = false;
      let isWithinWorkingHours =
        workStart && workEnd && current >= workStart && next <= workEnd;

      if (doctor.matchingBookings) {
        isBooked = doctor.matchingBookings.some(
          booking =>
            new Date(`1970-01-01T${booking.startTime}:00`) <= current &&
            next <= new Date(`1970-01-01T${booking.endTime}:00`) &&
            booking.dateBook.split('T')[0] === date &&
            !booking.isCancel,
        );
      }

      slots.push({
        startTime: new Date(current),
        endTime: new Date(next),
        isBooked,
        isWithinWorkingHours,
      });
    }

    return slots;
  };

  const validateFields = () => {
    let valid = true;
    if (!userInfo.name) {
      setErrorMessageName('Name is required');
      valid = false;
    } else {
      setErrorMessageName('');
    }
    if (!userInfo.phone) {
      setErrorMessagePhone('Phone is required');
      valid = false;
    } else {
      setErrorMessagePhone('');
    }
    if (!userInfo.email) {
      setErrorMessageEmail('Email is required');
      valid = false;
    } else {
      setErrorMessageEmail('');
    }
    if (selectedServices.length === 0) {
      setErrorMessageServices('Service is required');
      valid = false;
    } else {
      setErrorMessageServices('');
    }
    if (paymentMethod === '') {
      setErrorMessagePaymentMethod('Payment is required');
      valid = false;
    } else {
      setErrorMessagePaymentMethod('');
    }
    return valid;
  };

  const handleBookingSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    if (!selectedDate) {
      return setErrorMessageDate('Choose date to book!!');
    }
    if (selectedSlot && selectedDate) {
      setLoading(true);
      const bookingData = {
        doctorID: selectedDoctor,
        dateBook: selectedDate,
        startTime: selectedSlot.startTime.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        endTime: selectedSlot.endTime.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        petID,
        paymentMethod: paymentMethod,
        services: selectedServices,
        totalPrice: totalAmount,
        customerID: user.accountID,
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        isCheckedVaccinate: vaccinationChecked,
      };
      try {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/booking`,
          {
            bookingData,
            idToCheckRole: user.accountID,
          },
        );
        if (paymentMethod === 'paypal') {
          const orderResponse = await axiosInstance.post(
            `${process.env.REACT_APP_API_URL}/paypal/create-order`,
            {
              bookingID: response.data.bookingID,
              amount: bookingData.totalPrice,
            },
          );
          window.location.href = orderResponse.data.url;
        } else {
          navigate(
            `/payment?bookingID=${response.data.bookingID}&status=success`,
          );
        }
      } catch (error) {
        alert('Error creating booking');
      }
    } else {
      setErrorMessageChooseSlot('Please choose slot to book!!!');
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case 'name':
        setErrorMessageName('');
        break;
      case 'phone':
        setErrorMessagePhone('');
        break;
      case 'email':
        setErrorMessageEmail('');
        break;
      case 'serviceID':
        setErrorMessageServices('');
        break;
      default:
        break;
    }
  };

  const handleFocusServices = () => {
    getAllServices();
  };

  const handleFocusDoctors = () => {
    getAllDoctors();
  };

  const handleAddService = () => {
    const selectedService = services.find(service => {
      return service.serviceID === userInfo.serviceID;
    });

    const isServiceAlreadySelected = selectedServices.some(
      service => service.serviceID === userInfo.serviceID,
    );

    if (!selectedService) {
      setErrorMessageServices('Please select a valid service.');
      return;
    }

    if (isServiceAlreadySelected) {
      setErrorMessageServices('This service has already been selected.');
      return;
    }

    if (selectedServices.length + 1 > 3) {
      setErrorMessageServices('Maximum 3 services in 1 slot');
      return;
    }

    setSelectedServices([...selectedServices, selectedService]);
    setErrorMessageServices('');
  };

  const handleRemoveService = serviceID => {
    const updatedServices = selectedServices.filter(
      service => service.serviceID !== serviceID,
    );
    setSelectedServices(updatedServices);
  };

  const totalAmount = selectedServices.reduce(
    (acc, service) => acc + service.price,
    0,
  );

  if (loading) {
    return <AnimationComponent />;
  }

  return (
    <div className='booking-container container-fluid'>
      <div className='div row'>
        <Header />
        <div className='book-title'>Book Appointment</div>
        <div className='main-booking-menu'>
          <div className='tittle-booking'>
            Please choose your desired service
          </div>

          <div className='select-booking'>
            <div className='select-booking_info'>
              <div className='patient_Input'>
                <div className='select_Name'>Name</div>
                <input
                  type='text'
                  className='name_input'
                  name='name'
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
                {errorMessageName && (
                  <div className='error-message'>{errorMessageName}</div>
                )}
              </div>
              <div className='patient_Input'>
                <div className='select_Name'>Phone</div>
                <input
                  type='text'
                  className='name_input'
                  name='phone'
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
                {errorMessagePhone && (
                  <div className='error-message'>{errorMessagePhone}</div>
                )}
              </div>
            </div>

            <div className='select-booking_info'>
              <div className='patient_Input'>
                <div className='select_Name'>E-Mail</div>
                <input
                  type='email'
                  className='name_input'
                  name='email'
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
                {errorMessageEmail && (
                  <div className='error-message'>{errorMessageEmail}</div>
                )}
              </div>
              <div className='patient_Input'>
                <div className='select_Name'>PetID</div>
                <input
                  type='text'
                  className='name_input'
                  value={petID || ''}
                  readOnly
                />
              </div>
            </div>

            <div className='select-booking_info'>
              <div className='select_Name'>Services</div>
              <div className='content-select-booking'>
                <div className='select_Service'>
                  <div className='select_Booking-Select'>
                    <select
                      name='serviceID'
                      className='select_Info-services'
                      value={userInfo.serviceID}
                      onChange={handleInputChange}
                      onFocus={handleFocusServices}
                      required
                    >
                      <option value=''>Choose Service:</option>
                      {services.map((service, index) => (
                        <option
                          key={index}
                          value={service.serviceID}
                        >
                          {`${service.name} - Price: ${service.price}`}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAddService}>Add Service</button>
                  </div>
                </div>
                {errorMessageServices && (
                  <div className='error-message'>{errorMessageServices}</div>
                )}
              </div>
              <div className='selected-services'>
                <div className='select_Name'>Selected Services:</div>
                <div className='content-selected-services-frame'>
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service, index) => (
                      <div
                        key={index}
                        className='service-item'
                      >
                        {service.name} - Price: {service.price}
                        <button
                          className='remove-service-button'
                          onClick={() => handleRemoveService(service.serviceID)}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className='sub-title-selected-services'>
                      No services selected.
                    </div>
                  )}
                  <h3 className='total-selected-services'>
                    Total Amount: {totalAmount}
                  </h3>
                </div>
              </div>
            </div>

            <div className='select-booking_info-date-doctor'>
              <div className='select_Date'>
                <div className='select_Name'>Date</div>
                <input
                  type='date'
                  className='select_Info'
                  value={selectedDate}
                  onChange={handleDateChange}
                  placeholder='Select a date'
                />
                {errorMessageDate && (
                  <div className='error-message'>{errorMessageDate}</div>
                )}
              </div>
              <div className='select_Doctors'>
                <div className='select_Name'>Doctors</div>
                <div className='select_Booking'>
                  <select
                    name='doctors'
                    className='select_Info'
                    onChange={handleDoctorChange}
                    onFocus={handleFocusDoctors}
                  >
                    <option value=''>Choose Doctor:</option>
                    {doctors.map((doctor, index) => (
                      <option
                        key={index}
                        value={doctor.doctorID}
                      >
                        {`${doctor.name}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='select-booking_info'>
              <div>
                <div className='select_Date'>
                  <div className='select_Name'>Payment</div>
                  <div className='select_Booking'>
                    <select
                      name='paymentMethod'
                      className='select_Info'
                      onChange={handlePaymentChange}
                    >
                      <option value=''>Select a payment method</option>
                      <option value='paypal'>PayPal</option>
                      <option value='counter'>Pay at Counter</option>
                    </select>
                  </div>
                </div>
                {errorMessagePaymentMethod && (
                  <div className='error-message error-message-choose'>
                    {errorMessagePaymentMethod}
                  </div>
                )}
              </div>
              <div className='checkBoxVaccineWrapper'>
                <FormControlLabel
                  sx={{ mt: 2 }}
                  control={
                    <Checkbox
                      checked={vaccinationChecked}
                      onChange={e => setVaccinationChecked(e.target.checked)}
                      color='success'
                    />
                  }
                  label='I want to get vaccinated'
                />
              </div>
            </div>
          </div>
          <div className='available-tittle'>
            <div className='available-tittle-text'>Available slots:</div>
            <div className='booked-slot'>
              <div className='booked-status'>Booked</div>
              <img
                className='square'
                src={red}
                alt='Booked'
              />
            </div>
            <div className='available-slot'>
              <div className='booked-status'>Available</div>
              <img
                className='square'
                src={green}
                alt='Available'
              />
            </div>
            <div className='available-slot'>
              <div className='booked-status'>Not Working</div>
              <img
                className='square-notWorking'
                src={gray}
                alt='Not Working'
              />
            </div>
          </div>

          <div className='booking-menu-wrapper'>
            <div className='booking-menu'>
              {isDayOff ? (
                <div className='day-off-message'>
                  The selected doctor is off on this day.
                </div>
              ) : availableSlots.length === 0 && !selectedDate ? (
                <div className='no-slots-message'>Choose date to book!!!</div>
              ) : availableSlots.length === 0 && selectedDate ? (
                <div className='no-slots-message'>
                  Doctor not working this day!!!
                </div>
              ) : (
                availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`element-button ${
                      slot.isBooked
                        ? 'element-button-red'
                        : slot.isWithinWorkingHours
                          ? selectedSlot === slot
                            ? 'element-button-selected'
                            : 'element-button-green'
                          : 'element-button-gray'
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    <div className='booking-select_time'>
                      {slot.startTime.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}{' '}
                      -{' '}
                      {slot.endTime.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
            {errorMessageChooseSlot && (
              <div className='error-message error-message-choose'>
                {errorMessageChooseSlot}
              </div>
            )}
          </div>

          <div className='booking-pay-money'>
            <div className='booking-pay-money-desc'>
              <div className='booking-pay-money-text'>PAYABLE AMOUNT : $</div>
              <div className='booking-pay-money-price'>{totalAmount}</div>
            </div>
          </div>

          <button
            className='CONFIRM-BOOK'
            type='submit'
            onClick={handleBookingSubmit}
          >
            <div className='BOOKING-NOW'>Confirm Booking</div>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Booking;
