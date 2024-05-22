import './css/Header.css';
import logo from './img/img_Home/logo.png'
import userAccount from './img/img_Booking/img-7.png'
function Header() {
    return (
        <div className="main-header">
            <div className="main-header-navigation">
                <img className="main-header-logo" src={logo} alt='' />
                <div className="main-header-menu">
                    <div className="header_link">
                        <a href="#123" className="header_link-text">Home</a>
                    </div>
                    <div className="header_link">
                        <a href="#123" className="header_link-text">Services</a>
                    </div>
                    <div className="header_link">
                        <a href="#123" className="header_link-text">About us</a>
                    </div>
                    <div className="header_link">
                        <a href="#123" className="header_link-text">Contact</a>
                    </div>
                    <div className="header_link">
                        <a href="#123" className="header_link-text">Blog</a>
                    </div>
                </div>
                <div className="main-header-user_wrapper">
                    <div className="main-header-user">
                        <div className="main-header-user-account">
                            <img className="account_icon" src={userAccount} alt='' />
                            <div className="main-header-user-account-name">Hi Employee</div>
                            <div className="main-header-user-account_menu">
                                <div className="main-header-user-account_menu-item">
                                    Log out
                                </div>
                                <div className="main-header-user-account_menu-item">
                                    View Your Pet
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;