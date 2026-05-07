
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
                <a style={{
                    textDecoration: 'none',
                    color:'#52B878'}} href= "/" className="title-link"><img alt = "logo" src ={logo} />TogoTechCensus</a>
                <ul className="navbar-nav mb-lg-0">
                    <li className="nav-item">
                        <Link label='Startups' href= "#home-project"className= "navbar-brand"></Link>
                    </li>
                    <li className="nav-item">
                        <Link label='About' href= "#about"className= "navbar-brand"></Link>
                    </li>
                    <li className="nav-item">
                        <Link label='Explore' href= "/explore"className= "navbar-brand"></Link>
                    </li>
                    <li className="nav-item">
                        <Link label='Contact' href= "/contact"className= "navbar-brand"></Link>
                    </li>
                    <span className="nav-item navbar-nav-span">
                        {isSign ? <Link label='Sign in' href= "/SignIn"className= "navbar-brand"></Link>
                            : <Link label='Sign up' href= "/SignUp"className= "navbar-brand"></Link>
                        }
                    </span>
                </ul>
            </div>) }
        </nav>
    )
}

export default Navbar