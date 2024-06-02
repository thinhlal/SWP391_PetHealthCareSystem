//css
import './ManageCages.css';
//Component
import { useState } from 'react';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//images
import search_icon from '../../assets/images/img_ManageBookings/search.svg'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function ManageCages() {
    const [petOption, setPetOption] = useState("");
    const [ownerOption, setOwnerOption] = useState("");
    const [petSearchResults, setPetSearchResults] = useState([]);
    const [ownerSearchResults, setOwnerSearchResults] = useState([]);
    const [petInfo, setPetInfo] = useState({});
    const [ownerInfo, setOwnerInfo] = useState({});
    const [services, setServices] = useState([{ service: "", date: "" }]);
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
        setServices([...services, { service: "", date: "" }]);
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
        setServices([{ service: "", date: "" }]);
        setAvailableVets([
            { id: 1, name: "Dr. Nguyễn Văn A", availableSlots: ["2024-06-01T08:00", "2024-06-01T09:00", "2024-06-01T10:00"] },
            { id: 2, name: "Dr. Trần Thị B", availableSlots: ["2024-06-01T11:00", "2024-06-01T13:00", "2024-06-01T15:00"] },
            { id: 3, name: "Dr. Lê Văn C", availableSlots: ["2024-06-01T08:30", "2024-06-01T09:30", "2024-06-01T10:30"] }
        ]);
        setSelectedDate("");
        setSelectedTime("");
        document.getElementById("addPetForm").reset();
    };

    // more information
    const [activeTab, setActiveTab] = useState('Profile');

    const openTab = (tabName) => {
      setActiveTab(tabName);
    };
    return (
        <div className="manage-cages container-fluid">
            <div className="row">
                <HeaderManager></HeaderManager>
                <div className="manage-cages-title">
                    <div className="manage-cages-title-text">Pet Health Care - Manage Cages</div>
                </div>
                <div className="manage-cages-content">
                    <Sidebar></Sidebar>
                    <div className="manage-booking-main-content">
                        <div className="main-content-header">
                            <div className="main-content-header-search">
                                <div className="main-content-header-search-title">
                                    Search Cage Number
                                </div>
                                <div className="main-content-header-search-input-wrapper">
                                    <button type="button" className="search-input-btn">
                                        <img className="search-input-btn-icon" src={search_icon} alt='' />
                                    </button>
                                    <input type="text" placeholder="Search" className="main-content-header-search-input" />
                                </div>                               
                            </div>

                            
                            <div className="filter-cage-number">
                                        <FilterAltIcon />
                                        Select Type:
                                        <select className="Status-Select-Filter" name="role">
                                            <option>Empty</option>
                                            <option>Using</option>
                                        
                                        </select>
                            </div>

                            <div className="main-content-header-add-booking">
                                
                                <button type="button" className="booking-btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add Pet
                                </button>
                                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">

                                        <form id="addPetForm" onSubmit={handleSubmit}>
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
                                                            <label>Address:</label>
                                                            <input type="text" value={ownerInfo.address || ""} onChange={(e) => setOwnerInfo({ ...ownerInfo, address: e.target.value })} />
                                                            <label>Phone Number:</label>
                                                            <input type="text" value={ownerInfo.phone || ""} onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })} />
                                                        </div>
                                                    )}

                                                    <div className="modal-body-section">
                                                        <label>Reason for Admission:</label>
                                                        <input type="text" id="reasonForAdmission" />
                                                        <label>Current Condition:</label>
                                                        <input type="text" id="currentCondition" />
                                                    </div>

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
                                                                <label>Service Date:</label>
                                                                <input type="date" value={service.date} onChange={(e) => handleServiceChange(index, "date", e.target.value)} />
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
                                                            {availableVets
                                                                .filter((vet) => vet.availableSlots.includes(`${selectedDate}T${selectedTime}`))
                                                                .map((vet) => (
                                                                    <option key={vet.id} value={vet.name}>{vet.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    <div className="modal-body-section">
                                                        <label>Cage Number:</label>
                                                        <input type="text" id="cageNumber" />
                                                        <label>Admission Time:</label>
                                                        <input type="datetime-local" id="admissionTime" />
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
                                <div className="main-content-list-title-text">CageID</div>
                                <div className="main-content-list-title-text">Cage Name</div>
                                <div className="main-content-list-title-text">Description</div>
                                <div className="main-content-list-title-text">Status</div>
                                <div className="main-content-list-title-text-button">Details</div>
                                <div className="main-content-list-title-text-button">Update</div>
                            </div>

                            {/* col-1 */}
                            <div className="main-content-list-body-wrapper">
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">CG111111</div>
                                    <div className="content-list-body-value">A01</div>
                                    <div className="content-list-body-value">Large Cage</div>
                                    <div className="content-list-body-value">
                                        Using
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more_info">
                                            More Details
                                        </button>
                                    </div>
                                    <div className="modal fade" id="more_info" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">More Info</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                <div className="container-modal-body-more-info">
                                                    <div className="tab-modal-body-more-info">
                                                        <button
                                                          className={`tablinks ${activeTab === 'Profile' ? 'active' : ''}`}
                                                          onClick={() => openTab('Profile')}>
                                                          Customer Profile
                                                        </button>
                                                
                                                        <button
                                                          className={`tablinks ${activeTab === 'Vacancies' ? 'active' : ''}`}
                                                          onClick={() => openTab('Vacancies')}>
                                                          Pet
                                                        </button>
                                                    </div>
                                                    
                                                    {/* profile customer */}
                                                    <div id="profile-customer" className="tabcontent-customer" style={{ display: activeTab === 'Profile' ? 'flex' : 'none' }}>
                                                        <div className="profile-pic">
                                                          <button className="change-btn">Change</button>
                                                        </div>
                                                
                                                        <form className="profile-form">
                                                          <div className="form-group">
                                                            <div className='sub-title-profile'>Name:</div>
                                                            <input type="text" className="edit-customer" name="name" defaultValue="Liza Doe" />
                                                          </div>
                                                
                                                          <div className="form-group">
                                                            <div className='sub-title-profile'>Email:</div>
                                                            <input type="email" className="edit-customer" name="email" defaultValue="support@gmail.com" />
                                                          </div>
                                                
                                                          <div className="form-group">
                                                            <div className='sub-title-profile'>Phone:</div>
                                                            <input type="tel" className="edit-customer" name="phone" defaultValue="+1234 55 66 777" />
                                                          </div>
                                    
                                                        </form>
                                                    </div>
                                                    
                                                    {/* pet profile */}
                                                    <div id="Vacancies" className="tabcontent-pet" style={{ display: activeTab === 'Vacancies' ? 'flex' : 'none' }}>
                                                    <div className="pet-profile-pic">
                                                          <button className="change-btn">Change:</button>
                                                    </div>
                                                    <form className="pet-profile-form">
                                                          <div className="form-group">
                                                            <div className='sub-title-profile-pet'>Name:</div>
                                                            <input type="text" className="edit-pet" name="name" defaultValue="Boby" />
                                                          </div>
                                                
                                                          <div className="form-group">
                                                            <div className='sub-title-profile-pet'>Breed:</div>
                                                            <input type="text" className="edit-pet" name="breed" defaultValue="Golden" />
                                                          </div>
                                                
                                                          <div className="form-group">
                                                            <div className='sub-title-profile-pet'>Species:</div>
                                                            <input type="text" className="edit-pet" name="species" defaultValue="Dog" />
                                                          </div>

                                                          <div className="form-group">
                                                            <div className='sub-title-profile-pet'>Gender:</div>
                                                            <input type="text" className="edit-pet" name="gender" defaultValue="Male" />
                                                          </div>

                                                          <div className="form-group">
                                                            <div className='sub-title-profile-pet'>In cage:</div>
                                                            <input type="text" className="edit-pet" name="in-cage" defaultValue="Good" />
                                                          </div>
                                    
                                                        </form>
                                                      </div>
                                                    </div>
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-status">
                                            Update
                                        </button>
                                    </div>
                                    <div className="modal fade" id="update-status" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <form>
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of Cage:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="empty" name="status-of-cage" value="Empty" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Empty</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="using" name="status-of-cage" value="Using" />
                                                                <div className='modal-body-update-status-using-text'>Using</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of pet:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="NotRecover" name="status-of-pet" value="NotRecover" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Not Recover</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="Recover" name="status-of-pet" value="Recover" />
                                                                <div className='modal-body-update-status-using-text'>Recover</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-text'>
                                                            <div className='modal-body-update-text-title'>Update Info Of Pet:</div>
                                                            <div className='modal-body-update-text-info'>
                                                                <div className="mb-3">
                                                                    <textarea className="form-control" rows="3" name='update-info-of-pet'></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Update</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* col-2 */}
                            <div className="main-content-list-body-wrapper">
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">CG222222</div>
                                    <div className="content-list-body-value">A02</div>
                                    <div className="content-list-body-value">Large Cage</div>
                                    <div className="content-list-body-value">
                                        Using
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#more_info">
                                            More Details
                                        </button>
                                    </div>
                                    <div className="modal fade" id="more_info" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">More Info</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-status">
                                            Update
                                        </button>
                                    </div>
                                    <div className="modal fade" id="update-status" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <form>
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of Cage:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="empty" name="status-of-cage" value="Empty" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Empty</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="using" name="status-of-cage" value="Using" />
                                                                <div className='modal-body-update-status-using-text'>Using</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of pet:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="NotRecover" name="status-of-pet" value="NotRecover" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Not Recover</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="Recover" name="status-of-pet" value="Recover" />
                                                                <div className='modal-body-update-status-using-text'>Recover</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-text'>
                                                            <div className='modal-body-update-text-title'>Update Info Of Pet:</div>
                                                            <div className='modal-body-update-text-info'>
                                                                <div className="mb-3">
                                                                    <textarea className="form-control" rows="3" name='update-info-of-pet'></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Update</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* col-3 */}
                            <div className="main-content-list-body-wrapper">
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">CG333333</div>
                                    <div className="content-list-body-value">A03</div>
                                    <div className="content-list-body-value">Large Cage</div>
                                    <div className="content-list-body-value">
                                        Empty
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary-empty" data-bs-toggle="modal" data-bs-target="#more_info">
                                            More Details
                                        </button>
                                    </div>
                                    <div className="modal fade" id="more_info" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">More Info</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-status">
                                            Update
                                        </button>
                                    </div>
                                    <div className="modal fade" id="update-status" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <form>
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of Cage:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="empty" name="status-of-cage" value="Empty" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Empty</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="using" name="status-of-cage" value="Using" />
                                                                <div className='modal-body-update-status-using-text'>Using</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of pet:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="NotRecover" name="status-of-pet" value="NotRecover" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Not Recover</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="Recover" name="status-of-pet" value="Recover" />
                                                                <div className='modal-body-update-status-using-text'>Recover</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-text'>
                                                            <div className='modal-body-update-text-title'>Update Info Of Pet:</div>
                                                            <div className='modal-body-update-text-info'>
                                                                <div className="mb-3">
                                                                    <textarea className="form-control" rows="3" name='update-info-of-pet'></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Update</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* col-4 */}
                            <div className="main-content-list-body-wrapper">
                                <div className="content-list-body-info">
                                    <div className="content-list-body-value">CG444444</div>
                                    <div className="content-list-body-value">A04</div>
                                    <div className="content-list-body-value">Large Cage</div>
                                    <div className="content-list-body-value">
                                        Empty
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary-empty" data-bs-toggle="modal" data-bs-target="#more_info">
                                            More Details
                                        </button>
                                    </div>
                                    <div className="modal fade" id="more_info" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">More Info</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                      
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-list-body-value-button">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-status">
                                            Update
                                        </button>
                                    </div>
                                    <div className="modal fade" id="update-status" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <form>
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of Cage:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="empty" name="status-of-cage" value="Empty" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Empty</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="using" name="status-of-cage" value="Using" />
                                                                <div className='modal-body-update-status-using-text'>Using</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-status'>
                                                            <div className='modal-body-update-status-title'>Status of pet:</div>
                                                            <div className='modal-body-update-status-empty'>
                                                                <input type="radio" id="NotRecover" name="status-of-pet" value="NotRecover" defaultChecked />
                                                                <div className='modal-body-update-status-empty-text'>Not Recover</div>
                                                            </div>
                                                            <div className='modal-body-update-status-using'>
                                                                <input type="radio" id="Recover" name="status-of-pet" value="Recover" />
                                                                <div className='modal-body-update-status-using-text'>Recover</div>
                                                            </div>
                                                        </div>
                                                        <div className='modal-body-update-text'>
                                                            <div className='modal-body-update-text-title'>Update Info Of Pet:</div>
                                                            <div className='modal-body-update-text-info'>
                                                                <div className="mb-3">
                                                                    <textarea className="form-control" rows="3" name='update-info-of-pet'></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Update</button>
                                                    </div>
                                                </div>
                                            </form>
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
    )
}



export default ManageCages;