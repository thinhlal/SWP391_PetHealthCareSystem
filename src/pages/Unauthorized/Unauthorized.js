import React, { useContext, useEffect, useState } from 'react';
import './Unauthorized.css';
import { AuthContext } from '../../context/AuthContext';

const Unauthorized = () => {
  const { user } = useContext(AuthContext);
  const [url, setURL] = useState({
    url: '',
    describe: '',
  });

  useEffect(() => {
    const checkRoleToNavigate = () => {
      if (user.role === 'Customer') {
        setURL({ url: '/', describe: 'Home' });
      } else if (user.role === 'Staff') {
        setURL({ url: '/manage-booking', describe: 'manage' });
      } else if (user.role === 'Doctor') {
        setURL({ url: '/work-schedule', describe: 'work schedule' });
      } else if (user.role === 'Admin') {
        setURL({ url: '/admin-statistic', describe: 'admin' });
      }
    };
    checkRoleToNavigate();
  }, [user.role]);
  return (
    <div className='unauthorized-container'>
      <h1>401</h1>
      <p>You are not authorized for selected action</p>
      <a href={url.url}>Go to {url.describe} page</a>
    </div>
  );
};

export default Unauthorized;
