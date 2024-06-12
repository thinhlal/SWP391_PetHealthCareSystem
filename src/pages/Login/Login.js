import './Login.css';

// image
import catImage from '../../assets/images/img_Login/left_picture_cat.png';
import logo from '../../assets/images/img_Login/logo.png';
import googleLogo from '../../assets/images/img_Login/google.svg';

function Login() {
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
                  <div className='form-send-login'>
                    <div className='input-user'>
                      <input
                        className='field-input-login'
                        placeholder='Enter Username or Email.'
                        type='email'
                      />
                    </div>

                    <div className='input-password'>
                      <input
                        className='field-input-login'
                        placeholder='Enter Password.'
                        type='password'
                      />
                    </div>
                    <a href='/'>
                      <div className='text-button-forgot-password'>
                        Forgot password?
                      </div>
                    </a>

                    <a href='/'>
                      <div className='sign-in-button'>
                        <div className='text-sign-in-button'>Sign in</div>
                      </div>
                    </a>
                  </div>

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
