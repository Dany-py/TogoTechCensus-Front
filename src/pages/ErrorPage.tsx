import { Link, useRouteError } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import TitlePage from "../utils/Title";

const ErrorPage = () => {
    TitlePage({ refPath: "/error" });
    const error: any = useRouteError();

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            
            <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center my-5">
                <h1 style={{ fontSize: "6em", color: "#ffce00", marginBottom: "0" }}>Oops!</h1>
                <h2 style={{ color: "#28a745", marginBottom: "20px" }}>Something went wrong.</h2>
                
                <p style={{ fontSize: "1.2em", maxWidth: "600px", marginTop: "20px" }}>
                    {error?.status === 404 
                        ? "The page you are looking for doesn't exist or has been moved."
                        : "An unexpected error has occurred on our servers."}
                </p>
                
                <p className="mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <i>{error?.statusText || error?.message}</i>
                </p>

                <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center">
                    <Link to="/explore" className="btn btn-outline-warning" style={{ borderColor: "#ffce00", color: "black"  }}>
                        Explore projects
                    </Link>
                    <Link to="/contact" className="btn" style={{ backgroundColor: "#28a745", color: "#fff" }}>
                        Contact Us
                    </Link>
                    <a href="mailto:support@togotechcensus.com" className="btn btn-outline-warning" style={{ borderColor: "#ffce00", color: "black" }}>
                        Email Support
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ErrorPage;
