//css
import './Header.css';
//img
import logo from '../../../assets/images/Components/User/Header/logo.png';
import userAccount from '../../../assets/images/Components/User/Header/img-7.png';
function Header() {
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
              <div className='main-header-user-account-name'>Hi Employee</div>
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
                <div className='main-header-user-account_menu-item'>
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
