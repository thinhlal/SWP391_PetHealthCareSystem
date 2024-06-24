import './YourPet.css';
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from '../../components/User/Sidebar/Sidebar.js';
import AddPetModal from '../../components/User/AddPetModal/AddPetModal.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { AuthContext } from '../../context/AuthContext.js';

function YourPet() {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
          `${process.env.REACT_APP_API_URL}/pet/`,
          { idToCheckRole, customerID },
        );
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [user]);

  const addPet = pet => {
    setPets([...pets, pet]);
  };

  const PetProfileCard = ({ imgSrc, name }) => (
    <a
      href='/pet-profile'
      className='profile-card-link'
    >
      <div className='profile-card-pet'>
        <div className='profile-pet-image'>
          <img
            src={imgSrc}
            alt='Profile'
          />
        </div>
        <div className='profile-info-pet'>
          <h2>{name}</h2>
        </div>
      </div>
    </a>
  );

  if (loading) {
    return <AnimationComponent />;
  }

  return (
    <div className='container-fluid your-pet'>
      <div className='row'>
        <Header />
        <div className='main-tittle'>
          <div className='overlap-group'>
            <div className='text-tittle'>Pet Information</div>
          </div>
        </div>
        <div className='overlap'>
          <Sidebar />
          <div className='main-content'>
            <div className='your-Pet-Header'>
              <div className='search-pet'>
                <div className='search-pet-txt'>Search Your Pet Name</div>
                <div className='search-pet-input'>
                  <input
                    type='text'
                    placeholder='Search'
                    className='label-input'
                  />
                  <div className='search-pet-input-icons'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-search'
                      viewBox='0 0 16 16'
                    >
                      <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className='add-pet-button'
                onClick={() => setIsModalOpen(true)}
              >
                <div className='add-icon'>+</div>
                <div>Add Pet</div>
              </div>
            </div>

            <div className='detail-information'>
              {pets.length === 0 ? (
                <div className='no-pet-available'>
                  Currently, there are no pets available in the list. Please add
                  pet to see !!!
                </div>
              ) : (
                pets.map((pet, index) => (
                  <PetProfileCard
                    key={index}
                    imgSrc={pet.image}
                    name={pet.name}
                  />
                ))
              )}
            </div>
            <AddPetModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddPet={addPet}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default YourPet;
