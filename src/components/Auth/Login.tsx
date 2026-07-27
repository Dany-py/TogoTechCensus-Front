
import github from '../../assets/github.png'
import google from '../../assets/google.png'
import user from '../../assets/profil.png'
import logo from '../../assets/logo-carre.png'
import TextType from '../ui/TextType';
import { Form } from 'react-router-dom';

const Login = () => {
    return (
        <Form method='post' className='container'>
            <div className='row w-100 vh-100'>
                <div className='col-md-8 connection-form'>
                    <TextType 
                        text = {"Welcome Back"}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor
                        cursorCharacter=""
                        deletingSpeed={50}
                        variableSpeed={{ min: 60, max: 120 }}
                        cursorBlinkDuration={0.5}
                    />
                    <span className='d-flex align-items-center align-self-center justify-content-center'>
                        <img className="login-img-user" src={user} alt="user" id='logo-user' />
                    </span>
                    <p>Sign in to your account</p>

                    <button className='my-3 login-btn' name="intent" value="google">
                        Continue with <img className="ms-2 login-img" src={google} alt="logo-google" />
                    </button>

                    <button className='my-3 login-btn' name="intent" value="github">
                        Continue with <img className="ms-2 login-img" src={github} alt="logo-github" />
                    </button>

                    <span className='d-flex align-items-center justify-content-center'>
                        <p style={{ margin: '0' }}>Don't have an account ?</p>
                        <a className='ms-3 d-flex align-items-center justify-content-center' href='/SignUp'
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                backgroundColor: '#52B878',
                                width: '7em',
                                height: '2em',
                                borderRadius: '10px',
                            }} >Sign up</a>
                    </span>
                </div>
                <div className='col-md-4'>
                    <img className='connection-logo' src={logo}/>
                </div>
            </div>
        </Form>
    )
}

export default Login;