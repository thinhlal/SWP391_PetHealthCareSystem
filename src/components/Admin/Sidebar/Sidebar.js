//css
import { useContext } from 'react';
import './Sidebar.css';
import { AuthContext } from '../../../context/AuthContext';

function Sidebar() {
  const { logOut } = useContext(AuthContext);
  return (
    <div className='main-sidebar-account'>
      <div className='Admin-Account-Navigate-Text'>
        <div className='Admin-Account-Navigate-Dashboard'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-house-door'
            viewBox='0 0 16 16'
          >
            <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z' />
          </svg>
          <a href='/admin-statistic'>
            <div className='Admin-Account-Navigate-Text-Dashboard'>
              DashBoard
            </div>
          </a>
        </div>
        <div className='Admin-Account-Navigate-Text-Rest'>
          <a href='/admin-statistic'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>
              Statistic
            </div>
          </a>
          <a href='/admin-dashboard'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>Booking</div>
          </a>
          <a href='/admin-account'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>Account</div>
          </a>
          <a href='/admin-services'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>
              Services
            </div>
          </a>
          <a href='/admin-cages'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>Cages</div>
          </a>
          <a href='/admin-rating'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>Rating</div>
          </a>
          <a href='/admin-vaccine'>
            <div className='Admin-Account-Navigate-Text-Rest-Menu'>Vaccine</div>
          </a>
        </div>
      </div>

      <div onClick={logOut}>
        <div className='Admin-Account-Navigate-Logout'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='42'
            fill='currentColor'
            className='bi bi-box-arrow-left'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
            />
            <path
              fillRule='evenodd'
              d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
            />
          </svg>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
