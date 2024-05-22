import './css/Booking.css';
import Footer from './Footer.js'
import Header from './Header.js'
import green from './img/img_Booking/icons8-square-24-1-1.png'
import red from './img/img_Booking/icons8-square-24-1.png'

function Booking() {
    return (
        <div className="booking-container container-fluid">
            <div className="div row">
                <Header></Header>
                <div className="book-title">Book Appointment</div>
                <div className="main-booking-menu">
                    <div className="tittle-booking">
                        Please choose your desired service
                    </div>

                    <div className="select-booking">
                        <div className="select-booking_left">
                            <div className="patient_Input">
                                <div className="select_Name">Name</div>
                                <input
                                    type="text"
                                    className="name_input"
                                    placeholder="Patient Name"
                                />
                            </div>

                            <div className="select_Payment">
                                <div className="select_Name">Payment</div>
                                <div className="select_Booking">
                                    <select name="payment" className="select_Info" required>
                                        <option value="">Momo</option>
                                        <option value="">Paypal</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="select-booking_right">
                            <div className="select_Service">
                                <div className="select_Name">Services</div>
                                <div className="select_Booking" >
                                    <select name="service" className="select_Info" required>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="select_Doctors">
                                <div className="select_Name">Doctors</div>
                                <div className="select_Booking">
                                    <select name="doctors" className="select_Info" required>
                                        <option value="">A</option>
                                        <option value="">B</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="available-tittle">
                        <div className="available-tittle-text">Available slots:</div>
                        <div className="booked-slot">
                            <div className="booked-status">Booked</div>
                            <img className="square" src={red} alt="" />
                        </div>
                        <div className="available-slot">
                            <div className="booked-status">Available</div>
                            <img className="square" src={green} alt="" />
                        </div>
                    </div>

                    <div className="booking-menu">
                        <div className="element-button-green">
                            <p className="p">8:00 - 9:00</p>
                        </div>
                        <div className="element-button-red">
                            <p className="p">9:00 - 10:00</p>
                        </div>
                        <div className="element-button-red">
                            <p className="p">10:00 - 11:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">11:00 - 12:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">12:00 - 13:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">13:00 - 14:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">14:00 - 15:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">15:00 - 16:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">16:00 - 17:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">17:00 - 18:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">18:00 - 19:00</p>
                        </div>
                        <div className="element-button-green">
                            <p className="p">19:00 - 20:00</p>
                        </div>
                    </div>
                    <div className="booking-pay-money">
                        <div className="booking-pay-money-desc">
                            <div className="booking-pay-money-text">PAYABLE AMOUNT : $</div>
                            <div className="booking-pay-money-price">50</div>
                        </div>
                    </div>
                    <button className="CONFIRM-BOOK" type="submit">
                        <div className="BOOKING-NOW">Confirm Booking</div>
                    </button>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Booking;
