//css
import './Footer.css';

//img
import logo_footer from '../../../assets/images/Components/User/Footer/logo_footer.png'
import footer_Sheep from '../../../assets/images/Components/User/Footer/footer-shape02-1.png'
function Footer() {
    return (
        <div className="main-footer">
            <div className="main-footer_Info">
                <div className="main-footer_Info_Desc">
                    <img alt="" className="main-footer_logo" src={logo_footer} />
                    <div className="main-footer_Info_Desc-Contact">
                        <div className="main-footer_Info_Desc-Contact_Text">+84 099999999</div>
                        <div className="main-footer_Info_Desc-Contact_Text">Supportinfo@gmail.com</div>
                    </div>
                    <div className="main-footer_Info_Desc-Address">
                        <img alt="" className="main-footer_FootSheep" src={footer_Sheep} />
                        <div className="main-footer_Info_Desc-Address_Text">
                            555 A, East Manster Street, Ready Halley Neon, Uk 4512
                        </div>
                    </div>
                </div>
                <div className="main-footer_Info_Time">
                    <div className="main-footer_Info_Time-Title">Opening Hours</div>
                    <div className="main-footer_Info_Text">
                        Monday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        8.00 - 21.00
                    </div>
                    <div className="main-footer_Info_Text">
                        Tuesday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        8.00 - 21.00
                    </div>
                    <div className="main-footer_Info_Text">
                        Thursday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        8.00 - 21.00
                    </div>
                    <div className="main-footer_Info_Text">
                        Friday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        8.00 - 21.00
                    </div>
                    <div className="main-footer_Info_Text">
                        Saturday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.00
                        - 21.00
                    </div>
                    <div className="main-footer_Info_Text">
                        Sunday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.00
                        - 21.00
                    </div>
                </div>
            </div>
            <div className="footer_form-subriber">
                <div className="footer_form-subriber-title">Subscribe to our newsletter</div>
                <div className="footer_form-subriber-input">
                    <input type="email" className="footer_form-subriber-input_Email" placeholder="Email" />
                </div>
                <div className="footer_form-subriber-button">
                    <div className="footer_form-subriber-button-text">Subcribe Now</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;