import './ChoosePet.css';
import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// image
import image_pet_1 from '../../assets/images/img_ChoosePet/pexels-wildlittlethingsphoto-2253275.jpg';
import image_pet_2 from '../../assets/images/img_ChoosePet/pexels-ingewallu-177809.jpg';
import image_pet_3 from '../../assets/images/img_ChoosePet/pexels-svetozar-milashevich-99573-1490908.jpg';

// components
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import AddPetModal from '../../components/User/AddPetModal/AddPetModal.js';
import AnimationComponent from '../../components/Animation/AnimationComponent.js'; // Import component animation
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ChoosePet() {
  const [pets, setPets] = useState([
    { id: 1, name: 'KiKi', image: image_pet_1, petID: '000001' },
    { id: 2, name: 'MiMi', image: image_pet_2, petID: '000002' },
    { id: 3, name: 'Lala', image: image_pet_3, petID: '000003' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const petContainerRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const addPet = pet => {
    setPets([...pets, pet]);
  };

  const handleSelectPet = (id) => {
    setSelectedPetId(id);
  };

  const handleClickOutside = event => {
    if (
      petContainerRef.current &&
      !petContainerRef.current.contains(event.target)
    ) {
      // Không làm gì để không hủy chọn thú cưng khi nhấn ra ngoài
    }
  };

  const handleBooking = () => {
    if (selectedPetId !== null) {
      const selectedPet = pets.find(pet => pet.id === selectedPetId);
      navigate('/booking', { state: { selectedPet } });
    } else {
      alert('Please select a pet first.');
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Giả lập thời gian tải trang
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Thời gian giả lập tải trang (2 giây)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AnimationComponent />;
  }

  return (
    <div className='main-choose-pet'>
      <Header />
      <div className='sub-choose-pet'>
        <div className='main-title-choose-pet'>
          <div className='title-choose-pet'>Select Pet</div>
          <div className='title-choose-pet'>
            Choose which pet to have an appointment
          </div>
        </div>
        <div
          className='choose-pet-container'
          ref={petContainerRef}
        >
          <div
            className='choose-pet-card add-more-pet'
            onClick={() => setIsModalOpen(true)}
          >
            <div className='add-icon'>+</div>
            <div>Add Pet</div>
          </div>
          {pets.map(pet => (
            <div
              className={`choose-pet-card ${selectedPetId === pet.id ? 'selected' : ''}`}
              key={pet.id}
              onClick={() => handleSelectPet(pet.id)}
            >
              <img
                src={pet.image}
                alt={pet.name}
              />
              <div className='name-pet-card'>{pet.name}</div>
              <div className='pet-id-card'>PetID:&nbsp;{pet.petID}</div>
            </div>
          ))}
        </div>
        <button className='select-service-pet' onClick={handleBooking}>Booking</button>
        <AddPetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddPet={addPet}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ChoosePet;
