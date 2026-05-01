
import logo from '../../assets/logo.png';
import { useState, useEffect } from 'react'
import { getCookie } from '../../services/csrf.service'

const Footer = () => {
    const [year, setYear] = useState(0)
    const [isSign, setSign] = useState(false)

    useEffect(() => {
        const now = new Date()
        setYear(now.getFullYear())
        const cookies = getCookie('sessionid')
        if (cookies) {
            setSign(true)
        }
    })

    return (
        <footer className="container-fluid footer">
            <div className="row">
                <div className="col-md-4 me-auto" >
                    <h2><img alt="logo" src={logo} />TogoTechCensus</h2>
                    <p style={{ color: '#F0D574', fontSize: '1.25em' }}>Let us digitize our potential together</p>
                </div>

                <div className="col-md-4">
                    <h2>Quick link</h2>
                    <a className="navbar-brand" href="/explore">Explore</a> <br />
                    <a className="navbar-brand" href="/contact">Contacts</a> <br />
                </div>

                <div className="col-md-4">
                    <h2>Legal Notices</h2>
                    <a className="navbar-brand" href="/terms">Terms of services</a> <br />
                    <a className="navbar-brand" href="/privacy">Privacy policy</a> <br />
                    <a className="navbar-brand" href={`${isSign ? 'SingIn' : 'SignUp'}`}> {isSign ? 'Sing in' : 'Sign up'} </a>
                </div>
            </div>
            <hr style={{ width: "50%", justifySelf: "center" }} />
            <p style={{ margin: "0" }}>Copyright &copy; {year} TogoTechCensus</p>
        </footer>
    )
}

export default Footer