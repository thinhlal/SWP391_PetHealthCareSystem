import './css/Home.css';
import Footer from './Footer'
import logo from './img/img_Home/logo.png'
import user_account_icon from './img/img_Home/person.svg'
import pet_health from './img/img_Home/651dfce9820f55d331f420e6-pet-health-1-2.png'
import paw_print from './img/img_Home/floofins-and-co-purple-paw-print-background-2-1.png'
import why_we_are from './img/img_Home/why-we-are-img-1.png'
import tick4351 from './img/img_Home/4315445-1.png'
import arrow_right from './img/img_Home/545682-1.png'
import vote_star from './img/img_Home/1828884-1-9.png'

function Home() {
    return (
        <div className="main container-fluid">
            <div className="overlap row">
                <div className="slider col-md-12">
                    <div className="overlap-group">
                        <div className="SUB-HEADER col-md-12">
                            <div className="sub_header_wrapper">
                                <div className="pethealthcare-gmail">
                                    pethealthcare@gmail.com | +91 012345678
                                </div>
                                <div className="header_form">
                                    <div className="sign-in">
                                        <img className='sign-in_icon' alt='' src={user_account_icon}></img>
                                        <div className="text-wrapper-3">Log in</div>
                                    </div>
                                    <div className="sign-up">
                                        <div className="text-wrapper-4">Sign up</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-navigate">
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
                            <img className="logo" src={logo} alt='' />
                            <div className="booking-button">
                                <a className="text-wrapper-2" href='#123'>
                                    BOOKING NOW!
                                </a>
                            </div>
                        </div>
                        <p className="best-care-of-our">
                            Best care of our <br />little friends
                        </p>
                    </div>
                </div>

                <div className="emergency col-md-12">
                    <div className="emergency-we-re-wrapper">
                        <p className="emergency-we-re">
                            Emergency? We are available at 0999999999.
                        </p>
                    </div>
                </div>
            </div>

            <div className="content_description row">
                <div className="col-md-12 img-logo-wrapper">
                    <img alt=""
                        className="img-logo"
                        src={pet_health}
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
            <div className="MAIN-SERVICES">
                <div className="overlap-3 row">
                    <div className="MAIN-SERVICES_title">PRIMARY PET CARE SERVICES</div>
                    <img alt=""
                        className="floofins-and-co"
                        src={paw_print}
                    />
                    <div className="service-detail-wrapper">
                        <div className="service_Info_Detail">
                            <div className="service_Info_Detail-img"></div>
                            <div className="service_Info_Detail-text">
                                Sign up for a time-specific medical examination for your pet.
                            </div>
                            <div className="service_Info_Detail-button-wrapper-flex">
                                <div className="service_Info_Detail-button-wrapper">
                                    <button type="button" className="service_Info_Detail-button">
                                        View Service
                                    </button>
                                    <img alt='' src={arrow_right} className='service_Info_Detail-button-icon'></img>
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
                                    <button type="button" className="service_Info_Detail-button">
                                        View Service
                                    </button>
                                    <img alt='' src={arrow_right} className='service_Info_Detail-button-icon'></img>
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
                                    <button type="button" className="service_Info_Detail-button">
                                        View Service
                                    </button>
                                    <img alt='' src={arrow_right} className='service_Info_Detail-button-icon'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overlap-4">
                <div className="main-why-choose">
                    <img alt="" className="why-we-are-img" src={why_we_are} />
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
                                                <img alt="" className="element" src={tick4351} />
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
                                                <img alt="" className="element" src={tick4351} />
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
                                                <img alt="" className="element" src={tick4351} />
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
                                                <img alt="" className="element-2" src={tick4351} />
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
                        <div className="doctor">
                            <div className="graphic"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Daria Andaloro</div>
                                <div className="text-wrapper-14">Veterinary Technician</div>
                            </div>
                        </div>

                        <div className="doctor">
                            <div className="graphic-2"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Daria Andaloro</div>
                                <div className="text-wrapper-14">Veterinary Technician</div>
                            </div>
                        </div>

                        <div className="doctor">
                            <div className="graphic-3"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Daria Andaloro</div>
                                <div className="text-wrapper-14">Veterinary Technician</div>
                            </div>
                        </div>
                        <div className="doctor">
                            <div className="graphic-4"></div>
                            <div className="copy">
                                <div className="text-wrapper-13">Michael Brian</div>
                                <div className="text-wrapper-14">Medicine Specialist</div>
                            </div>
                        </div>
                    </div>
                    <div className="button-doctor">
                        <div className="text-wrapper-11">Our Valuable Expert Doctors Team</div>
                        <div className="element-primary-button-wrapper">
                            <div className="element-primary-button">
                                <div className="text-wrapper-12">See All Doctors</div>
                                <img alt="" className="element-3" src={arrow_right} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="MAIN-BOOKING-FORM">
                <div className="overlap-6">
                    <div className="title-booking">Schedule a visit today!</div>

                    <div className="form-booking">
                        <div className="overlap-group-5">
                            <div className="subtitle-formbooking">
                                <div className='subtitle-formbooking_infor'>
                                    <div>
                                        <div className="text-wrapper-16">Name</div>
                                        <div className='name_Booking'>
                                            <input
                                                className="name"
                                                placeholder="Type Full Name"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className='subtitle-formbooking_infor_name'>
                                        <div className="text-wrapper-16">Gmail</div>
                                        <div className="gmail">
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Type Your Gmail"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-wrapper-16">Phone</div>
                                        <div className="phone">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="+123 888 ..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='subtitle-formbooking_time'>

                                    <div>
                                        <div className="text-wrapper-16">Date</div>
                                        <div className="date">
                                            <input
                                                className="input"
                                                type="date"
                                                placeholder="mm/dd/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className='subtitle-formbooking_time_Time'>
                                        <div className="text-wrapper-16">Time</div>
                                        <div className="time">
                                            <input
                                                className="input"
                                                type="time"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-wrapper-16">Pet Type</div>
                                        <div className="pettype">
                                            <select
                                                name="typePet"
                                                id="typePet"
                                                className="select-pet-type"
                                            >
                                                <option value="Dog">Dog</option>
                                                <option value="Cat">Cat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="button-bookingform">
                            <div className="text-wrapper-15">Start a Reservation</div>
                            <img alt="" className="element-4" src={arrow_right} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="MAIN-FEEDBACK">
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
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
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
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                    <div className="item">
                                        <img alt="" className="element-8" src={vote_star} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default Home;
