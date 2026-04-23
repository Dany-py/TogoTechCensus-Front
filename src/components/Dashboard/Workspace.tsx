
import { apiClient } from '../../services/csrf.service';
import type { IProject, Technologies } from '../../types/Project';
import project_png from '../../assets/project.png';
import { useState, useEffect } from 'react';
import Submission from './Submission';
import Modal from './Modal';
import axios from 'axios';

interface userStat {
    active: number,
    view: number,
    rate: number
}

const Workspace = () => {
    const defaultStats: userStat = {
        active: 0,
        view: 0,
        rate: 0
    }

    const url = import.meta.env.VITE_API_PROJECT as string
    const [stats, setStats] = useState<userStat>(defaultStats)
    const [projects, setProjects] = useState<Array<IProject>>([])
    const [project, setProject] = useState<IProject>()
    const [updateProject, setUpdateProject] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [hasProject, setHasProject] = useState(false)
    const [detail, setDetail] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

    const createProject = () => {
        setShowCreateModal(true)
    }
    const createUpdate = () => {
        setUpdateProject(true)
    }
    const archiveProject = async (id: number) => {
        const archivePayload = {
            id: id,
            is_archived: true
        }
        const archivedUrl = url + `${id}/`
        await apiClient.patch(archivedUrl, archivePayload)
        return { success: true }
    }
    const showDetail = (id: number) => {
        // Si le même projet est cliqué, fermer le détail
        if (selectedProjectId === id) {
            setDetail(false)
            setSelectedProjectId(null)
            setProject(undefined)
        } else {
            // Ouvrir le détail du nouveau projet
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].id === id) {
                    setDetail(true)
                    setProject(projects[i])
                    setSelectedProjectId(id)
                }
            }
        }
    }

    const updatedStamp = (date: string): string  => {
        const now = Date.now();
        const updatedAt = new Date(date).getTime();

        if (isNaN(updatedAt)) return "Date invalide";

        const diffMs = now - updatedAt;
    
        if (diffMs < 1000) return "à l'instant";

        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffDay > 0) return `${diffDay}d`;
        if (diffHour > 0) return `${diffHour}h`;
        if (diffMin > 0) return `${diffMin}m`;
    
        return `${diffSec}s`;
    }
    useEffect(() => {
        
        const fecthProject = async () => {
            const url_mine = url + '?filter=mine'
            const response = await axios.get(url_mine)
            const apiResponse = response.data
            const projectData = apiResponse.results
            setProjects(projectData)
            if (projectData.length > 0) setHasProject(true)
        }
        fecthProject()

        const fetchWorkspaceData = async () => {
            try {
                setLoading(true)

                const statsUrl = url + 'stats/?filter=mine'
                const statsResponse = await apiClient.get(statsUrl)
                setStats(statsResponse.data)
            } catch (error) {
                console.error('Error fetching workspace data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchWorkspaceData()
    }, [url])

    return (
        <div className="container w-100 vh-500 dashboard">
            { loading && <p>Loading...</p> }
            <section className="text-start mt-3 px-3">
                <h1>My Workspace</h1>
                <p>Manage your contributions and follow the evolution of your Tech projects.</p>
            </section>

            <div className="row p-3">

                <div className="col-md-9 w-70 p-3">

                    <div className="row w-100 justify-content-center mx-2">
                        <div className="col-md-4 card d-flex justify-self-center mx-2">
                            <p>Active Projects</p>
                            <h1>{stats.active ? stats.active : defaultStats.active}</h1>
                        </div>
                        <div className="col-md-4 card d-flex justify-self-center mx-2">
                            <p>Total Views</p>
                            <h1>{stats.view ? stats.view : defaultStats.view}</h1>
                        </div>
                        <div className="col-md-4 card d-flex justify-self-center mx-2">
                            <p>Publication Rate</p>
                            <h1>{stats.rate ? stats.rate : defaultStats.rate}%</h1>
                        </div>
                    </div>

                    <div className="row w-100 dash-top-project mt-3 mx-2">
                       
                        <div className="container vh-100">
                            <section>
                                <h1 className="text-start">My Projects</h1>
                            </section>
            
                            <div className='row justify-content-start'>

                                { hasProject && projects.length > 0 ?
                                    (projects.map((item: any) => (
                                        <div key={item.id} className="col-lg-6 col-md-12 my-3 project-card" style={{ cursor: 'pointer' }}>
                                            
                                            <div className="project-content w-100 h-100 p-3 d-flex flex-column"
                                                style={{
                                                    border: selectedProjectId === item.id ? '2px solid #28A745' : 'none',
                                                    borderRadius: '8px',
                                                    backgroundColor: selectedProjectId === item.id ? '#f0f9f5' : 'transparent',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onClick={() => showDetail(item.id)}
                                            >
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <img 
                                                        src={item.logo_url ? item.logo_url : project_png} 
                                                        alt={item.name}
                                                        className='project-icon' 
                                                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                                                    />
                                                    {item.is_archived === true ? (
                                                        <span className='badge bg-light text-dark' style={{ fontSize: '12px' }}>Archived</span>
                                                    ) : (
                                                        <span className='badge bg-light text-dark' style={{ fontSize: '12px' }}> {item.is_verified === true ? 'Published': 'Unpublished'} </span>
                                                    )}

                                                </div>

                                                {/* Titre et type */}
                                                <h5 className='mb-1'>
                                                    <strong>{item.name}</strong>
                                                </h5>
                                                <small className='text-muted d-block mb-2'>
                                                    🕐 Updated {updatedStamp(item.updated_at)} ago
                                                </small>

                                                {/* Description */}
                                                <p className='text-muted small flex-grow-1 mb-3'>
                                                    {item.description.split('. ')[0]}
                                                </p>

                                                {/* Technologies */}
                                                <div className='d-flex flex-wrap gap-2 mb-3'>
                                                    {item.technologies && item.technologies.slice(0, 3).map((tech: Technologies, index: number) => (
                                                        <span key={index} className='badge bg-light text-secondary' style={{ fontSize: '11px' }}>
                                                            {tech.name.toUpperCase()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ): ''}
                                { showCreateModal ? <Modal
                                        component={ <Submission onSuccess={() => setShowCreateModal(!showCreateModal)} /> }
                                        onClose={() => setShowCreateModal(!showCreateModal)}
                                        /> : ''
                                }
                                <div className="col-lg-6 col-md-12 my-3">
                                    <button 
                                        className="d-flex flex-column justify-content-center align-items-center w-100 h-100 p-4"
                                        style={{
                                            backgroundColor:'#f5f5f5',
                                            color: '#606060',
                                            border: '2px dashed #c7c7c7',
                                            borderRadius: '8px',
                                            minHeight: '250px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={createProject}
                                    >
                                        <div className="mb-3"
                                            style={{
                                                backgroundColor:'#c7c7c7',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width:'3em',
                                                height: '3em',
                                                borderRadius: '100%',
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="15" y1="50" x2="85" y2="50" stroke="#606060" stroke-width="10" stroke-linecap="round"/>
                                                <line x1="50" y1="15" x2="50" y2="85" stroke="#606060" stroke-width="10" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                        <h6>Add new project</h6>
                                        {/*<small className="text-muted">Donnez vie à votre prochaine innovation</small>*/}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                {
                    detail && project ? (
                        <div className="col-md-3 w-30 p-3 aside">
                            <aside className="workspace-aside-card d-flex flex-column align-items-center justify-content-center h-100">
                                {/* Project Logo - Full Width */}
                                <div className="w-100 px-5" style={{ maxHeight: '200px', overflow: 'hidden', borderRadius: '8px' }}>
                                    <img 
                                        src={project.logo_url ? project.logo_url : project_png} 
                                        alt={project.name} 
                                        className='w-100 h-100 object-fit-cover'
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                </div>

                                {/* Project Title */}
                                <h3 className='text-center mb-2 w-100'>{project.name}</h3>
                                <p className='text-muted text-center small mb-3 w-100'>{project.description}</p>

                                <hr className='w-100' />

                                {/* Statistics */}
                                <div className='mb-3 w-100 text-center'>
                                    <p className='fw-bold mb-2'>Statistics</p>
                                    <div className='d-flex justify-content-center gap-4'>
                                        <div className='workspace-aside-span'>
                                            <p className='mb-1 small text-muted'>Type</p>
                                            <p className='mb-0 fw-bold text-capitalize'>{project.type || 'N/A'}</p>
                                        </div>
                                        <div className='workspace-aside-span'>
                                            <p className='mb-1 small text-muted'>Views</p>
                                            <p className='mb-0 fw-bold'>{project.view_count || 0}</p>
                                        </div>
                                    </div>
                                </div>


                                {/* Technologies */}
                                {project?.technologies && project.technologies.length > 0 && (
                                    <div className='mb-3 w-100 text-center'>
                                        <hr className='w-100' />
                                        <p className='fw-bold mb-2'>Technologies</p>
                                        <div className='d-flex flex-wrap gap-2 justify-content-center'>
                                            {Array.isArray(project.technologies) && project.technologies.map((tech: any, index: number) => (
                                                <span key={index} className='badge bg-secondary'>{tech.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <hr className='w-100' />

                                {/* Action Button */}
                                { updateProject ? <Modal
                                    component={<Submission id={project.id} onSuccess={() => setUpdateProject(!updateProject)} />}
                                    onClose={() =>  setUpdateProject(false)}
                                    /> : ''
                                }
                                <div className='d-flex align-items-center justify-content-center'>
                                    <button 
                                        className="w-100 mt-2 mx-1"
                                        onClick={createUpdate}
                                    >
                                        Update
                                    </button>
                                    {
                                        project.is_archived ? '' : 
                                        <button 
                                            className="w-100 mt-2 mx-1"
                                            onClick={() => archiveProject(project.id)}
                                        >
                                            Archive
                                        </button>
                                    }
                                </div>
                            </aside>
                        </div>
                    ) : ''
                }

            </div>
        </div>
    )
}

export default Workspace