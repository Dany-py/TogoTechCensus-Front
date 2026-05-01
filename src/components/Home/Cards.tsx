
import dev from '../../assets/dev.jpg'
import startup from '../../assets/startup2.png'
import projet from '../../assets/projet.png'
import developer from '../../assets/developpeur.png'
import CountUp from '../ui/CountUp'
import { useEffect, useState } from 'react';
import { getCookie } from '../../services/csrf.service'

const Cards = () => {
    const [isSign, setSign] = useState(false)
    useEffect(() =>{
        const cookies = getCookie('sessionid')
        const session = getCookie('user_session')
        const token = getCookie('X-CSRFToken')
        const logged_in = getCookie('logged_in')
        if (cookies || session || token || logged_in) {
            setSign(true)
        }
    }, [])
    return(
        <div className="container-fluid row mx-5 cards">
            <div className="col-md-2 me-5 card card-stats">
                <div className="card-icon">
                    <img src={startup} style={{
                        width:'2em',
                        height: '2em'
                    }} />
                </div>
                <h1>                    
                    <CountUp
                        from={0}
                        to={20}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        startWhen={true}
                    />+
                </h1>
                <p className="card-label">Startups</p>
                <p className="card-desc">Innovative companies growing</p>
                <div className="card-badge">Active</div>
            </div>
            <div className="col-md-2 mx-5 card card-stats">
                <div className="card-icon">
                    <img src={projet} style={{
                        width:'2em',
                        height: '2em'
                    }} />
                </div>
                <h1>                    
                    <CountUp
                        from={0}
                        to={100}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        startWhen={true}
                    />+
                </h1>
                <p className="card-label">Projects</p>
                <p className="card-desc">Tech solutions showcased</p>
                <div className="card-badge">Verified</div>
            </div>
            <div className="col-md-2 mx-5 card card-stats">
                <div className="card-icon">
                    <img src={developer} style={{
                        width:'2em',
                        height: '2em'
                    }} />
                </div>
                <h1>                    
                    <CountUp
                        from={0}
                        to={30}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        startWhen={true}
                    />+
                </h1>
                <p className="card-label">Developers</p>
                <p className="card-desc">Talented team members</p>
                <div className="card-badge">Growing</div>
            </div>
            
            <div className="mt-5 container d-flex align-items-center justify-content-center action">
                <img src ={dev} className='card-img'/>
                <h1 className="text-start">
                    Are you a project manager or developer ? <br/>
                    Let us add you project to the directory.

                    { isSign ? (<a href='/dashboard' className='mt-3 card-link'>Add your project</a>) : (<a href='/SignUp' className='mt-3 card-link'>Add your project</a>)}
                    
                </h1>
                
            </div>
            
        </div>
    )
}

export default Cards