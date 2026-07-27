
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import { useState, useEffect } from "react";
import TitlePage from "../utils/Title";
import '../styles/Connexion.css';
const Connection = () => {
    const [isLogin, setLogin] = useState(false)

    const url = window.location.pathname

    TitlePage({ refPath:window.location.pathname })

    useEffect(() => {
        if (url === '/SignIn'){
            setLogin(true)
        }
    }, [])
    return(
        <div className="container-fluid vh-150 connection grill">
            <div className="vh-100 d-flex align-items-center justify-content-center">
                {isLogin ? (<Login />) : (<Register />)}
            </div>
        </div>
    )
}

export default Connection;