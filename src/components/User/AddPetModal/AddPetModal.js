import './AddPetModal.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axiosInstance from '../../../utils/axiosInstance';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddPetModal = ({ isOpen, onClose, onAddPet, onLoadingChange }) => {
  const { user } = useContext(AuthContext);
  const [newPet, setNewPet] = useState({
    name: '',
    age: '',
    breed: '',
    type: '',
    gender: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
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
    if (!imageFile) {
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

  const addPet = async () => {
    if (!validateFields()) {
      return;
    }
    onLoadingChange(true);
    try {
      const imageRef = ref(storage, `pets/${user.accountID}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      const res = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/pet/add`,
        {
          accountID: user.accountID,
          name: newPet.name,
          birthday: newPet.age,
          breed: newPet.breed,
          type: newPet.type,
          gender: newPet.gender,
          image: imageUrl,
        },
      );

      const petID = res.data.petID;
      onAddPet({ petID, ...newPet, image: imageUrl });
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
    } catch (error) {
      console.error('Error adding pet:', error);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const currentDate = new Date();

    if (name === 'age') {
      const selectedDate = new Date(value);
      if (selectedDate > currentDate) {
        setErrorMessageAge('Age cannot be a future date');
        return;
      }
    }

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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setErrorMessageImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleModalClick = e => {
    if (e.target.classList.contains('modal-choose-pet')) {
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
          onClick={() => {
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
            onClose();
          }}
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
          onClick={() => {
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
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddPetModal;
