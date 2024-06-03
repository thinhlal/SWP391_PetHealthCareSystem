//Css
import './ManageListBooking.css';
//Component
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import { useState } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//images
import search_icon from '../../assets/images/img_ManageBookings/search.svg'
import Sidebar from '../../components/Employee/Sidebar/Sidebar';

function ManageListBooking() {

    const [petOption, setPetOption] = useState("");
    const [ownerOption, setOwnerOption] = useState("");
    const [petSearchResults, setPetSearchResults] = useState([]);
    const [ownerSearchResults, setOwnerSearchResults] = useState([]);
    const [petInfo, setPetInfo] = useState({});
    const [ownerInfo, setOwnerInfo] = useState({});
    const [services, setServices] = useState([{ service: "" }]);
    const [availableVets, setAvailableVets] = useState([
        { id: 1, name: "Dr. Nguyễn Văn A", availableSlots: ["2024-06-01T08:00", "2024-06-01T09:00", "2024-06-01T10:00"] },
        { id: 2, name: "Dr. Trần Thị B", availableSlots: ["2024-06-01T11:00", "2024-06-01T13:00", "2024-06-01T15:00"] },
        { id: 3, name: "Dr. Lê Văn C", availableSlots: ["2024-06-01T08:30", "2024-06-01T09:30", "2024-06-01T10:30"] }
    ]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const availableServices = [
        { id: 1, name: "X-quang" },
        { id: 2, name: "Siêu âm" },
        { id: 3, name: "Khám tổng quát" },
        { id: 4, name: "Tiêm chủng" }
    ];

    const handlePetOptionChange = (event) => {
        console.log(event.target.value);
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
                                                    <button type="button" className="btn btn-success">Add</button>
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
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">ssss</div>
                                    <div className="content-list-body-value">Dog</div>
                                    <div className="content-list-body-value">Blooming</div>

                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#choosedoctor">
                                            Choose Doctor
                                        </button>
                                    </div>
                                    <div className="modal fade" id="choosedoctor" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Doctor List</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="add-booking">
                                                        <small className='title-add-booking'>Doctor:&nbsp;</small>
                                                        <select className="form-control" id="Doctor">
                                                            <option value="Doctor">NameDoctor</option>
                                                            <option value="Doctor">NameDoctor</option>
                                                            <option value="Doctor">NameDoctor</option>
                                                            <option value="Doctor">NameDoctor</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body-booking-pet">
                                                <div className="main-modal-content-booking-pet">
                                                   <i className="fa fa-close close" data-dismiss="modal"></i>
      
                                                   <div className="grid-container">
                                                     <div className="content-modal-booking-pet">
                                                       <div className="reason-booking-pet">
                                                         <span className="font-weight-bold">Pet Information</span>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Name Pet:&nbsp;</small>
                                                         <small>LuLu</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Breed species:&nbsp;</small>
                                                         <small>........</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>BirthDay:&nbsp;</small>
                                                         <small>24/12/2020</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Type:&nbsp;</small>
                                                         <small>Dog</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Gender:&nbsp;</small>
                                                         <small>Male</small>
                                                       </div>
                                                       
                                                     </div>

                                                     <div className="mb-3">
                                                       <hr className="new1" />
                                                     </div>

                                                     <div className="content-modal-booking-pet">
                                                       <div className="reason-booking-pet">
                                                         <span className="font-weight-bold">Customer Information</span>
                                                       </div>
                                                       <div className="reason-booking-pet">    
                                                         <small className='title-reason-booking-pet'>Customer ID:&nbsp;</small>
                                                         <small>2123</small>
                                                       </div>
                                                       <div className="reason-booking-pet">    
                                                         <small className='title-reason-booking-pet'>Account ID:&nbsp;</small>
                                                         <small>1213</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Name:&nbsp;</small>
                                                         <small>Nguyen Van A</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Phone:&nbsp;</small>
                                                         <small>12345675</small>
                                                       </div>
                                                       <div className="reason-booking-pet">
                                                         <small className='title-reason-booking-pet'>Email:&nbsp;</small>
                                                         <small>abc@gmail.com</small>
                                                       </div>
                                                
                                                     </div>

                                                     <div className="mb-3">
                                                       <hr className="new1" />
                                                     </div>
                                                   </div>
                                                 </div>                                             
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">ssss</div>
                                    <div className="content-list-body-value">Dog</div>
                                    <div className="content-list-body-value">Blooming</div>
                                    <div className="content-list-body-value">Chen</div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">ssss</div>
                                    <div className="content-list-body-value">Dog</div>
                                    <div className="content-list-body-value">Blooming</div>
                                    <div className="content-list-body-value">Chen</div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">SE123456</div>
                                    <div className="content-list-body-value">ssss</div>
                                    <div className="content-list-body-value">Dog</div>
                                    <div className="content-list-body-value">Blooming</div>
                                    <div className="content-list-body-value">Chen</div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <input
                                            type="checkbox"
                                            className="content-list-body-checkbox"
                                            disabled
                                            checked="checked"
                                        />
                                    </div>
                                    <div className="content-list-body-value">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moreinfo">
                                            More info
                                        </button>

                                    </div>
                                    <div className="modal fade" id="moreinfo" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    .....
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                            <li className="page-item" >
                                <a className="page-link" href="#123" >2</a>
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
        </div >
    );
}

export default ManageListBooking;
