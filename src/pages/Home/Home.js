import './Home.css';
import Slider from '../../components/Slider/Slider.js';
// Components
import Footer from '../../components/User/Footer/Footer.js';
// Images
import logo_navigate from '../../assets/images/img_Home/logo.png';
import logo_header_img from '../../assets/images/img_Home/header_img_logo.png';
import petSlider1 from '../../assets/images/img_Home/petSlider.png';
import petSlider2 from '../../assets/images/img_Home/slider-dog.png';
import petSlider3 from '../../assets/images/img_Home/Pet-Cares.jpg';
import petSlider4 from '../../assets/images/img_Home/slider_bg.png';
import petSlider5 from '../../assets/images/img_Home/slider_bg_02.png';
import petSlider6 from '../../assets/images/img_Home/slider_bg_03.png';
import dogBackground from '../../assets/images/img_Home/dogBackground.png';
import why_we_are from '../../assets/images/img_Home/dog_About.png';
import checked_Icon from '../../assets/images/img_Home/checked.png';
import vote_star from '../../assets/images/img_Home/star.png';
import { useEffect } from 'react';

const images = [petSlider2, petSlider1, petSlider3, petSlider4, petSlider5, petSlider6];

function Home() {

    useEffect(() => {
        const elements = document.querySelectorAll('.lazy-load');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }, []);

    return (
        <div className="main container-fluid">
            <div className="overlap row">
                <div className="slider-wrapper col-md-12 lazy-load">

                    <div className="SUB-HEADER">
                        <div className="sub_header_wrapper">
                            <div className="pethealthcare-gmail">
                                pethealthcare@gmail.com | +91 012345678
                            </div>
                            <div className="header_form">
                                <div className="sign-in">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                    <div className="text-wrapper-3">Log in</div>
                                </div>
                                <div className="sign-up">
                                    <div className="text-wrapper-4">Sign up</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Slider images={images}></Slider>

                    <div className="white-navigate">

                        <div className='white-navigate-logo-wrapper'>
                            <img className="white-navigate-logo" src={logo_navigate} alt='Logo' loading="lazy" />
                        </div>
                        <div className="list-header">
                            <a href="#123" className="frame">
                                <div className="text-wrapper">
                                    Home
                                </div>
                            </a>
                            <a href="#123" className="div-wrapper">
                                <div className="text-wrapper">
                                    Services
                                </div>
                            </a>
                            <a href="#123" className="div-wrapper">
                                <div className="text-wrapper">
                                    About us
                                </div>
                            </a>
                            <a href="#123" className="div-wrapper">
                                <div className="text-wrapper">
                                    Contact
                                </div>
                            </a>
                            <a href="#123" className="div-wrapper">
                                <div className="text-wrapper">
                                    Blog
                                </div>
                            </a>
                        </div>
                        <div className="booking-button">
                            <a className="text-wrapper-2" href='booking'>
                                BOOKING NOW!
                            </a>
                        </div>
                    </div>
                    <p className="best-care-of-our">
                        Best care of our <br />little friends
                    </p>
                </div>

                <div className="emergency col-md-12 lazy-load">
                    <div className="emergency-we-re-wrapper">
                        <p className="emergency-we-re">
                            Emergency? We are available at 0999999999.
                        </p>
                    </div>
                </div>
            </div>

            <div className="content_description row lazy-load">
                <div className="col-md-12 img-logo-wrapper">
                    <img alt=""
                        className="img-logo"
                        src={logo_header_img}
                        loading="lazy"
                    />
                </div>

                <p className="text-petwellbeing">
                    Your pet’s well-being, happiness and<br />your peace of mind are our
                    top priorities.
                </p>

                <div className="text-pethealthcare_description">
                    <p className="text-pethealthcare">
                        Pet Health Care is the first and only full-service international
                        veterinary clinic in Central Vietnam. Striving for excellence and
                        driven by animal welfare, we provide compassionate clinical care,
                        and highly-skilled and experienced international veterinarians to
                        ensure exceptional service and personalis care for your loved pets
                        as well as rescue cases. Our entire team is dedicated to maintaining
                        international standards and treating all animals with compassionate
                        care in every visit, be it for a routine check up or an emergency
                        procedure.
                    </p>
                </div>
            </div>
            <div className="MAIN-SERVICES lazy-load">
                <div className="overlap-3 row">
                    <div className="MAIN-SERVICES_title">PRIMARY PET CARE SERVICES</div>
                    <img alt=""
                        className="floofins-and-co"
                        src={dogBackground}
                        loading="lazy"
                    />
                    <div className="service-detail-wrapper">
                        <div className="service_Info_Detail">
                            <div className="service_Info_Detail-img"></div>
                            <div className="service_Info_Detail-text">
                                Sign up for a time-specific medical examination for your pet.
                            </div>
                            <div className="service_Info_Detail-button-wrapper-flex">
                                <div className="service_Info_Detail-button-wrapper">
                                    <a href="#123" className="service_Info_Detail-button">
                                        <span>View Services</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="service_Info_Detail">
                            <div className="service_Info_Detail-img"></div>
                            <div className="service_Info_Detail-text">
                                Provide medical examination and treatment services with a team
                                of professional and experienced doctors
                            </div>
                            <div className="service_Info_Detail-button-wrapper-flex">
                                <div className="service_Info_Detail-button-wrapper">
                                    <a href="#123" className="service_Info_Detail-button">
                                        <span>View Services</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="service_Info_Detail">
                            <div className="service_Info_Detail-img"></div>
                            <div className="service_Info_Detail-text">
                                Sign up for a time-specific medical examination for your pet.
                            </div>
                            <div className="service_Info_Detail-button-wrapper-flex">
                                <div className="service_Info_Detail-button-wrapper">
                                    <a href="#123" className="service_Info_Detail-button">
                                        <span>View Services</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overlap-4 lazy-load">
                <div className="main-why-choose">
                    <img alt="" className="why-we-are-img" src={why_we_are} loading="lazy" />
                    <div>
                        <div className="title-whywearebest">
                            <div className="overlap-5">
                                <div className="content-whywearebest-2">
                                    <span className="text-wrapper-8">WHY WE ARE THE BEST<br /></span>
                                    <span className="text-wrapper-9"
                                    >Pet Emergencies What You Need To Know.<br />
                                    </span>
                                </div>

                                <div className="subtitle">
                                    <p className="text-wrapper-7">
                                        Dui aute irure dolor in reprehenderit in voluptate velit
                                        esse We understand that your furry friend is a treasured
                                        member of your family and deserves pets are the best care
                                        and attention possible.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="content-whywearebest">
                            <div className="content-layout_flex">
                                <div className="maintain">
                                    <div className="overlap-group-2">
                                        <div className="maintain-text">
                                            <div className='maintain-text-flex'>
                                                <img alt="" className="element" src={checked_Icon} loading="lazy" />
                                                <span className="span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span className="text-wrapper-5"
                                                >Maintain a daily routine
                                                    <br />
                                                </span>
                                            </div>
                                            <span className="text-wrapper-6">
                                                Be confident in the treatment plan and your doctor’s
                                                abilities.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="affordable">
                                    <div className="overlap-group-2">
                                        <div className="maintain-text">
                                            <div className='maintain-text-flex'>
                                                <img alt="" className="element" src={checked_Icon} loading="lazy" />
                                                <span className="span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span className="text-wrapper-5"
                                                >Affordable Pricing<br
                                                    /></span>
                                            </div>
                                            <span className="text-wrapper-6"
                                            >Be confident in the treatment plan and your doctor’s
                                                abilities.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-layout_flex">
                                <div className="more-pet-training">
                                    <div className="overlap-group-2">
                                        <div className="maintain-text">
                                            <div className='maintain-text-flex'>
                                                <img alt="" className="element" src={checked_Icon} loading="lazy" />
                                                <span className="span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span className="text-wrapper-5"
                                                >Modern Pet Training<br
                                                    /></span>
                                            </div>
                                            <span className="text-wrapper-6">
                                                Be confident in the treatment plan and your doctor’s
                                                abilities.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="more-experience-text">
                                    <div className="overlap-group-2">
                                        <div className="maintain-text">
                                            <div className='maintain-text-flex'>
                                                <img alt="" className="element-2" src={checked_Icon} loading="lazy" />
                                                <span className="span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span className="text-wrapper-5">More Experience<br /></span>
                                            </div>
                                            <span className="text-wrapper-6">Be confident in the treatment plan and your doctor’s
                                                abilities.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="MAIN-DOCTOR">
                    <div className="title-doctor">Meet Our Expertise Pet Doctors</div>
                    <div className="MAIN-DOCTOR-flex">
                        <div className="doctor lazy-load">
                            <div className="graphic"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Daria Andaloro</div>
                                <div className="text-wrapper-14">Veterinary Technician</div>
                            </div>
                        </div>

                        <div className="doctor lazy-load">
                            <div className="graphic-2"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Daria Andaloro</div>
                                <div className="text-wrapper-14">Veterinary Technician</div>
                            </div>
                        </div>

                        <div className="doctor lazy-load">
                            <div className="graphic-3"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Daria Andaloro</div>
                                <div className="text-wrapper-14">Veterinary Technician</div>
                            </div>
                        </div>
                        <div className="doctor lazy-load">
                            <div className="graphic-4"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Michael Brian</div>
                                <div className="text-wrapper-14">Medicine Specialist</div>
                            </div>
                        </div>
                    </div>
                    <div className="button-doctor lazy-load">
                        <div className="text-wrapper-11">Our Valuable Expert Doctors Team</div>

                        <div className="service_Info_Detail-button-wrapper">
                            <a href="#123" className="service_Info_Detail-button">
                                <span>View Doctors</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="MAIN-FEEDBACK lazy-load">
                <div className="MAIN-FEEDBACK-title">What Our Client’s Say</div>
                <div className="Feedback_Flex">
                    <div className="FEEDBACK">
                        <div className="overlap-group-6">
                            <p className="a-great-strength-of">
                                <span className="text-wrapper-8"
                                >A great strength of this service is the detailed and
                                    attentive care for my pet. Employees are not only working
                                    people, but they are also passionate and knowledgeable about
                                    their animals. They showed interest in my pets, providing
                                    useful information and advice on how to care for and nurture
                                    them.<br /><br
                                    /></span>
                                <span className="text-wrapper-5">Mark<br /></span>
                            </p>
                            <div className="element-tab-list">
                                <div className="segmented-control">
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="FEEDBACK">
                        <div className="overlap-group-6">
                            <p className="a-great-strength-of-2">
                                <span className="text-wrapper-8"
                                >A great strength of this service is the detailed and
                                    attentive care for my pet. Employees are not only working
                                    people, but they are also passionate and knowledgeable about
                                    their animals. They showed interest in my pets, providing
                                    useful information and advice on how to care for and nurture
                                    them.<br /><br
                                    /></span>
                                <span className="text-wrapper-5">Mark<br /></span>
                            </p>
                            <div className="segmented-control-wrapper">
                                <div className="segmented-control">
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} loading="lazy" />
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
