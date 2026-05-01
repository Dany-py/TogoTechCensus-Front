

import github from '../../assets/github.png'
import google from '../../assets/google.png'
import user from '../../assets/profil.png'
import { Form } from 'react-router-dom';

const Login = () => {
    return (
        <Form method='post' className='container connection-form'>
            <span className='d-flex align-items-center justify-content-center'>
                <hr style={{
                    width: '7em',
                    fontSize: '2em',
                }}
                />

                <img className="login-img-user" src={user} alt="user" id='logo-user' />

                <hr style={{
                    width: '7em',
                    float: 'right',
                    fontSize: '2em'
                }}
                />
            </span>
            <h1>Welcome Back</h1>
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
        </Form>
    )
}

export default Login;