import React, { useState } from 'react';
import './UserProfile.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: 'username',
    firstName: 'Valerie',
    lastName: 'Luna',
    orgName: 'Start Bootstrap',
    location: 'San Francisco, CA',
    email: 'name@example.com',
    phone: '555-123-4567',
    birthday: '1988-06-10',
    profileImage: 'http://bootdey.com/img/Content/avatar/avatar1.png', // Default image
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log('Profile saved:', profile);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profileImage: reader.result });
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
                  src={profile.profileImage}
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
                      value={profile.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='row gx-3 mb-3'>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputFirstName'
                      >
                        First name
                      </label>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputFirstName'
                        name='firstName'
                        type='text'
                        placeholder='Enter your first name'
                        value={profile.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputLastName'
                      >
                        Last name
                      </label>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputLastName'
                        name='lastName'
                        type='text'
                        placeholder='Enter your last name'
                        value={profile.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='row gx-3 mb-3'>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputOrgName'
                      >
                        Organization name
                      </label>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputOrgName'
                        name='orgName'
                        type='text'
                        placeholder='Enter your organization name'
                        value={profile.orgName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputLocation'
                      >
                        Location
                      </label>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputLocation'
                        name='location'
                        type='text'
                        placeholder='Enter your location'
                        value={profile.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='UserProfile-form-group mb-3'>
                    <label
                      className='small mb-1'
                      htmlFor='inputEmailAddress'
                    >
                      Email address
                    </label>
                    <input
                      className='UserProfile-form-control form-control'
                      id='inputEmailAddress'
                      name='email'
                      type='email'
                      placeholder='Enter your email address'
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='row gx-3 mb-3'>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputPhone'
                      >
                        Phone number
                      </label>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputPhone'
                        name='phone'
                        type='tel'
                        placeholder='Enter your phone number'
                        value={profile.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        className='small mb-1'
                        htmlFor='inputBirthday'
                      >
                        Birthday
                      </label>
                      <input
                        className='UserProfile-form-control form-control'
                        id='inputBirthday'
                        name='birthday'
                        type='date'
                        placeholder='Enter your birthday'
                        value={profile.birthday}
                        onChange={handleChange}
                      />
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
