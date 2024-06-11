import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';

const doctorsData = [
    {
        id: 'DOC001',
        name: 'Dr A',
        workingHours: [
            {
                date: '2024-06-01',
                startTime: '09:00',
                endTime: '15:00',
                isOff: false,
                bookings: [
                    { startTime: '9:00', endTime: '10:00' },
                    { startTime: '10:00', endTime: '11:00' },
                    { startTime: '12:00', endTime: '13:00' }
                ]
            },
            {
                date: '2024-07-01',
                startTime: '07:00',
                endTime: '11:00',
                isOff: false,
                bookings: [
                    { startTime: '07:00', endTime: '08:00' },
                    { startTime: '09:00', endTime: '10:00' }
                ]
            }
        ]
    },
    {
        id: 'DOC002',
        name: 'Dr B',
        workingHours: [
            {
                date: '2024-06-01',
                startTime: '11:00',
                endTime: '15:00',
                isOff: false,
                bookings: [
                    { startTime: '09:00', endTime: '10:00' },
                    { startTime: '10:00', endTime: '11:00' }
                ]
            },
            {
                date: '2024-07-01',
                startTime: '09:00',
                endTime: '15:00',
                isOff: false,
                bookings: [
                    { startTime: '13:00', endTime: '14:00' },
                    { startTime: '9:00', endTime: '10:00' },
                    { startTime: '14:00', endTime: '15:00' },
                ]
            }
        ]
    },
    {
        id: 'DOC003',
        name: 'Dr C',
        workingHours: [
            {
                date: '2024-06-01',
                startTime: '07:00',
                endTime: '13:00',
                isOff: false,
                bookings: [
                    { startTime: '12:00', endTime: '13:00' },
                    { startTime: '11:00', endTime: '12:00' },
                ]
            },
            {
                date: '2024-07-01',
                startTime: '08:00',
                endTime: '15:00',
                isOff: false,
                bookings: [
                    { startTime: '08:00', endTime: '09:00' },
                    { startTime: '09:00', endTime: '10:00' },
                ]
            }
        ]
    }
];

function ManageListBooking() {
    const [petOption, setPetOption] = useState('');
    const [ownerOption, setOwnerOption] = useState('');
    const [petSearchResults, setPetSearchResults] = useState([]);
    const [ownerSearchResults, setOwnerSearchResults] = useState([]);
    const availableBreeds = ["Golden Retriever", "Labrador Retriever", "Poodle", "Bulldog", "Beagle", "Chihuahua"];
    const availableTimeSlots = [
        { startTime: "08:00", endTime: "09:00" },
        { startTime: "09:00", endTime: "10:00" },
        { startTime: "10:00", endTime: "11:00" },
        { startTime: "11:00", endTime: "12:00" },
        { startTime: "13:00", endTime: "14:00" },
        { startTime: "14:00", endTime: "15:00" },
        { startTime: "15:00", endTime: "16:00" },
        { startTime: "16:00", endTime: "17:00" },
        // thêm các khung giờ khác tại đây
    ];
    const fakePetSearchResults = [
        { petID: 'PET001', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', gender: 'Male', birthday: '2020-01-01', status: 'Healthy' },
        { petID: 'PET002', name: 'Max', type: 'Cat', breed: 'Siamese', gender: 'Female', birthday: '2021-02-02', status: 'Healthy' },
    ];

    const fakeOwnerSearchResults = [
        { ownerID: 'CUST001', name: 'John Doe', phone: '123-456-7890', email: 'john.doe@example.com' },
        { ownerID: 'CUST002', name: 'Jane Smith', phone: '987-654-3210', email: 'jane.smith@example.com' },
    ];

    const [createPetInfo, setCreatePetInfo] = useState({
        petID: '',
        name: '',
        type: '',
        breed: '',
        gender: '',
        birthday: '',
        status: '',
    });

    const [createOwnerInfo, setCreateOwnerInfo] = useState({
        ownerID: '',
        name: '',
        phone: '',
        email: '',
    });
    const [petInfo, setPetInfo] = useState({
        petID: 'PET001',
        name: 'Buddy',
        type: 'Dog',
        breed: 'Golden Retriever',
        gender: 'Male',
        status: 'Healthy',
    });
    const [ownerInfo, setOwnerInfo] = useState({
        ownerID: 'CUST001',
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
    });
    const [services, setServices] = useState([{ service: '' }]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
    const [allBookings, setAllBookings] = useState([
        { bookingID: 'SE123456', day: '2024-06-01', startTime: '8:00', endTime: '9:00', name: 'John Doe', petType: 'Dog', petName: 'Lau', birthday: '2024-4-17', breed: 'Golden', gender: 'male', doctor: 'Chen', service: 'Grooming' },
        { bookingID: 'SE123457', day: '2024-06-01', startTime: '9:00', endTime: '10:00', name: 'Jane Smith', petType: 'Cat', petName: 'Jhs', birthday: '2024-4-17', breed: 'Golden', gender: 'male', doctor: '', service: 'Check-up' },
        { bookingID: 'SE123458', day: '2024-06-01', startTime: '10:00', endTime: '11:00', name: 'Mike Johnson', petType: 'Cat', petName: 'Abas', birthday: '2024-4-17', breed: 'Golden', gender: 'male', doctor: '', service: 'Vaccination' },
        { bookingID: 'SE123459', day: '2024-06-01', startTime: '11:00', endTime: '12:00', name: 'Emily Davis', petType: 'Dog', petName: 'Mok', birthday: '2024-4-17', breed: 'Golden', gender: 'male', doctor: '', service: 'Wing Clipping' },
        { bookingID: 'SE123460', day: '2024-06-01', startTime: '12:00', endTime: '13:00', name: 'Chris Lee', petType: 'Dog', petName: 'Ams', birthday: '2024-4-17', breed: 'Golden', gender: 'male', doctor: '', service: 'Dental Cleaning' },
        { bookingID: 'SE123461', day: '2024-07-01', startTime: '13:00', endTime: '14:00', name: 'Th', petType: 'Cat', petName: 'IMsa', birthday: '2024-4-17', breed: 'Golden', gender: 'male', doctor: '', service: 'Wing Clipping' }
    ]);
    const [chosenDoctor, setChosenDoctor] = useState('');
    const [errors, setErrors] = useState({
        petOption: '',
        ownerOption: '',
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
        ownerSelect: '',
        petSelect: ''
    });

    const availableServices = [
        { id: 1, name: 'Grooming', price: 5 },
        { id: 2, name: 'Vaccination', price: 350 },
        { id: 3, name: 'Wing Clipping', price: 50 },
        { id: 4, name: 'Dental Cleaning', price: 20 }
    ];

    const handlePetOptionChange = (event) => {
        setPetOption(event.target.value);
        setErrors(prev => ({ ...prev, petOption: '', petSelect: '' }));
    };

    const handleOwnerOptionChange = (event) => {
        setOwnerOption(event.target.value);
        setErrors(prev => ({ ...prev, ownerOption: '', ownerSelect: '' }));
    };

    // const handleSearchPet = () => {
    //     const query = document.getElementById('searchPetInput').value;
    //     fetch(`/searchPet?query=${query}`)
    //         .then((response) => response.json())
    //         .then((data) => setPetSearchResults(data))
    //         .catch((error) => console.error('Error:', error));
    // };

    const handleSearchPet = () => {
        const query = document.getElementById('searchPetInput').value.toLowerCase();
        if (query) {
            const results = fakePetSearchResults.filter(pet => pet.petID.toLowerCase().includes(query));
            setPetSearchResults(results);
        }
    };

    const handlePetSelect = (event) => {
        const petID = event.target.value;
        if (petID) {
            const newPetInfo = petSearchResults.find((pet) => pet.petID === petID)
            if (newPetInfo) {
                setCreatePetInfo(newPetInfo);
                setPetInfo(newPetInfo);
                setErrors(prev => ({ ...prev, petSelect: '' }));
            }
        }
    };

    // const handleSearchOwner = () => {
    //     const query = document.getElementById('searchOwnerInput').value;
    //     fetch(`/searchOwner?query=${query}`)
    //         .then((response) => response.json())
    //         .then((data) => setOwnerSearchResults(data))
    //         .catch((error) => console.error('Error:', error));
    // };

    const handleSearchOwner = () => {
        const query = document.getElementById('searchOwnerInput').value.toLowerCase();
        if (query) {
            const results = fakeOwnerSearchResults.filter(owner => owner.ownerID.toLowerCase().includes(query));
            setOwnerSearchResults(results);
        }
    };

    // const handleOwnerSelect = (event) => {
    //     const ownerID = event.target.value;
    //     fetch(`/getOwnerInfo?ownerID=${ownerID}`)
    //         .then((response) => response.json())
    //         .then((data) => setOwnerInfo(data))
    //         .catch((error) => console.error('Error:', error));
    // };

    const handleOwnerSelect = (event) => {
        const ownerID = event.target.value;
        if (ownerID) {
            const owner = ownerSearchResults.find(owner => owner.ownerID === ownerID);
            if (owner) {
                setCreateOwnerInfo(owner);
                setOwnerInfo(owner);
                setErrors(prev => ({ ...prev, ownerSelect: '' }));
            }
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle submit logic here
    };

    const resetForm = () => {
        setPetOption('');
        setOwnerOption('');
        setPetSearchResults([]);
        setOwnerSearchResults([]);
        setCreatePetInfo({});
        setCreateOwnerInfo({});
        setServices([{ service: '' }]);
        setSelectedDate('');
        setSelectedTimeSlot({});
        setErrors({});
        document.getElementById('addPetForm').reset();
    };

    const findAvailableDoctor = (date, startTime, endTime) => {
        const availableDoctors = [];
        for (const doctor of doctorsData) {
            const workingHour = doctor.workingHours.find(wh => wh.date === date && !wh.isOff);
            if (workingHour) {
                const withinWorkingHours = (
                    startTime >= workingHour.startTime && endTime <= workingHour.endTime
                );
                if (withinWorkingHours) {
                    const hasNoOverlap = workingHour.bookings.every(booking => (
                        (endTime !== booking.endTime && startTime !== booking.startTime)
                    ));
                    if (hasNoOverlap) {
                        availableDoctors.push(doctor);
                    }
                }
            }
        }
        return availableDoctors.length ? availableDoctors : null;
    };

    const handleDoctorChange = (event) => {
        setChosenDoctor(event.target.value);
        setErrors(prev => ({ ...prev, chosenDoctor: '' }));
    };

    const handleSave = (bookingID) => {
        setAllBookings(allBookings.map(booking => {
            if (booking.bookingID === bookingID) {
                return { ...booking, doctor: chosenDoctor };
            } else {
                return booking;
            }
        }))
        setChosenDoctor('');
    }

    const validateForm = () => {
        const newErrors = {};

        if (!petOption) newErrors.petOption = "Please select a pet option.";
        if (!ownerOption) newErrors.ownerOption = "Please select an owner option.";
        if (petOption === 'hasPetID' && !petInfo.petID) newErrors.petSelect = "Please select a pet.";
        if (ownerOption === 'hasOwnerID' && !ownerInfo.ownerID) newErrors.ownerSelect = "Please select a customer.";
        if (services.some(service => !service.service)) newErrors.services = "Please select service.";
        if (!selectedDate) newErrors.selectedDate = "Date is required.";
        if (!selectedTimeSlot.startTime || !selectedTimeSlot.endTime) newErrors.selectedTimeSlot = "Time slot is required.";
        if (!chosenDoctor) newErrors.chosenDoctor = "Doctor is required.";
        if (services.length === 0) newErrors.services = "At least one service is required.";

        if (petOption === 'noPetID') {
            const { name, type, breed, gender, birthday } = createPetInfo;
            if (!name) newErrors.petName = "Pet name is required.";
            if (!type) newErrors.petType = "Pet type is required.";
            if (!breed) newErrors.petBreed = "Pet breed is required.";
            if (!gender) newErrors.petGender = "Pet gender is required.";
            if (!birthday) newErrors.petBirthday = "Pet birthday is required.";
        }

        if (ownerOption === 'noOwnerID') {
            const { name, phone, email } = createOwnerInfo;
            if (!name) newErrors.ownerName = "Owner name is required.";
            if (!phone) newErrors.ownerPhone = "Owner phone is required.";
            if (!email || !validateEmail(email)) newErrors.ownerEmail = "Valid owner email is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleAddBooking = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const newBooking = {
            bookingID: `SE${parseInt(allBookings[allBookings.length - 1].bookingID.substring(2)) + 1}`,
            day: selectedDate,
            startTime: selectedTimeSlot.startTime,
            endTime: selectedTimeSlot.endTime,
            name: createOwnerInfo.name,
            petType: createPetInfo.type,
            petName: createPetInfo.name,
            birthday: createPetInfo.birthday,
            breed: createPetInfo.breed,
            gender: createPetInfo.gender,
            doctor: chosenDoctor,
            service: services.map(service => service.service).join(', '),
        };

        setAllBookings([...allBookings, newBooking]);
        resetForm();
        document.querySelector('#exampleModal .btn-close').click();
    };

    const handleTimeSlotChange = (event) => {
        const [startTime, endTime] = event.target.value.split("-");
        setSelectedTimeSlot({ startTime, endTime });
        setErrors(prev => ({ ...prev, selectedTimeSlot: '' }));
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className='manage-booking-list container-fluid'>
            <div className='row'>
                <HeaderManager />
                <div className='manage-booking-list-title'>
                    <div className='manage-booking-list-title-text'>Pet Health Care - Manage Booking Lists</div>
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
                                    <button type='button' className='search-input-btn'>
                                        <img className='search-input-btn-icon' src={search_icon} alt='' />
                                    </button>
                                    <input type='text' placeholder='Search' className='main-content-header-search-input' />
                                </div>
                            </div>
                            <div className='main-content-header-add-booking'>
                                <button type='button' className='booking-btn-add' data-bs-toggle='modal' data-bs-target='#exampleModal'>
                                    Add Booking
                                </button>
                                <div className='modal fade' id='exampleModal' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                    <div className='modal-dialog'>
                                        <form id='addPetForm' onSubmit={handleSubmit}>
                                            <div className='modal-content'>
                                                <div className='modal-header'>
                                                    <h1 className='modal-title fs-5' id='exampleModalLabel'>Add Booking</h1>
                                                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                                </div>
                                                <div className='modal-body'>
                                                    <div className='modal-body-section-wrapper'>
                                                        <div className='modal-body-section-type-pet'>
                                                            <label>Type:</label>
                                                            <input type='radio' name='petOption' value='hasPetID' checked={petOption === 'hasPetID'} onChange={handlePetOptionChange} /> <span>Has Pet ID</span>
                                                            <input type='radio' name='petOption' value='noPetID' checked={petOption === 'noPetID'} onChange={handlePetOptionChange} /> <span>Not Has Pet ID</span>
                                                            {errors.petOption && <span className='error'>{errors.petOption}</span>}
                                                        </div>
                                                        {petOption === 'hasPetID' && (
                                                            <div id='searchPetSection'>
                                                                <div className='searchPetSection-child'>
                                                                    <label>Search Pet ID:</label>
                                                                    <input type='text' id='searchPetInput' onChange={handleSearchPet} />
                                                                </div>
                                                                <div className='has-select-option'>
                                                                    <select onChange={handlePetSelect}>
                                                                        <option value=''>Choose Pet</option>
                                                                        {petSearchResults.map((pet) => (
                                                                            <option key={pet.petID} value={pet.petID}>{`${pet.petID} - ${pet.name}`}</option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.petSelect && <span className='error'>{errors.petSelect}</span>}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {petOption === 'noPetID' && (
                                                            <div id='newPetSection'>
                                                                <div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Pet Name:</label>
                                                                        <input type='text' value={createPetInfo.name || ''} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, name: e.target.value }); setErrors(prev => ({ ...prev, petName: '' })); }} required />
                                                                        {errors.petName && <span className='error'>{errors.petName}</span>}
                                                                    </div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Type:</label>
                                                                        <input type='radio' name='petType' value='Dog' checked={createPetInfo.type === 'Dog'} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, type: e.target.value }); setErrors(prev => ({ ...prev, petType: '' })); }} required /> <span>Dog</span>
                                                                        <input type='radio' name='petType' value='Cat' checked={createPetInfo.type === 'Cat'} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, type: e.target.value }); setErrors(prev => ({ ...prev, petType: '' })); }} required /> <span>Cat</span>
                                                                        {errors.petType && <span className='error'>{errors.petType}</span>}
                                                                    </div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Breed:</label>
                                                                        <select value={createPetInfo.breed} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, breed: e.target.value }); setErrors(prev => ({ ...prev, petBreed: '' })); }} required>
                                                                            <option value=''>Select Breed</option>
                                                                            {availableBreeds.map((breed, index) => (
                                                                                <option key={index} value={breed}>{breed}</option>
                                                                            ))}
                                                                        </select>
                                                                        {errors.petBreed && <span className='error'>{errors.petBreed}</span>}
                                                                    </div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Birthday:</label>
                                                                        <input type='date' value={createPetInfo.birthday || ''} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, birthday: e.target.value }); setErrors(prev => ({ ...prev, petBirthday: '' })); }} required />
                                                                        {errors.petBirthday && <span className='error'>{errors.petBirthday}</span>}
                                                                    </div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Gender:</label>
                                                                        <input type='radio' name='gender' value='Male' checked={createPetInfo.gender === 'Male'} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, gender: e.target.value }); setErrors(prev => ({ ...prev, petGender: '' })); }} required /> <span>Male</span>
                                                                        <input type='radio' name='gender' value='Female' checked={createPetInfo.gender === 'Female'} onChange={(e) => { setCreatePetInfo({ ...createPetInfo, gender: e.target.value }); setErrors(prev => ({ ...prev, petGender: '' })); }} required /> <span>Female</span>
                                                                        {errors.petGender && <span className='error'>{errors.petGender}</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='modal-body-section-wrapper'>
                                                        <div className='modal-body-section-type-user'>
                                                            <label>Customer:</label>
                                                            <input type='radio' name='ownerOption' value='hasOwnerID' checked={ownerOption === 'hasOwnerID'} onChange={handleOwnerOptionChange} /><span>Have CustomerID</span>
                                                            <input type='radio' name='ownerOption' value='noOwnerID' checked={ownerOption === 'noOwnerID'} onChange={handleOwnerOptionChange} /><span>Not Have CustomerID</span>
                                                            {errors.ownerOption && <span className='error'>{errors.ownerOption}</span>}
                                                        </div>
                                                        {ownerOption === 'hasOwnerID' && (
                                                            <div id='searchOwnerSection'>
                                                                <div className='search-owner-option-section'>
                                                                    <label>Search Customer:</label>
                                                                    <input type='text' id='searchOwnerInput' onChange={handleSearchOwner} />
                                                                </div>
                                                                <div className='has-select-option'>
                                                                    <select onChange={handleOwnerSelect}>
                                                                        <option value=''>Choose Customer</option>
                                                                        {ownerSearchResults.map((owner) => (
                                                                            <option key={owner.ownerID} value={owner.ownerID}>
                                                                                {`${owner.ownerID} - ${owner.name}`}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.ownerSelect && <span className='error'>{errors.ownerSelect}</span>}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {ownerOption === 'noOwnerID' && (
                                                            <div id='newOwnerSection'>
                                                                <div className=''>
                                                                    <div className='modal-body-section'>
                                                                        <label>Name:</label>
                                                                        <input type='text' value={createOwnerInfo.name || ''} onChange={(e) => { setCreateOwnerInfo({ ...createOwnerInfo, name: e.target.value }); setErrors(prev => ({ ...prev, ownerName: '' })); }} required />
                                                                        {errors.ownerName && <span className='error'>{errors.ownerName}</span>}
                                                                    </div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Email:</label>
                                                                        <input type='email' value={createOwnerInfo.email || ''} onChange={(e) => {
                                                                            const email = e.target.value;
                                                                            setCreateOwnerInfo({ ...createOwnerInfo, email });
                                                                            if (!validateEmail(email)) {
                                                                                setErrors(prev => ({ ...prev, ownerEmail: 'Invalid email format' }));
                                                                            } else {
                                                                                setErrors(prev => ({ ...prev, ownerEmail: '' }));
                                                                            }
                                                                        }} required />
                                                                        {errors.ownerEmail && <span className='error'>{errors.ownerEmail}</span>}
                                                                    </div>
                                                                    <div className='modal-body-section'>
                                                                        <label>Phone:</label>
                                                                        <input type='text' value={createOwnerInfo.phone || ''} onChange={(e) => { setCreateOwnerInfo({ ...createOwnerInfo, phone: e.target.value }); setErrors(prev => ({ ...prev, ownerPhone: '' })); }} required />
                                                                        {errors.ownerPhone && <span className='error'>{errors.ownerPhone}</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='modal-body-section-wrapper'>
                                                        <div>
                                                            <label>Services used:</label>
                                                            {services.map((service, index) => (
                                                                <div key={index} className='service'>
                                                                    <label>Service:</label>
                                                                    <select value={service.service} onChange={(e) => handleServiceChange(index, 'service', e.target.value)} required>
                                                                        <option value=''>Choose Services</option>
                                                                        {availableServices.map((availableService) => (
                                                                            <option key={availableService.id} value={availableService.name}>{availableService.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            ))}
                                                            <div className='btn-add-services' onClick={addService}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                                </svg>
                                                                <div>Add service</div>
                                                            </div>
                                                            {errors.services && <span className='error'>{errors.services}</span>}
                                                        </div>
                                                    </div>

                                                    <div className='modal-body-section-wrapper'>
                                                        <div>
                                                            <div className='modal-body-section-doctor-date'>
                                                                <label>Choose Date:</label>
                                                                <input type='date' value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setErrors(prev => ({ ...prev, selectedDate: '' })); }} required />
                                                                {errors.selectedDate && <span className='error'>{errors.selectedDate}</span>}
                                                            </div>
                                                            <div className='modal-body-section-doctor-date'>
                                                                <label>Choose Time Slot:</label>
                                                                <select value={`${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`} onChange={(e) => handleTimeSlotChange(e)} required>
                                                                    <option value=''>Select Time Slot</option>
                                                                    {availableTimeSlots.map((slot, index) => (
                                                                        <option key={index} value={`${slot.startTime}-${slot.endTime}`}>{`${slot.startTime} - ${slot.endTime}`}</option>
                                                                    ))}
                                                                </select>
                                                                {errors.selectedTimeSlot && <span className='error'>{errors.selectedTimeSlot}</span>}
                                                            </div>
                                                            <div className='modal-body-section-doctor-date'>
                                                                <label>Veterinarian:</label>
                                                                <div id='veterinarian'>
                                                                    {findAvailableDoctor(selectedDate, selectedTimeSlot.startTime, selectedTimeSlot.endTime)
                                                                        ? findAvailableDoctor(selectedDate, selectedTimeSlot.startTime, selectedTimeSlot.endTime).map((doctorAdd, index) => {
                                                                            return (
                                                                                <div key={doctorAdd.id} className='choose-Doctor-wrapper'>
                                                                                    <input type='radio' id={`doctor-${index}`} name='doctor' value={doctorAdd.name} onChange={(e) => handleDoctorChange(e)} />
                                                                                    <label htmlFor={`doctor-${index}`}>{doctorAdd.name}</label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        : <div className='choose-Doctor-Not-Found'>
                                                                            No Doctors Found
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {errors.chosenDoctor && <span className='error'>{errors.chosenDoctor}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='modal-footer'>
                                                    <button type='button' onClick={resetForm} className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                                                    <button type='submit' className='btn btn-success' onClick={(e) => handleAddBooking(e)}>Add</button>
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
                                <div className='main-content-list-title-text'>Pet Type</div>
                                <div className='main-content-list-title-text'>Service</div>
                                <div className='main-content-list-title-text'>Doctor</div>
                                <div className='main-content-list-title-text'>Check In</div>
                                <div className='main-content-list-title-text'>Cancel Booking</div>
                                <div className='main-content-list-title-text'>View</div>
                            </div>
                            <div className='main-content-list-body-wrapper'>
                                {allBookings.map(booking => (
                                    <div className='content-list-body-info' key={booking.bookingID}>
                                        <div className='content-list-body-value'>{booking.bookingID}</div>
                                        <div className='content-list-body-value'>{booking.day}</div>
                                        <div className='content-list-body-value'>{booking.startTime}</div>
                                        <div className='content-list-body-value'>{booking.endTime}</div>
                                        <div className='content-list-body-value'>{booking.name}</div>
                                        <div className='content-list-body-value'>{booking.petType}</div>
                                        <div className='content-list-body-value'>{booking.service}</div>
                                        <div className='content-list-body-value'>
                                            {booking.doctor ? (
                                                booking.doctor
                                            ) : (
                                                <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target={`#chooseDoctorModal-${booking.bookingID}`}>
                                                    Choose
                                                </button>
                                            )}
                                        </div>

                                        {/* Modal to choose doctor */}
                                        <div className='modal fade' id={`chooseDoctorModal-${booking.bookingID}`} aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                            <div className='modal-dialog'>
                                                <div className='modal-content'>
                                                    <div className='modal-header'>
                                                        <h1 className='modal-title fs-5' id='exampleModalLabel'>Choose Doctor</h1>
                                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                                    </div>
                                                    <div className='modal-body'>
                                                        {findAvailableDoctor(booking.day, booking.startTime, booking.endTime)
                                                            ? findAvailableDoctor(booking.day, booking.startTime, booking.endTime).map((doctor, index) => {
                                                                return (<div className='choose-Doctor-wrapper' key={doctor.id}>
                                                                    <input type='radio' id={`doctor-${booking.bookingID}-${doctor.name}`} name='doctor' value={doctor.name} onChange={(e) => handleDoctorChange(e)} />
                                                                    <label htmlFor={`doctor-${booking.bookingID}-${doctor.name}`}>{doctor.name}</label>
                                                                </div>)
                                                            })
                                                            : <div className='choose-Doctor-Not-Found'>
                                                                No Doctors Found In This Time
                                                            </div>}
                                                    </div>
                                                    <div className='modal-footer'>
                                                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                                                        <button type='button' onClick={() => handleSave(booking.bookingID)} className='btn btn-primary' data-bs-dismiss='modal'>Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='content-list-body-value'>
                                            <input
                                                type='checkbox'
                                                className='content-list-body-checkbox'
                                                defaultChecked={booking.checkIn}
                                            />
                                        </div>
                                        <div className='content-list-body-value'>
                                            <input
                                                type='checkbox'
                                                className='content-list-body-checkbox'
                                                disabled
                                                defaultChecked={true}
                                            />
                                        </div>
                                        <div className='content-list-body-value'>
                                            <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target={`#moreinfo-${booking.bookingID}`}>
                                                More info
                                            </button>
                                        </div>

                                        {/* Modal for more info */}
                                        <div className='modal fade' id={`moreinfo-${booking.bookingID}`} aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                            <div className='modal-dialog'>
                                                <div className='modal-content'>
                                                    <div className='modal-header'>
                                                        <h1 className='modal-title fs-5' id='exampleModalLabel'>Details</h1>
                                                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                                    </div>
                                                    <div className='modal-body-manage-booking'>
                                                        <div className='main-modal-content-manage-booking'>
                                                            <i className='fa fa-close close' data-dismiss='modal'></i>

                                                            <div className='grid-container'>
                                                                <div className='content-modal-manage-booking'>
                                                                    <div className='reason-manage-booking'>
                                                                        <span className='font-weight-bold'>Customer Information</span>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>CustomerID:&nbsp;</small>
                                                                        <small> {ownerInfo.ownerID}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Name:&nbsp;</small>
                                                                        <small>{ownerInfo.name}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Phone:&nbsp;</small>
                                                                        <small>{ownerInfo.phone}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Email:&nbsp;</small>
                                                                        <small>{ownerInfo.email}</small>
                                                                    </div>
                                                                </div>

                                                                <div className='mb-3'>
                                                                    <hr className='new1' />
                                                                </div>

                                                                <div className='content-modal-manage-booking'>
                                                                    <div className='reason-manage-booking'>
                                                                        <span className='font-weight-bold'>Pet Information</span>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Pet ID:&nbsp;</small>
                                                                        <small>{petInfo.petID}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Name:&nbsp;</small>
                                                                        <small>{petInfo.name}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Type:&nbsp;</small>
                                                                        <small>{petInfo.type}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Breed:&nbsp;</small>
                                                                        <small>{petInfo.breed}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Gender:&nbsp;</small>
                                                                        <small>{petInfo.gender}</small>
                                                                    </div>
                                                                    <div className='reason-manage-booking'>
                                                                        <small className='title-reason-manage-booking'>Status:&nbsp;</small>
                                                                        <small>{petInfo.status}</small>
                                                                    </div>

                                                                </div>

                                                                <div className='mb-3'>
                                                                    <hr className='new1' />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='modal-footer'>
                                                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pagination_wrapper'>
                    <nav aria-label='...'>
                        <ul className='pagination'>
                            <li className='page-item disabled'>
                                <a className='page-link' href='#123'>Previous</a>
                            </li>
                            <li className='page-item active' aria-current='page'>
                                <a className='page-link' href='#123'>1</a>
                            </li>
                            <li className='page-item'>
                                <a className='page-link' href='#123'>2</a>
                            </li>
                            <li className='page-item'>
                                <a className='page-link' href='#123'>3</a>
                            </li>
                            <li className='page-item'>
                                <a className='page-link' href='#123'>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ManageListBooking;
