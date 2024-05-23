import './css/HeaderManager.css';

function HeaderManager() {
    return (
        <div className="navigation">
            <div className="text-wrapper">pethealthcare@gmail.com</div>
            <div className="navigation-user">
                <i className="fa-regular fa-user navigation-user_icon"></i>
                <div className="text-wrapper-2">Hi Employee</div>
                <div className="navigation-user_notify">
                    <div className="navigation-user_notify_content">
                        <i className="fa-solid fa-arrow-right-from-bracket navigation-user_logout_icon"></i>
                        <div className="navigation-user_notify_content-text">Log out</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderManager;