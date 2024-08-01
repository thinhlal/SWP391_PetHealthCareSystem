import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../../utils/axiosInstance.js';
import './ManageDoctorBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import dayjs from 'dayjs';
import {
  Modal,
  Button,
  Tabs,
  Tab,
  Dropdown,
  DropdownButton,
  Form,
} from 'react-bootstrap';

const DoctorSchedule = () => {
  const navigate = useNavigate(); 
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalBookingDetails, setModalBookingDetails] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    getAllDoctors();
    getAllBookings();
  }, []);

  const getAllDoctors = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/doctor/getAllDoctors`,
      );
      const sortedDoctors = response.data.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      setDoctors(sortedDoctors);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const getAllBookings = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/booking/getAllBookings`,
      );
      setBookings(response.data.allBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDoctorSelect = doctor => {
    setSelectedDoctor(doctor);
    updateAvailableSlots(doctor, selectedDate);
  };

  const handleDateChange = e => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (selectedDoctor) {
      updateAvailableSlots(selectedDoctor, newDate);
    }
  };

  const handleSlotClick = slot => {
    if (!slot.isBooked && slot.isWithinWorkingHours && !slot.isPast) {
      const bookingDetails = bookings.find(
        booking =>
          new Date(`${selectedDate}T${booking.startTime}:00`) <=
            slot.startTime &&
          slot.endTime <= new Date(`${selectedDate}T${booking.endTime}:00`) &&
          booking.dateBook.split('T')[0] === selectedDate &&
          !booking.isCancel,
      );
      setModalBookingDetails(bookingDetails);
      setShowModal(true);
    }
  };

  const updateAvailableSlots = (doctor, date) => {
    const workingDay = doctor.workingHoursDetails.find(
      wh => wh.date.split('T')[0] === date,
    );
    if (workingDay && !workingDay.isOff) {
      setAvailableSlots(generateSlots(doctor, date, workingDay));
    } else {
      setAvailableSlots([]);
    }
  };

  const generateSlots = (doctor, date, workingDay) => {
    const slots = [];
    const start = new Date(`${date}T${workingDay.startTime}:00`);
    const end = new Date(`${date}T${workingDay.endTime}:00`);
    const now = new Date();

    for (
      let current = new Date(start);
      current < end;
      current = new Date(current.getTime() + 60 * 60 * 1000)
    ) {
      const next = new Date(current.getTime() + 60 * 60 * 1000);
      let isBooked = false;

      if (doctor.matchingBookings) {
        isBooked = doctor.matchingBookings.some(
          booking =>
            new Date(`${date}T${booking.startTime}:00`) <= current &&
            next <= new Date(`${date}T${booking.endTime}:00`) &&
            booking.dateBook.split('T')[0] === date &&
            !booking.isCancel,
        );
      }

      slots.push({
        startTime: current,
        endTime: next,
        isBooked,
        isWithinWorkingHours: true,
        isPast: next < now,
      });
    }

    return slots;
  };

  const filterBookings = () => {
    if (!selectedDoctor || !selectedDate) return [];
    return bookings.filter(
      booking =>
        booking.doctorID === selectedDoctor.doctorID &&
        booking.dateBook.split('T')[0] === selectedDate &&
        (statusFilter === 'all' || getStatus(booking) === statusFilter),
    );
  };

  const calculateDateLeft = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatus = booking => {
    if (booking.isCancel) return 'Cancelled';
    if (booking.paymentsDetails[0].isCancelPayment) return 'Payment Cancelled';
    if (!booking.paymentsDetails[0].isSuccess) return 'Not Paid';
    if (!booking.isCheckIn) return 'Pending';
    if (!booking.isCompleted) return 'Being Examined';
    return 'Done';
  };

  const getStatusClass = status => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'Being Examined':
        return 'BeingExamined';
      case 'Done':
        return 'Done';
      case 'Not Paid':
        return 'NotPaid';
      case 'Payment Cancelled':
        return 'PaymentCancelled';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  const handleStatusFilterChange = e => {
    setStatusFilter(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredBookings = filterBookings();

  return (
    <div className='manage-doctor-container'>
      <HeaderManager />
      <Button className='back-button' onClick={() => navigate(-1)}>Back</Button>
      <h1>Doctor Booking</h1>
      <DropdownButton
        id='dropdown-doctor-name'
        title={selectedDoctor ? selectedDoctor.name : 'Select Doctor'}
      >
        {doctors.map(doctor => (
          <Dropdown.Item
            className='dropdown-menu-doctor'
            key={doctor.doctorID}
            onClick={() => handleDoctorSelect(doctor)}
          >
            {doctor.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {selectedDoctor && (
        <div className='schedule-details'>
          <h2 className='title-working-hours'>
            Working Hours for {selectedDoctor.name}
          </h2>
          <div className='date-picker'>
            <label htmlFor='date'>Select Date: </label>
            <input
              type='date'
              id='date'
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <Form.Group controlId='statusFilter'>
            <Form.Label className='status-working-filter'>
              Status Filter
            </Form.Label>
            <Form.Control
              as='select'
              value={statusFilter}
              className='control-filter-status'
              onChange={handleStatusFilterChange}
            >
              <option value='all'>All</option>
              <option value='Pending'>Pending</option>
              <option value='Being Examined'>Being Examined</option>
              <option value='Done'>Done</option>
              <option value='Not Paid'>Not Paid</option>
              <option value='Payment Cancelled'>Payment Cancelled</option>
              <option value='Cancelled'>Cancelled</option>
            </Form.Control>
          </Form.Group>
          {availableSlots.length > 0 ? (
            <div className='slots-list'>
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`slot-item ${slot.isBooked ? 'booked' : ''}`}
                  onClick={() => handleSlotClick(slot)}
                >
                  <div>
                    <div className='title-working-time-slot'>Working Time</div>
                    <div className='slot-time'>
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
                  {slot.isBooked && (
                    <div className='bookings-list'>
                      {filteredBookings
                        .filter(
                          booking =>
                            new Date(
                              `${selectedDate}T${booking.startTime}:00`,
                            ) <= slot.startTime &&
                            slot.endTime <=
                              new Date(
                                `${selectedDate}T${booking.endTime}:00`,
                              ) &&
                            booking.dateBook.split('T')[0] === selectedDate,
                        )
                        .map((booking, bookingIndex) => (
                          <div
                            key={bookingIndex}
                            className='booking-item'
                            onClick={() => {
                              setModalBookingDetails(booking);
                              setShowModal(true);
                            }}
                          >
                            <div>Booking ID: {booking.bookingID}</div>
                            <div>Customer Name: {booking.name}</div>
                            <div>Pet Name: {booking.petDetails[0].name}</div>
                            <div className={`status ${getStatusClass(getStatus(booking))}`}>
                              Status: {getStatus(booking)}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='error-slot-text'>
              No available slots for this day
            </div>
          )}
        </div>
      )}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBookingDetails ? (
            <div>
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
                    <div className='content-modal-manage-booking-customer'>
                      <div className='reason-manage-booking'>
                        <span className='font-weight-bold'>
                          Customer Information
                        </span>
                      </div>
                      <div className='reason-manage-booking-customer'>
                        <small className='title-reason-manage-booking'>
                          CustomerID:&nbsp;
                        </small>
                        <small>{modalBookingDetails.accountID}</small>
                      </div>
                      <div className='reason-manage-booking-customer'>
                        <small className='title-reason-manage-booking'>
                          Name:&nbsp;
                        </small>
                        <small>{modalBookingDetails.name}</small>
                      </div>
                      <div className='reason-manage-booking-customer'>
                        <small className='title-reason-manage-booking'>
                          Phone:&nbsp;
                        </small>
                        <small>{modalBookingDetails.phone}</small>
                      </div>
                      <div className='reason-manage-booking-customer'>
                        <small className='title-reason-manage-booking'>
                          Email:&nbsp;
                        </small>
                        <small>{modalBookingDetails.email}</small>
                      </div>
                    </div>
                    <div className='content-modal-manage-booking-pet'>
                      <div className='reason-manage-booking'>
                        <span className='font-weight-bold'>
                          Pet Information
                        </span>
                      </div>
                      <div className='reason-manage-booking-pet'>
                        <small className='title-reason-manage-booking'>
                          Name:&nbsp;
                        </small>
                        <small>{modalBookingDetails.petDetails[0].name}</small>
                      </div>
                      <div className='reason-manage-booking-pet'>
                        <small className='title-reason-manage-booking'>
                          Type:&nbsp;
                        </small>
                        <small>
                          {modalBookingDetails.petDetails[0].petType}
                        </small>
                      </div>
                      <div className='reason-manage-booking-pet'>
                        <small className='title-reason-manage-booking-pet'>
                          Breed:&nbsp;
                        </small>
                        <small>{modalBookingDetails.petDetails[0].breed}</small>
                      </div>
                      <div className='reason-manage-booking-pet'>
                        <small className='title-reason-manage-booking'>
                          Gender:&nbsp;
                        </small>
                        <small>
                          {modalBookingDetails.petDetails[0].gender}
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
            
                    </div>
                    <div className='content-modal-manage-booking-service'>
                    {modalBookingDetails.servicesInBooking.map(
                        (service, index) => (
                          <div
                            key={index}
                            className='reason-manage-booking-service'
                          >
                            <small className='title-reason-manage-booking'>
                              {service.name}:&nbsp;
                            </small>
                            <small>{service.price}$</small>
                          </div>
                        ),
                      )}
                      <div className='reason-manage-booking-service'>
                        <span className='title-total-cost'>Total Cost</span>
                      </div>
                      <div className='reason-manage-booking-service'>
                        <small className='title-reason-manage-booking'>
                          Total:&nbsp;
                        </small>
                        <small>{modalBookingDetails.totalPrice}$</small>
                      </div>
                    </div>
                    <div className='content-modal-manage-booking-payment'>
                      <div className='reason-manage-booking'>
                        <span className='font-weight-bold'>Payment status</span>
                      </div>
                      <div className='reason-manage-booking-payment'>
                        <small className='title-reason-manage-booking'>
                          Date pay:&nbsp;
                        </small>
                        <small>
                          {
                            modalBookingDetails.paymentsDetails[0].date.split(
                              'T',
                            )[0]
                          }
                        </small>
                      </div>
                      {modalBookingDetails?.dateCancelBook && (
                        <div className='reason-manage-booking-payment'>
                          <small className='title-reason-manage-booking'>
                            Date Cancel:&nbsp;
                          </small>
                          <small>
                            {modalBookingDetails?.dateCancelBook?.split('T')[0]}
                          </small>
                        </div>
                      )}
                      <div className='reason-manage-booking-payment'>
                        <small className='title-reason-manage-booking'>
                          Date Booking:&nbsp;
                        </small>
                        <small>
                          {modalBookingDetails.dateBook.split('T')[0]}
                        </small>
                      </div>
                      {modalBookingDetails.isRefund &&
                      calculateDateLeft(
                        modalBookingDetails.dateCancelBook,
                        modalBookingDetails.dateBook,
                      ) >= 3 ? (
                        <div className='reason-manage-booking-payment'>
                          <small className='title-reason-manage-booking'>
                            Refund price:&nbsp;
                          </small>
                          <small>{modalBookingDetails.refundPrice}</small>
                        </div>
                      ) : null}
                      <div className='reason-manage-booking-payment'>
                        <small className='title-reason-manage-booking'>
                          Status:&nbsp;
                        </small>
                        <small>
                          {modalBookingDetails.paymentsDetails[0]
                            .isCancelPayment ? (
                            <span>Cancelled</span>
                          ) : modalBookingDetails.paymentsDetails[0]
                              .isSuccess === false ? (
                            <span>Not paid</span>
                          ) : (
                            <span>Already paid</span>
                          )}
                        </small>
                      </div>
                      <div className='reason-manage-booking-payment'>
                        <small className='title-reason-manage-booking'>
                          Method:&nbsp;
                        </small>
                        <small>
                          {modalBookingDetails.paymentsDetails[0]
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
          ) : (
            <div>No booking details available</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorSchedule;
