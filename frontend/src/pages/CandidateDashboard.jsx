import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CandidateDashboard.css";

function CandidateDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const jobsResponse = await fetch(
          "https://hirenest-backend-ihvo.onrender.com/api/jobs"
        );

        if (jobsResponse.ok) {
          const jobsData = await jobsResponse.json();
          setJobs(jobsData.jobs || []);
        }

        if (user?.id) {
          const applicationsResponse = await fetch(
            `https://hirenest-backend-ihvo.onrender.com/api/applications/candidate/${user.id}`
          );

          if (applicationsResponse.ok) {
            const applicationsData =
              await applicationsResponse.json();

            setApplications(applicationsData.applications || []);
          }
        }
      } catch (error) {
        console.error("Candidate dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="candidate-dashboard">
      {/* Sidebar */}
      <aside className="candidate-sidebar">
        <div className="candidate-brand">
          <div className="brand-icon">H</div>
          <span>HireNest</span>
        </div>

        <nav className="candidate-nav">
          <Link
            to="/candidate-dashboard"
            className="candidate-nav-item active"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link to="/jobs" className="candidate-nav-item">
            <span>💼</span>
            Browse Jobs
          </Link>

          <Link
            to="/candidate-applications"
            className="candidate-nav-item"
          >
            <span>📋</span>
            My Applications
          </Link>
        </nav>

        <div className="candidate-sidebar-bottom">
          <Link to="/" className="candidate-nav-item">
            <span>←</span>
            Back to Home
          </Link>

          <button className="candidate-logout" onClick={logout}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="candidate-main">
        <header className="candidate-header">
          <div>
            <h1>Candidate Dashboard</h1>
            <p>Discover opportunities and manage your applications.</p>
          </div>

          <Link to="/jobs" className="browse-jobs-btn">
            Browse Jobs →
          </Link>
        </header>

        {/* Welcome */}
        <section className="candidate-welcome">
          <div>
            <span className="candidate-label">CANDIDATE</span>

            <h2>
              Welcome, {user?.name || "Candidate"} 👋
            </h2>

            <p>
              Find your next opportunity and track your job applications
              from one place.
            </p>
          </div>

          <div className="candidate-welcome-icon">🚀</div>
        </section>

        {/* Stats */}
        <section className="candidate-stats">
          <div className="candidate-stat-card">
            <div className="candidate-stat-icon">💼</div>
            <div>
              <span>Available Jobs</span>
              <strong>{jobs.length}</strong>
            </div>
          </div>

          <div className="candidate-stat-card">
            <div className="candidate-stat-icon">📋</div>
            <div>
              <span>Applications</span>
              <strong>{applications.length}</strong>
            </div>
          </div>

          <div className="candidate-stat-card">
            <div className="candidate-stat-icon">⭐</div>
            <div>
              <span>Shortlisted</span>
              <strong>
                {
                  applications.filter(
                    (application) =>
                      application.status === "Shortlisted"
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="candidate-stat-card">
            <div className="candidate-stat-icon">🎯</div>
            <div>
              <span>Interviews</span>
              <strong>
                {
                  applications.filter(
                    (application) =>
                      application.status === "Interview"
                  ).length
                }
              </strong>
            </div>
          </div>
        </section>

        {/* Recommended Jobs */}
        <section className="candidate-section">
          <div className="candidate-section-header">
            <div>
              <h2>Explore Opportunities</h2>
              <p>Find jobs that match your skills and career goals.</p>
            </div>

            <Link to="/jobs" className="candidate-view-all">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="candidate-empty">
              <div className="candidate-empty-icon">⏳</div>
              <h3>Loading jobs...</h3>
              <p>Finding available opportunities.</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="candidate-empty">
              <div className="candidate-empty-icon">💼</div>
              <h3>No jobs available</h3>
              <p>New opportunities will appear here.</p>
            </div>
          ) : (
            <div className="candidate-jobs-grid">
              {jobs.slice(0, 6).map((job) => (
                <div className="candidate-job-card" key={job._id}>
                  <div className="candidate-job-top">
                    <div className="candidate-job-icon">💼</div>

                    <span className="candidate-job-status">
                      Active
                    </span>
                  </div>

                  <h3>{job.title}</h3>

                  <p className="candidate-job-company">
                    {job.company}
                  </p>

                  <p className="candidate-job-location">
                    📍 {job.location}
                  </p>

                  <div className="candidate-job-tags">
                    {job.skills?.slice(0, 4).map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="candidate-job-btn"
                  >
                    View Job →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Action */}
        <section className="candidate-action-card">
          <div className="candidate-action-icon">✨</div>

          <div>
            <h2>Ready for your next opportunity?</h2>
            <p>
              Explore available jobs and apply to positions that match
              your skills.
            </p>
          </div>

          <Link to="/jobs" className="candidate-action-btn">
            Find Jobs →
          </Link>
        </section>
      </main>
    </div>
  );
}

export default CandidateDashboard;