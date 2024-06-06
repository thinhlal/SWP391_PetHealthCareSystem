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

  const addPet = () => {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPet({ ...newPet, image: reader.result });
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const deletePet = (id) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
  };

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
        <input className='choose-img-pet' type="file" name="image" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        <input type="text" name="name" placeholder="Name" value={newPet.name} onChange={handleChange} />
        <input type="text" name="age" placeholder="Age" value={newPet.age} onChange={handleChange} />
        <input type="text" name="breed" placeholder="Breed" value={newPet.breed} onChange={handleChange} />
        <form>
    <select name="type" value={newPet.type} onChange={handleChange}>
        <option value="" disabled selected>Type</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
    </select>
    
    <select name="gender" value={newPet.gender} onChange={handleChange}>
        <option value="" disabled selected>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
    </select>
</form>

      </form>
      <button className='button-modal-choose-pet' onClick={addPet}>Add Pet</button>
      <button className='button-modal-choose-pet' onClick={() => setIsModalOpen(false)}>Close</button>
    </div>
  </div>
)}

      </div>
      <Footer></Footer>
    </div>
  );
}

export default ChoosePet;
