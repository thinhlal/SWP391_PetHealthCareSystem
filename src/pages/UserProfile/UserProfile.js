import React, { useContext, useEffect, useState } from 'react';
import './UserProfile.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    customerDetails: [{}],
  });

  useEffect(() => {
    const fetchAccountByID = async () => {
      if (user && user.accountID) {
        try {
          const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/user/getUserProfile/${user.accountID}`);
          console.log(response.data);
          setProfile(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAccountByID();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      customerDetails: [{ ...profile.customerDetails[0], [name]: value }],
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log('Profile saved:', profile);
    // Add your save logic here, such as sending data to the backend
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, customerDetails: [{ ...profile.customerDetails[0], image: reader.result }] });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelectPopup = () => {
    document.querySelector('#fileInput').click();
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
                      <label className='small mb-1' htmlFor='inputFirstName'>
                        Name
                      </label>
                      <div className='d-flex'>
                        <input
                          className='UserProfile-form-control form-control'
                          id='inputFirstName'
                          name='name'
                          type='text'
                          placeholder='Enter your first name'
                          value={profile?.customerDetails[0]?.name || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='UserProfile-form-group mb-3'>
                    <label className='small mb-1' htmlFor='inputEmailAddress'>
                      Email address
                    </label>
                    <div className='d-flex'>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputEmailAddress'
                        name='email'
                        type='email'
                        placeholder='Enter your email address'
                        value={profile?.customerDetails[0]?.email || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='row gx-3 mb-3'>
                    <div className='col-md-6'>
                      <label className='small mb-1' htmlFor='inputPhone'>
                        Phone number
                      </label>
                      <div className='d-flex'>
                        <input
                          className='UserProfile-form-control form-control'
                          id='inputPhone'
                          name='phone'
                          type='tel'
                          placeholder='Enter your phone number'
                          value={profile?.customerDetails[0]?.phone || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <label className='small mb-1' htmlFor='inputBirthday'>
                        Birthday
                      </label>
                      <div className='d-flex'>
                        <input
                          className='UserProfile-form-control form-control'
                          id='inputBirthday'
                          name='birthday'
                          type='date'
                          placeholder='Enter your birthday'
                          value={profile?.customerDetails[0]?.birthday || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleSave}
                  >
                    Save changes
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
