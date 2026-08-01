import TextType from '../ui/TextType';


const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                    
                <h1 className="hero-title">
                    Mapping the tech ecosystem<br />
                    <span className="hero-highlight">at Togo</span>
                </h1>
            </div>
            <div className="hero-orb orb-1" />
            <div className="hero-orb orb-2" />
                 <br />
            <TextType 
                text = {"The ultimate tech directory in Togo"}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter=""
                deletingSpeed={50}
                variableSpeed={{ min: 60, max: 120 }}
                cursorBlinkDuration={0.5}
            />
        </section>
    )
}

export default Hero;