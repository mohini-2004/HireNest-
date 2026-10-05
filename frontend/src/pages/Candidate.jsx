import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Candidates.css";

function Candidate() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        if (!user?.id) {
          setError("Recruiter information not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/candidates/recruiter/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setCandidates(data.candidates || []);
        } else {
          setError(data.message || "Unable to load candidates.");
        }
      } catch (error) {
        console.error("Fetch candidates error:", error);
        setError("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [user?.id]);

  const getInitials = (name) => {
    if (!name) return "C";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const aiScreenedCount = candidates.filter(
    (candidate) => candidate.status === "AI Screened"
  ).length;

  const shortlistedCount = candidates.filter(
    (candidate) => candidate.status === "Shortlisted"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  return (
    <div className="candidates-page">

      {/* Sidebar */}
      <aside className="candidates-sidebar">

        <div className="candidates-brand">
          <div className="brand-icon">H</div>
          <span>HireNest</span>
        </div>

        <nav className="candidates-nav">

          <Link
            to="/recruiter-dashboard"
            className="nav-item"
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
            className="nav-item active"
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
      <main className="candidates-main">

        {/* Header */}
        <header className="candidates-header">

          <div>
            <h1>Candidates</h1>

            <p>
              Manage and evaluate candidates for your jobs.
            </p>
          </div>

          <Link
            to="/add-candidate"
            className="add-candidate-btn"
          >
            + Add Candidate
          </Link>

        </header>

        {/* Stats */}
        <section className="candidate-stats">

          <div className="candidate-stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>
              <span>Total Candidates</span>
              <strong>{candidates.length}</strong>
            </div>

          </div>

          <div className="candidate-stat-card">

            <div className="stat-icon">
              ✨
            </div>

            <div>
              <span>AI Screened</span>
              <strong>{aiScreenedCount}</strong>
            </div>

          </div>

          <div className="candidate-stat-card">

            <div className="stat-icon">
              ⭐
            </div>

            <div>
              <span>Shortlisted</span>
              <strong>{shortlistedCount}</strong>
            </div>

          </div>

          <div className="candidate-stat-card">

            <div className="stat-icon">
              🎯
            </div>

            <div>
              <span>Interviews</span>
              <strong>{interviewCount}</strong>
            </div>

          </div>

        </section>

        {/* Candidates Section */}
        <section className="candidates-section">

          <div className="section-header">

            <div>
              <h2>All Candidates</h2>

              <p>
                Review candidates and their application status.
              </p>
            </div>

          </div>

          {/* Loading */}
          {loading && (

            <div className="candidate-empty-state">

              <div className="empty-icon">
                ⏳
              </div>

              <h3>
                Loading candidates...
              </h3>

              <p>
                Fetching candidate information.
              </p>

            </div>

          )}

          {/* Error */}
          {!loading && error && (

            <div className="candidate-empty-state">

              <div className="empty-icon">
                ⚠️
              </div>

              <h3>
                Unable to load candidates
              </h3>

              <p>
                {error}
              </p>

              <button
                className="empty-add-btn"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>

            </div>

          )}

          {/* Empty */}
          {!loading && !error && candidates.length === 0 && (

            <div className="candidate-empty-state">

              <div className="empty-icon">
                👥
              </div>

              <h3>
                No candidates yet
              </h3>

              <p>
                Add your first candidate to start the
                screening process.
              </p>

              <Link
                to="/add-candidate"
                className="empty-add-btn"
              >
                + Add Candidate
              </Link>

            </div>

          )}

          {/* Candidate List */}
          {!loading && !error && candidates.length > 0 && (

            <div className="candidates-list">

              {candidates.map((candidate) => (

                <div
                  className="candidate-row"
                  key={candidate._id}
                >

                  <div className="candidate-avatar">
                    {getInitials(candidate.name)}
                  </div>

                  <div className="candidate-info">

                    <h3>
                      {candidate.name}
                    </h3>

                    <p>
                      {candidate.email}
                    </p>

                  </div>

                  <div className="candidate-job">

                    <span>Applied For</span>

                    <strong>
                      {candidate.job?.title || "—"}
                    </strong>

                  </div>

                  <div className="candidate-experience">

                    <span>Experience</span>

                    <strong>
                      {candidate.experience || "Fresher"}
                    </strong>

                  </div>

                  <div className="candidate-status">

                    <span
                      className={`status-badge status-${candidate.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {candidate.status || "New"}
                    </span>

                  </div>

                  <Link
                    to={`/candidates/${candidate._id}`}
                    className="view-candidate-btn"
                  >
                    View →
                  </Link>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Candidate;