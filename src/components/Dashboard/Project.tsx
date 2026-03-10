

const Project = () => {
    return (
        <div className="container vh-100">
            <section>
                <h1 className="text-start">My Projects</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure incidunt dicta? Nihil qui iste beatae quo, repudiandae dolorum cumque praesentium iusto? Veniam amet dolorem reprehenderit. Impedit delectus pariatur vitae?</p>
            </section>
            
            <div className="row p-3">
                <div className="col-md-8 w-70 p-3">
                    <div className="row w-100 p-3">
                        <div className="col-md-3 card">
                            <h4>Project 1</h4>
                            <p>Description</p>
                        </div>
                        <div className="col-md-3 card ms-2">
                            <h4>Project 2</h4>
                            <p>Description</p>
                        </div>
                        <div className="col-md-3 card ms-2">
                            <h4>Project 3</h4>
                            <p>Description</p>
                        </div>
                        <div className="col-md-3 card ms-2">
                            <h4>Project 4</h4>
                            <p>Description</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 w-30">
                    <button className="d-flex justify-content-center align-items-center w-100">
                        <div className="marge-svg mx-3">
                            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="15" y1="50" x2="85" y2="50" stroke="white" stroke-width="10" stroke-linecap="round"/>
                                <line x1="50" y1="15" x2="50" y2="85" stroke="white" stroke-width="10" stroke-linecap="round"/>
                            </svg>
                        </div>
                        Add your project
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Project;