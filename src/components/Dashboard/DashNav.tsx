
import { getCookie } from '../../services/csrf.service';
import userLogo from '../../assets/utilisateur.png';
import bell from "../../assets/notification.png";
import { useState,useEffect } from 'react';
import logo from "../../assets/logo.png";
import "../../styles/Dashboard.css";

interface UserData {
    name: string,
    avatar_url: string,
    role: string
}

interface DashNavbarProps {
    hasUnreadNotifications?: boolean;
    onNotification?: (hasUnread: boolean) => void;
    isMenuOpen?: boolean;
    onMenuToggle?: (isOpen: boolean) => void;
}

function DashNavbar({ hasUnreadNotifications = false, onNotification, isMenuOpen = false, onMenuToggle }: DashNavbarProps) {

    const defaultUser: UserData = {
        name: 'John Doe',
        avatar_url: userLogo,
        role: 'User'
    }
    const [isAuth, setAuth] = useState(false)
    const [user, setUser] = useState<UserData>(defaultUser)
    const [isSign, setSign] = useState(false)
    const auth = window.location.pathname
    
    useEffect(() => {
        const cookies = getCookie('sessionid')
        const session = getCookie('user_session')
        const token = getCookie('X-CSRFToken')
        const logged_in = getCookie('logged_in')
        if (cookies || session || token || logged_in) {
            setSign(true)
            const userData = localStorage.getItem('user')
            if (userData){
                const data = JSON.parse(userData) as unknown as UserData
                setUser(data)
            } else {
                setUser(defaultUser)
            }
        }
        if(auth === '/dashboard') {
            setAuth(true)
        }
    }, [auth])
    
    useEffect(() => {
        const socketUrl = import.meta.env.VITE_API_WS as string
        const socket = new WebSocket(`${socketUrl}ws/notifications/`);

        socket.onopen = () => {
            console.log('WebSocket connecté');
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("Message reçu :", data.message);
            if (data.message && onNotification) {
                onNotification(true);
            }
        };

        
    }, [onNotification]);

    return(
        <nav className = "navbar navbar-expand-lg dash-nav" id="dash-nav">
            <button
                className = "navbar-toggler"
                type = "button"
                onClick = {() => onMenuToggle && onMenuToggle(!isMenuOpen)}
            >
                <span className = "navbar-toggler-icon"></span>
            </button>
            { isSign && isAuth ? (
            <div className = {`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
                {/*<h3  style={{color:'#52B878', margin:'0'}}><img alt = "logo" src ={logo} id="dash-nav-img-1"/>TogoTechCensus</h3>*/}
                <a style={{
                    textDecoration: 'none',
                    fontSize: '2em',
                    margin:'0',
                    color:'#52B878'}} href= "/" ><img alt = "logo" src ={logo} id="dash-nav-img-1" />TogoTechCensus
                </a>
                {
                    user ? (
                        <div className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <span className="ms-auto d-flex align-items-center justify-content-center">
                                <img src={bell} style={{ width:'2em', height:'2em', margin:"0" }} />
                                { hasUnreadNotifications ? (
                                    <p className="d-flex align-items-center justify-content-center"
                                        style={{
                                        backgroundColor: 'red',
                                        color:'white',
                                        width:'1em',
                                        height:'1em',
                                        borderRadius: '100%',
                                        transform: 'translateX(-0.7em)'
                                        }}>1</p>) : ''
                                }
                                <p className="mb-0 mx-3"> {user.name} </p> <br/>
                                <img alt='avatar' src={user.avatar_url} className="dash-nav-img" />
                            </span>
                        </div>
                    ) : ''
                }
            </div>) : ''}
        </nav>
    )
}

export default DashNavbar;