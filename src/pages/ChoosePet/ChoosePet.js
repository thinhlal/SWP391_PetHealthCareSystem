import './ChoosePet.css';
import React, { useState } from 'react';
// image
import image_pet_1 from '../../assets/images/img_ChoosePet/pexels-wildlittlethingsphoto-2253275.jpg';
import image_pet_2 from '../../assets/images/img_ChoosePet/pexels-ingewallu-177809.jpg';
import image_pet_3 from '../../assets/images/img_ChoosePet/pexels-svetozar-milashevich-99573-1490908.jpg'
// components
import Header from '../../components/User/Header/Header'
import Footer from "../../components/User/Footer/Footer.js";

function ChoosePet() {
  const [pets, setPets] = useState([
    { id: 1, name: 'KiKi', image: image_pet_1 },
    { id: 2, name: 'MiMi', image: image_pet_2 },
    { id: 3, name: 'Lala', image: image_pet_3 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const addPet = () => {
    if (!validateFields()) {
      return;
    }
    const pet = { id: pets.length + 1, ...newPet };
    setPets([...pets, pet]);
    setIsModalOpen(false);
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

  const handleChange = (e) => {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPet({ ...newPet, image: reader.result });
      setImagePreview(reader.result);
      setErrorMessageImage('');
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deletePet = (id) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetErrors();
    setImagePreview('');
    setNewPet({
      name: '',
      age: '',
      breed: '',
      type: '',
      gender: '',
      image: '',
    });
  }

  return (
    <div className="main-choose-pet">
      <Header></Header>
      <div className='sub-choose-pet'>
        <div className='main-title-choose-pet'>
          <div className='title-choose-pet'>Select Pet</div>
          <div className='title-choose-pet'>Choose which pet to have an appointment</div>
        </div>
        <div className="choose-pet-container">
          <div className="choose-pet-card add-more-pet" onClick={() => setIsModalOpen(true)}>
            <div className="add-icon">+</div>
            <div>Add Pet</div>
          </div>
          {pets.map((pet) => (
            <div className="choose-pet-card" key={pet.id}>
              <img src={pet.image} alt={pet.name} />
              <div className='name-pet-card'>{pet.name}</div>
              <div className='main-button-choose-pet'>
                <button className='button-choose-pet'>Select</button>
                <button className="button-choose-pet" onClick={() => deletePet(pet.id)}>Delete</button>
              </div>
            </div>
          ))}

        </div>
        <button className="select-service-pet">Booking</button>

        {isModalOpen && (
          <div className="modal-choose-pet show">
            <div className="modal-choose-pet-content show">
              <div className='title-modal-choose-pet'>Add New Pet</div>
              <form>
                <div className='choose-pet-img-wrapper'>
                  {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                  <input className='choose-img-pet' type="file" name="image" onChange={handleImageChange} />
                  {errorMessageImage && <div className="error-message">{errorMessageImage}</div>}
                </div>
                <div className='choose-pet-input-wrapper'>
                  <div className='choose-pet-input-text-title'>
                    Name:
                  </div>
                  <input type="text" name="name" placeholder="Name" value={newPet.name} onChange={handleChange} />
                  {errorMessageName && <div className="error-message">{errorMessageName}</div>}
                </div>
                <div className='choose-pet-input-wrapper'>
                  <div className='choose-pet-input-text-title'>
                    BirthDay:
                  </div>
                  <input type="date" name="age" placeholder="Birthday" value={newPet.age} onChange={handleChange} />
                  {errorMessageAge && <div className="error-message">{errorMessageAge}</div>}
                </div>
                <div className='choose-pet-input-wrapper'>
                  <div className='choose-pet-input-text-title'>
                    Breed:
                  </div>
                  <input type="text" name="breed" placeholder="Breed" value={newPet.breed} onChange={handleChange} />
                  {errorMessageBreed && <div className="error-message">{errorMessageBreed}</div>}
                </div>
                <div className='choose-pet-input-wrapper'>
                  <div className='choose-pet-input-text-title'>
                    Type:
                  </div>
                  <select name="type" value={newPet.type} onChange={handleChange}>
                    <option value="" disabled defaultValue>Type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                  {errorMessageType && <div className="error-message">{errorMessageType}</div>}
                </div>
                <div className='choose-pet-input-wrapper'>
                  <div className='choose-pet-input-text-title'>
                    Gender:
                  </div>
                  <select name="gender" value={newPet.gender} onChange={handleChange}>
                    <option value="" disabled defaultValue>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errorMessageGender && <div className="error-message">{errorMessageGender}</div>}
                </div>
              </form>
              <button className='button-modal-choose-pet' onClick={addPet}>Add Pet</button>
              <button className='button-modal-choose-pet' onClick={() => closeModal()}>Close</button>
            </div>
          </div>
        )}

      </div>
      <Footer></Footer>
    </div>
  );
}

export default ChoosePet;
