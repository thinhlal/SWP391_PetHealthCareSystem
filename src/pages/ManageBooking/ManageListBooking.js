import './ManageListBooking.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useState, useEffect } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
import { SlowMotionVideo } from '@mui/icons-material';

function ManageListBooking() {

    const [petOption, setPetOption] = useState("");
    const [ownerOption, setOwnerOption] = useState("");
    const [petSearchResults, setPetSearchResults] = useState([]);
    const [ownerSearchResults, setOwnerSearchResults] = useState([]);
    const [petInfo, setPetInfo] = useState({});
    const [ownerInfo, setOwnerInfo] = useState({});
    const [services, setServices] = useState([{ service: "" }]);
    const [availableVets, setAvailableVets] = useState([
        { id: 1, name: "Dr. Nguyễn Văn A", availableSlots: [{ startTime: "2024-06-01T08:00", endTime: "2024-06-01T09:00" }, { startTime: "2024-07-01T10:00", endTime: "2024-07-01T11:00" }] },
        { id: 2, name: "Dr. Nguyễn Văn A", availableSlots: [{ startTime: "2024-06-01T11:00", endTime: "2024-06-01T13:00" }, { startTime: "2024-07-01T10:00", endTime: "2024-07-01T11:00" }] },
        { id: 3, name: "Dr. Nguyễn Văn A", availableSlots: [{ startTime: "2024-06-01T08:30", endTime: "2024-06-01T09:30" }, { startTime: "2024-07-01T10:00", endTime: "2024-07-01T12:00" }] }
    ]);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fake data for bookings
        const fakeBookings = [
            { bookingID: "SE123456", bookingDate: "2024-06-01T08:00", name: "John Doe", petType: "Dog", service: "Blooming", doctor: "Chen", checkIn: false },
            { bookingID: "SE123457", bookingDate: "2024-06-01T09:00", name: "Jane Doe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false },
            { bookingID: "SE123458", bookingDate: "2024-06-01T09:00", name: "B Doe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false },
            { bookingID: "SE123459", bookingDate: "2024-06-01T13:00", name: "B Doe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false },
            { bookingID: "SE123460", bookingDate: "2024-06-01T09:00", name: "C Doe", petType: "Cat", service: "X-ray", doctor: "", checkIn: false }
        ];
        setBookings(fakeBookings);
    }, []);

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
        const formData = {
            petInfo,
            ownerInfo,
            services,
            reasonForAdmission: document.getElementById("reasonForAdmission").value,
            currentCondition: document.getElementById("currentCondition").value,
            cageNumber: document.getElementById("cageNumber").value,
            admissionTime: document.getElementById("admissionTime").value,
            veterinarian: document.getElementById("veterinarian").value,
        };
        console.log(formData);
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
        setAvailableVets([
            { id: 1, name: "Dr. Nguyễn Văn A", availableSlots: ["2024-06-01T08:00", "2024-06-01T09:00", "2024-06-01T10:00"] },
            { id: 2, name: "Dr. Trần Thị B", availableSlots: ["2024-06-01T11:00", "2024-06-01T13:00", "2024-06-01T15:00"] },
            { id: 3, name: "Dr. Lê Văn C", availableSlots: ["2024-06-01T08:30", "2024-06-01T09:30", "2024-06-01T10:30"] }
        ]);
        setSelectedDate("");
        setSelectedTime("");
        document.getElementById("addPetForm").reset();
    };

    const handleChooseDoctor = (booking) => {
        const time = booking.startTime.split('T')[1];
        const availableVetsForBooking = availableVets.filter(vet => {
            // Check if the selected time is within the available slots


            const startTime = vet.availableSlots.some(slot => {
                console.log(slot)
                return slot.startTime.split['T'][1] <= time <= slot.endTime.split['T'][1] 
            });
            console.log(startTime);
            const [endTime] = vet.availableSlots.endTime.split('T');

            // Check if the selected time is not within the booked slots
            const isNotBooked = !vet.bookings.some(booking => booking === selectedTime);
            console.log(startTime);
            //return isWithinWorkingHours && isNotBooked;
        }); return availableVetsForBooking.map(vet => (
            <option key={vet.id} value={vet.name}>{vet.name}</option>
        ));
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
                                                        <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                                                    </div>

                                                    <div className="modal-body-section">
                                                        <label>Veterinarian:</label>
                                                        <select id="veterinarian">
                                                            <option>Choose</option>
                                                            {availableVets
                                                                .filter((vet) => vet.availableSlots.includes(`${selectedDate}T${selectedTime}`))
                                                                .map((vet) => (
                                                                    <option key={vet.id} value={vet.name}>{vet.name}</option>
                                                                ))}
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
                                <div className="main-content-list-title-text">Booking date</div>
                                <div className="main-content-list-title-text">Name</div>
                                <div className="main-content-list-title-text">Pet Type</div>
                                <div className="main-content-list-title-text">Service</div>
                                <div className="main-content-list-title-text">Doctor</div>
                                <div className="main-content-list-title-text">Check In</div>
                                <div className="main-content-list-title-text">Cancel Booking</div>
                                <div className="main-content-list-title-text">View</div>
                            </div>
                            <div className="main-content-list-body-wrapper">
                                {bookings.map(booking => (
                                    <div className="content-list-body-info" key={booking.bookingID}>
                                        <div className="content-list-body-value">{booking.bookingID}</div>
                                        <div className="content-list-body-value">{booking.bookingDate}</div>
                                        <div className="content-list-body-value">{booking.name}</div>
                                        <div className="content-list-body-value">{booking.petType}</div>
                                        <div className="content-list-body-value">{booking.service}</div>
                                        <div className="content-list-body-value">
                                            {booking.doctor ? (
                                                booking.doctor
                                            ) : (
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#chooseDoctorModal-${booking.bookingID}`}>
                                                    Choose Doctor
                                                </button>
                                            )}
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
                                                            {handleChooseDoctor(booking.bookingDate)}
                                                        </select>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary">Save</button>
                                                    </div>
                                                </div>
                                            </div>
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
