import './Home.css';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
// Components
import Slider from '../../components/Slider/Slider.js';
import Footer from '../../components/User/Footer/Footer.js';
// Images
import logo_navigate from '../../assets/images/img_Home/logo.png';
import logo_header_img from '../../assets/images/img_Home/header_img_logo.png';
import petSlider2 from '../../assets/images/img_Home/PLCA0277_Diabetes_In_Cats_Symptoms.jpg';
import petSlider3 from '../../assets/images/img_Home/Pet-Cares.jpg';
import petSlider4 from '../../assets/images/img_Home/slider_bg.png';
import petSlider5 from '../../assets/images/img_Home/slider_bg_02.png';
import petSlider6 from '../../assets/images/img_Home/slider_bg_03.png';
import dogBackground from '../../assets/images/img_Home/dogBackground.png';
import why_we_are from '../../assets/images/img_Home/dog_About.png';
import checked_Icon from '../../assets/images/img_Home/checked.png';
import vote_star from '../../assets/images/img_Home/star.png';
import userIcon from '../../assets/images/img_Home/userlogincam.png';

const images = [petSlider6, petSlider2, petSlider3, petSlider4, petSlider5];

function Home() {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                      src={userIcon}
                      alt='User Avatar'
                      className='avatar-login'
                    />
                  </div>
                  <div
                    className={`dropdown-menu-login ${isMenuOpen ? 'visible' : ''}`}
                  >
                    <div className='menu-item-login'>
                      <img
                        src={require('../../assets/images/img_Home/people.png')}
                        alt='User Icon'
                        style={{ width: '20px' }}
                      />
                      &nbsp;{user.username}
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
          <Slider images={images}></Slider>

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
                href='#123'
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
        <div className='overlap-3 row'>
          <div className='MAIN-SERVICES_title'>PRIMARY PET CARE SERVICES</div>
          <img
            alt=''
            className='floofins-and-co'
            src={dogBackground}
            loading='lazy'
          />
          <div className='service-detail-wrapper'>
            <div className='service_Info_Detail'>
              <div className='service_Info_Detail-img'></div>
              <div className='service_Info_Detail-text'>
                Sign up for a time-specific medical examination for your pet.
              </div>
              <div className='service_Info_Detail-button-wrapper-flex'>
                <div className='service_Info_Detail-button-wrapper'>
                  <a
                    href='services'
                    className='service_Info_Detail-button'
                  >
                    <span>View Services</span>
                  </a>
                </div>
              </div>
            </div>
            <div className='service_Info_Detail'>
              <div className='service_Info_Detail-img'></div>
              <div className='service_Info_Detail-text'>
                Provide medical examination and treatment services with a team
                of professional and experienced doctors
              </div>
              <div className='service_Info_Detail-button-wrapper-flex'>
                <div className='service_Info_Detail-button-wrapper'>
                  <a
                    href='services'
                    className='service_Info_Detail-button'
                  >
                    <span>View Services</span>
                  </a>
                </div>
              </div>
            </div>
            <div className='service_Info_Detail'>
              <div className='service_Info_Detail-img'></div>
              <div className='service_Info_Detail-text'>
                Sign up for a time-specific medical examination for your pet.
              </div>
              <div className='service_Info_Detail-button-wrapper-flex'>
                <div className='service_Info_Detail-button-wrapper'>
                  <a
                    href='services'
                    className='service_Info_Detail-button'
                  >
                    <span>View Services</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='overlap-4 lazy-load'>
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
            <div className='doctor lazy-load'>
              <div className='graphic'></div>
              <div className='copy'>
                <div className='text-wrapper-13'>Daria Andaloro</div>
                <div className='text-wrapper-14'>Veterinary Technician</div>
              </div>
            </div>

            <div className='doctor lazy-load'>
              <div className='graphic-2'></div>
              <div className='copy'>
                <div className='text-wrapper-13'>Daria Andaloro</div>
                <div className='text-wrapper-14'>Veterinary Technician</div>
              </div>
            </div>

            <div className='doctor lazy-load'>
              <div className='graphic-3'></div>
              <div className='copy'>
                <div className='text-wrapper-13'>Daria Andaloro</div>
                <div className='text-wrapper-14'>Veterinary Technician</div>
              </div>
            </div>
            <div className='doctor lazy-load'>
              <div className='graphic-4'></div>
              <div className='copy'>
                <div className='text-wrapper-13'>Michael Brian</div>
                <div className='text-wrapper-14'>Medicine Specialist</div>
              </div>
            </div>
          </div>
          <div className='button-doctor lazy-load'>
            <div className='text-wrapper-11'>
              Our Valuable Expert Doctors Team
            </div>

            <div className='service_Info_Detail-button-wrapper'>
              <a
                href='veterinarian-info'
                className='service_Info_Detail-button'
              >
                <span>View Doctors</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='MAIN-FEEDBACK lazy-load'>
        <div className='MAIN-FEEDBACK-title'>What Our Client’s Say</div>
        <div className='Feedback_Flex'>
          <div className='FEEDBACK'>
            <div className='overlap-group-6'>
              <p className='a-great-strength-of'>
                <span className='text-wrapper-8'>
                  A great strength of this service is the detailed and attentive
                  care for my pet. Employees are not only working people, but
                  they are also passionate and knowledgeable about their
                  animals. They showed interest in my pets, providing useful
                  information and advice on how to care for and nurture them.
                  <br />
                  <br />
                </span>
                <span className='text-wrapper-5'>
                  Mark
                  <br />
                </span>
              </p>
              <div className='element-tab-list'>
                <div className='segmented-control'>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='FEEDBACK'>
            <div className='overlap-group-6'>
              <p className='a-great-strength-of-2'>
                <span className='text-wrapper-8'>
                  A great strength of this service is the detailed and attentive
                  care for my pet. Employees are not only working people, but
                  they are also passionate and knowledgeable about their
                  animals. They showed interest in my pets, providing useful
                  information and advice on how to care for and nurture them.
                  <br />
                  <br />
                </span>
                <span className='text-wrapper-5'>
                  Mark
                  <br />
                </span>
              </p>
              <div className='segmented-control-wrapper'>
                <div className='segmented-control'>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                  <div className='item'>
                    <img
                      alt=''
                      className='element-8'
                      src={vote_star}
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
