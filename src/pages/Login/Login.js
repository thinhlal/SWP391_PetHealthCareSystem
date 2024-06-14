import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
// image
import catImage from '../../assets/images/img_Login/left_picture_cat.png';
import logo from '../../assets/images/img_Login/logo.png';
import googleLogo from '../../assets/images/img_Login/google.svg';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      localStorage.setItem('token', response.data.token)
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
  };
  return (
    <div className='login-page'>
      <div className='background-blur'>
        <div className='main-login-page'>
          <div className='main-login-account'>
            <div className='overlap-group'>
              <div className='form-login-account'>
                <span className='img-left-side'>
                  <img
                    className='cat-img'
                    src={catImage}
                    alt='Cat'
                  />
                </span>
                <div className='form-login-right-side'>
                  <img
                    className='logo-img'
                    src={logo}
                    alt='Logo'
                  />
                  <div className='main-title'>
                    <p className='main-title-text'>
                      Welcome to Pet Health Care
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} >
                    <div className='form-send-login'>
                      <div className='input-user'>
                        <input
                          type='text'
                          className='field-input-login'
                          placeholder='Enter Username or Email.'
                          name='username'
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className='input-password'>
                        <input
                          type='password'
                          className='field-input-login'
                          placeholder='Enter Password.'
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {error && <div className="error-message">{error}</div>}

                      <a href='/'>
                        <div className='text-button-forgot-password'>
                          Forgot password?
                        </div>
                      </a>

                      <button type='submit' className='sign-in-button'>
                        Sign in
                      </button>
                    </div>
                  </form>

                  <div className='title-continue-with'>
                    <div className='rectangle'></div>
                    <div className='text-continue-with'>or continue with</div>
                    <div className='rectangle'></div>
                  </div>
                  <button className='button-login-google'>
                    <img
                      className='google-img'
                      src={googleLogo}
                      alt='Google'
                    />
                    <div className='text-google'>Google</div>
                  </button>
                  <div className='new-user-create'>
                    <span className='text-new-user'>New user? </span>
                    <a href='sign-up'>
                      <span className='text-create-account'>
                        Create Account
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
