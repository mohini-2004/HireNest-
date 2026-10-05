import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateApplications from "./pages/CandidateApplications";

import CreateJob from "./pages/CreateJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

import Candidate from "./pages/Candidate";
import AddCandidate from "./pages/AddCandidate";
import CandidateDetails from "./pages/CandidateDetails";

import "./App.css";

function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("hirenest-theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
    localStorage.setItem("hirenest-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-icon">H</div>
          <span>HireNest</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-signup">
            Sign Up
          </Link>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> AI-Powered Recruitment Platform
          </div>

          <h1>
            Find the right talent.
            <br />
            <span>Hire smarter.</span>
          </h1>

          <p>
            HireNest helps recruiters discover, evaluate, and hire the right
            candidates faster with AI-assisted screening and smart candidate
            matching.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started <span>→</span>
            </Link>

            <Link to="/login" className="secondary-btn">
              Recruiter Login
            </Link>
          </div>

          <div className="hero-trust">
            <span>✓ Easy candidate management</span>
            <span>✓ AI-assisted screening</span>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="dashboard-preview">
          <div className="preview-top">
            <div>
              <span className="preview-label">Recruitment Overview</span>
              <h3>Candidate Pipeline</h3>
            </div>

            <div className="preview-icon">📊</div>
          </div>

          <div className="pipeline-grid">
            <div className="pipeline-card">
              <span>Applications</span>
              <strong>124</strong>
              <small>+12% this month</small>
            </div>

            <div className="pipeline-card">
              <span>AI Screened</span>
              <strong>86</strong>
              <small>69% screened</small>
            </div>

            <div className="pipeline-card">
              <span>Shortlisted</span>
              <strong>32</strong>
              <small>37% selected</small>
            </div>

            <div className="pipeline-card">
              <span>Interviews</span>
              <strong>14</strong>
              <small>Upcoming</small>
            </div>
          </div>

          <div className="ai-preview">
            <div className="ai-preview-icon">✦</div>

            <div>
              <span>AI Screening</span>
              <p>Candidate matching is ready</p>
            </div>

            <div className="match-score">92%</div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>POWERFUL RECRUITMENT TOOLS</span>
          <h2>Everything you need to hire better</h2>
          <p>
            Manage your complete recruitment workflow from one platform.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>

            <h3>AI Screening</h3>

            <p>
              Compare candidate skills with job requirements and quickly
              identify strong matches.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>

            <h3>Smart Matching</h3>

            <p>
              Understand matched skills, missing skills, and overall
              candidate suitability.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>

            <h3>Candidate Management</h3>

            <p>
              Track candidates through every stage of the recruitment
              pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <h2>Ready to hire smarter?</h2>

        <p>
          Start managing your recruitment process with HireNest.
        </p>

        <Link to="/signup" className="primary-btn">
          Get Started →
        </Link>
      </section>

      <footer className="footer">
        <strong>HireNest</strong>
        <span>AI-Powered Recruitment Platform</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* RECRUITER */}
        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

        <Route path="/create-job" element={<CreateJob />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/candidates" element={<Candidate />} />

        <Route
          path="/candidates/:id"
          element={<CandidateDetails />}
        />

        <Route
          path="/add-candidate"
          element={<AddCandidate />}
        />

        {/* CANDIDATE */}
        <Route
          path="/candidate-dashboard"
          element={<CandidateDashboard />}
        />

        <Route
          path="/candidate-applications"
          element={<CandidateApplications />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;