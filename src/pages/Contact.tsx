import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import TitlePage from "../utils/Title";
import { Link } from "react-router-dom";

const Contact = () => {
    TitlePage({ refPath: "/contact" });

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            
            <div className="container flex-grow-1 d-flex flex-column justify-content-center my-5" style={{ minHeight: "60vh" }}>
                <div className="row justify-content-center text-center">
                    <div className="col-md-8">
                        <h1 style={{ color: "#52B878", marginBottom: "30px" }}>Contact Us</h1>
                        <p style={{ fontSize: "1.2em", marginBottom: "40px" }}>
                            Have a question, suggestion, or want to collaborate with TogoTechCensus ? Feel free to reach out to us!
                        </p>
                        
                        <div className="card w-100 p-4" style={{ border: "none", borderRadius: "15px" }}>
                            <h3 style={{ color: "#F0D574" }}>Get in Touch</h3>
                            <p className="mt-3">
                                <strong>Email:</strong>{" "}
                                <a href="mailto:support@togotechcensus.com" style={{ color: "#52B878", textDecoration: "none" }}>
                                    support@togotechcensus.com
                                </a>
                            </p>
                            <p>
                                <strong>Phone:</strong> <a href="tel:+22892574488" style={{ color: "#52B878", textDecoration: "none" }}> +228 92 57 44 88 </a>
                            </p>
                            <div className="mt-4">
                                <Link to="/" className="btn btn-outline-light me-3" style={{ borderColor: "#52B878", color: "#52B878" }}>
                                    Back to Home
                                </Link>
                                <a href="mailto:support@togotechcensus.com" className="btn" style={{ backgroundColor: "#52B878", color: "#fff" }}>
                                    Send an Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
