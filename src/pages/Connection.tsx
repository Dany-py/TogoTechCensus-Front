
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import { useState, useEffect } from "react";
import TitlePage from "../utils/Title";
import '../styles/Connexion.css';
const Connection = () => {
    const [open, setOpen] = useState(false)
    const [isAuth, setAuth] = useState(false)
    const [isSign, setSign] = useState(false)
    const [isLogin, setLogin] = useState(false)

    const url = window.location.pathname

    TitlePage({ refPath:window.location.pathname })

    useEffect(() => {
        const auth = window.location.pathname
        const storage = localStorage.getItem('')
        //const cookies = cookieStore.getAll()
        if (storage) {
            setSign(true)
        }
        if(auth === '/dashboard') {
            setAuth(true)
        }

        if (url === '/SignIn'){
            setLogin(true)
        }
    }, [])
    return(
        <div className="container-fluid vh-100 connection">
            <div className="vh-100 d-flex align-items-center justify-content-center">
                {isLogin ? (<Login />) : (<Register />)}
            </div>
        </div>
    )
}

export default Connection;