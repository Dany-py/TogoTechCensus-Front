
import Project from "../components/Home/Projects";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import Cards from "../components/Home/Cards";
import About from "../components/Home/About";
import Hero from "../components/Home/Hero";
import TitlePage from "../utils/Title";

const Home = () => {
    
    TitlePage({ refPath:window.location.pathname })
    return (
        <div>
            <Navbar/>
            <Hero />
            <Cards />
            <Project />
            <About/>
            <Footer />
        </div>
    )
}

export default Home;