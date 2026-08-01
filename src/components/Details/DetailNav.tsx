
import "../../styles/Home.css";
import slugify from "slugify";

interface DetailNavProps {
    title: string,
    logo: string,
    stage: string,
    type: string,
    description: string
}


function DetailNavbar({ title, logo, stage, type, description }: DetailNavProps) {
    return(
        <nav className = "navbar navbar-expand-lg">
            <div className = "detail-navbar navbar-collapse" id="navbar-2">
                {/*<h3 className='ms-5 detail-navbar-element' >
                    <img alt = "logo" src ={logo} style={{
                        width: '2em',
                        height: '2em'
                    }} /> {title} 
                </h3>*/}
                <a style={{
                    textDecoration: 'none',
                    fontSize: '2em',
                    color: 'black'}} href= {`/project/${slugify(decodeURIComponent(title), {
                                                                            replacement: '-',
                                                                            remove: /[*+~.()'"!:@]/g,
                                                                            lower: true,
                                                                            strict: false,
                                                                            locale: 'en',
                                                                            trim: true
                                                                        })}`}><img alt = "logo" src ={logo} />{title}
                </a>
                
                <span className='ms-5 project-type detail-navbar-element'><p className='m-0'>{type}</p></span>
                <span className='ms-5 detail-techno detail-navbar-element'><p className='m-0'>{stage}</p></span>
                <h5 className='ms-5 mb-0 detail-navbar-element'>{description.charAt(0).toUpperCase() + description.slice(1)}</h5>
            </div>
        </nav>
    )
}

export default DetailNavbar;