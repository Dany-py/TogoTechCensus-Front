import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import type { IProject } from '../types/Project'
import { apiClient } from '../services/csrf.service';
import Navbar from "../components/Details/DetailNav";
import useDetailInterceptor from '../hooks/useDetailInterceptor';
import slugify from 'slugify';
import TitlePage from "../utils/Title";
import link from '../assets/lien.png';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png'
import twitter from '../assets/twitter.png'
import '../styles/Details.css'

const formatExternalUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

export const Details = () => {
    const navigate = useNavigate()
    const [detail, setDetail] = useState<IProject>()
    const refPath = window.location.pathname
    const project = refPath.split('/')[2]
    const slugProject = slugify(project, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        locale: 'en',
        trim: true
    })
    
    const apiUrl = import.meta.env.VITE_API_PROJECT + `unauth/?name=${slugProject}`
    
    TitlePage({ refPath: window.location.pathname })
    
    const { projectRef } = useDetailInterceptor({
        projectId: detail?.id || ''
    })
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await apiClient.get(apiUrl)
                const projectData = response.data.results

                if (!projectData || projectData.length === 0) {
                    console.log('Donné reçu :', projectData)
                    navigate("/?message=Une erreur est survenue.")
                    return
                }

                setDetail(projectData[0])
            } catch (error) {
                console.error('Erreur lors du chargement du projet :', error)
                navigate("/?message=Une erreur est survenue.")
            }
        }

        fetchDetails()
    }, [apiUrl, navigate])

    if (!detail) {
        return (
            <h1 style={{ color: '#28A745' }}>
                <strong><i>Loading</i></strong>
            </h1>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='container-fluid vh-100' ref={projectRef}>
                {/* NAVBAR */}
                <Navbar
                    title={detail.name}
                    logo={detail.logo_url}
                    stage={detail.stage}
                    type={detail.type.charAt(0).toUpperCase() + detail.type.slice(1)}
                    description={Array.isArray(detail.categories) ? detail.categories[0]?.name : detail.categories}
                />

                {/* MAIN CONTENT */}
                <div className="row vh-70 p-5">
                    
                    {/* LEFT SECTION - PROJECT INFO */}
                    <div className="col-md-9 mx-5">
                        {/* About Section */}
                        <section className="detail-card">
                            <h3>About {detail.name}</h3>
                            <p>{detail.description}</p>
                        </section>

                        
                        <section className="detail-card my-3">
                            <h3>Technologies</h3>
                            <span className="detail-card-link-group text-center">
                                {Array.isArray(detail.technologies) && detail.technologies.map((tech: any, index: number) => (
                                    <span key={index} className='techno'> {typeof tech === 'string' ? tech : tech.name} </span>
                                ))}
                            </span>
                        </section>

                        {/* External Links */}
                        <section className="detail-card-link-group">
                            {/* Website */}
                            <section className="detail-card-link">
                                <a
                                    href={formatExternalUrl(decodeURIComponent(detail.website_url))}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <img alt='website-link' className='detail-card-img' src={link} />
                                </a>
                            </section>

                            {/* LinkedIn */}
                            <section className="detail-card-link">
                                <a
                                    href={formatExternalUrl(detail?.linkedin_url)}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <img alt='linkedin-link' className='detail-card-img' src={linkedin} />
                                </a>
                            </section>

                            {/* GitHub */}
                            <section className="detail-card-link">
                                <a
                                    href={formatExternalUrl(detail?.github_url)}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <img alt='github-link' className='detail-card-img' src={github} />
                                </a>
                            </section>

                            {/* Twitter */}
                            <section className="detail-card-link">
                                <a
                                    href={formatExternalUrl(detail?.twitter_url)}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <img alt='twitter-link' className='detail-card-img' src={twitter} />
                                </a>
                            </section>
                        </section>
                    </div>

                    {/* RIGHT SECTION - PROJECT META */}
                    <div className="col-md-2">
                        {/* Authors */}
                        <section className="detail-card my-2">
                            <h3>Authors</h3>
                            <ul>
                                {Array.isArray(detail.authors) &&
                                    detail.authors.map((author: any) => (
                                        <li key={author.id}>
                                            {author.name ? author.name : 'Unknown'}
                                        </li>
                                    ))}
                            </ul>
                        </section>

                        {/* Audiences */}
                        <section className="detail-card my-2">
                            <h3>Audiences</h3>
                            <p>{detail.audiences}</p>
                        </section>

                        {/* Actual Needs */}
                        <section className="detail-card">
                            <h3>Actual needs</h3>
                            <p>{detail.needs}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;