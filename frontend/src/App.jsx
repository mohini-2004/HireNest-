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
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">H</div>
          <span>HireNest</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            ✨ AI-Powered Recruitment Platform
          </div>

          <h1>
            Find talent.
            <br />
            <span>Hire smarter.</span>
          </h1>

          <p>
            HireNest helps recruiters discover, evaluate, and hire the
            right candidates faster with AI-powered screening and
            intelligent interview generation.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Get Started →
            </Link>

            <Link to="/login" className="secondary-btn">
              Recruiter Login
            </Link>
          </div>
        </div>

        {/* Recruitment Overview */}
        <div className="hero-card">
          <div className="hero-card-header">
            <div>
              <span>Recruitment Overview</span>
              <h3>Candidate Pipeline</h3>
            </div>

            <div className="hero-card-icon">📊</div>
          </div>

          <div className="pipeline">
            <div className="pipeline-item">
              <span>Applications</span>
              <strong>124</strong>
            </div>

            <div className="pipeline-item">
              <span>AI Screened</span>
              <strong>86</strong>
            </div>

            <div className="pipeline-item">
              <span>Shortlisted</span>
              <strong>32</strong>
            </div>

            <div className="pipeline-item">
              <span>Interviews</span>
              <strong>14</strong>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🤖</div>

          <h3>AI Screening</h3>

          <p>
            Analyze candidate profiles against job requirements and
            identify the strongest matches.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>

          <h3>Smart Matching</h3>

          <p>
            Quickly understand matched skills, missing skills, and
            candidate suitability.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💬</div>

          <h3>AI Interviews</h3>

          <p>
            Generate role-specific technical and project interview
            questions for candidates.
          </p>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= HOME ================= */}
        <Route path="/" element={<Home />} />

        {/* ================= AUTHENTICATION ================= */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* ================= RECRUITER ================= */}
        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/create-job"
          element={<CreateJob />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/candidates"
          element={<Candidate />}
        />

        <Route
          path="/candidates/:id"
          element={<CandidateDetails />}
        />

        <Route
          path="/add-candidate"
          element={<AddCandidate />}
        />

        {/* ================= CANDIDATE ================= */}
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