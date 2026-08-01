import type { IProject } from '../../types/Project';
import project_png from '../../assets/project.png';
import { useState, useEffect } from 'react';
import slugify from 'slugify';
import axios from 'axios';

const Project = () => {
    const [project, setProject] = useState<Array<IProject>>([])
    const url = import.meta.env.VITE_API_PROJECT as string
    useEffect(() => {
        const LoadProject = async () => {
            const urlWithPage = `${url}unauth/?page=${1}`
            const response = await axios.get(urlWithPage)
            const apiResponse = response.data
            const projectData = apiResponse.results
            //console.log('Project url :', urlWithPage)
            //console.log('Project data :', projectData)
            setProject(projectData)
        }
        LoadProject()
    }, [])

    return (
        <div className="container-fluid projects" id="home-project">
            <h1 >Already listed</h1>
            <br />

            <div className="row justify-content-center">
                {
                    project.map((item: any) => (
                            <a style={{textDecoration:'none', color:'black'}} href={`project/${slugify(decodeURIComponent(item.name), {
                                                        replacement: '-',
                                                        remove: /[*+~.()'"!:@]/g,
                                                        lower: true,
                                                        strict: false,
                                                        locale: 'en',
                                                        trim: true
                                                    })}`} key={item.id} className="col-md-3 my-2 mx-3 card"
                            >                                
                                
                                <h3 style={{
                                    textAlign: 'start'
                                }} className='d-flex align-items-center justify-content-between'>
                                    <img src={item.logo_url ? item.logo_url : project_png}
                                        className='project-icon'
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = project_png;
                                        }}
                                    />
                                    <strong> {item.name} </strong>
                                    <span className='d-grid'>                                        
                                        {item.is_verified && (
                                            <span className="badge-verified mb-2 mx-2">Verified</span>
                                        )} 

                                        <i className="project-type"> {item.type.charAt(0).toUpperCase() + item.type.slice(1)} </i>
                                    </span>
                                </h3>
                                <span className="mb-4 desc">
                                    {item.description.split('. ')[0]}
                                </span>
                                
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