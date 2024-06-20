import './YourPet.css';
import React, { useState, useEffect } from 'react';
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Images
import pet_img1 from '../../assets/images/img_YourPet/c2dc9a5328014cead97d6268b688a16e.jpg';
import pet_img2 from '../../assets/images/img_YourPet/30c8eac7d84112a145ab7b06ce9e6eb1.jpg';
import pet_img3 from '../../assets/images/img_YourPet/f86eb143541c5a58b7132ab54d6d1f12.jpg';
import Sidebar from '../../components/User/Sidebar/Sidebar.js';
import AddPetModal from '../../components/User/AddPetModal/AddPetModal.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AnimationComponent from '../../components/Animation/AnimationComponent.js';

function YourPet() {
  const [pets, setPets] = useState([
    { id: 1, name: 'KiKi', image: pet_img1 },
    { id: 2, name: 'MiMi', image: pet_img2 },
    { id: 3, name: 'Lala', image: pet_img3 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
              {pets.map((pet, index) => (
                <PetProfileCard
                  key={index}
                  imgSrc={pet.image}
                  name={pet.name}
                />
              ))}
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
