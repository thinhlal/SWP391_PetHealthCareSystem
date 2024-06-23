import React, { useState } from 'react';
import './AddPetModal.css';
import axios from 'axios';

const AddPetModal = ({ isOpen, onClose, onAddPet }) => {
  const [newPet, setNewPet] = useState({
    name: '',
    age: '',
    breed: '',
    type: '',
    gender: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageAge, setErrorMessageAge] = useState('');
  const [errorMessageBreed, setErrorMessageBreed] = useState('');
  const [errorMessageType, setErrorMessageType] = useState('');
  const [errorMessageGender, setErrorMessageGender] = useState('');
  const [errorMessageImage, setErrorMessageImage] = useState('');

  const validateFields = () => {
    let valid = true;
    if (!newPet.name) {
      setErrorMessageName('Name is required');
      valid = false;
    } else {
      setErrorMessageName('');
    }
    if (!newPet.age) {
      setErrorMessageAge('Age is required');
      valid = false;
    } else {
      setErrorMessageAge('');
    }
    if (!newPet.breed) {
      setErrorMessageBreed('Breed is required');
      valid = false;
    } else {
      setErrorMessageBreed('');
    }
    if (!newPet.type) {
      setErrorMessageType('Type is required');
      valid = false;
    } else {
      setErrorMessageType('');
    }
    if (!newPet.gender) {
      setErrorMessageGender('Gender is required');
      valid = false;
    } else {
      setErrorMessageGender('');
    }
    if (!newPet.image) {
      setErrorMessageImage('Image is required');
      valid = false;
    } else {
      setErrorMessageImage('');
    }
    return valid;
  };

  const resetErrors = () => {
    setErrorMessageName('');
    setErrorMessageAge('');
    setErrorMessageBreed('');
    setErrorMessageType('');
    setErrorMessageGender('');
    setErrorMessageImage('');
  };

  const savePetToDb = () => {
    
    axios
      .post('http://localhost:5000/savepet', {
        name : newPet.name,
        birthday : newPet.age,
        breed : newPet.breed,
        type : newPet.type,
        gender : newPet.gender,
        image : newPet.image
      });
      // .then((response) => {
      //   console.log(response.data);
      // })
      // .catch((error) => {
      //   // Handle the error
      //   console.error('Error:', error);
      // });
  }

  const addPet = () => {
    if (!validateFields()) {
      return;
    }
    savePetToDb();
    const pet = { id: Date.now(), ...newPet };
    onAddPet(pet);
    onClose();
    setNewPet({
      name: '',
      age: '',
      breed: '',
      type: '',
      gender: '',
      image: '',
    });
    setImagePreview('');
    resetErrors();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });

    switch (name) {
      case 'name':
        setErrorMessageName('');
        break;
      case 'age':
        setErrorMessageAge('');
        break;
      case 'breed':
        setErrorMessageBreed('');
        break;
      case 'type':
        setErrorMessageType('');
        break;
      case 'gender':
        setErrorMessageGender('');
        break;
      default:
        break;
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewPet({ ...newPet, image: reader.result });
        setErrorMessageImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleModalClick = e => {
    if (e.target.classList.contains('modal-choose-pet')) {
      onClose();
    }
  };

  return (
    <div
      className='modal-choose-pet show'
      onClick={handleModalClick}
    >
      <div className='modal-choose-pet-content show'>
        <button
          className='modal-close-button'
          onClick={onClose}
        >
          ×
        </button>
        <div className='title-modal-choose-pet'>Add New Pet</div>
        <form>
          <div className='choose-pet-img-wrapper'>
            {imagePreview && (
              <img
                src={imagePreview}
                alt='Preview'
                className='choose-pet-image-preview'
              />
            )}
            <input
              className='choose-img-pet'
              type='file'
              name='image'
              onChange={handleImageChange}
            />
            {errorMessageImage && (
              <div className='choose-pet-error-message'>
                {errorMessageImage}
              </div>
            )}
          </div>
          <div className='choose-pet-input-wrapper'>
            <div className='choose-pet-input-text-title'>Name:</div>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={newPet.name}
              onChange={handleChange}
            />
            {errorMessageName && (
              <div className='choose-pet-error-message'>{errorMessageName}</div>
            )}
          </div>
          <div className='choose-pet-input-wrapper'>
            <div className='choose-pet-input-text-title'>BirthDay:</div>
            <input
              type='date'
              name='age'
              placeholder='Birthday'
              value={newPet.age}
              onChange={handleChange}
            />
            {errorMessageAge && (
              <div className='choose-pet-error-message'>{errorMessageAge}</div>
            )}
          </div>
          <div className='choose-pet-input-wrapper'>
            <div className='choose-pet-input-text-title'>Breed:</div>
            <input
              type='text'
              name='breed'
              placeholder='Breed'
              value={newPet.breed}
              onChange={handleChange}
            />
            {errorMessageBreed && (
              <div className='choose-pet-error-message'>
                {errorMessageBreed}
              </div>
            )}
          </div>
          <div className='choose-pet-input-wrapper'>
            <div className='choose-pet-input-text-title'>Type:</div>
            <select
              name='type'
              value={newPet.type}
              onChange={handleChange}
            >
              <option
                value=''
                disabled
                defaultValue
              >
                Type
              </option>
              <option value='dog'>Dog</option>
              <option value='cat'>Cat</option>
            </select>
            {errorMessageType && (
              <div className='choose-pet-error-message'>{errorMessageType}</div>
            )}
          </div>
          <div className='choose-pet-input-wrapper'>
            <div className='choose-pet-input-text-title'>Gender:</div>
            <select
              name='gender'
              value={newPet.gender}
              onChange={handleChange}
            >
              <option
                value=''
                disabled
                defaultValue
              >
                Gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {errorMessageGender && (
              <div className='choose-pet-error-message'>
                {errorMessageGender}
              </div>
            )}
          </div>
        </form>
        <button
          className='button-modal-choose-pet'
          onClick={addPet}
        >
          Add Pet
        </button>
        <button
          className='button-modal-choose-pet'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddPetModal;
