
import Technologies from '../components/Explore/Technologies';
import Categories from '../components/Explore/Categories';
import project_png from '../assets/project.png';
import Footer from '../components/Home/Footer';
import Types from '../components/Explore/Type';
import Navbar from '../components/Home/Navbar';
import { useState, useEffect } from 'react';
import TitlePage from "../utils/Title";
import slugify from 'slugify';
import "../styles/Home.css";
import axios from 'axios';


const Explore = () => {
    TitlePage({ refPath: window.location.pathname })
    const url = import.meta.env.VITE_API_PROJECT as string
    const [project, setProject] = useState([])
    const [page, setPage] = useState(1)
    const [previousPage, setPreviousPage] = useState('')
    const [name, setName] = useState('')
    const [selectedTechnology, setSelectedTechnology] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')    
    const [selectedType, setSelectedType] = useState('')

    const searchProject = async () => {
        const urlWithName = `${url}unauth/?name=${name}`
        console.log('Url :', urlWithName)
        const response = await axios.get(urlWithName)
        const apiResponse = response.data
        const projectData = apiResponse.results
        setProject(projectData)
    }

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchProject()
        } else {
            const urlWithName = `${url}unauth/?name=${slugify(name, { lower: true })}`
            const response = await axios.get(urlWithName)
            const apiResponse = response.data
            const projectData = apiResponse.results
            setProject(projectData)
        }
    }


    const handleProject = async () => {
        const urlWithPage = `${url}unauth/?page=${page}`
        setPage(page + 1)
        const response = await axios.get(urlWithPage)
        const apiResponse = response.data
        const projectData = apiResponse.results
        setPreviousPage(apiResponse.previous)
        setProject(projectData)
    }

    const handlePreviousPage = async () => {
        if (previousPage) {
            const response = await axios.get(previousPage)
            const apiResponse = response.data
            const projectData = apiResponse.results
            setProject(projectData)
        }
    }

    useEffect(() => {
        const fecthProject = async () => {
            
            const params = new URLSearchParams()
            if (selectedCategory) params.append('category', slugify(decodeURIComponent(selectedCategory), {
                                                        replacement: '-',
                                                        remove: /[*+~.()'"!:@]/g,
                                                        lower: true,
                                                        strict: false,
                                                        locale: 'en',
                                                        trim: true
                                                    }))
            if (selectedType) params.append('type', slugify(decodeURIComponent(selectedType), {
                                                        replacement: '-',
                                                        remove: /[*+~.()'"!:@]/g,
                                                        lower: true,
                                                        strict: false,
                                                        locale: 'en',
                                                        trim: true
                                                    }))
            if (selectedTechnology) params.append('technology', decodeURIComponent(selectedTechnology))
            const fullUrl = params.toString() ? `${url}unauth/?${params}` : url + 'unauth/'
            const response = await axios.get(fullUrl)
            setProject(response.data.results)
        }
        fecthProject()
    }, [selectedTechnology, selectedCategory, selectedType, url])

    return (
        <div className='w-full h-full flex flex-col items-center justify-start gap-10 py-10'>
            <Navbar />            
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Explore all<br />
                        <span className="hero-highlight">projects</span>
                    </h1>

                    <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", opacity: "0.9" }}>
                        Your privacy is important to us. This page details how TogoTechCensus 
                        manages your personal information.
                    </p>
                </div>
                <div className="hero-orb orb-1" />
                <div className="hero-orb orb-2" />
            </section>
            <div className="container-fluid vh-200 projects mt-5">
                
                <div className='row p-3'>

                    <div className='col-md-3'>
                        <Categories value={selectedCategory} onChange={setSelectedCategory}/>
                    </div>

                    <div className='col-md-3'>
                        <Technologies value={selectedTechnology} onChange={setSelectedTechnology}/>
                    </div>

                    <div className='col-md-3'>
                        <Types value={selectedType} onChange={setSelectedType}/>
                    </div>

                    <div className='col-md-3'>
                        <span className='d-flex justify-content-end'>
                            <input className='form-control w-100 mx-3'
                                placeholder='Search project ...'
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button style={{
                                backgroundColor: '#dff1df',
                                color: '#28A745'
                            }}
                                onClick={searchProject}
                            ><strong>Search</strong></button>
                        </span>
                    </div>
                </div>
                
                <div className='row vh-200 justify-content-center'>
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
                                            <span className="badge bg-success mb-2 mx-2">Verified</span>
                                        )} 

                                        <i className="techno"> {item.type.charAt(0).toUpperCase() + item.type.slice(1)} </i>
                                    </span>
                                </h3>
                                <span>
                                    
                                    {item.description.split('. ')[0]}
                                </span>
                                
                                <p style={{color:'#28A745'}}>
                                    <strong>
                                        <i>click for more...</i>
                                    </strong>
                                </p>
                                <section className='d-flex justify-content-around'>
                                    {item.technologies && item.technologies.map((tech: any, index: number) => (
                                        <span key={index} className='techno'> {tech.name} </span>
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
                {
                    previousPage &&

                    <button className='my-5 mx-3' style={{
                        backgroundColor: '#dff1df',
                        color: '#28A745'
                    }} onClick={handlePreviousPage}><strong>Load previous page</strong>
                    </button>
                }
                <button className='my-5 mx-3' style={{
                    backgroundColor: '#dff1df',
                    color: '#28A745'
                }} onClick={handleProject}><strong>Load more</strong></button>
            </div>
            <Footer />
        </div>
    )
}

export default Explore
