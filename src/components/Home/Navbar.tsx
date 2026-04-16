
import logo from "../../assets/logo.png";
import Link from '../ui/Link'
import "../../styles/Home.css";
import { useEffect, useState } from 'react';
import { getCookie } from '../../services/csrf.service'


function Navbar() {
    const [open, setOpen] = useState(false)
    const [isAuth, setAuth] = useState(false)
    const [isSign, setSign] = useState(false)
    const auth = window.location.pathname

    useEffect(() => {
        const cookies = getCookie('sessionid')
        if (cookies) {
            setSign(true)
        }
        if(auth === '/dashboard') {
            setAuth(true)
        }
    }, [auth])
    return(
        <nav className = "navbar navbar-expand-xxl">
            <button
                className = "navbar-toggler"
                type = "button"
                onClick = {() => setOpen(!open)}
            >
                <span className = "navbar-toggler-icon"></span>
            </button>
            { isAuth ? '' : (
            <div className = {`collapse navbar-collapse ${open ? "show" : ""}`} id="navbar-2">
                <h3 style={{color:'#28a745'}}><img alt = "logo" src ={logo} />TogoTechCensus</h3>
                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                    <li className="nav-item">
                        <Link label='Home' href= "/"className= "navbar-brand"></Link>
                    </li>
                    <li className="nav-item">
                        <Link label='Explore' href= "/explore"className= "navbar-brand"></Link>
                    </li>
                    <li className="nav-item">
                        <Link label='Contact' href= "/contact"className= "navbar-brand"></Link>
                    </li>
                    <li className="nav-item d-gid">
                        {isSign ? <Link label='Sign in' href= "/SignIn"className= "navbar-brand"></Link>
                            : <Link label='Sign up' href= "/SignUp"className= "navbar-brand"></Link>
                        }
                    </li>
                </ul>
            </div>) }
        </nav>
    )
}

export default Navbar