import React, { useState } from 'react';
import './ProfilePet.css';
// component
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import pet_img1 from '../../assets/images/img_YourPet/c2dc9a5328014cead97d6268b688a16e.jpg';

function ProfilePet() {
  const initialPetData = {
    name: 'KiKi',
    age: '3',
    typeOfPet: 'Dog',
    petParent: 'Minh',
    status: 'Active',
    lastVaccination: '',
    nextVaccination: '',
    vaccinations: [],
    medicalInfo: [],
    id: '012345',
  };

  const [petData, setPetData] = useState(initialPetData);
  const [isEditing, setIsEditing] = useState(false);
  const [newPetData, setNewPetData] = useState(initialPetData);
  const [isAddingVaccination, setIsAddingVaccination] = useState(false);
  const [newVaccination, setNewVaccination] = useState({
    date: '',
    age: '',
    vaccine: '',
    nextDate: '',
    label: '',
  });

  const [isEditingMedical, setIsEditingMedical] = useState(false);
  const [newMedicalInfo, setNewMedicalInfo] = useState({
    microchipNumber: '',
    petPassportNumber: '',
    spayNeuterStatus: 'No',
    otherConditions: '',
    notes: '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  const handleMedicalEditClick = () => {
    setIsEditingMedical(true);
  };

  const handleMedicalCloseClick = () => {
    setIsEditingMedical(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPetData({ ...newPetData, [name]: value });
  };

  const handleMedicalInputChange = e => {
    const { name, value } = e.target;
    setNewMedicalInfo({ ...newMedicalInfo, [name]: value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setPetData(newPetData);
    setIsEditing(false);
  };

  const handleMedicalFormSubmit = e => {
    e.preventDefault();
    setPetData(prevData => ({
      ...prevData,
      medicalInfo: [...prevData.medicalInfo, newMedicalInfo],
    }));
    setNewMedicalInfo({
      microchipNumber: '',
      petPassportNumber: '',
      spayNeuterStatus: 'No',
      otherConditions: '',
      notes: '',
    });
    setIsEditingMedical(false);
  };

  const handleAddVaccinationClick = () => {
    setIsAddingVaccination(true);
  };

  const handleCloseAddVaccinationClick = () => {
    setIsAddingVaccination(false);
  };

  const handleVaccinationInputChange = e => {
    const { name, value } = e.target;
    setNewVaccination({ ...newVaccination, [name]: value });
  };

  const handleVaccinationFormSubmit = e => {
    e.preventDefault();
    setPetData(prevData => ({
      ...prevData,
      vaccinations: [...prevData.vaccinations, newVaccination],
    }));
    setIsAddingVaccination(false);
    setNewVaccination({
      date: '',
      age: '',
      vaccine: '',
      nextDate: '',
      label: '',
    });
  };

  const handleDeleteVaccination = index => {
    setPetData(prevData => ({
      ...prevData,
      vaccinations: prevData.vaccinations.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteMedicalInfo = index => {
    setPetData(prevData => ({
      ...prevData,
      medicalInfo: prevData.medicalInfo.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className='main-container-pet-profile'>
      <Header />
      <div className='container-pet-profile'>
        <div className='sidebar-pet-profile'>
          <div className='pet-avatar'>
            <img
              src={pet_img1}
              alt='Pet Avatar'
            />
          </div>
          <div className='pet-parent'>
            <div className='sub-title-info-pet'>
              <strong>Pet Parent</strong>{' '}
            </div>
            <div>{petData.petParent}</div>
            <div className='sub-title-info-pet'>
              <strong>ID:&nbsp;</strong>{' '}
              <span className='ID-pet-profile'>{petData.id}</span>
            </div>
          </div>
        </div>
        <div className='main-content-pet'>
          <div className='pet-info'>
            <div className='main-edit-button-pet-info'>
              <button
                onClick={handleEditClick}
                className='edit-button-pet-info'
              >
                Edit
              </button>
            </div>
            <div className='pet-details-profile'>
              <div className='title-pet-profile'>
                {' '}
                <span className='sub-title-info-pet'>Name:</span> {petData.name}
              </div>
              <div className='title-pet-profile'>
                {' '}
                <span className='sub-title-info-pet'>Age:</span> {petData.age}
                &nbsp;Year old
              </div>
              <div className='title-pet-profile'>
                {' '}
                <span className='sub-title-info-pet'>Weight: -</span>
              </div>
              <div className='title-pet-profile'>
                {' '}
                <span className='sub-title-info-pet'>Type Of Pet: </span>
                {petData.typeOfPet}
              </div>
            </div>

            {isEditing && (
              <form
                onSubmit={handleFormSubmit}
                className='edit-form'
              >
                <label>
                  Name:
                  <input
                    type='text'
                    name='name'
                    value={newPetData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Age:
                  <input
                    type='text'
                    name='age'
                    value={newPetData.age}
                    onChange={handleInputChange}
                  />
                </label>
                <label className='select-pet-type'>
                  Type Of Pet:
                  <select
                    name='typeOfPet'
                    value={newPetData.typeOfPet}
                    onChange={handleInputChange}
                  >
                    <option value='Dog'>Dog</option>
                    <option value='Cat'>Cat</option>
                  </select>
                </label>
                <button
                  type='submit'
                  className='save-button'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={handleCloseClick}
                  className='close-button'
                >
                  Close
                </button>
              </form>
            )}
          </div>

          <div className='medical-info'>
            <div className='sub-title-info-pet-line'>My Medical Info</div>
            <div className='main-add-button-medical'>
              <button
                onClick={handleMedicalEditClick}
                className='edit-button-medical'
              >
                Add
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Microchip Number</th>
                  <th>Pet Passport Number</th>
                  <th>Spay / Neuter Status</th>
                  <th>Other Conditions</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {petData.medicalInfo.length === 0 ? (
                  <tr>
                    <td colSpan='6'>No medical information available.</td>
                  </tr>
                ) : (
                  petData.medicalInfo.map((info, index) => (
                    <tr key={index}>
                      <td>{info.microchipNumber}</td>
                      <td>{info.petPassportNumber}</td>
                      <td>{info.spayNeuterStatus}</td>
                      <td>{info.otherConditions}</td>
                      <td>{info.notes}</td>
                      <td>
                        {/* <button onClick={handleMedicalEditClick} className="edit-button-medical">Edit</button> */}
                        <button
                          onClick={() => handleDeleteMedicalInfo(index)}
                          className='delete-button-medical'
                        >
                          Delete
                        </button>
                        <button className='view-button-medical'>View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {isEditingMedical && (
              <form
                onSubmit={handleMedicalFormSubmit}
                className='edit-medical-form'
              >
                <label>
                  Microchip Number:
                  <input
                    type='text'
                    name='microchipNumber'
                    value={newMedicalInfo.microchipNumber}
                    onChange={handleMedicalInputChange}
                  />
                </label>
                <label>
                  Pet Passport Number:
                  <input
                    type='text'
                    name='petPassportNumber'
                    value={newMedicalInfo.petPassportNumber}
                    onChange={handleMedicalInputChange}
                  />
                </label>
                <label>
                  Spay / Neuter Status:
                  <select
                    name='spayNeuterStatus'
                    value={newMedicalInfo.spayNeuterStatus}
                    onChange={handleMedicalInputChange}
                  >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </label>
                <label>
                  Other Conditions:
                  <input
                    type='text'
                    name='otherConditions'
                    value={newMedicalInfo.otherConditions}
                    onChange={handleMedicalInputChange}
                  />
                </label>
                <label>
                  Notes:
                  <textarea
                    name='notes'
                    value={newMedicalInfo.notes}
                    onChange={handleMedicalInputChange}
                  />
                </label>
                <button
                  type='submit'
                  className='save-button'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={handleMedicalCloseClick}
                  className='close-button'
                >
                  Close
                </button>
              </form>
            )}
          </div>

          <div className='vaccination-info'>
            <div className='sub-title-info-pet-line'>My Vaccination Info</div>
            <div className='main-add-button-vaccination'>
              <button
                onClick={handleAddVaccinationClick}
                className='add-button-vaccination'
              >
                Add
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Vaccination Date</th>
                  <th>Age</th>
                  <th>Vaccines</th>
                  <th>Next Vaccination Date</th>
                  <th>Vaccination Label</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {petData.vaccinations.length === 0 ? (
                  <tr>
                    <td colSpan='6'>You didn't have any vaccination yet.</td>
                  </tr>
                ) : (
                  petData.vaccinations.map((vaccine, index) => (
                    <tr key={index}>
                      <td>{vaccine.date}</td>
                      <td>{vaccine.age}</td>
                      <td>{vaccine.vaccine}</td>
                      <td>{vaccine.nextDate}</td>
                      <td>{vaccine.label}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteVaccination(index)}
                          className='delete-button-vaccination'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {isAddingVaccination && (
              <form
                onSubmit={handleVaccinationFormSubmit}
                className='add-vaccination-form'
              >
                <label>
                  Date:
                  <input
                    type='date'
                    name='date'
                    value={newVaccination.date}
                    onChange={handleVaccinationInputChange}
                  />
                </label>
                <label>
                  Age:
                  <input
                    type='text'
                    name='age'
                    value={newVaccination.age}
                    onChange={handleVaccinationInputChange}
                  />
                </label>
                <label>
                  Vaccine:
                  <input
                    type='text'
                    name='vaccine'
                    value={newVaccination.vaccine}
                    onChange={handleVaccinationInputChange}
                  />
                </label>
                <label>
                  Next Date:
                  <input
                    type='date'
                    name='nextDate'
                    value={newVaccination.nextDate}
                    onChange={handleVaccinationInputChange}
                  />
                </label>
                <label>
                  Label:
                  <input
                    type='text'
                    name='label'
                    value={newVaccination.label}
                    onChange={handleVaccinationInputChange}
                  />
                </label>
                <button
                  type='submit'
                  className='save-button'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={handleCloseAddVaccinationClick}
                  className='close-button'
                >
                  Close
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePet;
