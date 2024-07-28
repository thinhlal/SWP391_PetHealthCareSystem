//css
import './Header.css';
//css
import logo from '../../../assets/images/Components/User/Header/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Avatar } from '@mui/material';

function Header() {
  const { logOut, user } = useContext(AuthContext);
  const pathname = window.location.pathname;

  return (
    <div className='main-header-doctor-overlap'>
      <div className='main-header-navigation'>
        <div>
          <img
            className='main-header-logo'
            src={logo}
            alt=''
          />
        </div>
        <div className='navbar'>
          <a
            className={`nav-item ${pathname === '/work-schedule' ? 'active' : ''}`}
            href='work-schedule'
          >
            Work Schedule
          </a>
          <a
            className={`nav-item ${pathname === '/time-table' ? 'active' : ''}`}
            href='time-table'
          >
            Working Time
          </a>
          <a
            className={`nav-item ${pathname === '/doctor-care' ? 'active' : ''}`}
            href='doctor-care'
          >
            Doctor Care
          </a>
          <a
            className={`nav-item ${pathname === '/doctor-profile' ? 'active' : ''}`}
            href='doctor-profile'
          >
            Profile
          </a>
        </div>
        <div className='main-header-user_wrapper'>
          <div className='main-header-user'>
            <div className='main-header-user-account'>
              <Avatar
                alt='Remy Sharp'
                className='doctor_account_icon'
                src={user.doctorDetails[0].image}
              />
              <div className='main-header-user-account-name'>
                Hi {user?.doctorDetails[0]?.name}
              </div>
              <div className='main-header-user-account_menu'>
                <div
                  className='main-header-user-account_menu-item'
                  onClick={logOut}
                >
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
