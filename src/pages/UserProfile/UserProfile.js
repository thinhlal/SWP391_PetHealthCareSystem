import React, { useContext, useEffect, useState } from 'react';
import './UserProfile.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    customerDetails: [{}],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });
  const [message, setMessage] = useState('');
  const [editAccountInfo, setEditAccountInfo] = useState({});

  useEffect(() => {
    const fetchAccountByID = async () => {
      if (user && user.accountID) {
        try {
          const response = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/user/getUserProfile/${user.accountID}`,
          );
          setProfile(response.data);
          setEditAccountInfo(response.data.customerDetails[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAccountByID();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'birthday' && !validateBirthday(value)) {
      return setErrors({ ...errors, birthday: 'Birthday cannot be in the future' });
    }
    setEditAccountInfo({ ...editAccountInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setMessage('');
  };

  const checkEmailExists = async email => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/checkEmail?email=${email}`,
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const checkPhoneExists = async phone => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/checkPhone?phone=${phone}`,
      );
      return response.data.exists;
    } catch (error) {
      console.error('Error checking phone:', error);
      return false;
    }
  };

  const handleSave = async () => {
    let emailError = '';
    let phoneError = '';
    if (editAccountInfo.email === profile.customerDetails[0].email
      && editAccountInfo.phone === profile.customerDetails[0].phone
      && editAccountInfo.birthday === profile.customerDetails[0].birthday
    ) {
      setErrors({ email: '', phone: '', birthday: '' });
      setIsEditing(false);
      return;
    }

    if (editAccountInfo.email !== profile.customerDetails[0].email) {
      if (!validateEmail(editAccountInfo.email)) {
        emailError = 'Invalid email address';
      } else {
        const emailExists = await checkEmailExists(editAccountInfo.email);
        if (emailExists) emailError = 'Email already exists';
      }
    }

    if (editAccountInfo.phone !== profile.customerDetails[0].phone) {
      if (!validatePhone(editAccountInfo.phone)) {
        phoneError = 'Invalid phone number';
      } else {
        const phoneExists = await checkPhoneExists(editAccountInfo.phone);
        if (phoneExists) phoneError = 'Phone number already exists';
      }
    }
    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
    } else {
      console.log(editAccountInfo);
      console.log(profile);
      try {
        const updateSuccess = await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/user/updateUserInfo`,
          {
            editAccountInfo,
          },
        );
        setMessage(updateSuccess.data);
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/user/getUserProfile/${user.accountID}`,
        );
        setProfile(response.data);
        setErrors({ email: '', phone: '' });
        setIsEditing(false);
      } catch (error) {
        console.error('Error update user info:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditAccountInfo(profile.customerDetails[0]);
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePictures/${user.accountID}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfile({
          ...profile,
          customerDetails: [
            { ...profile.customerDetails[0], image: downloadURL },
          ],
        });
        await axiosInstance.patch(
          `${process.env.REACT_APP_API_URL}/user/updateImageUser`,
          {
            image: downloadURL,
            customerID: user.customerDetails[0].customerID,
          },
        );
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const triggerFileSelectPopup = () => {
    document.querySelector('#fileInput').click();
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = phone => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateBirthday = birthday => {
    const today = new Date();
    const birthDate = new Date(birthday);
    return birthDate <= today;
  };

  return (
    <div className='main-user-profile-container'>
      <Header />
      <div className='UserProfile-container container-xl px-4 mt-4'>
        <nav className='UserProfile-nav nav nav-borders'>
          <a
            className='UserProfile-nav-link nav-link active ms-0'
            href='/user-profile'
          >
            Profile
          </a>
          <a
            className='UserProfile-nav-link nav-link'
            href='/change-user-password'
          >
            Security
          </a>
        </nav>
        <hr className='UserProfile-hr mt-0 mb-4' />
        <div className='row'>
          <div className='col-xl-4'>
            <div className='UserProfile-card card mb-4 mb-xl-0'>
              <div className='UserProfile-card-header card-header'>
                Profile Picture
              </div>
              <div className='UserProfile-card-body card-body text-center'>
                <img
                  className='UserProfile-img-account-profile rounded-circle mb-2'
                  src={profile?.customerDetails[0]?.image}
                  alt=''
                />
                <div className='small font-italic text-muted mb-4'>
                  JPG or PNG no larger than 5 MB
                </div>
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={triggerFileSelectPopup}
                >
                  Upload new image
                </button>
                <input
                  type='file'
                  id='fileInput'
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </div>
            </div>
          </div>
          <div className='col-xl-8'>
            <div className='UserProfile-card card mb-4'>
              <div className='UserProfile-card-header card-header'>
                Account Details
              </div>
              <div className='UserProfile-card-body card-body'>
                <form>
                  <div className='UserProfile-form-group mb-3'>
                    <label
                      className='small mb-1'
                      htmlFor='inputUsername'
                    >
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <input
                      className='UserProfile-form-control form-control'
                      id='inputUsername'
                      name='username'
                      type='text'
                      placeholder='Enter your username'
                      value={profile?.username || ''}
                      readOnly
                    />
                  </div>
                  <div className='row gx-3 mb-3'>
                    <div className='col-md-12'>
                      <label
                        className='small mb-1'
                        htmlFor='inputFirstName'
                      >
                        Name
                      </label>
                      <div className='d-flex'>
                        <input
                          className='UserProfile-form-control form-control'
                          id='inputFirstName'
                          name='name'
                          type='text'
                          placeholder='Enter your first name'
                          value={editAccountInfo.name || ''}
                          onChange={handleChange}
                          readOnly={!isEditing}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className='UserProfile-form-group mb-3'>
                    <label
                      className='small mb-1'
                      htmlFor='inputEmailAddress'
                    >
                      Email address
                    </label>
                    <div className='d-flex'>
                      <input
                        required
                        className='UserProfile-form-control form-control'
                        id='inputEmailAddress'
                        name='email'
                        type='email'
                        placeholder='Enter your email address'
                        value={editAccountInfo.email || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                      />
                    </div>
                    {errors.email && (
                      <div className='text-danger ms-2'>{errors.email}</div>
                    )}
                  </div>
                  <div className='row gx-3 mb-3'>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputPhone'
                      >
                        Phone number
                      </label>
                      <div className='d-flex'>
                        <input
                          required
                          className='UserProfile-form-control form-control'
                          id='inputPhone'
                          name='phone'
                          type='tel'
                          placeholder='Enter your phone number'
                          value={editAccountInfo.phone || ''}
                          onChange={handleChange}
                          readOnly={!isEditing}
                        />
                      </div>
                      {errors.phone && (
                        <div className='text-danger ms-2'>{errors.phone}</div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputBirthday'
                      >
                        Birthday
                      </label>
                      <div className='d-flex'>
                        <input
                          required
                          className='UserProfile-form-control form-control'
                          id='inputBirthday'
                          name='birthday'
                          type='date'
                          placeholder='Enter your birthday'
                          value={
                            editAccountInfo.birthday?.split(
                              'T',
                            )[0] || ''
                          }
                          onChange={handleChange}
                          readOnly={!isEditing}
                        />
                      </div>
                      {errors.birthday && (
                        <div className='text-danger ms-2'>{errors.birthday}</div>
                      )}
                    </div>
                    {message !== '' && (
                      <div className='text-success ms-2 message-success-userInfo'>
                        {message}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      className='btn btn-primary me-2'
                      type='button'
                      onClick={handleSave}
                    >
                      Save changes
                    </button>
                  )}
                  <button
                    className='btn btn-secondary'
                    type='button'
                    onClick={handleEdit}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
