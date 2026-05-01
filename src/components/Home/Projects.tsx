import project_png from '../../assets/project.png'
import { useState, useEffect } from 'react'
import projectData from '../../data/project.json'
import type { IProject } from '../../types/Project'
import slugify from 'slugify'


const data = projectData.results as unknown as Array<IProject>

const Project = () => {
    const [project, setProject] = useState<Array<IProject>>([])
    
    useEffect(() => {
        if (projectData) {
            setProject(data)
        }
    }, [])

    return (
        <div className="container-fluid projects" id="home-project">
            <h1>Top projects</h1> <br />
            <div className='row justify-content-center'>

                {
                        project.map((item: any) => (
                            <a  href={`project/${slugify(decodeURIComponent(item.name), {
                                                        replacement: '-',
                                                        remove: /[*+~.()'"!:@]/g,
                                                        lower: true,
                                                        strict: false,
                                                        locale: 'en',
                                                        trim: true
                                                    })}`} key={item.id} className="col-md-2 my-3 mx-3 card">
                                <h3 style={{
                                    textAlign: 'start'
                                }} className=' d-flex align-items-center justify-content-between'>
                                    <img src={item.logo_url ? item.logo_url : project_png} className='project-icon' />
                                    <strong> {item.name} </strong>
                                    <span className='d-grid'>                                        
                                        {item.is_verified && (
                                            <span className="badge-verified mb-2 mx-2">Verified</span>
                                        )} 

                                        <i className="project-type"> {item.type.charAt(0).toUpperCase() + item.type.slice(1)} </i>
                                    </span>
                                </h3>
                                <span className="mb-4">
                                    {item.description.split('. ')[0]}
                                </span>
                                
                                {/*<p style={{color:'#52B878'}}>
                                    <strong>
                                        <i>click for more...</i>
                                    </strong>
                                </p>*/}
                                <section className='d-flex justify-content-around'>
                                    {item.technologies && item.technologies.map((tech: any, index: number) => (
                                        <span key={index} className='techno'> {tech.name} </span>
                                    ))}
                                </section>

                            </a>
                        ))
                }
            </div>
        </div>
    )
}

export default Project;