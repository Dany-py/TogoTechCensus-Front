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
        <div className="container-fluid projects">
            <h1>Top projects</h1> <br />
            <div className='row justify-content-center'>

                {
                    project.map((item: any) => (
                        <a href={`project/${slugify(decodeURIComponent(item.name), {
                            replacement: '-',
                            remove: /[*+~.()'"!:@]/g,
                            lower: true,
                            strict: false,
                            locale: 'en',
                            trim: true
                        })}`} key={item.id} className="col-md-2 my-3 mx-3 card" >
                           
                            <h3 style={{
                                textAlign: 'start'
                            }} className='d-flex align-items-center justify-content-center'>
                                <img src={item.logo_url ? item.logo_url : project_png} className='project-icon me-3' />
                                <strong> {item.name} </strong>
                                <span className='d-grid'>                                        
                                    {item.is_verified && (
                                        <span className="badge bg-success mx-2">Verified</span>
                                    )}
                                </span>
                            </h3>
                            <p> {item.description.split('. ')[0]} </p> <p style={{color:'#28A745'}}><strong><i>click for more...</i></strong></p>

                            <section className='d-flex justify-content-around'>
                                {item.technologies && item.technologies.map((tech: string, index: number) => (
                                    <span key={index} className='techno'> {tech} </span>
                                ))}
                            </section>

                            {/*<hr />
                            
                            <section className='d-flex justify-content-between'>
                                <button>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 4H4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H7.58579L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L16.4142 16H20C21.1046 16 22 15.1046 22 14V6C22 4.89543 21.1046 4 20 4Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                    Comment
                                </button>

                                <button>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                    Like
                                </button>
                            </section>*/}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default Project;