
import { useState, useEffect } from 'react'
import { useActionData } from 'react-router-dom';
import { apiClient } from '../../services/csrf.service';
import Modal from './Modal';
import project_png from '../../assets/project.png';
import Submission from './Submission';
import GrowthChart from './GrowthChart';
import type { IProject, ProjectStats } from '../../types/Project';


const Dashboard = () => {
    const defaultStats = {
        startup: 0,
        open_source: 0,
        developper: 0,
        news: 0
    }
    
    const data = useActionData()    
    const url = import.meta.env.VITE_API_PROJECT as string
    const [stats, setStats] = useState<ProjectStats>(defaultStats)
    const [featured, setFeatured] = useState<Array<IProject>>()
    const [project, setProject] = useState(false)
    const createProject = () => {
        setProject(true)
    }
    useEffect(() => {
        const fetchStats = async () => {
            const statsUrl = url + `stats/`
            const response = await apiClient.get(statsUrl)
            setStats(response.data)
        }
        const fetchFeaturedProject = async () => {
            const statsUrl = url + `stats/?project=featured`
            const response = await apiClient.get(statsUrl)
            setFeatured(response.data.results)
        }
        fetchStats()
        fetchFeaturedProject()
    }, [url])
    useEffect(() => {
        if (data?.success) {
            setProject(false)
        }
    }, [data?.success])
    return (
        <div className="container w-100 vh-500 dashboard">
            <section className="text-start mt-3 px-3">
                <h1>Community Space</h1>
                <p>Welcome to Togo's central technology hub. Discover innovative projects, follow the growth of our ecosystem, and connect with local talent.</p>
            </section>

            <div className="row p-3">
                <div className="col-md-9 w-70 p-3">

                    <div className="row w-100 mx-2">
                        <div className="col-md-3 card d-flex justify-self-center m-2">
                            <p>Projects Records</p>
                            <h1>{stats.news}</h1>
                        </div>
                        <div className="col-md-3 card d-flex justify-self-center m-2">
                            <p>Startups</p>
                            <h1>{stats.startup}</h1>
                        </div>
                        <div className="col-md-3 card d-flex justify-self-center m-2">
                            <p>Open-Source</p>
                            <h1>{stats.open_source}</h1>
                        </div>
                        <div className="col-md-3 card d-flex justify-self-center m-2">
                            <p>Developpers</p>
                            <h1>{stats.developper}</h1>
                        </div>
                    </div>

                    <span className="my-3 d-flex align-items-center justify-content-center">
                        <h3  className="text-start ms-3"><strong>Featured projects</strong></h3>
                        <a href='/explore' style ={{color:'#52B878', textDecoration:'none'}}
                                            className="ms-auto d-flex align-items-center justify-content-center"
                                            >See the full directory <span style={{fontSize:'1.3em'}} className='mx-1' ><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg></span> </a>
                    </span>

                    <div className="row w-100 dash-top-project mt-3 mx-2">
                        {
                        featured?.map((item: any) => (
                            <div key={item.id} className="dash-card">
                                <h3 style={{
                                    textAlign: 'start'
                                }} className=' w-10 d-flex align-items-center justify-content-between'>
                                    <img src={item.logo_url ? item.logo_url : project_png}
                                        className='project-icon'
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = project_png;
                                        }}
                                    />
                                    <strong> {item.name} </strong>

                                    <span className='d-grid'>                                        
                                        {item.is_verified && (
                                            <span className="badge-verified mb-2 mx-2"><strong>Verified</strong></span>
                                        )} 

                                        <i className="project-type"> {item.type.charAt(0).toUpperCase() + item.type.slice(1)} </i>
                                    </span>
                                </h3>
                                <p> {item.description.split('. ')[0]} </p>

                                <section className='d-flex justify-content-around'>
                                    {item.technologies && item.technologies.map((tech: any, index: number) => (
                                        <span key={index} className='techno'> {tech.name} </span>
                                    ))}
                                </section>

                                <hr />

                                <section className='d-flex justify-content-center'>
                                    {   Array.isArray(item.authors) && item.authors.length > 0 ? (
                                        item.authors.map((author: any) => (
                                            <h4 className='mb-0'key={author.id}><i> Build by {author.name === 'owner' ? item.name + ' dev team' : author.name}</i></h4>
                                        ))) : (<h4 className='mb-0'><i>Build by <span style={{color:"#52B878"}}>{item.name}</span> dev team </i></h4>)
                                    }
                                </section>
                            </div>
                        ))
                    }
                    </div>
                    <GrowthChart />
                </div>
                { project ? <Modal
                                component={ <Submission/> }
                                onClose={() => setProject(false)
                                } /> : '' }
                <div className="col-md-3 w-30 p-3 aside">
                    <aside className="aside-card">
                        <h3>Boost your idea</h3>
                        <p >Join 30+ innovators shaping our country digital future</p>
                        <button className="d-flex justify-content-center align-items-center w-100"
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
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;