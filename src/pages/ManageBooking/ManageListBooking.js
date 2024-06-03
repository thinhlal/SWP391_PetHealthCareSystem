import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useState, useEffect } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';

const doctorsData = [
    {
        id: "DOC001",
        name: "Dr. Nguyễn Văn A",
        workingHours: [
            {
                date: "2024-06-01",
                startTime: "09:00",
                endTime: "15:00",
                isOff: false,
                bookings: [
                    { startTime: "09:00", endTime: "10:00" },
                    { startTime: "12:00", endTime: "13:00" }
                ]
            },
            {
                date: "2024-07-01",
                startTime: "07:00",
                endTime: "11:00",
                isOff: false,
                bookings: [
                    { startTime: "07:00", endTime: "08:00" },
                    { startTime: "09:00", endTime: "10:00" }
                ]
            }
        ]
    },
    {
        id: "DOC002",
        name: "Dr. Nguyễn Văn B",
        workingHours: [
            {
                date: "2024-06-01",
                startTime: "11:00",
                endTime: "15:00",
                isOff: false,
                bookings: [
                    { startTime: "09:00", endTime: "10:00" },
                    { startTime: "10:00", endTime: "11:00" }
                ]
            },
            {
                date: "2024-07-01",
                startTime: "09:00",
                endTime: "15:00",
                isOff: false,
                bookings: [
                    { startTime: "13:00", endTime: "14:00" },
                    { startTime: "9:00", endTime: "10:00" }
                ]
            }
        ]
    },
    {
        id: "DOC003",
        name: "Dr. Nguyễn Văn C",
        workingHours: [
            {
                date: "2024-06-01",
                startTime: "07:00",
                endTime: "13:00",
                isOff: false,
                bookings: [
                    { startTime: "09:00", endTime: "10:00" },
                    { startTime: "11:00", endTime: "12:00" }
                ]
            },
            {
                date: "2024-07-01",
                startTime: "08:00",
                endTime: "15:00",
                isOff: false,
                bookings: [
                    { startTime: "08:00", endTime: "09:00" },
                    { startTime: "09:00", endTime: "10:00" }
                ]
            }
        ]
    }
    // Thêm các bác sĩ khác nếu cần
];


function ManageListBooking() {

    const [petOption, setPetOption] = useState("");
    const [ownerOption, setOwnerOption] = useState("");
    const [petSearchResults, setPetSearchResults] = useState([]);
    const [ownerSearchResults, setOwnerSearchResults] = useState([]);
    const [petInfo, setPetInfo] = useState({});
    const [ownerInfo, setOwnerInfo] = useState({});
    const [services, setServices] = useState([{ service: "" }]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const allBookings = [
        { bookingID: "SE123456", day: "2024-06-01", startTime: "8:00", endTime: "9:00", name: "John Doe", petType: "Dog", service: "Blooming", doctor: "Chen", checkIn: false },
        { bookingID: "SE123457", day: "2024-06-01", startTime: "9:00", endTime: "10:00", name: "JaAAA", petType: "Cat", service: "X-ray", doctor: "", checkIn: false },
        { bookingID: "SE123458", day: "2024-06-01", startTime: "9:00", endTime: "10:00", name: "B AASSe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false },
        { bookingID: "SE123459", day: "2024-06-01", startTime: "13:00", endTime: "14:00", name: "B Doe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false },
        { bookingID: "SE123460", day: "2024-06-01", startTime: "15:00", endTime: "16:00", name: "C Doe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false }
    ];

    const availableServices = [
        { id: 1, name: "X-quang" },
        { id: 2, name: "Siêu âm" },
        { id: 3, name: "Khám tổng quát" },
        { id: 4, name: "Tiêm chủng" }
    ];

    const handlePetOptionChange = (event) => {
        setPetOption(event.target.value);
    };

    const handleOwnerOptionChange = (event) => {
        setOwnerOption(event.target.value);
    };

    const handleSearchPet = () => {
        const query = document.getElementById("searchPetInput").value;
        fetch(`/searchPet?query=${query}`)
            .then((response) => response.json())
            .then((data) => setPetSearchResults(data))
            .catch((error) => console.error("Error:", error));
    };

    const handlePetSelect = (event) => {
        const petID = event.target.value;
        fetch(`/getPetInfo?petID=${petID}`)
            .then((response) => response.json())
            .then((data) => setPetInfo(data))
            .catch((error) => console.error("Error:", error));
    };

    const handleSearchOwner = () => {
        const query = document.getElementById("searchOwnerInput").value;
        fetch(`/searchOwner?query=${query}`)
            .then((response) => response.json())
            .then((data) => setOwnerSearchResults(data))
            .catch((error) => console.error("Error:", error));
    };

    const handleOwnerSelect = (event) => {
        const ownerID = event.target.value;
        fetch(`/getOwnerInfo?ownerID=${ownerID}`)
            .then((response) => response.json())
            .then((data) => setOwnerInfo(data))
            .catch((error) => console.error("Error:", error));
    };

    const handleServiceChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const addService = () => {
        setServices([...services, { service: "" }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const formData = {
        //     petInfo,
        //     ownerInfo,
        //     services,
        //     reasonForAdmission: document.getElementById("reasonForAdmission").value,
        //     currentCondition: document.getElementById("currentCondition").value,
        //     cageNumber: document.getElementById("cageNumber").value,
        //     admissionTime: document.getElementById("admissionTime").value,
        //     veterinarian: document.getElementById("veterinarian").value,
        // };
        // console.log(formData)
        // Perform form submission logic here
    };

    const resetForm = () => {
        setPetOption("");
        setOwnerOption("");
        setPetSearchResults([]);
        setOwnerSearchResults([]);
        setPetInfo({});
        setOwnerInfo({});
        setServices([{ service: "" }]);
        setSelectedDate("");
        setSelectedEndTime("");
        setSelectedStartTime("");
        document.getElementById("addPetForm").reset();
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
                    const hasNoOverlap = workingHour.bookings.every(booking => {
                        const overlap = (endTime <= booking.startTime || startTime >= booking.endTime);
                        console.log(`Checking overlap for Doctor: ${doctor.name}`);
                        console.log(`New Booking: ${startTime} - ${endTime}`);
                        console.log(`Existing Booking: ${booking.startTime} - ${booking.endTime}`);
                        console.log(`Has Overlap: ${overlap}`);
                        return overlap;
                    });
                    console.log(hasNoOverlap);
                    if (hasNoOverlap) {
                        availableDoctors.push(doctor);
                    }
                }
            }
        }
        return availableDoctors;
    };

    const handleChooseDoctor = (booking) => {

        //console.log(booking)
        //console.log(findAvailableDoctor(booking.day, booking.startTime, booking.endTime))
        // if (booking) {
        //     if (findAvailableDoctor(booking.day, booking.startTime, booking.endTime)) {

        console.log(findAvailableDoctor(booking.day, booking.startTime, booking.endTime));
        // //         console.log('rrrrrr')
        // findAvailableDoctor(booking.day, booking.startTime, booking.endTime)
        // console.log(
        //     findAvailableDoctor(booking.day, booking.startTime, booking.endTime));
        //     }
        // }
        //<option key={doctor.id} value={doctor.name}>{doctor.name}</option>
    };

    return (
        <div className="manage-booking-list container-fluid">
            <div className="row">
                <HeaderManager></HeaderManager>
                <div className="manage-booking-list-title">
                    <div className="manage-booking-list-title-text">Pet Health Care - Manage Booking Lists</div>
                </div>
                <div className="manage-booking-list-content">
                    <Sidebar></Sidebar>
                    <div className="manage-booking-main-content">
                        <div className="main-content-header">
                            <div className="main-content-header-search">
                                <div className="main-content-header-search-title">
                                    List of Booking
                                </div>
                                <div className="main-content-header-search-input-wrapper">
                                    <button type="button" className="search-input-btn">
                                        <img className="search-input-btn-icon" src={search_icon} alt='' />
                                    </button>
                                    <input type="text" placeholder="Search" className="main-content-header-search-input" />
                                </div>
                            </div>
                            <div className="main-content-header-add-booking">
                                <button type="button" className="booking-btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add Booking
                                </button>
                                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <form id="addPetForm" onSubmit={handleSubmit}>
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add Booking</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="modal-body-section">
                                                        <label>Type:</label>
                                                        <input type="radio" name="petOption" value="hasPetID" checked={petOption === "hasPetID"} onChange={handlePetOptionChange} /> <span>Has Pet ID</span>
                                                        <input type="radio" name="petOption" value="noPetID" checked={petOption === "noPetID"} onChange={handlePetOptionChange} /> <span>Not Has Pet ID</span>
                                                    </div>

                                                    {petOption === "hasPetID" && (
                                                        <div id="searchPetSection" className="modal-body-section">
                                                            <label>Search Pet ID:</label>
                                                            <input type="text" id="searchPetInput" />
                                                            <button type="button" onClick={handleSearchPet}>Search</button>
                                                            <select onChange={handlePetSelect}>
                                                                {petSearchResults.map((pet) => (
                                                                    <option key={pet.petID} value={pet.petID}>{`${pet.petID} - ${pet.name}`}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}

                                                    {petOption === "noPetID" && (
                                                        <div id="newPetSection" className="modal-body-section">
                                                            <label>Pet Name:</label>
                                                            <input type="text" value={petInfo.name || ""} onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })} />
                                                            <label>Species:</label>
                                                            <input type="text" value={petInfo.species || ""} onChange={(e) => setPetInfo({ ...petInfo, species: e.target.value })} />
                                                            <label>Breed:</label>
                                                            <input type="text" value={petInfo.breed || ""} onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })} />
                                                            <label>Age:</label>
                                                            <input type="number" value={petInfo.age || ""} onChange={(e) => setPetInfo({ ...petInfo, age: e.target.value })} />
                                                            <label>Gender:</label>
                                                            <input type="text" value={petInfo.gender || ""} onChange={(e) => setPetInfo({ ...petInfo, gender: e.target.value })} />
                                                        </div>
                                                    )}

                                                    <div className="modal-body-section">
                                                        <label>Customer:</label>
                                                        <input type="radio" name="ownerOption" value="hasOwnerID" checked={ownerOption === "hasOwnerID"} onChange={handleOwnerOptionChange} /><span>Have CustomerID</span>
                                                        <input type="radio" name="ownerOption" value="noOwnerID" checked={ownerOption === "noOwnerID"} onChange={handleOwnerOptionChange} /><span>Not Have CustomerID</span>
                                                    </div>

                                                    {ownerOption === "hasOwnerID" && (
                                                        <div id="searchOwnerSection" className="modal-body-section">
                                                            <label>Search Customer:</label>
                                                            <input type="text" id="searchOwnerInput" />
                                                            <button type="button" onClick={handleSearchOwner}>Tìm</button>
                                                            <select onChange={handleOwnerSelect}>
                                                                {ownerSearchResults.map((owner) => (
                                                                    <option key={owner.ownerID} value={owner.ownerID}>{`${owner.ownerID} - ${owner.name}`}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}

                                                    {ownerOption === "noOwnerID" && (
                                                        <div id="newOwnerSection" className="modal-body-section">
                                                            <label>Owner Name:</label>
                                                            <input type="text" value={ownerInfo.name || ""} onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })} />
                                                            <label>Email:</label>
                                                            <input type="email" value={ownerInfo.email || ""} onChange={(e) => setOwnerInfo({ ...ownerInfo, email: e.target.value })} />
                                                            <label>Phone Number:</label>
                                                            <input type="text" value={ownerInfo.phone || ""} onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })} />
                                                        </div>
                                                    )}

                                                    <div className="modal-body-section">
                                                        <label>Services used:</label>
                                                        {services.map((service, index) => (
                                                            <div key={index} className="service">
                                                                <label>Service:</label>
                                                                <select value={service.service} onChange={(e) => handleServiceChange(index, "service", e.target.value)}>
                                                                    {availableServices.map((availableService) => (
                                                                        <option key={availableService.id} value={availableService.name}>{availableService.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        ))}
                                                        <button type="button" onClick={addService}>Add service</button>
                                                    </div>

                                                    <div className="modal-body-section">
                                                        <label>Choose Date And Time:</label>
                                                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                                        <input type="time" value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)} />
                                                        <input type="time" value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)} />
                                                    </div>

                                                    <div className="modal-body-section">
                                                        <label>Veterinarian:</label>
                                                        <select id="veterinarian">
                                                            <option>Choose</option>
                                                            {doctorsData
                                                                .forEach((vet) => vet.workingHours.filter((workingHour) => {
                                                                    return selectedDate === workingHour.date
                                                                        && (workingHour.startTime <= selectedStartTime && selectedEndTime <= workingHour.endTime)
                                                                }))
                                                                // .map((vet) => (
                                                                //     <option key={vet.id} value={vet.name}>{vet.name}</option>
                                                                // ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" onClick={resetForm} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-success">Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-content-list">
                            <div className="main-content-list-title">
                                <div className="main-content-list-title-text">BookingID</div>
                                <div className="main-content-list-title-text">Day</div>
                                <div className="main-content-list-title-text">Start Time</div>
                                <div className="main-content-list-title-text">End Time</div>
                                <div className="main-content-list-title-text">Name</div>
                                <div className="main-content-list-title-text">Pet Type</div>
                                <div className="main-content-list-title-text">Service</div>
                                <div className="main-content-list-title-text">Doctor</div>
                                <div className="main-content-list-title-text">Check In</div>
                                <div className="main-content-list-title-text">Cancel Booking</div>
                                <div className="main-content-list-title-text">View</div>
                            </div>
                            <div className="main-content-list-body-wrapper">
                                {allBookings.map(booking => (
                                    <div className="content-list-body-info" key={booking.bookingID}>
                                        <div className="content-list-body-value">{booking.bookingID}</div>
                                        <div className="content-list-body-value">{booking.day}</div>
                                        <div className="content-list-body-value">{booking.startTime}</div>
                                        <div className="content-list-body-value">{booking.endTime}</div>
                                        <div className="content-list-body-value">{booking.name}</div>
                                        <div className="content-list-body-value">{booking.petType}</div>
                                        <div className="content-list-body-value">{booking.service}</div>
                                        <div className="content-list-body-value">
                                            {booking.doctor ? (
                                                booking.doctor
                                            ) : (
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#chooseDoctorModal-${booking.bookingID}`}>
                                                    Choose
                                                </button>
                                            )}
                                        </div>

                                        {/* Modal to choose doctor */}
                                        <div className="modal fade" id={`chooseDoctorModal-${booking.bookingID}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Choose Doctor</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <select className="form-control">
                                                            {findAvailableDoctor(booking.day, booking.startTime, booking.endTime).map((doctor) => {
                                                                return <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-list-body-value">
                                            <input
                                                type="checkbox"
                                                className="content-list-body-checkbox"
                                                defaultChecked={booking.checkIn}
                                            />
                                        </div>
                                        <div className="content-list-body-value">
                                            <input
                                                type="checkbox"
                                                className="content-list-body-checkbox"
                                                disabled
                                                defaultChecked={true}
                                            />
                                        </div>
                                        <div className="content-list-body-value">
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#moreinfo-${booking.bookingID}`}>
                                                More info
                                            </button>
                                        </div>

                                        {/* Modal for more info */}
                                        <div className="modal fade" id={`moreinfo-${booking.bookingID}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        ....
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#123">Previous</a>
                            </li>
                            <li className="page-item active" aria-current="page">
                                <a className="page-link" href="#123">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#123">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#123">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#123">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default ManageListBooking;
