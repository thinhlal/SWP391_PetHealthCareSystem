//css
import './Header.css';
//img
import logo from '../../../assets/images/Components/User/Header/logo.png';
import userAccount from '../../../assets/images/Components/User/Header/img-7.png';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
function Header() {
  const { logOut, user } = useContext(AuthContext);
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
        <div className='main-header-user_wrapper'>
          <div className='main-header-user'>
            <div className='main-header-user-account'>
              <img
                className='account_icon'
                src={userAccount}
                alt=''
              />
              <div className='main-header-user-account-name'>
                Hi {user?.doctorDetails[0]?.name}
              </div>
              <div className='main-header-user-account_menu'>
                <a
                  className='forward'
                  href='work-schedule'
                >
                  <div className='main-header-user-account_menu-item'>
                    Work Schedule
                  </div>
                </a>
                <div className='main-header-user-account_menu-item'>
                  Settings
                </div>
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
