import './css/SignUp.css';
import jonas from './img/img_SignUp/jonas-vincent-xuliyvibyic-unsplash-1.png'
import pet from './img/img_SignUp/651dfce9820f55d331f420e6-pet-health-1-3.png'
function SignUp() {
    return (
        <div className="create-account-page">
            <div className="overlap-img">
                <div className="frame">
                    <img
                        className="create-account_img"
                        src={jonas}
                        alt=''
                    />
                    <div className="create-account_content">
                        <div className="create-account_logo">
                            <img
                                src={pet}
                                alt=''
                            />
                        </div>
                        <div className="create-account_tittle">
                            Create an account
                        </div>
                        <form action=''>
                            <div className="form_SignUp">
                                <div className="form_SignUp_Input">
                                    <input
                                        className="form_SignUp_Input-Text"
                                        placeholder="Username/Email"
                                        type="email"
                                    />
                                </div>
                                <div className="form_SignUp_Input">
                                    <input className="form_SignUp_Input-Text" placeholder="Password" type="password" />
                                </div>
                                <div className="form_SignUp_Input">
                                    <input className="form_SignUp_Input-Text" placeholder="Name" type="text" />
                                </div>
                            </div>

                            <div className="form_SignUp_Btn_Wrapper">
                                <button className="form_SignUp_Btn">
                                    <div className="form_SignUp_Btn-Text">Sign up</div>
                                </button>
                            </div>
                        </form>
                        <div className="form_SignUp_Regulation">
                            <span className="form_SignUp_Regulation_Span">By clicking sign up, you agree to our </span>
                            <a className="form_SignUp_Regulation_Link" href="#sad">Terms of Service</a>
                            <span className="form_SignUp_Regulation_Span"> and </span>
                            <a className="form_SignUp_Regulation_Link" href="#sad">Privacy Policy</a>
                        </div>
                        <div className="form_SignUp_HadAcc">
                            <div className="text-wrapper-4">Already have a account?</div>
                            <a href="#sad" className="form_SignUp_HadAcc_SignIn">Sign in now</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUp;
