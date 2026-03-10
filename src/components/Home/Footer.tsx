
import logo from '../../assets/logo.png';
import Link from '../ui/Link';
import { useState, useEffect } from 'react'

const Footer = () => {
    const [year, setYear] = useState(0)
    const [isSign, setSign] = useState(false)
    
    useEffect(() => {
        const now = new Date()
        setYear(now.getFullYear())
        const storage = localStorage.getItem('')
        //const cookies = cookieStore.getAll()
        if (storage) {
            setSign(true)
        }
    })
    
    return(
        <footer className="container-fluid footer">
            <div className = "row">
                <div className = "col-md-4 me-auto" >
                    <h2><img alt = "logo" src = {logo}/>TogoTechCensus</h2>
                    <p style = {{color: '#ffce00', fontSize: '1.25em'}}>Let us digitize our potential together</p>
                </div>

                <div className = "col-md-4">
                    <h2>Quick link</h2>
                    <a className= "navbar-brand" href = "#mention">Explore</a> <br/>
                    <a className= "navbar-brand" href = "#mention">Research</a> <br/>
                    <a className= "navbar-brand" href = "#mention">Network</a> <br/>
                    <a className= "navbar-brand" href = "#mention">Resources</a>
                </div>

                <div className = "col-md-4">
                    <h2>Legal Notices</h2>
                    <a href = "#mention">Terms of services</a> <br />
                    <a href = "#mention">Privacy policy</a> <br />
                    <a href = "/Connexion" className = "link-connexion" id="link-connexion"> {isSign ? 'Sing up' : 'Sign in'} </a>
                </div>
            </div>
            <hr style = {{width: "50%", justifySelf: "center"}}/>
            <p style={{margin:"0"}}>Copyright &copy; {year} TogoTechCensus</p>
        </footer>
    )
}

export default Footer