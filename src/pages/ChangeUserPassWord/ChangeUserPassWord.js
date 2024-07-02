import React, { useContext, useState } from 'react';
import './ChangeUserPassWord.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const ChangeUserPassword = () => {
  const { user, logOut } = useContext(AuthContext);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    setMessage('');
  };

  const handleSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('New password and confirm password do not match!');
      return;
    }
    try {
      const res = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/user/changePassword`,
        {
          accountID: user.accountID,
          passwords,
        },
      );
      setMessage(res.data.message);
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // await axiosInstance.post(`${process.env.REACT_APP_API_URL}/user/deleteAccount`, {
      //   accountID: user.accountID,
      // })
      // console.log('here');
      // document.getElementById('hiddenDiv').click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-change-user-password-container'>
      <Header />
      <div className='ChangeUserPassword-container container-xl px-4 mt-4'>
        <nav className='ChangeUserPassword-nav nav nav-borders'>
          <a
            className='ChangeUserPassword-nav-link nav-link ms-0'
            href='/user-profile'
          >
            Profile
          </a>
          <a
            className='ChangeUserPassword-nav-link nav-link active'
            href='/change-user-password'
          >
            Security
          </a>
        </nav>
        <hr className='ChangeUserPassword-hr mt-0 mb-4' />
        <div className='row'>
          <div className='col-lg-8'>
            <div className='ChangeUserPassword-card card mb-4'>
              <div className='ChangeUserPassword-card-header card-header'>
                Change Password
              </div>
              <div className='ChangeUserPassword-card-body card-body'>
                <form>
                  <div className='mb-3'>
                    <label
                      className='small mb-1'
                      htmlFor='currentPassword'
                    >
                      Current Password
                    </label>
                    <input
                      className='ChangeUserPassword-form-control form-control'
                      id='currentPassword'
                      name='currentPassword'
                      type='password'
                      placeholder='Enter current password'
                      value={passwords.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label
                      className='small mb-1'
                      htmlFor='newPassword'
                    >
                      New Password
                    </label>
                    <input
                      className='ChangeUserPassword-form-control form-control'
                      id='newPassword'
                      name='newPassword'
                      type='password'
                      placeholder='Enter new password'
                      value={passwords.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label
                      className='small mb-1'
                      htmlFor='confirmPassword'
                    >
                      Confirm Password
                    </label>
                    <input
                      className='ChangeUserPassword-form-control form-control'
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      placeholder='Confirm new password'
                      value={passwords.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {message && <div className='error-message'>{message}</div>}
                  <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='ChangeUserPassword-card card mb-4'>
              <div className='ChangeUserPassword-card-header card-header'>
                Delete Account
              </div>
              <div className='ChangeUserPassword-card-body card-body'>
                <p>
                  Deleting your account is a permanent action and cannot be
                  undone. If you are sure you want to delete your account,
                  select the button below.
                </p>
                <div
                  id='hiddenDiv'
                  style={{ display: 'none' }}
                  onClick={logOut}
                ></div>
                <div
                  className='btn btn-danger-soft text-danger'
                  onClick={handleDeleteAccount}
                >
                  I understand, delete my account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangeUserPassword;
