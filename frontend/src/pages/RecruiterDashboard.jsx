import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [jobsResponse, candidatesResponse] = await Promise.all([
          fetch(
            `https://hirenest-backend-ihvo.onrender.com/api/jobs/recruiter/${user.id}`
          ),
          fetch(
            `https://hirenest-backend-ihvo.onrender.com/api/candidates/recruiter/${user.id}`
          ),
        ]);

        const jobsData = await jobsResponse.json();
        const candidatesData = await candidatesResponse.json();

        if (jobsResponse.ok) {
          setJobs(jobsData.jobs || []);
        } else {
          console.error(jobsData.message);
        }

        if (candidatesResponse.ok) {
          setCandidates(candidatesData.candidates || []);
        } else {
          console.error(candidatesData.message);
        }
      } catch (error) {
        console.error("Fetch dashboard data error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  // ==================== REAL DASHBOARD STATS ====================

  const totalCandidates = candidates.length;

  const shortlistedCandidates = candidates.filter(
    (candidate) => candidate.status === "Shortlisted"
  ).length;

  const interviewCandidates = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-brand">
          <div className="brand-icon">H</div>
          <span>HireNest</span>
        </div>

        <nav className="dashboard-nav">

          <Link
            to="/recruiter-dashboard"
            className="nav-item active"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="nav-item"
          >
            <span>💼</span>
            Jobs
          </Link>

          <Link
            to="/candidates"
            className="nav-item"
          >
            <span>👥</span>
            Candidates
          </Link>

          <Link
            to="/applications"
            className="nav-item"
          >
            <span>📋</span>
            Applications
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link
            to="/"
            className="nav-item"
          >
            <span>←</span>
            Back to Home
          </Link>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Manage your hiring process in one place.
            </p>
          </div>

          <Link
            to="/create-job"
            className="create-job-btn"
          >
            + Create New Job
          </Link>

        </header>

        {/* Welcome */}
        <section className="welcome-card">

          <div>

            <span className="welcome-label">
              RECRUITER
            </span>

            <h2>
              Welcome back, {user?.name || "Recruiter"} 👋
            </h2>

            <p>
              Find the right talent faster with AI-powered
              screening and smarter hiring tools.
            </p>

          </div>

          <div className="welcome-icon">
            🤖
          </div>

        </section>

        {/* Stats */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              💼
            </div>

            <div>
              <span>Total Jobs</span>
              <strong>{jobs.length}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>
              <span>Total Candidates</span>
              <strong>{totalCandidates}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              ⭐
            </div>

            <div>
              <span>Shortlisted</span>
              <strong>{shortlistedCandidates}</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              🎯
            </div>

            <div>
              <span>Interviews</span>
              <strong>{interviewCandidates}</strong>
            </div>

          </div>

        </section>

        {/* Recent Jobs */}
        <section className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Recent Jobs</h2>

              <p>
                Your latest job postings
              </p>
            </div>

            <Link
              to="/jobs"
              className="view-all"
            >
              View All →
            </Link>

          </div>

          {loading ? (

            <div className="empty-state">

              <div className="empty-icon">
                ⏳
              </div>

              <h3>
                Loading dashboard...
              </h3>

              <p>
                Fetching your jobs and candidates.
              </p>

            </div>

          ) : jobs.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                💼
              </div>

              <h3>
                No jobs posted yet
              </h3>

              <p>
                Create your first job and start finding
                talented candidates.
              </p>

              <Link
                to="/create-job"
                className="empty-btn"
              >
                Create Your First Job
              </Link>

            </div>

          ) : (

            <div className="jobs-list">

              {jobs.slice(0, 5).map((job) => (

                <div
                  className="job-row"
                  key={job._id}
                >

                  <div className="job-row-icon">
                    💼
                  </div>

                  <div className="job-row-info">

                    <h3>
                      {job.title}
                    </h3>

                    <p>
                      {job.company} • {job.location}
                    </p>

                  </div>

                  <div className="job-row-meta">

                    <span>
                      {job.jobType}
                    </span>

                    <small>
                      {job.experience}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Hiring Overview */}
        <section className="ai-card">

          <div className="ai-card-icon">
            ✨
          </div>

          <div>

            <h2>
              AI-Powered Hiring
            </h2>

            <p>
              Add candidates, screen resumes with AI,
              identify matching skills and generate
              personalized interview questions.
            </p>

          </div>

          <Link
            to="/candidates"
            className="ai-badge"
          >
            Manage Candidates →
          </Link>

        </section>

      </main>

    </div>
  );
}

export default RecruiterDashboard;