
import "../../styles/Home.css";
import { useState } from 'react';

interface DetailNavProps {
    title: string,
    logo: string,
    stage: string,
    type: string,
    description: string
}


function DetailNavbar({ title, logo, stage, type, description }: DetailNavProps) {
    const [open, setOpen] = useState(false)
    return(
        <nav className = "navbar navbar-expand-lg">
            <button
                className = "navbar-toggler"
                type = "button"
                onClick = {() => setOpen(!open)}
            >
                <span className = "navbar-toggler-icon"></span>
            </button>
            <div className = {`collapse navbar-collapse ${open ? "show" : ""}`} id="navbar-2">
                <h3 className='ms-5' >
                    <img alt = "logo" src ={logo} style={{
                        width: '2em',
                        height: '2em'
                    }} /> {title} 
                </h3>
                <span className='ms-5 techno'><p className='m-0'>{type}</p></span>
                <span className='ms-5 detail-techno'><p className='m-0'>{stage}</p></span>
                <h5 className='ms-5 mb-0'>{description.charAt(0).toUpperCase() + description.slice(1)}</h5>
            </div>
        </nav>
    )
}

export default DetailNavbar;