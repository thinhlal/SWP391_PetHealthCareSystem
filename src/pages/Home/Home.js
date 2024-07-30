import './Home.css';
import { useEffect, useContext, useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthContext } from '../../context/AuthContext';
import Slider from 'react-slick'; // Components
import SliderPetHome from '../../components/Slider/Slider.js';

import Footer from '../../components/User/Footer/Footer.js';

import logo_navigate from '../../assets/images/img_Home/logo.png';
import logo_header_img from '../../assets/images/img_Home/header_img_logo.png';
import petSlider2 from '../../assets/images/img_Home/PLCA0277_Diabetes_In_Cats_Symptoms.jpg';
import petSlider3 from '../../assets/images/img_Home/Pet-Cares.jpg';
import petSlider4 from '../../assets/images/img_Home/slider_bg.png';
import petSlider5 from '../../assets/images/img_Home/slider_bg_02.png';
import petSlider6 from '../../assets/images/img_Home/slider_bg_03.png';
import why_we_are from '../../assets/images/img_Home/dog_About.png';
import checked_Icon from '../../assets/images/img_Home/checked.png';
import vote_star from '../../assets/images/img_Home/star.png';
import userIcon from '../../assets/images/img_Home/userlogincam.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const images = [petSlider6, petSlider2, petSlider3, petSlider4, petSlider5];

const sliderSettingServices = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnDotsHover: true,
  pauseOnHover: true,
};

const sliderSettingDoctors = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnDotsHover: true,
  pauseOnHover: true,
};

function Home() {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchAllFeedBack = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/rate/getAllRates`,
      );
      setFeedbacks(response.data);
    };

    fetchAllFeedBack();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && !userData.customerDetails[0]) {
      navigate('/unauthorized');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAllService = async () => {
      const services = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/getAllServices`,
      );
      setServices(services.data);
    };

    fetchAllService();
  }, []);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      const doctors = await axios.get(
        `${process.env.REACT_APP_API_URL}/doctor/getAllDoctorsInfoToShow`,
      );
      console.log(doctors.data);
      setDoctors(doctors.data);
    };

    fetchAllDoctors();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.lazy-load');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    elements.forEach(element => {
      observer.observe(element);
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='main container-fluid'>
      <div className='overlap row'>
        <div className='slider-wrapper col-md-12 lazy-load'>
          <div className='SUB-HEADER'>
            <div className='sub_header_wrapper'>
              <div className='pethealthcare-gmail'>
                pethealthcare@gmail.com | +91 012345678
              </div>
              {user ? (
                <div className='header_form_login'>
                  <div
                    className='user-icon-login'
                    onClick={toggleMenu}
                  >
                    <img
                      src={
                        user?.customerDetails[0]?.image
                          ? user?.customerDetails[0]?.image
                          : userIcon
                      }
                      alt='User Avatar'
                      className='avatar-login'
                    />
                  </div>
                  <div
                    ref={menuRef}
                    className={`dropdown-menu-login ${isMenuOpen ? 'visible' : ''}`}
                  >
                    <div
                      className='menu-item-login'
                      onClick={() => (window.location.href = '/user-profile')}
                    >
                      <img
                        src={require('../../assets/images/img_Home/people.png')}
                        alt='User Icon'
                        style={{ width: '20px', marginBottom: '-5px' }}
                      />
                      &nbsp;{user && user?.customerDetails[0]?.name}
                    </div>
                    <div
                      className='menu-item-login'
                      onClick={() => (window.location.href = '/your-pet')}
                    >
                      Your Pet
                    </div>
                    <div
                      className='menu-item-login'
                      onClick={() => (window.location.href = '/your-booking')}
                    >
                      Your Booking
                    </div>

                    <div
                      className='menu-item-login'
                      onClick={() => (window.location.href = '/user-profile')}
                    >
                      Settings
                    </div>
                    <div
                      className='menu-item-login'
                      onClick={logOut}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              ) : (
                <div className='header_form'>
                  <div className='sign-in'>
                    <a
                      href='login'
                      className='text-wrapper-3'
                    >
                      Log in
                    </a>
                  </div>
                  <div className='sign-up'>
                    <a
                      href='signup'
                      className='text-wrapper-4'
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SliderPetHome images={images}></SliderPetHome>

          <div className='white-navigate'>
            <div className='white-navigate-logo-wrapper'>
              <img
                className='white-navigate-logo'
                src={logo_navigate}
                alt='Logo'
                loading='lazy'
              />
            </div>
            <div className='list-header'>
              <a
                href='#123'
                className='list-header-navigate'
              >
                <div className='list-header-navigate-text'>Home</div>
              </a>
              <a
                href='services'
                className='div-wrapper'
              >
                <div className='list-header-navigate-text'>Services</div>
              </a>
              <a
                href='#aboutUs'
                className='div-wrapper'
              >
                <div className='list-header-navigate-text'>About us</div>
              </a>
              <a
                href='#123'
                className='div-wrapper'
              >
                <div className='list-header-navigate-text'>Contact</div>
              </a>
            </div>
            <div className='list-header-navigate-booking-btn'>
              <a
                className='list-header-navigate-booking-btn-link'
                href='choose'
              >
                BOOKING NOW!
              </a>
            </div>
          </div>
          <p className='home-slider-text'>
            Best care of our <br />
            little friends
          </p>
        </div>

        <div className='home-slider-emergency col-md-12 lazy-load'>
          <p className='home-slider-emergency-text'>
            Emergency? We are available at 0999999999.
          </p>
        </div>
      </div>

      <div className='content_description row lazy-load'>
        <div className='col-md-12 content_description-logo-wrapper'>
          <img
            alt=''
            className='content_description-logo'
            src={logo_header_img}
            loading='lazy'
          />
        </div>

        <div className='content_description-title'>
          Your pet’s well-being, happiness and
          <br />
          your peace of mind are our top priorities.
        </div>

        <div className='content_description-text'>
          <div className='content_description-text-pethealthcare'>
            Pet Health Care is the first and only full-service international
            veterinary clinic in Central Vietnam. Striving for excellence and
            driven by animal welfare, we provide compassionate clinical care,
            and highly-skilled and experienced international veterinarians to
            ensure exceptional service and personalis care for your loved pets
            as well as rescue cases. Our entire team is dedicated to maintaining
            international standards and treating all animals with compassionate
            care in every visit, be it for a routine check up or an emergency
            procedure.
          </div>
        </div>
      </div>
      <div className='MAIN-SERVICES lazy-load'>
        <div className='overlap-3'>
          <div className='MAIN-SERVICES_title'>PRIMARY PET CARE SERVICES</div>
          <div className='slider_service'>
            <Slider {...sliderSettingServices}>
              {services.map(service => (
                <div key={service.serviceID}>
                  <div className='service-wrapper'>
                    <div className='service_Info_Detail'>
                      <img
                        src={service.image}
                        className='service_Info_Detail-img'
                        alt={service.name}
                      />
                      <div className='service_Info_Detail-text'>
                        {service.name}
                      </div>
                      <div className='service_Info_Detail-text'>
                        {service.description}
                      </div>
                      <div className='service_Info_Detail-text'>
                        {service.price}
                      </div>
                      <div className='service_Info_Detail-button-wrapper-flex'>
                        <div className='service_Info_Detail-button-wrapper'>
                          <a
                            href='choose'
                            className='service_Info_Detail-button'
                          >
                            <span>Booking Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div
        id='aboutUs'
        className='overlap-4 lazy-load'
      >
        <div className='main-why-choose'>
          <img
            alt=''
            className='why-we-are-img'
            src={why_we_are}
            loading='lazy'
          />
          <div>
            <div className='title-whywearebest'>
              <div className='overlap-5'>
                <div className='content-whywearebest-2'>
                  <span className='text-wrapper-8'>
                    WHY WE ARE THE BEST
                    <br />
                  </span>
                  <span className='text-wrapper-9'>
                    Pet Emergencies What You Need To Know.
                    <br />
                  </span>
                </div>

                <div className='subtitle'>
                  <p className='text-wrapper-7'>
                    Dui aute irure dolor in reprehenderit in voluptate velit
                    esse We understand that your furry friend is a treasured
                    member of your family and deserves pets are the best care
                    and attention possible.
                  </p>
                </div>
              </div>
            </div>

            <div className='content-whywearebest'>
              <div className='content-layout_flex'>
                <div className='maintain'>
                  <div className='overlap-group-2'>
                    <div className='maintain-text'>
                      <div className='maintain-text-flex'>
                        <img
                          alt=''
                          className='element'
                          src={checked_Icon}
                          loading='lazy'
                        />
                        <span className='span'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className='text-wrapper-5'>
                          Maintain a daily routine
                          <br />
                        </span>
                      </div>
                      <span className='text-wrapper-6'>
                        Be confident in the treatment plan and your doctor’s
                        abilities.
                      </span>
                    </div>
                  </div>
                </div>

                <div className='affordable'>
                  <div className='overlap-group-2'>
                    <div className='maintain-text'>
                      <div className='maintain-text-flex'>
                        <img
                          alt=''
                          className='element'
                          src={checked_Icon}
                          loading='lazy'
                        />
                        <span className='span'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className='text-wrapper-5'>
                          Affordable Pricing
                          <br />
                        </span>
                      </div>
                      <span className='text-wrapper-6'>
                        Be confident in the treatment plan and your doctor’s
                        abilities.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='content-layout_flex'>
                <div className='more-pet-training'>
                  <div className='overlap-group-2'>
                    <div className='maintain-text'>
                      <div className='maintain-text-flex'>
                        <img
                          alt=''
                          className='element'
                          src={checked_Icon}
                          loading='lazy'
                        />
                        <span className='span'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className='text-wrapper-5'>
                          Modern Pet Training
                          <br />
                        </span>
                      </div>
                      <span className='text-wrapper-6'>
                        Be confident in the treatment plan and your doctor’s
                        abilities.
                      </span>
                    </div>
                  </div>
                </div>

                <div className='more-experience-text'>
                  <div className='overlap-group-2'>
                    <div className='maintain-text'>
                      <div className='maintain-text-flex'>
                        <img
                          alt=''
                          className='element-2'
                          src={checked_Icon}
                          loading='lazy'
                        />
                        <span className='span'>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className='text-wrapper-5'>
                          More Experience
                          <br />
                        </span>
                      </div>
                      <span className='text-wrapper-6'>
                        Be confident in the treatment plan and your doctor’s
                        abilities.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='MAIN-DOCTOR'>
          <div className='title-doctor'>Meet Our Expertise Pet Doctors</div>
          <div className='MAIN-DOCTOR-flex'>
            <Slider {...sliderSettingDoctors}>
              {doctors.map(doctor => (
                <div
                  key={doctor.doctorID}
                  style={{ margin: '0 10px !important' }}
                >
                  <div className='doctor'>
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className='graphic'
                    ></img>
                    <div className='copy'>
                      <div className='text-wrapper-13'>{doctor.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className='MAIN-FEEDBACK lazy-load'>
        <div className='MAIN-FEEDBACK-title'>What Our Client’s Say</div>
        <div className='Feedback_Flex'>
          {feedbacks.map(feedback => (
            <div
              className='FEEDBACK'
              key={feedback.rateID}
            >
              <div className='overlap-group-6'>
                <p className='a-great-strength-of'>
                  <span className='text-wrapper-8'>
                    {feedback.comment}
                    <br />
                    <br />
                  </span>
                  <span className='text-wrapper-5'>
                    {feedback.customerDetails[0].name}
                    <br />
                  </span>
                </p>
                <div className='element-tab-list'>
                  <div className='segmented-control'>
                    {[...Array(feedback.rate)].map((_, i) => (
                      <div
                        className='item'
                        key={i}
                      >
                        <img
                          alt=''
                          className='element-8'
                          src={vote_star}
                          loading='lazy'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
