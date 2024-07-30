import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
import axiosInstance from '../../utils/axiosInstance';
import { Tab, Tabs } from 'react-bootstrap';
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Pagination,
  Stack,
} from '@mui/material';

function ManageListBooking() {
  const [allServices, setAllServices] = useState([]);
  const [search, setSearch] = useState('');
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
  const [bookingDetailsCheckIn, setBookingDetailsCheckIn] = useState(null);
  const [servicesWhileCheckIn, setServicesWhileCheckIn] = useState([]);
  const [serviceWhileCheckInFilter, setServiceWhileCheckInFilter] = useState(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [statusFilters, setStatusFilters] = useState({
    pending: false,
    beingExamined: false,
    cancel: false,
    done: false,
    expired: false,
  });
  const [isConfirmPayment, setIsConfirmPayment] = useState(false);

  useEffect(() => {
    const now = new Date();

    setFilterDate(now.toISOString().split('T')[0]);
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

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const services = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/service/getAllServices`,
        );
        setAllServices(services.data);
      } catch (error) {
        console.error('Err:', error);
      }
    };

    getAllServices();
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
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];

    if (field === 'service') {
      if (newServices.some(service => service.service === value)) {
        setErrors(prev => ({
          ...prev,
          services: 'This service is already selected',
        }));
        return;
      }

      const selectedService = allServices.find(
        service => service.serviceID === value,
      );
      const servicePrice = selectedService ? selectedService.price : 0;
      newServices[index] = {
        ...newServices[index],
        service: value,
        price: servicePrice,
      };
    } else {
      newServices[index][field] = value;
    }

    setServices(newServices);
    setErrors(prev => ({
      ...prev,
      services: '',
    }));
  };

  const handleServiceWhileCheckInChange = (index, field, value) => {
    const newServicesWhileCheckIn = [...servicesWhileCheckIn];

    if (field === 'service') {
      if (newServicesWhileCheckIn.some(service => service.service === value)) {
        setErrors(prev => ({
          ...prev,
          servicesWhileCheckIn: 'This service is already selected',
          alreadyChooseAllService: '',
        }));
        return;
      }

      const selectedService = serviceWhileCheckInFilter.find(
        service => service.serviceID === value,
      );
      const servicePrice = selectedService ? selectedService.price : 0;
      newServicesWhileCheckIn[index] = {
        ...newServicesWhileCheckIn[index],
        service: value,
        price: servicePrice,
      };
    } else {
      newServicesWhileCheckIn[index][field] = value;
    }

    setServicesWhileCheckIn(newServicesWhileCheckIn);
    setErrors(prev => ({
      ...prev,
      servicesWhileCheckIn: '',
      alreadyChooseAllService: '',
    }));
  };

  const addService = () => {
    if (services.length >= 3) {
      setErrors(prev => ({
        ...prev,
        services: 'You can only add up to 3 services.',
      }));
      return;
    }

    const newServices = allServices.filter(
      service => !services.some(s => s.service === service.serviceID),
    );

    if (newServices.length === 0) {
      setErrors(prev => ({
        ...prev,
        services: 'All services have been added.',
      }));
      return;
    }

    const defaultServiceID = newServices[0].serviceID;

    setServices([...services, { service: defaultServiceID }]);
    setErrors(prev => ({
      ...prev,
      services: '',
    }));
  };

  const addServiceWhileCheckIn = () => {
    if (servicesWhileCheckIn.length >= 3) {
      setErrors(prev => ({
        ...prev,
        servicesWhileCheckIn: 'You can only add up to 3 services.',
      }));
      return;
    }

    const newServices = allServices.filter(
      service =>
        !bookingDetailsCheckIn.servicesInBooking.some(
          s => s.serviceID === service.serviceID,
        ),
    );
    setServiceWhileCheckInFilter(newServices);
    let defaultServiceID = '';
    if (newServices.length > 0) {
      for (let service of newServices) {
        if (!servicesWhileCheckIn.some(s => s.service === service.serviceID)) {
          defaultServiceID = service.serviceID;
          break;
        }
      }
    }

    if (defaultServiceID === '' && newServices.length > 0) {
      setErrors(prev => ({
        ...prev,
        servicesWhileCheckIn: '',
        alreadyChooseAllService: 'You are already choose all service!!!',
      }));
      return;
    }
    const selectedService = newServices.find(
      service => service.serviceID === defaultServiceID,
    );
    const servicePrice = selectedService ? selectedService.price : 0;
    setServicesWhileCheckIn([
      ...servicesWhileCheckIn,
      { service: defaultServiceID, price: servicePrice },
    ]);
    setErrors(prev => ({
      ...prev,
      servicesWhileCheckIn: '',
      alreadyChooseAllService: '',
    }));
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
          const allBookingsInDay = doctor.matchingBookings.filter(
            booking => booking.dateBook.split('T')[0] === date,
          );
          const hasNoOverlap = allBookingsInDay.every(
            booking =>
              booking.isCancel ||
              booking.paymentDetails[0].isCancelPayment ||
              (endTime !== booking.endTime && startTime !== booking.startTime),
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
  const validateName = name =>
    /^[A-Za-z\s]+$/.test(name) && name.trim().length > 0;
  const validatePetName = petName =>
    /^[A-Za-z\s]+$/.test(petName) && petName.trim().length > 0;
  const validatePhone = phone => /^\d{10}$/.test(phone);
  const validateBreed = breed => /^[A-Za-z\s]+$/.test(breed);
  const validateBirthday = birthday => {
    const selectedDate = new Date(birthday);
    const currentDate = new Date();
    return selectedDate <= currentDate;
  };
  const validateFutureDate = date => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate >= currentDate;
  };

  const handleDateChange = e => {
    const value = e.target.value;
    if (!validateFutureDate(value)) {
      setErrors(prev => ({
        ...prev,
        selectedDate: 'Date cannot be in the past',
      }));
    } else {
      setSelectedDate(value);
      setErrors(prev => ({ ...prev, selectedDate: '' }));
    }
  };

  const handleChange = (field, value) => {
    const newAccountInfo = { ...createAccountInfo, [field]: value };
    setCreateAccountInfo(newAccountInfo);

    let error = '';

    switch (field) {
      case 'name':
        if (!validateName(value))
          error =
            'Cannot contain special characters and must have at least one word';
        break;
      case 'email':
        if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!validatePhone(value)) error = 'Phone number must be 10 digits';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handlePetChange = (field, value) => {
    let error = '';

    switch (field) {
      case 'name':
        if (!validatePetName(value)) {
          error =
            'Pet name cannot contain special characters and must have at least one word';
        }
        break;
      case 'breed':
        if (!validateBreed(value)) {
          error = 'Breed cannot contain special characters';
        }
        break;
      case 'birthday':
        if (!validateBirthday(value)) {
          error = 'Birthday cannot be in the future';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [`pet${field.charAt(0).toUpperCase() + field.slice(1)}`]: error,
    }));

    if (!error) {
      const newPetInfo = { ...createPetInfo, [field]: value };
      setCreatePetInfo(newPetInfo);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateForm()) return;

    if (accountOption === 'hasOwnerID') {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
    setLoading(true);
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/manageBooking/confirmPayment`,
        {
          bookingID,
          servicesWhileCheckIn,
        },
      );
      reRenderGetAllBookings();
    } catch (error) {
      console.error('Error cancelling booking', error);
    } finally {
      setLoading(false);
    }
    setIsConfirmPayment(false);
    setBookingDetailsCheckIn(null);
    setServicesWhileCheckIn([]);
  };

  const handleConfirmRefund = async bookingID => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCheckIn = async bookingID => {
    setLoading(true);
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/manageBooking/confirmCheckIn`,
        {
          bookingID,
          servicesWhileCheckIn,
        },
      );
      reRenderGetAllBookings();
    } catch (error) {
      console.error('Error Confirm Check In', error);
    } finally {
      setLoading(false);
    }
    setBookingDetailsCheckIn(null);
    setServicesWhileCheckIn([]);
  };

  const calculateDateLeft = (dateCancelBook, dateBook) => {
    const bookDate = new Date(dateBook);
    const cancelDate = new Date(dateCancelBook);

    const timeDifference = bookDate - cancelDate;
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
    setErrors(prev => ({
      ...prev,
      service: '',
      services: '',
      alreadyChooseAllService: '',
    }));
  };

  const removeServiceWhileCheckIn = index => {
    setServicesWhileCheckIn(servicesWhileCheckIn.filter((_, i) => i !== index));
    setErrors(prev => ({
      ...prev,
      servicesWhileCheckIn: '',
      alreadyChooseAllService: '',
    }));
  };

  const handleChangeConfirmPayment = event => {
    setIsConfirmPayment(event.target.checked);
  };

  const filteredBookingData = currentBookings.filter(booking => {
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
                !booking.isCheckIn &&
                !booking.isCompleted &&
                compareCurrentTimeWithEndTimeAndDateBook(
                  booking.endTime,
                  booking.dateBook,
                )
              ? 'pending'
              : !booking.paymentsDetails[0].isSuccess &&
                  booking.paymentsDetails[0].paymentMethod === 'COUNTER' &&
                  !booking.isCheckIn &&
                  !booking.isCompleted &&
                  compareCurrentTimeWithEndTimeAndDateBook(
                    booking.endTime,
                    booking.dateBook,
                  )
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
    <div className='manage-booking-list container-fluid'>
      {loading && (
        <div className='loading-overlay'>
          <CircularProgress />
        </div>
      )}
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
                    onChange={e => setSearch(e.target.value)}
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
              <div className='right-header-content'>
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
                    <li className='filter-dropdown'>
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
                    <li className='filter-dropdown'>
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
                    <li className='filter-dropdown'>
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
                    <li className='filter-dropdown'>
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
                    <li className='filter-dropdown'>
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
                  </ul>
                </div>
                <div className='main-content-header-add-booking'>
                  <button
                    type='button'
                    className='booking-btn-add'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={getAllDoctors}
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
                                    <div
                                      className='search-button'
                                      onClick={handleSearchCustomer}
                                    >
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
                                      <div
                                        className='search-button'
                                        onClick={handleSearchPet}
                                      >
                                        Search
                                      </div>
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
                                        onChange={e =>
                                          handleChange('name', e.target.value)
                                        }
                                        required
                                      />
                                      {errors.name && (
                                        <div className='error'>
                                          {errors.name}
                                        </div>
                                      )}
                                    </div>
                                    <div className='modal-body-section'>
                                      <label>Email:</label>
                                      <input
                                        type='email'
                                        value={createAccountInfo.email || ''}
                                        onChange={e =>
                                          handleChange('email', e.target.value)
                                        }
                                        required
                                      />
                                      {errors.email && (
                                        <div className='error'>
                                          {errors.email}
                                        </div>
                                      )}
                                    </div>
                                    <div className='modal-body-section'>
                                      <label>Phone:</label>
                                      <input
                                        type='text'
                                        value={createAccountInfo.phone || ''}
                                        onChange={e =>
                                          handleChange('phone', e.target.value)
                                        }
                                        required
                                      />
                                      {errors.phone && (
                                        <div className='error'>
                                          {errors.phone}
                                        </div>
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
                                          onChange={e =>
                                            handlePetChange(
                                              'name',
                                              e.target.value,
                                            )
                                          }
                                          required
                                        />
                                        {errors.petName && (
                                          <div className='error'>
                                            {errors.petName}
                                          </div>
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
                                          onChange={e =>
                                            handlePetChange(
                                              'breed',
                                              e.target.value,
                                            )
                                          }
                                          required
                                        />
                                        {errors.petBreed && (
                                          <div className='error'>
                                            {errors.petBreed}
                                          </div>
                                        )}
                                      </div>
                                      <div className='modal-body-section'>
                                        <label>Birthday:</label>
                                        <input
                                          type='date'
                                          value={createPetInfo.birthday || ''}
                                          onChange={e =>
                                            handlePetChange(
                                              'birthday',
                                              e.target.value,
                                            )
                                          }
                                          required
                                        />
                                        {errors.petBirthday && (
                                          <div className='error'>
                                            {errors.petBirthday}
                                          </div>
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
                                {services.length > 0 && (
                                  <table className='services-table'>
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
                                              onChange={e =>
                                                handleServiceChange(
                                                  index,
                                                  'service',
                                                  e.target.value,
                                                )
                                              }
                                            >
                                              {allServices.map(service => (
                                                <option
                                                  key={service.serviceID}
                                                  value={service.serviceID}
                                                >
                                                  {`${service.name} - ${service.price}$`}
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                          <td
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}
                                          >
                                            <button
                                              type='button'
                                              className='btn-remove-service'
                                              onClick={() =>
                                                removeService(index)
                                              }
                                            >
                                              Remove
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
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
                                  <span className='error'>
                                    {errors.services}
                                  </span>
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
                                    onChange={handleDateChange}
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
                {filteredBookingData.length !== 0 ? (
                  filteredBookingData.map(booking => (
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
                            booking.isCancel && !booking.isRefund
                              ? 'status-cancel'
                              : booking.isCancel && booking.isRefund
                                ? 'status-cancel'
                                : booking.paymentsDetails[0].isCancelPayment ||
                                    (!booking.paymentsDetails[0].isSuccess &&
                                      booking.paymentsDetails[0]
                                        .paymentMethod === 'PAYPAL')
                                  ? 'status-cancel'
                                  : booking.paymentsDetails[0].isSuccess &&
                                      booking.paymentsDetails[0]
                                        .paymentMethod === 'PAYPAL' &&
                                      !booking.isCheckIn &&
                                      !booking.isCompleted &&
                                      !compareCurrentTimeWithEndTimeAndDateBook(
                                        booking.endTime,
                                        booking.dateBook,
                                      )
                                    ? 'status-expired'
                                    : !booking.paymentsDetails[0].isSuccess &&
                                        booking.paymentsDetails[0]
                                          .paymentMethod === 'COUNTER' &&
                                        !booking.isCheckIn &&
                                        !booking.isCompleted &&
                                        !compareCurrentTimeWithEndTimeAndDateBook(
                                          booking.endTime,
                                          booking.dateBook,
                                        )
                                      ? 'status-expired'
                                      : booking.paymentsDetails[0].isSuccess &&
                                          booking.paymentsDetails[0]
                                            .paymentMethod === 'PAYPAL' &&
                                          !booking.isCheckIn &&
                                          !booking.isCompleted &&
                                          compareCurrentTimeWithEndTimeAndDateBook(
                                            booking.endTime,
                                            booking.dateBook,
                                          )
                                        ? 'status-waiting'
                                        : !booking.paymentsDetails[0]
                                              .isSuccess &&
                                            booking.paymentsDetails[0]
                                              .paymentMethod === 'COUNTER' &&
                                            !booking.isCheckIn &&
                                            !booking.isCompleted &&
                                            compareCurrentTimeWithEndTimeAndDateBook(
                                              booking.endTime,
                                              booking.dateBook,
                                            )
                                          ? 'status-waiting'
                                          : booking.paymentsDetails[0]
                                                .isSuccess &&
                                              booking.paymentsDetails[0]
                                                .paymentMethod === 'PAYPAL' &&
                                              booking.isCheckIn &&
                                              !booking.isCompleted
                                            ? 'status-waiting'
                                            : booking.paymentsDetails[0]
                                                  .isSuccess &&
                                                booking.paymentsDetails[0]
                                                  .paymentMethod ===
                                                  'COUNTER' &&
                                                booking.isCheckIn &&
                                                !booking.isCompleted
                                              ? 'status-waiting'
                                              : booking.paymentsDetails[0]
                                                    .isSuccess &&
                                                  booking.paymentsDetails[0]
                                                    .paymentMethod ===
                                                    'PAYPAL' &&
                                                  booking.isCheckIn &&
                                                  booking.isCompleted
                                                ? 'status-checked-in'
                                                : booking.paymentsDetails[0]
                                                      .isSuccess &&
                                                    booking.paymentsDetails[0]
                                                      .paymentMethod ===
                                                      'COUNTER' &&
                                                    booking.isCheckIn &&
                                                    booking.isCompleted
                                                  ? 'status-checked-in'
                                                  : null
                          }`}
                        >
                          {booking.isCancel && !booking.isRefund ? (
                            <span>Cancel Booking</span>
                          ) : booking.isCancel && booking.isRefund ? (
                            <span>Refunded</span>
                          ) : booking.paymentsDetails[0].isCancelPayment ||
                            (!booking.paymentsDetails[0].isSuccess &&
                              booking.paymentsDetails[0].paymentMethod ===
                                'PAYPAL') ? (
                            <span>Cancel Payment</span>
                          ) : booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            !booking.isCheckIn &&
                            !booking.isCompleted &&
                            !compareCurrentTimeWithEndTimeAndDateBook(
                              booking.endTime,
                              booking.dateBook,
                            ) ? (
                            <span>Expired Check In</span>
                          ) : !booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            !booking.isCheckIn &&
                            !booking.isCompleted &&
                            !compareCurrentTimeWithEndTimeAndDateBook(
                              booking.endTime,
                              booking.dateBook,
                            ) ? (
                            <span>Expired CheckIn</span>
                          ) : booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            !booking.isCheckIn &&
                            !booking.isCompleted &&
                            compareCurrentTimeWithEndTimeAndDateBook(
                              booking.endTime,
                              booking.dateBook,
                            ) ? (
                            <span>Pending</span>
                          ) : !booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            !booking.isCheckIn &&
                            !booking.isCompleted &&
                            compareCurrentTimeWithEndTimeAndDateBook(
                              booking.endTime,
                              booking.dateBook,
                            ) ? (
                            <span>Pending</span>
                          ) : booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            booking.isCheckIn &&
                            !booking.isCompleted ? (
                            <span>Being examined</span>
                          ) : booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            booking.isCheckIn &&
                            !booking.isCompleted ? (
                            <span>Being examined</span>
                          ) : booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'PAYPAL' &&
                            booking.isCheckIn &&
                            booking.isCompleted ? (
                            <span>Done</span>
                          ) : booking.paymentsDetails[0].isSuccess &&
                            booking.paymentsDetails[0].paymentMethod ===
                              'COUNTER' &&
                            booking.isCheckIn &&
                            booking.isCompleted ? (
                            <span>Done</span>
                          ) : (
                            <span>NULL</span>
                          )}
                        </span>
                      </div>

                      <div
                        className='content-list-body-value'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          padding: '0 5px',
                        }}
                      >
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
                        <div
                          className='content-list-body-value'
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0 5px',
                          }}
                        >
                          <button
                            type='button'
                            className='btn btn-danger'
                            data-bs-toggle='modal'
                            data-bs-target={`#processCancel-${booking.bookingID}`}
                          >
                            Refund
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
                        !booking.isCheckIn &&
                        compareCurrentTimeWithEndTimeAndDateBook(
                          booking.endTime,
                          booking.dateBook,
                        ) ? (
                        <div
                          className='content-list-body-value'
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0 5px',
                          }}
                        >
                          <button
                            type='button'
                            className='btn btn-success'
                            data-bs-toggle='modal'
                            data-bs-target={`#checkIn-${booking.bookingID}`}
                            onClick={() => {
                              if (booking.doctorID === '') {
                                alert('Choose Doctor First');
                                return;
                              }
                              setBookingDetailsCheckIn(booking);
                            }}
                          >
                            Check In
                          </button>
                        </div>
                      ) : !booking.isCancel &&
                        !booking.paymentsDetails[0].isSuccess &&
                        booking.paymentsDetails[0].paymentMethod ===
                          'COUNTER' &&
                        !booking.isCheckIn &&
                        compareCurrentTimeWithEndTimeAndDateBook(
                          booking.endTime,
                          booking.dateBook,
                        ) ? (
                        <div
                          className='content-list-body-value'
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0 5px',
                          }}
                        >
                          <button
                            type='button'
                            className='btn btn-success'
                            data-bs-toggle='modal'
                            data-bs-target={`#paymentModal-${booking.bookingID}`}
                            onClick={() => {
                              if (booking.doctorID === '') {
                                alert('Choose Doctor First');
                                return;
                              }
                              setBookingDetailsCheckIn(booking);
                            }}
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
                                            AccountID:&nbsp;
                                          </small>
                                          <small>{booking.accountID}</small>
                                        </div>
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            CustomerID:&nbsp;
                                          </small>
                                          <small>
                                            {
                                              booking.customerDetails[0]
                                                .customerID
                                            }
                                          </small>
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
                                            PetID:&nbsp;
                                          </small>
                                          <small>
                                            {booking.petDetails[0].petID}
                                          </small>
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
                                        {!booking?.paymentsDetails[0]
                                          ?.isCancelPayment &&
                                          booking?.paymentsDetails[0]
                                            ?.isSuccess && (
                                            <div className='reason-manage-booking'>
                                              <small className='title-reason-manage-booking'>
                                                Date pay:&nbsp;
                                              </small>
                                              <small>
                                                {new Date(
                                                  booking.paymentsDetails[0].date,
                                                ).toLocaleString()}
                                              </small>
                                            </div>
                                          )}
                                        {booking?.dateCancelBook && (
                                          <div className='reason-manage-booking'>
                                            <small className='title-reason-manage-booking'>
                                              Date Cancel:&nbsp;
                                            </small>
                                            <small>
                                              {new Date(
                                                booking?.dateCancelBook,
                                              ).toLocaleString()}
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
                                            Time:&nbsp;
                                          </small>
                                          <small>
                                            {`${booking.startTime}-${booking.endTime}`}
                                          </small>
                                        </div>
                                        {booking.isRefund &&
                                        calculateDateLeft(
                                          booking.dateCancelBook,
                                          booking.dateBook,
                                        ) >= 3 ? (
                                          <div className='reason-manage-booking'>
                                            <small className='title-reason-manage-booking'>
                                              Refund price:&nbsp;
                                            </small>
                                            <small>{booking.refundPrice}</small>
                                          </div>
                                        ) : null}
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
                                onClick={() => {
                                  setBookingDetailsCheckIn(null);
                                  setServicesWhileCheckIn([]);
                                }}
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
                                    {bookingDetailsCheckIn &&
                                      bookingDetailsCheckIn.servicesInBooking.map(
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
                                    <div className='reason-manage-booking'>
                                      {servicesWhileCheckIn.length > 0 ? (
                                        <table className='services-table'>
                                          <thead>
                                            <tr>
                                              <th>Service</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {servicesWhileCheckIn.map(
                                              (service, index) => (
                                                <tr key={index}>
                                                  <td>
                                                    <select
                                                      value={
                                                        service.service ||
                                                        serviceWhileCheckInFilter[0]
                                                          ?.serviceID
                                                      }
                                                      onChange={e =>
                                                        handleServiceWhileCheckInChange(
                                                          index,
                                                          'service',
                                                          e.target.value,
                                                        )
                                                      }
                                                      required
                                                    >
                                                      {serviceWhileCheckInFilter.map(
                                                        service => (
                                                          <option
                                                            key={
                                                              service.serviceID
                                                            }
                                                            value={
                                                              service.serviceID
                                                            }
                                                          >
                                                            {`${service.name} - ${service.price}$`}
                                                          </option>
                                                        ),
                                                      )}
                                                    </select>
                                                  </td>
                                                  <td
                                                    style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }}
                                                  >
                                                    <button
                                                      type='button'
                                                      className='btn-remove-service'
                                                      onClick={() =>
                                                        removeServiceWhileCheckIn(
                                                          index,
                                                        )
                                                      }
                                                    >
                                                      Remove
                                                    </button>
                                                  </td>
                                                </tr>
                                              ),
                                            )}
                                          </tbody>
                                        </table>
                                      ) : null}
                                      {errors.servicesWhileCheckIn && (
                                        <div className='error_service_checkIn'>
                                          {errors.servicesWhileCheckIn}
                                        </div>
                                      )}
                                      {errors.alreadyChooseAllService && (
                                        <div className='error_service_checkIn'>
                                          {errors.alreadyChooseAllService}
                                        </div>
                                      )}
                                      <div
                                        className='add-service-paymentDetails'
                                        onClick={() => {
                                          addServiceWhileCheckIn();
                                        }}
                                      >
                                        Add Service
                                      </div>
                                    </div>
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
                                        Total Booking:&nbsp;
                                      </small>
                                      <small>{booking.totalPrice}$</small>
                                    </div>
                                    {servicesWhileCheckIn.length > 0 && (
                                      <div className='reason-manage-booking'>
                                        <small className='title-reason-manage-booking'>
                                          Total Add Service:&nbsp;
                                        </small>
                                        <small>
                                          {`${servicesWhileCheckIn.reduce((total, item) => total + item.price, 0)}`}
                                          $
                                        </small>
                                      </div>
                                    )}
                                  </div>

                                  <div className='mb-2'>
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
                                onClick={() => {
                                  setBookingDetailsCheckIn(null);
                                  setServicesWhileCheckIn([]);
                                }}
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
                                    {bookingDetailsCheckIn &&
                                      bookingDetailsCheckIn.servicesInBooking.map(
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
                                    <div className='reason-manage-booking'>
                                      {servicesWhileCheckIn.length > 0 ? (
                                        <table className='services-table'>
                                          <thead>
                                            <tr>
                                              <th>Service</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {servicesWhileCheckIn.map(
                                              (service, index) => (
                                                <tr key={index}>
                                                  <td>
                                                    <select
                                                      value={
                                                        service.service ||
                                                        serviceWhileCheckInFilter[0]
                                                          ?.serviceID
                                                      }
                                                      onChange={e =>
                                                        handleServiceWhileCheckInChange(
                                                          index,
                                                          'service',
                                                          e.target.value,
                                                        )
                                                      }
                                                      required
                                                    >
                                                      {serviceWhileCheckInFilter.map(
                                                        service => (
                                                          <option
                                                            key={
                                                              service.serviceID
                                                            }
                                                            value={
                                                              service.serviceID
                                                            }
                                                          >
                                                            {`${service.name} - ${service.price}$`}
                                                          </option>
                                                        ),
                                                      )}
                                                    </select>
                                                  </td>
                                                  <td
                                                    style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                    }}
                                                  >
                                                    <button
                                                      type='button'
                                                      className='btn-remove-service'
                                                      onClick={() =>
                                                        removeServiceWhileCheckIn(
                                                          index,
                                                        )
                                                      }
                                                    >
                                                      Remove
                                                    </button>
                                                  </td>
                                                </tr>
                                              ),
                                            )}
                                          </tbody>
                                        </table>
                                      ) : null}
                                      {errors.servicesWhileCheckIn && (
                                        <div>{errors.servicesWhileCheckIn}</div>
                                      )}
                                      {errors.alreadyChooseAllService && (
                                        <div>
                                          {errors.alreadyChooseAllService}
                                        </div>
                                      )}
                                      <div
                                        className='add-service-paymentDetails'
                                        onClick={() => {
                                          addServiceWhileCheckIn();
                                        }}
                                      >
                                        Add Service
                                      </div>
                                    </div>
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
                                      {servicesWhileCheckIn.length > 0 && (
                                        <div className='reason-manage-booking'>
                                          <small className='title-reason-manage-booking'>
                                            Total Add Service:&nbsp;
                                          </small>
                                          <small>
                                            {`${servicesWhileCheckIn.reduce((total, item) => total + item.price, 0)}`}
                                            $
                                          </small>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className='mb-2'>
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
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: '10px',
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={isConfirmPayment}
                                        onChange={handleChangeConfirmPayment}
                                      />
                                    }
                                    label='Confirm payment received'
                                  />
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
                                  } else if (!isConfirmPayment) {
                                    alert('You should tick to confirm!!!');
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
                                onClick={() => {
                                  setBookingDetailsCheckIn(null);
                                  setServicesWhileCheckIn([]);
                                }}
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
                                onClick={() => {
                                  setBookingDetailsCheckIn(null);
                                  setServicesWhileCheckIn([]);
                                }}
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
