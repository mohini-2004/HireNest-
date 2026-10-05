import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CandidateApplications.css";

function CandidateApplications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `https://hirenest-backend-ihvo.onrender.com/api/applications/candidate/${user?.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setApplications(data.applications || []);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Applications error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const getStatusClass = (status) => {
    return status
      ?.toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <div className="candidate-applications-page">

      {/* Header */}
      <header className="applications-header">
        <div>
          <Link
            to="/candidate-dashboard"
            className="applications-back"
          >
            ← Dashboard
          </Link>

          <h1>My Applications</h1>

          <p>
            Track your job applications and hiring progress.
          </p>
        </div>

        <Link
          to="/jobs"
          className="applications-browse-btn"
        >
          Browse Jobs →
        </Link>
      </header>

      {/* Content */}
      <main className="applications-main">

        {loading ? (
          <div className="applications-empty">
            <div className="applications-empty-icon">
              ⏳
            </div>

            <h2>Loading applications...</h2>

            <p>
              Fetching your latest applications.
            </p>
          </div>
        ) : applications.length === 0 ? (
          <div className="applications-empty">

            <div className="applications-empty-icon">
              📋
            </div>

            <h2>No applications yet</h2>

            <p>
              Explore available jobs and apply to positions
              that match your skills.
            </p>

            <Link
              to="/jobs"
              className="applications-empty-btn"
            >
              Explore Jobs →
            </Link>

          </div>
        ) : (
          <div className="applications-list">

            {applications.map((application) => (
              <div
                className="application-card"
                key={application._id}
              >

                <div className="application-card-top">

                  <div className="application-job-icon">
                    💼
                  </div>

                  <div className="application-job-info">
                    <h2>
                      {application.job?.title ||
                        "Job Position"}
                    </h2>

                    <p>
                      {application.job?.company ||
                        "Company"}
                    </p>
                  </div>

                  <span
                    className={`application-status ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>

                </div>

                <div className="application-meta">

                  <span>
                    📍{" "}
                    {application.job?.location ||
                      "Location not specified"}
                  </span>

                  <span>
                    📅 Applied{" "}
                    {application.createdAt
                      ? new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </span>

                </div>

                {application.coverLetter && (
                  <div className="application-cover">
                    <strong>Cover Letter</strong>

                    <p>
                      {application.coverLetter}
                    </p>
                  </div>
                )}

                <div className="application-progress">

                  <div className="progress-title">
                    <strong>Application Progress</strong>

                    <span>
                      {application.status}
                    </span>
                  </div>

                  <div className="progress-steps">

                    <div
                      className={
                        application.status
                          ? "progress-step active"
                          : "progress-step"
                      }
                    >
                      <span>✓</span>
                      <small>Applied</small>
                    </div>

                    <div
                      className={
                        [
                          "AI Screened",
                          "Shortlisted",
                          "Interview",
                          "Selected",
                        ].includes(
                          application.status
                        )
                          ? "progress-step active"
                          : "progress-step"
                      }
                    >
                      <span>🤖</span>
                      <small>AI Screening</small>
                    </div>

                    <div
                      className={
                        [
                          "Shortlisted",
                          "Interview",
                          "Selected",
                        ].includes(
                          application.status
                        )
                          ? "progress-step active"
                          : "progress-step"
                      }
                    >
                      <span>⭐</span>
                      <small>Shortlisted</small>
                    </div>

                    <div
                      className={
                        [
                          "Interview",
                          "Selected",
                        ].includes(
                          application.status
                        )
                          ? "progress-step active"
                          : "progress-step"
                      }
                    >
                      <span>🎯</span>
                      <small>Interview</small>
                    </div>

                    <div
                      className={
                        application.status ===
                        "Selected"
                          ? "progress-step active"
                          : "progress-step"
                      }
                    >
                      <span>🎉</span>
                      <small>Selected</small>
                    </div>

                  </div>
                </div>

                <Link
                  to={`/jobs/${application.job?._id}`}
                  className="application-view-btn"
                >
                  View Job →
                </Link>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default CandidateApplications;