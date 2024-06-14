import './SignUp.css';
import React, { useState } from 'react';
import axios from 'axios';
//images
import jonas from '../../assets/images/img_SignUp/background.png';
import logo from '../../assets/images/img_SignUp/logo.png';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (formData.username.length < 5) {
      newErrors.username = 'Username must be at least 5 characters long';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/signup', {
        username: formData.username,
        password: formData.password,
      })
        .then(response => {
          setErrors({});
          setSuccessMessage('Registration successful!');
          setFormData({
            username: '',
            password: '',
            confirmPassword: '',
          })
        })
        .catch(error => {
          setErrors({ server: error.response.data.message });
        })

    } catch (error) {
      if (error.response) {
        setErrors({ server: error.response.data.message });
      } else {
        console.error('Error:', error);
      }
    }
  };
  return (
    <div className='create-account-page'>
      <div className='overlap-img'>
        <div className='frame'>
          <img
            className='create-account_img'
            src={jonas}
            alt=''
          />
          <div className='create-account_content'>
            <div className='create-account_logo'>
              <img
                src={logo}
                alt=''
              />
            </div>
            <div className='create-account_tittle'>Create an account</div>
            <form onSubmit={handleSubmit}>
              <div className='form_SignUp'>
                <div className='form_SignUp_Input'>
                  <input
                    className='form_SignUp_Input-Text'
                    placeholder='Username/Email'
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
                <div className='form_SignUp_Input'>
                  <input
                    className='form_SignUp_Input-Text'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
                <div className='form_SignUp_Input'>
                  <input
                    className='form_SignUp_Input-Text'
                    placeholder='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )}
              {errors.server && (
                <div className="error-message">{errors.server}</div>
              )}
              <div className='form_SignUp_Btn_Wrapper'>
                <button type='submit' className='form_SignUp_Btn'>
                  <div className='form_SignUp_Btn-Text'>Sign up</div>
                </button>
              </div>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className='form_SignUp_Regulation'>
              <span className='form_SignUp_Regulation_Span'>
                By clicking sign up, you agree to our{' '}
              </span>
              <a
                className='form_SignUp_Regulation_Link'
                href='#sad'
              >
                Terms of Service
              </a>
              <span className='form_SignUp_Regulation_Span'> and </span>
              <a
                className='form_SignUp_Regulation_Link'
                href='#sad'
              >
                Privacy Policy
              </a>
            </div>
            <div className='form_SignUp_HadAcc'>
              <div className='text-wrapper-4'>Already have a account?</div>
              <a
                href='#sad'
                className='form_SignUp_HadAcc_SignIn'
              >
                Sign in now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
