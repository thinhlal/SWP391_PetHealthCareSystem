import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Services.css';

// components
import Footer from "../../components/User/Footer/Footer.js";
import Header from "../../components/User/Header/Header.js";

// image
import Cat from "../../assets/images/img_Services/rectangle-1.png";
import Tick from "../../assets/images/img_Services/rectangle-1-7.png";
import Dog from "../../assets/images/img_Services/rectangle-1-4.png";

function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="all-services">
      <Header></Header>
      <div className="services-slider">
        <div className="overlap-services-slider">
          <div className="title-services-slider" data-aos="fade-down">
            The highest standards of pet care
          </div>
        </div>
      </div>

      <div className="main-tittle">
        <div className="main-title-text" data-aos="fade-right">Choose The Best Care For Yourself</div>
      </div>

      {/* Cat Part */}
      <div className="cat-part" data-aos="fade-left">
        <div className="picture-services-cat">
          <div className="avatar-cat">
            <img className="photo-frame-img-service" src={Cat} alt="cat" />
          </div>
        </div>
        <div className="content-services-cat">
          <div className="list-item-cat">
            <div className="title-services-cat">Cat Services</div>

            <div className="content-list-services-cat">
              <div className="green-tick-image">
                <img className="green-tick-src-image" src={Tick} alt="avatar" />
              </div>
              <div className="text-content-services-cat">
                <div className="title-text-content-services-cat">Routine Health Check-ups</div>
                <div className="text-wrapper-cat">
                  Ensure your cat gets regular general health check-ups to
                  detect potential issues early.
                </div>
              </div>
            </div>

            <div className="content-list-services-cat">
              <div className="green-tick-image">
                <img className="green-tick-src-image" src={Tick} alt="avatar" />
              </div>
              <div className="text-content-services-cat">
                <div className="title-text-content-services-cat">Vaccinations</div>
                <div className="text-wrapper-cat">
                  Protect your cat from infectious diseases such as cat flu,
                  rabies, and others through proper vaccination.
                </div>
              </div>
            </div>

            <div className="content-list-services-cat">
              <div className="green-tick-image">
                <img className="green-tick-src-image" src={Tick} alt="avatar" />
              </div>
              <div className="text-content-services-cat">
                <div className="title-text-content-services-cat">Surgery</div>
                <div className="text-wrapper-cat">
                  Perform necessary surgeries such as spaying/neutering,
                  emergency surgeries, and other operations.
                </div>
              </div>
            </div>
            <button
              className="booking-services-button"
              onClick={() => (window.location.href = "booking")}
              style={{ border: "none" }}
            >
              <div className="text-booking-services-button">Book now</div>
            </button>
          </div>
        </div>
      </div>

      {/* Dog Part */}
      <div className="dog-part" data-aos="fade-right">
        <div className="content-services-dog">
          <div className="list-services-dog">
            <div className="list-services-dog-title">Dog Services</div>
            <div className="list-services-dog-item">
              <div className="list-services-dog-item-text">
                <div className="list-services-dog-item-text-name">Routine Health Check-ups</div>
                <div className="list-services-dog-item-text-desc">
                  Ensure your dog gets regular general health check-ups to
                  detect potential issues early.
                </div>
              </div>
              <div className="green-tick-image">
                <img className="green-tick-src-image" src={Tick} alt="avatar" />
              </div>
            </div>
            <div className="list-services-dog-item">
              <div className="list-services-dog-item-text">
                <div className="list-services-dog-item-text-name">Vaccinations</div>
                <div className="list-services-dog-item-text-desc">
                  Protect your dog from infectious diseases such as rabies,
                  Parvo, and others through proper vaccination.
                </div>
              </div>
              <div className="green-tick-image">
                <img className="green-tick-src-image" src={Tick} alt="avatar" />
              </div>
            </div>
            <div className="list-services-dog-item">
              <div className="list-services-dog-item-text">
                <div className="list-services-dog-item-text-name">Surgery</div>
                <div className="list-services-dog-item-text-desc">
                  Perform necessary surgeries such as spaying/neutering,
                  emergency surgeries, and other operations.
                </div>
              </div>
              <div className="green-tick-image">
                <img className="green-tick-src-image" src={Tick} alt="avatar" />
              </div>
            </div>
            <button
              className="booking-services-button"
              onClick={() => (window.location.href = "booking")}
              style={{ border: "none" }}
            >
              <div className="text-booking-services-button">Book now</div>
            </button>
          </div>
        </div>
        <div className="picture-services-dog">
          <div className="avatar-dog">
            <img className="photo-frame-img-service" src={Dog} alt="dog" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Services;
