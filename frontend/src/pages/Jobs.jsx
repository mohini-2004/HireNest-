import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";

function Jobs() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/recruiter/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setJobs(data.jobs || []);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return (
    <div className="jobs-page">

      {/* Sidebar */}
      <aside className="jobs-sidebar">

        <div className="jobs-brand">
          <div className="brand-icon">H</div>
          <span>HireNest</span>
        </div>

        <nav className="jobs-nav">

          <Link
            to="/recruiter-dashboard"
            className="jobs-nav-item"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link
            to="/jobs"
            className="jobs-nav-item active"
          >
            <span>💼</span>
            Jobs
          </Link>

          <Link
            to="/candidates"
            className="jobs-nav-item"
          >
            <span>👥</span>
            Candidates
          </Link>

          <Link
            to="/applications"
            className="jobs-nav-item"
          >
            <span>📋</span>
            Applications
          </Link>

        </nav>

        <div className="jobs-sidebar-bottom">

          <Link to="/" className="jobs-nav-item">
            <span>←</span>
            Back to Home
          </Link>

          <button
            className="jobs-logout-btn"
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

      {/* Main */}
      <main className="jobs-main">

        <header className="jobs-header">

          <div>
            <h1>Jobs</h1>
            <p>
              Manage your job postings and find the right talent.
            </p>
          </div>

          <Link
            to="/create-job"
            className="jobs-create-btn"
          >
            + Create New Job
          </Link>

        </header>

        {/* Summary */}
        <div className="jobs-summary">

          <div className="jobs-summary-card">
            <span>Total Jobs</span>
            <strong>{jobs.length}</strong>
          </div>

          <div className="jobs-summary-card">
            <span>Active Jobs</span>
            <strong>{jobs.length}</strong>
          </div>

          <div className="jobs-summary-card">
            <span>Applications</span>
            <strong>0</strong>
          </div>

        </div>

        {/* Jobs */}
        <section className="jobs-section">

          <div className="jobs-section-header">

            <div>
              <h2>Your Job Postings</h2>
              <p>
                All jobs created from your recruiter account.
              </p>
            </div>

          </div>

          {loading ? (

            <div className="jobs-empty">
              <div className="jobs-empty-icon">⏳</div>

              <h3>Loading jobs...</h3>

              <p>
                Fetching your job postings.
              </p>
            </div>

          ) : jobs.length === 0 ? (

            <div className="jobs-empty">

              <div className="jobs-empty-icon">
                💼
              </div>

              <h3>No jobs posted yet</h3>

              <p>
                Create your first job posting to start
                finding candidates.
              </p>

              <Link
                to="/create-job"
                className="jobs-empty-btn"
              >
                Create New Job
              </Link>

            </div>

          ) : (

            <div className="jobs-list">

              {jobs.map((job) => (

                <div
                  className="job-card"
                  key={job._id}
                >

                  <div className="job-card-top">

                    <div className="job-card-icon">
                      💼
                    </div>

                    <div className="job-card-title">

                      <h3>
                        {job.title}
                      </h3>

                      <p>
                        {job.company}
                      </p>

                    </div>

                    <span className="job-status">
                      Active
                    </span>

                  </div>

                  <div className="job-details">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💼 {job.jobType}
                    </span>

                    <span>
                      🎓 {job.experience}
                    </span>

                    {job.salary && (
                      <span>
                        💰 {job.salary}
                      </span>
                    )}

                  </div>

                  <div className="job-skills">

                    {job.skills?.map((skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    ))}

                  </div>

                  <div className="job-card-bottom">

                    <span>
                      Posted recently
                    </span>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="view-job-btn"
                    >
                      View Job →
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Jobs;