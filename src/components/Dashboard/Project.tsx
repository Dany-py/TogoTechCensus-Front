import project_png from '../../assets/project.png'
import { useState, useEffect } from 'react';
import type { IProject } from '../../types/Project'
import Modal from './Modal';
import Submission from './Submission';

import axios from 'axios'


const Project = () => {
    const url = import.meta.env.VITE_API_PROJECT as string
    const url_mine = url + '?filter=mine'
    const [project, setProject] = useState<Array<IProject>>([])
    const [hasProject, setHasProject] = useState(false)
    const [create, setCreate] = useState(false)
    const createProject = () => {
        setCreate(true)
    }
    const showDetail = () => {
        console.log('Showing detail')
    }
    useEffect(() => {
        const fecthProject = async () => {
            const response = await axios.get(url_mine)
            const apiResponse = response.data
            const projectData = apiResponse.results
            console.log('Project data :', projectData[0])
            setProject(projectData)
            console.log('Project :', project[0])
            if (project.length >= 0) setHasProject(true)
        }
        fecthProject()
    }, [url])
    
    return (
        <div className="container vh-100">
            <section>
                <h1 className="text-start">My Projects</h1>
            </section>
            
            <div className='row justify-content-center'>

                { hasProject && project.length > 0 ?
                    (project.map((item: any) => (
                        <div key={item.id} className="col-md-4 my-3 mx-3 project" onClick={showDetail} >
                            <h3 style={{
                                textAlign: 'start'
                            }} className='d-flex align-items-center justify-content-between' >
                                <img src={item.logo_url ? item.logo_url : project_png}
                                        className='project-icon'
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = project_png;
                                        }}
                                    />
                                <strong> {item.name} </strong><span className='techno'> <i> {item.is_verified} </i> </span>
                            </h3>
                            <p> {item.description} </p>

                            <section className='d-flex justify-content-around'>
                                {item.technologies && item.technologies.map((tech: string, index: number) => (
                                    <span key={index} className='techno'> {tech} </span>
                                ))}
                            </section>

                            <hr />
                            <section className='d-flex justify-content-center'>
                                <button>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 4H4C2.89543 4 2 4.89543 2 6V14C2 15.1046 2.89543 16 4 16H7.58579L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L16.4142 16H20C21.1046 16 22 15.1046 22 14V6C22 4.89543 21.1046 4 20 4Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Update
                                </button>
                            </section>
                        </div>
                    ))
                ): (
                    <span className="mt-5 d-flex justify-content-center align-items-center graph">
                        { create ? <Modal
                                component={ <Submission/> }
                                onClose={() => setCreate(false)}
                                /> : '' }

                        <h3 className ='mx-3' >🫣 You have not saved any projects</h3>
                        <button className="d-flex justify-content-center align-items-center w-10"
                            onClick={createProject}
                        >
                            <div className="marge-svg mx-3">
                                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="15" y1="50" x2="85" y2="50" stroke="black" stroke-width="10" stroke-linecap="round"/>
                                    <line x1="50" y1="15" x2="50" y2="85" stroke="black" stroke-width="10" stroke-linecap="round"/>
                                </svg>
                            </div>
                            Add your project
                        </button>
                    </span>
                )}
            </div>
        </div>
    )
}

export default Project;