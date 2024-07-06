import './Header.css';
import React, { useContext } from 'react';
import logo_pet_health_care from '../../../assets/images/img_AdminRating/logo_pethealthcare.png';
import { AuthContext } from '../../../context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='Admin-Header row'>
      <div className='Admin-Header-Logo col-md-2'>
        <img
          className='Admin-Logo '
          src={logo_pet_health_care}
          alt='logo-pet'
        />
      </div>
      <div className='Admin-Header-Account-Wrapper col-md-10'>
        <div className='Admin-Header-Account'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='#000'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
          </svg>
          <div className='Admin-Header-Account-Text'>
            Hi {user.adminDetails[0].name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
