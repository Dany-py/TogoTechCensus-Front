

const Hero = () => {
    return(
        <section className="hero">
            <strong><h1>The ultimate tech directory in togo</h1></strong> <br />
            <span className='hero-span'>
                <input
                    placeholder='Search by author, categories, techno...'
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform:'translateX(-2em)'
                       }}>
                    <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                        stroke="#ccc" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                </svg>
            </span>
        </section>
    )
}

export default Hero;