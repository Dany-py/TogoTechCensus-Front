import dev from '../../assets/DKD.jpg'

const About = () => {
    return (
        <div className="about-page">

            {/* ── Mission ── */}
            <section className="about-mission">
                <div className="about-mission-text">
                    <h2 className="about-section-title">Our Mission</h2>
                    <p>
                        TogoTechCensus (TTC) is an innovative platform dedicated to mapping
                        and showcasing the technological ecosystem in Togo. Our mission is 
                        to provide a clear and detailed view of the Togolese digital landscape
                        by cataloging projects, companies, and skills that are shaping the country's digital future.
                    </p>
                    <p>
                        Thanks to our real-time analysis and monitoring tools, we enable
                        industry players, investors, and enthusiasts to discover Togo's
                        technological potential and foster synergies within the
                        community.
                    </p>
                </div>
                <div className="about-mission-img-wrap">
                    <img alt="Dany-py – développeur" src={dev} className="about-mission-img" />
                    <div className="about-mission-img-badge">
                        <strong>Dany-py</strong>
                        <span>Founder & Developer</span>
                    </div>
                </div>
            </section>

            {/* ── Valeurs ── */}
            <section className="about-values">
                <h2 className="about-section-title text-center mb-5">Our Values</h2>
                <div className="about-values-grid">
                    {[
                        { icon: '🌍', title: 'Impact local',        desc: 'Highlighting the talents and innovations that are born in Togo.' },
                        { icon: '🔗', title: 'Connection',          desc: 'Connecting developers, companies and investors in one place.' },
                        { icon: '📊', title: 'Transparency',        desc: 'Reliable and up-to-date data on the digital ecosystem.' },
                        { icon: '🚀', title: 'Innovation',          desc: 'Promote digital solutions that transform daily life.' },
                        { icon: '🤝', title: 'Communities',         desc: 'Building a tight-knit and supportive tech community.' },
                        { icon: '🎯', title: 'Excellency',          desc: 'Aim for quality in every feature offered.' },
                    ].map(({ icon, title, desc }) => (
                        <div className="about-value-card" key={title}>
                            {/*<span className="about-value-icon">{icon}</span>*/}
                            <h3 className="about-value-title">{title}</h3>
                            <p className="about-value-desc">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Timeline ──}
            <section className="about-timeline-section">
                <h2 className="about-section-title text-center mb-5">Notre histoire</h2>
                <div className="about-timeline">
                    {[
                        { year: '2022', title: 'Idée fondatrice',      desc: 'L\'idée de cartographier le tech togolais prend forme.' },
                        { year: '2023', title: 'Premiers jalons',      desc: 'Développement du MVP et premiers projets référencés.' },
                        { year: '2024', title: 'Lancement officiel',   desc: 'Mise en ligne de la plateforme et ouverture à la communauté.' },
                        { year: '2025', title: 'Croissance continue',  desc: 'Extension des fonctionnalités et partenariats stratégiques.' },
                    ].map(({ year, title, desc }, i) => (
                        <div className="about-timeline-item" key={year}>
                            <div className="about-timeline-year">{year}</div>
                            <div className={`about-timeline-dot ${i % 2 === 0 ? 'dot-green' : 'dot-yellow'}`} />
                            <div className="about-timeline-content">
                                <h4>{title}</h4>
                                <p>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── 
            <section className="about-cta">
                <h2>Rejoignez l'aventure</h2>
                <p>Vous avez un projet, une entreprise ou une compétence à valoriser ?</p>
                <a href="/contact" className="about-cta-btn">Contactez-nous</a>
            </section>*/}

        </div>
    )
}

export default About