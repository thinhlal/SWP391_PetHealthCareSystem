//css
import './Header.css';
import { useContext } from 'react';
//img
import logo from '../../../assets/images/Components/User/Header/logo.png';
import userAccount from '../../../assets/images/Components/User/Header/img-7.png';
import { AuthContext } from '../../../context/AuthContext';
function Header() {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className='main-header-user-overlap'>
      <div className='main-header-navigation'>
        <img
          className='main-header-logo'
          src={logo}
          alt=''
        />
        <div className='main-header-menu'>
          <div className='header_link'>
            <a
              href='/'
              className='header_link-text'
            >
              Home
            </a>
          </div>
          <div className='header_link'>
            <a
              href='services'
              className='header_link-text'
            >
              Services
            </a>
          </div>
          <div className='header_link'>
            <a
              href='#123'
              className='header_link-text'
            >
              About us
            </a>
          </div>
          <div className='header_link'>
            <a
              href='#123'
              className='header_link-text'
            >
              Contact
            </a>
          </div>
        </div>
        <div className='main-header-user_wrapper'>
          <div className='main-header-user'>
            <div className='main-header-user-account'>
              <img
                className='account_icon'
                src={userAccount}
                alt=''
              />
              <div className='main-header-user-account-name'>Hi {user.username}</div>
              <div className='main-header-user-account_menu'>
                <div className='main-header-user-account_menu-item'>
                  Your Bookings
                </div>
                <div className='main-header-user-account_menu-item'>
                  View Your Pet
                </div>
                <div onClick={logOut} className='main-header-user-account_menu-item'>
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
