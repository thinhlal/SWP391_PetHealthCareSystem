import './ChoosePet.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// components
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import AddPetModal from '../../components/User/AddPetModal/AddPetModal.js';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.js';

function ChoosePet() {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petID, setSelectedPetId] = useState(null);
  const petContainerRef = useRef(null);
  const navigate = useNavigate();

  const addPet = pet => {
    setPets([...pets, pet]);
  };

  const handleSelectPet = id => {
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
    if (petID !== null) {
      navigate('/booking', { state: { petID } });
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

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const idToCheckRole = user.id;
        const customerID = user.id;
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/pet`,
          { idToCheckRole, customerID },
        );
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [user]);

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
          {pets.length === 0 ? (
            <div className='no-pet'>
              Currently, there are no pets available in the list. Please add pet
              to see
            </div>
          ) : (
            pets.map((pet, index) => (
              <div
                className={`choose-pet-card ${petID === pet.id ? 'selected' : ''}`}
                key={index}
                onClick={() => handleSelectPet(pet.id)}
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                />
                <div className='name-pet-card'>{pet.name}</div>
                <div className='choose-pet-id-card'>PetID:&nbsp;{pet.id}</div>
              </div>
            ))
          )}
        </div>
        <button
          className='select-service-pet'
          onClick={handleBooking}
        >
          Booking
        </button>
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
