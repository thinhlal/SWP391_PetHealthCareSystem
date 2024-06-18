import './ManageCages.css';
import { useState, useEffect } from 'react';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import search_icon from '../../assets/images/img_ManageBookings/search.svg';

function ManageCages() {
  const [petOption, setPetOption] = useState('');
  const [ownerOption, setOwnerOption] = useState('');
  const [petSearchResults, setPetSearchResults] = useState([]);
  const [ownerSearchResults, setOwnerSearchResults] = useState([]);
  const [petInfo, setPetInfo] = useState({ species: 'Dog', breed: 'Golden Retriever', gender: 'Male' });
  const [ownerInfo, setOwnerInfo] = useState({});
  const [services, setServices] = useState([{ service: 'X-quang', date: '' }]);
  const [availableVets] = useState([
    { id: 1, name: 'Dr. John', availableSlots: ['2024-06-01T06:00', '2024-06-02T06:00', '2024-06-03T06:00'] },
    { id: 2, name: 'Dr. Jane', availableSlots: ['2024-06-01T06:00', '2024-06-02T06:00', '2024-06-03T06:00'] },
    { id: 3, name: 'Dr. Emily', availableSlots: ['2024-06-01T06:00', '2024-06-02T06:00', '2024-06-03T06:00'] },
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedVet, setSelectedVet] = useState('Dr. John');
  const [activeTab, setActiveTab] = useState('Profile');
  const [cageData, setCageData] = useState([
    { id: 'CG111111', name: 'A01', description: 'Large Cage', status: 'Using', petStatus: 'Not Recover', petDetails: { name: 'Boby', breed: 'Golden', species: 'Dog', gender: 'Male', inCage: 'Good', services: 'X-quang', dateTime: '10:00 AM | 2024-06-02', doctor: 'Johny', cageNumber: 'A01', admissionTime: '15:00 AM | 2024-10-02', ownerName: 'Liza Doe', email: 'support@gmail.com', phone: '+1234 55 66 777' } },
    { id: 'CG222222', name: 'A02', description: 'Large Cage', status: 'Using', petStatus: 'Not Recover', petDetails: { name: 'Boby', breed: 'Golden', species: 'Dog', gender: 'Male', inCage: 'Good', services: 'X-quang', dateTime: '10:00 AM | 2024-06-02', doctor: 'Johny', cageNumber: 'A01', admissionTime: '15:00 AM | 2024-10-02', ownerName: 'Liza Doe', email: 'support@gmail.com', phone: '+1234 55 66 777' } },
    { id: 'CG333333', name: 'A03', description: 'Large Cage', status: 'Empty', petStatus: 'Not Recover', petDetails: {} },
    { id: 'CG444444', name: 'A04', description: 'Large Cage', status: 'Empty', petStatus: 'Not Recover', petDetails: {} },
    { id: 'CG555555', name: 'A05', description: 'Large Cage', status: 'Empty', petStatus: 'Not Recover', petDetails: {} },
  ]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const availableServices = [
    { id: 1, name: 'X-quang' },
    { id: 2, name: 'Siêu âm' },
    { id: 3, name: 'Khám tổng quát' },
    { id: 4, name: 'Tiêm chủng' },
  ];

  const handlePetOptionChange = event => {
    setPetOption(event.target.value);
  };

  const handleOwnerOptionChange = event => {
    setOwnerOption(event.target.value);
  };

  const handleSearchPet = () => {
    const query = document.getElementById('searchPetInput').value;
    fetch(`/searchPet?query=${query}`)
      .then(response => response.json())
      .then(data => setPetSearchResults(data))
      .catch(error => console.error('Error:', error));
  };

  const handlePetSelect = event => {
    const petID = event.target.value;
    fetch(`/getPetInfo?petID=${petID}`)
      .then(response => response.json())
      .then(data => setPetInfo(data))
      .catch(error => console.error('Error:', error));
  };

  const handleSearchOwner = () => {
    const query = document.getElementById('searchOwnerInput').value;
    fetch(`/searchOwner?query=${query}`)
      .then(response => response.json())
      .then(data => setOwnerSearchResults(data))
      .catch(error => console.error('Error:', error));
  };

  const handleOwnerSelect = event => {
    const ownerID = event.target.value;
    fetch(`/getOwnerInfo?ownerID=${ownerID}`)
      .then(response => response.json())
      .then(data => setOwnerInfo(data))
      .catch(error => console.error('Error:', error));
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { service: 'X-quang', date: '' }]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      petInfo,
      ownerInfo,
      services,
      reasonForAdmission: document.getElementById('reasonForAdmission').value,
      currentCondition: document.getElementById('currentCondition').value,
      cageNumber: selectedCage.name,
      admissionTime: document.getElementById('admissionTime').value,
      veterinarian: selectedVet,
    };

    const updatedCageData = cageData.map(cage => {
      if (cage.id === selectedCage.id) {
        return {
          ...cage,
          status: 'Using',
          petDetails: {
            ...formData.petInfo,
            inCage: formData.currentCondition,
            services: services.map(service => service.service).join(', '),
            dateTime: `${selectedTime} | ${selectedDate}`,
            doctor: formData.veterinarian,
            cageNumber: formData.cageNumber,
            admissionTime: formData.admissionTime,
            ownerName: formData.ownerInfo.name,
            email: formData.ownerInfo.email,
            phone: formData.ownerInfo.phone,
          },
        };
      }
      return cage;
    });

    setCageData(updatedCageData);
    document.querySelector('#exampleModal .btn-close').click();
  };

  const resetForm = () => {
    setPetOption('');
    setOwnerOption('');
    setPetSearchResults([]);
    setOwnerSearchResults([]);
    setPetInfo({ species: 'Dog', breed: 'Golden Retriever', gender: 'Male' });
    setOwnerInfo({});
    setServices([{ service: 'X-quang', date: '' }]);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedVet('Dr. John');
    document.getElementById('addPetForm').reset();
  };

  const openTab = tabName => {
    setActiveTab(tabName);
  };

  const handleUpdateStatus = (cageId, newCageStatus, newPetStatus) => {
    const updatedCageData = cageData.map(cage => {
      if (cage.id === cageId) {
        const updatedStatus = newPetStatus === 'Recover' ? 'Empty' : 'Using';
        const updatedCage = { ...cage, status: updatedStatus, petStatus: newPetStatus };
        if (updatedStatus === 'Empty') {
          updatedCage.petDetails = {};
        }
        return updatedCage;
      }
      return cage;
    });
    setCageData(updatedCageData);
  };

  const handleStatusFilterChange = event => {
    setStatusFilter(event.target.value);
  };

  const filteredCageData = cageData.filter(cage => {
    if (statusFilter === 'All') return true;
    return cage.status === statusFilter;
  });

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const availableVet = availableVets.find(vet => vet.availableSlots.includes(`${selectedDate}T${selectedTime}`));
      if (availableVet) {
        setSelectedVet(availableVet.name);
      } else {
        setSelectedVet('');
      }
    }
  }, [selectedDate, selectedTime, availableVets]);

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

              {/* add pet button */}
              <div className='main-content-header-add-booking'>
                <button
                  type='button'
                  className='booking-btn-add'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'
                  onClick={() => setSelectedCage(cageData.find(cage => cage.status === 'Empty'))}
                >
                  Add Pet
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
                            Add Pet
                          </h1>
                          <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>

                        <div className='modal-body'>
                          <div className='modal-body-section'>
                            <label>Pet:</label>
                            <input
                              type='radio'
                              name='petOption'
                              value='hasPetID'
                              checked={petOption === 'hasPetID'}
                              onChange={handlePetOptionChange}
                            />{' '}
                            <span>Has Pet ID</span>
                            <input
                              type='radio'
                              name='petOption'
                              value='noPetID'
                              checked={petOption === 'noPetID'}
                              onChange={handlePetOptionChange}
                            />{' '}
                            <span>Not Has Pet ID</span>
                          </div>

                          {petOption === 'hasPetID' && (
                            <div
                              id='searchPetSection'
                              className='modal-body-section'
                            >
                              <label>Search Pet ID:</label>
                              <input
                                type='text'
                                id='searchPetInput'
                              />
                              <button
                                type='button'
                                onClick={handleSearchPet}
                              >
                                Search
                              </button>
                              <select onChange={handlePetSelect}>
                                {petSearchResults.map(pet => (
                                  <option
                                    key={pet.petID}
                                    value={pet.petID}
                                  >{`${pet.petID} - ${pet.name}`}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          {petOption === 'noPetID' && (
                            <div
                              id='newPetSection'
                              className='modal-body-section'
                            >
                              <label>Pet Name:</label>
                              <input
                                type='text'
                                value={petInfo.name || ''}
                                onChange={e =>
                                  setPetInfo({
                                    ...petInfo,
                                    name: e.target.value,
                                  })
                                }
                              />
                              <label>Species:</label>
                              <select
                                value={petInfo.species || ''}
                                onChange={e =>
                                  setPetInfo({
                                    ...petInfo,
                                    species: e.target.value,
                                  })
                                }
                              >
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                              </select>
                              <label>Breed:</label>
                              <select
                                value={petInfo.breed || ''}
                                onChange={e =>
                                  setPetInfo({
                                    ...petInfo,
                                    breed: e.target.value,
                                  })
                                }
                              >
                                {petInfo.species === 'Dog' ? (
                                  <>
                                    <option value='Golden Retriever'>Golden Retriever</option>
                                    <option value='Labrador'>Labrador</option>
                                    <option value='Poodle'>Poodle</option>
                                  </>
                                ) : (
                                  <>
                                    <option value='Persian'>Persian</option>
                                    <option value='Siamese'>Siamese</option>
                                    <option value='Maine Coon'>Maine Coon</option>
                                  </>
                                )}
                              </select>
                              <label>Gender:</label>
                              <select
                                value={petInfo.gender || ''}
                                onChange={e =>
                                  setPetInfo({
                                    ...petInfo,
                                    gender: e.target.value,
                                  })
                                }
                              >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                              </select>
                            </div>
                          )}

                          <div className='modal-body-section'>
                            <label>Customer:</label>
                            <input
                              type='radio'
                              name='ownerOption'
                              value='hasOwnerID'
                              checked={ownerOption === 'hasOwnerID'}
                              onChange={handleOwnerOptionChange}
                            />
                            <span>Have CustomerID</span>
                            <input
                              type='radio'
                              name='ownerOption'
                              value='noOwnerID'
                              checked={ownerOption === 'noOwnerID'}
                              onChange={handleOwnerOptionChange}
                            />
                            <span>Not Have CustomerID</span>
                          </div>

                          {ownerOption === 'hasOwnerID' && (
                            <div
                              id='searchOwnerSection'
                              className='modal-body-section'
                            >
                              <label>Search Customer:</label>
                              <input
                                type='text'
                                id='searchOwnerInput'
                              />
                              <button
                                type='button'
                                onClick={handleSearchOwner}
                              >
                                Search
                              </button>
                              <select onChange={handleOwnerSelect}>
                                {ownerSearchResults.map(owner => (
                                  <option
                                    key={owner.ownerID}
                                    value={owner.ownerID}
                                  >{`${owner.ownerID} - ${owner.name}`}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          {ownerOption === 'noOwnerID' && (
                            <div
                              id='newOwnerSection'
                              className='modal-body-section'
                            >
                              <label>Owner Name:</label>
                              <input
                                type='text'
                                value={ownerInfo.name || ''}
                                onChange={e =>
                                  setOwnerInfo({
                                    ...ownerInfo,
                                    name: e.target.value,
                                  })
                                }
                              />
                              <label>Email:</label>
                              <input
                                type='text'
                                value={ownerInfo.email || ''}
                                onChange={e =>
                                  setOwnerInfo({
                                    ...ownerInfo,
                                    email: e.target.value,
                                  })
                                }
                              />
                              <label>Phone Number:</label>
                              <input
                                type='text'
                                value={ownerInfo.phone || ''}
                                onChange={e =>
                                  setOwnerInfo({
                                    ...ownerInfo,
                                    phone: e.target.value,
                                  })
                                }
                              />
                              <label>Reason for Admission:</label>
                              <input
                                type='text'
                                id='reasonForAdmission'
                              />
                              <label>Current Condition:</label>
                              <input
                                type='text'
                                id='currentCondition'
                              />
                            </div>
                          )}

                          <div className='modal-body-section'>
                            <label>Services used:</label>
                            {services.map((service, index) => (
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
                                >
                                  {availableServices.map(availableService => (
                                    <option
                                      key={availableService.id}
                                      value={availableService.name}
                                    >
                                      {availableService.name}
                                    </option>
                                  ))}
                                </select>
                                <label>Service Date:</label>
                                <input
                                  type='date'
                                  value={service.date}
                                  onChange={e =>
                                    handleServiceChange(
                                      index,
                                      'date',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <button
                              type='button'
                              onClick={addService}
                            >
                              Add service
                            </button>
                          </div>

                          <div className='modal-body-section'>
                            <label>Choose Date And Time:</label>
                            <input
                              type='date'
                              value={selectedDate}
                              onChange={e => setSelectedDate(e.target.value)}
                            />
                            <input
                              type='time'
                              value={selectedTime}
                              onChange={e => setSelectedTime(e.target.value)}
                            />
                          </div>

                          <div className='modal-body-section'>
                            <label>Veterinarian:</label>
                            <select
                              id='veterinarian'
                              value={selectedVet}
                              onChange={e => setSelectedVet(e.target.value)}
                            >
                              {availableVets
                                .filter(vet =>
                                  vet.availableSlots.includes(
                                    `${selectedDate}T${selectedTime}`,
                                  ),
                                )
                                .map(vet => (
                                  <option
                                    key={vet.id}
                                    value={vet.name}
                                  >
                                    {vet.name}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className='modal-body-section'>
                            <label>Cage Number:</label>
                            <input
                              type='text'
                              id='cageNumber'
                              value={selectedCage ? selectedCage.name : ''}
                              readOnly
                            />
                            <label>Admission Time:</label>
                            <input
                              type='datetime-local'
                              id='admissionTime'
                            />
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
                  key={cage.id}
                >
                  <div className='content-list-body-info'>
                    <div className='content-list-body-value'>{cage.id}</div>
                    <div className='content-list-body-value'>{cage.name}</div>
                    <div className='content-list-body-value'>
                      {cage.description}
                    </div>
                    <div
                      className={`content-list-body-value ${cage.status === 'Using' ? 'status-using' : 'status-empty'}`}
                    >
                      {cage.status}
                    </div>
                    <div className='content-list-body-value-button'>
                      {cage.status !== 'Empty' && (
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target={`#more_info_${cage.id}`}
                          onClick={() => setSelectedCage(cage)}
                        >
                          More Details
                        </button>
                      )}
                    </div>
                    
                    <div
                      className='modal fade'
                      id={`more_info_${cage.id}`}
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

                              {/* profile customer */}
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
                                      value={selectedCage?.petDetails.ownerName || ''}
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
                                      value={selectedCage?.petDetails.email || ''}
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
                                      value={selectedCage?.petDetails.phone || ''}
                                      readOnly
                                    />
                                  </div>
                                </form>
                              </div>

                              {/* pet profile */}
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
                                      value={selectedCage?.petDetails.name || ''}
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
                                      value={selectedCage?.petDetails.breed || ''}
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Species:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='species'
                                      value={selectedCage?.petDetails.species || ''}
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
                                      value={selectedCage?.petDetails.gender || ''}
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      In cage:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='in-cage'
                                      value={selectedCage?.petDetails.inCage || ''}
                                      readOnly
                                    />
                                  </div>
                                </form>
                              </div>

                              {/* more */}
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
                                      Services:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='services'
                                      value={selectedCage?.petDetails.services || ''}
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Service Date:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='dateTime'
                                      value={selectedCage?.petDetails.dateTime || ''}
                                      readOnly
                                    />
                                  </div>

                                  <div className='form-group'>
                                    <div className='sub-title-profile-pet'>
                                      Doctor:
                                    </div>
                                    <input
                                      type='text'
                                      className='edit-pet'
                                      name='doctor'
                                      value={selectedCage?.petDetails.doctor || ''}
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
                                      value={selectedCage?.petDetails.cageNumber || ''}
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
                                      value={selectedCage?.petDetails.admissionTime || ''}
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
                      {cage.status === 'Empty' && (
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-bs-toggle='modal'
                          data-bs-target='#exampleModal'
                          onClick={() => setSelectedCage(cage)}
                        >
                          Add Pet
                        </button>
                      )}
                      {cage.status === 'Using' && (
                        <button
                          type='button'
                          className='btn btn-primary'
                          data-bs-toggle='modal'
                          data-bs-target={`#update_status_${cage.id}`}
                          onClick={() => setSelectedCage(cage)}
                        >
                          Update
                        </button>
                      )}
                    </div>
                    <div
                      className='modal fade'
                      id={`update_status_${cage.id}`}
                      aria-labelledby='exampleModalLabel'
                      aria-hidden='true'
                    >
                      <div className='modal-dialog'>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            handleUpdateStatus(
                              selectedCage.id,
                              e.target['status-of-cage'].value,
                              e.target['status-of-pet'].value,
                            );
                            document
                              .querySelector(
                                `#update_status_${cage.id} .btn-close`,
                              )
                              .click();
                          }}
                        >
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
                                  Status of Cage:
                                </div>
                                <div className='modal-body-update-status-using'>
                                  <input
                                    type='radio'
                                    id='using'
                                    name='status-of-cage'
                                    value='Using'
                                    defaultChecked={
                                      selectedCage?.status === 'Using' ||
                                      !selectedCage?.id
                                    }
                                  />
                                  <div className='modal-body-update-status-using-text'>
                                    Using
                                  </div>
                                </div>
                              </div>
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
                                    defaultChecked={
                                      selectedCage?.petStatus ===
                                        'NotRecover' || !selectedCage?.id
                                    }
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
                                    defaultChecked={
                                      selectedCage?.petStatus === 'Recover'
                                    }
                                  />
                                  <div className='modal-body-update-status-using-text'>
                                    Recover
                                  </div>
                                </div>
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
