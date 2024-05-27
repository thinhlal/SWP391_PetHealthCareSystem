import "./Services.css";

// components
import Footer from "../../components/User/Footer/Footer.js";
import Header from "../../components/User/Header/Header.js";

// image
import Cat from "../../assets/images/img_Services/rectangle-1.png";
import Tick from "../../assets/images/img_Services/rectangle-1-7.png";
import Dog from "../../assets/images/img_Services/rectangle-1-4.png";

function Services() {
  return (
    <div className="all-services">
      <Header></Header>
      <div className="services-slider">
        <div className="overlap-group">
          <p className="p">The highest standards of pet care</p>
        </div>
      </div>

      <div className="main-tittle">
        <p className="text-wrapper-3">Choose The Best Care For Yourself</p>
      </div>

      {/* Cat Part */}
      <div className="cat-part">
        <div className="picture-services-cat">
          <div className="avatar-cat">
            {/* image cat */}
            <img className="rectangle" src={Cat} alt="cat" />
          </div>
        </div>
        <div className="content-services-cat">
          <div className="list-item-cat">
            <div className="text-wrapper-7">Cat Services</div>
            <div className="item">
              <div className="avatar">
                <img className="rectangle-2" src={Tick} alt="avatar" />
              </div>
              <div className="text">
                <div className="text-wrapper-4">Helena Hills</div>
                <p className="text-wrapper-cat">
                  Staff learn proper handling, signs, and symptoms of illness,
                  dog expressions, and body language.
                </p>
              </div>
            </div>
            <div className="item-2">
              <div className="avatar">
                <img className="rectangle-2" src={Tick} alt="avatar" />
              </div>
              <div className="text">
                <div className="text-wrapper-4">Charles Tran</div>
                <p className="text-wrapper-cat">
                  Snacks are available throughout the day and fresh water is
                  constantly available.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="avatar">
                <img className="rectangle-2" src={Tick} alt="avatar" />
              </div>
              <div className="text">
                <div className="text-wrapper-4">Oscar Davis</div>
                <p className="text-wrapper-cat">
                  Snacks are available throughout the day and fresh water is
                  constantly available.
                </p>
              </div>
            </div>
            <button
              className="element-primary-button"
              onClick={() => (window.location.href = "booking")}
              style={{ border: "none" }}
            >
              <div className="text-wrapper-6">Book now</div>
            </button>
          </div>
        </div>
      </div>

      {/* Dog Part */}
      <div className="dog-part">
        <div className="content-services-dog">
          <div className="list-services-dog">
            <div className="list-services-dog-title">Dog Services</div>
            <div className="list-services-dog-item">
              <div className="list-services-dog-item-text">
                <div className="list-services-dog-item-text-name">
                  Oscar Davis
                </div>
                <div className="list-services-dog-item-text-desc">
                  Snacks are available throughout the day and fresh water is
                  constantly available.
                </div>
              </div>
              <div className="avatar">
                <img className="rectangle-2" src={Tick} alt="avatar" />
              </div>
            </div>
            <div className="list-services-dog-item">
              <div className="list-services-dog-item-text">
                <div className="list-services-dog-item-text-name">
                  Charles Tran
                </div>
                <div className="list-services-dog-item-text-desc">
                  Snacks are available throughout the day and fresh water is
                  constantly available.
                </div>
              </div>
              <div className="avatar">
                <img className="rectangle-2" src={Tick} alt="avatar" />
              </div>
            </div>
            <div className="list-services-dog-item">
              <div className="list-services-dog-item-text">
                <div className="list-services-dog-item-text-name">
                  Charles Tran
                </div>
                <div className="list-services-dog-item-text-desc">
                  Snacks are available throughout the day and fresh water is
                  constantly available.
                </div>
              </div>
              <div className="avatar">
                <img className="rectangle-2" src={Tick} alt="avatar" />
              </div>
            </div>
            <button
              className="element-primary-button"
              onClick={() => (window.location.href = "booking")}
              style={{ border: "none" }}
            >
              <div className="text-wrapper-6">Book now</div>
            </button>
          </div>
        </div>
        <div className="picture-services-dog">
          <div className="avatar-dog">
            {/* image dog */}
            <img className="rectangle" src={Dog} alt="dog" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Services;
