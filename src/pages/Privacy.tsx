import { useState } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import TitlePage from "../utils/Title";
import '../styles/Privacy.css'

const sections = [
  {
    id: "01",
    title: "Data Collection",
    content: (
      <div className="space-y-3">
        <p>We collect information that you directly provide to us when using TogoTechHub:</p>
        <ul className="space-y-2" style={{ marginTop: '1rem' }}>
          {[
            "Identification data (name, email address) during a submission.",
            "Information about the submitted tech projects or startups.",
            "Browsing data via cookies (optional).",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-success shrink-0" style={{ backgroundColor: '#52B878', width: '6px', height: '6px', borderRadius: '50%', marginTop: '8px' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "02",
    title: "Data Use",
    content: (
      <div className="space-y-3">
        <p>Your data is used exclusively for:</p>
        <ul className="space-y-2" style={{ marginTop: '1rem' }}>
          {[
            "Management and publication of the tech directory.",
            "Verification of the authenticity of submitted information.",
            "Contact in case clarification is needed for a project.",
            "Improvement of platform performance.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-success shrink-0" style={{ backgroundColor: '#52B878', width: '6px', height: '6px', borderRadius: '50%', marginTop: '8px' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "03",
    title: "Data Retention",
    content: (
      <p>
        We retain your personal data as long as necessary for the purposes set out above. 
        If you request the deletion of a project, the associated identification data will also 
        be deleted from our active databases within 30 days.
      </p>
    ),
  },
  {
    id: "04",
    title: "Your Rights",
    content: (
      <div className="space-y-4">
        <p>In accordance with data protection legislation, you have the following rights:</p>
        {[
          {
            label: "Right of Access",
            text: "You can request a copy of the personal data we hold about you.",
          },
          {
            label: "Right to Rectification",
            text: "You can request the correction of inaccurate or incomplete data.",
          },
          {
            label: "Right to Erasure",
            text: "You can request the deletion of your personal data under certain conditions.",
          },
        ].map((item, i) => (
          <div key={i} className="border-l-2 border-success/40 pl-4" style={{ borderLeft: '2px solid rgba(82, 184, 120, 0.4)', paddingLeft: '1rem', marginBottom: '1rem' }}>
            <p className="text-success text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#52B878', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</p>
            <p className="text-slate-600 text-sm leading-relaxed" style={{ color: '#475569', fontSize: '0.875rem' }}>{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "05",
    title: "Cookies and Tracking",
    content: (
      <div className="space-y-3">
        <p>
          TogoTechHub uses cookies essential for the proper functioning of the site. We also use 
          optional analysis tools to understand platform usage.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          You can set your browser to refuse cookies, but this may limit certain features.
        </p>
      </div>
    ),
  },
  {
    id: "06",
    title: "Modifications",
    content: (
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on 
        this page with a revised update date.
      </p>
    ),
  },
];

function Privacy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  TitlePage({ refPath: window.location.pathname });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#334155",
      }}
    >
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        .section-card {
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.3s ease;
          cursor: pointer;
          margin-bottom: 12px;
        }
        .section-card:hover, .section-card.active {
          border-color: rgba(40,167,69,0.3);
          background: rgba(40,167,69,0.04);
        }
        .section-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
          opacity: 0;
        }
        .section-content.open {
          max-height: 600px;
          opacity: 1;
        }
        .badge {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #52B878;
          background: rgba(40,185,129,0.1);
          border: 1px solid rgba(40,185,129,0.2);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(40,167,69,0.3), transparent);
          margin: 2rem 0;
        }
        .tag {
          font-size: 10px;
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #52B878;
          border: 1px solid rgba(40,167,69,0.25);
          padding: 3px 10px;
          border-radius: 100px;
          display: inline-block;
        }
        .chevron {
          width: 10px;
          height: 10px;
          border-right: 2px solid #52B878;
          border-bottom: 2px solid #52B878;
          transform: rotate(45deg);
          transition: transform 0.3s ease;
          display: inline-block;
          margin-top: -4px;
        }
        .chevron.open {
          transform: rotate(-135deg);
          margin-top: 4px;
        }
        .toc-link {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          display: block;
          padding: 4px 0;
          border-left: 2px solid transparent;
          padding-left: 10px;
        }
        .toc-link:hover {
          color: #52B878;
          border-left-color: #52B878;
        }
      `}</style>

      {/* Header Section */}
      <section className="hero">
        <div className="hero-content">
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span className="tag" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>Privacy</span>
            <span className="tag" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>March 2026</span>
            <span className="tag" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>Protection</span>
          </div>
          <h1 className="hero-title">
            Privacy<br />
            <span className="hero-highlight">Policy</span>
          </h1>

          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", opacity: "0.9" }}>
            Your privacy is important to us. This page details how TogoTechCensus 
            manages your personal information.
          </p>
        </div>
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
      </section>

      {/* Main content layout */}
      <main className='privacy-main'>
        {/* Sections Column */}
        <div>
          {sections.map((section) => {
            const isOpen = activeSection === section.id;
            return (
              <div
                key={section.id}
                className={`section-card ${isOpen ? "active" : ""}`}
                onClick={() => setActiveSection(isOpen ? null : section.id)}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.25rem 1.5rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span className="badge">{section.id}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: isOpen ? "#52B878" : "#475569",
                      transition: "color 0.2s",
                    }}>
                      {section.title}
                    </span>
                  </div>
                  <span className={`chevron ${isOpen ? "open" : ""}`} />
                </div>

                <div className={`section-content ${isOpen ? "open" : ""}`}>
                  <div style={{
                    padding: "0 1.5rem 1.5rem",
                    fontSize: "15px",
                    lineHeight: "1.8",
                    color: "#64748b",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                    paddingTop: "1.25rem",
                  }}>
                    {section.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar TOC */}
        <aside className='privacy-aside'>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "16px",
          }}>
            Table of Contents
          </p>
          {sections.map((s) => (
            <span
              key={s.id}
              className="toc-link"
              onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
              style={{
                color: activeSection === s.id ? "#52B878" : undefined,
                borderLeftColor: activeSection === s.id ? "#52B878" : undefined
              }}
            >
              {s.id} · {s.title}
            </span>
          ))}

          <a style={{
            marginTop: "2.5rem",
            textDecoration:"none",
            padding: "1.5rem",
            background: "#f8fafc",
            borderRadius: "12px",
            border: "1px solid rgba(40,167,69,0.1)"
          }} href='/contact'>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              color: "#52B878",
              fontWeight: "bold",
              marginBottom: "8px"
            }}>Contact</p>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
              For any request related to your personal data, please do not hesitate to contact us.
            </p>
          </a>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;
