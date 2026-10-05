import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `https://hirenest-backend-ihvo.onrender.com/api/jobs/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setJob(data.job);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Fetch job error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // Check whether candidate has already applied
  useEffect(() => {
    const checkApplication = async () => {
      if (!user?.id || user.role !== "candidate" || !id) {
        return;
      }

      try {
        const response = await fetch(
          `https://hirenest-backend-ihvo.onrender.com/api/applications/candidate/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          const existingApplication = (
            data.applications || []
          ).some(
            (application) =>
              application.job?._id === id ||
              application.job === id
          );

          setAlreadyApplied(existingApplication);
        }
      } catch (error) {
        console.error("Check application error:", error);
      }
    };

    checkApplication();
  }, [id, user?.id, user?.role]);

  const handleApply = async () => {
    if (!user?.id) {
      setApplicationMessage(
        "Please login as a candidate before applying."
      );
      return;
    }

    if (user.role !== "candidate") {
      setApplicationMessage(
        "Only candidate accounts can apply for jobs."
      );
      return;
    }

    if (alreadyApplied) {
      setApplicationMessage(
        "You have already applied for this job."
      );
      return;
    }

    try {
      setApplying(true);
      setApplicationMessage("");

      const response = await fetch(
        "https://hirenest-backend-ihvo.onrender.com/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate: user.id,
            job: id,
            coverLetter,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setApplicationMessage(
          data.message || "Unable to submit application."
        );

        if (
          response.status === 409 ||
          data.message?.toLowerCase().includes("already applied")
        ) {
          setAlreadyApplied(true);
        }

        return;
      }

      setAlreadyApplied(true);
      setApplicationMessage(
        "Application submitted successfully 🎉"
      );
      setCoverLetter("");
    } catch (error) {
      console.error("Apply job error:", error);

      setApplicationMessage(
        "Unable to connect to server."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="job-details-loading">
        <h2>Loading job...</h2>
        <p>Fetching job details.</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-loading">
        <h2>Job not found</h2>

        <Link to="/jobs" className="back-jobs-btn">
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details-page">

      {/* Header */}
      <header className="job-details-header">
        <Link to="/jobs" className="back-link">
          ← Back to Jobs
        </Link>

        <span className="job-details-status">
          ● Active
        </span>
      </header>

      {/* Job Header Card */}
      <section className="job-main-card">

        <div className="job-main-icon">
          💼
        </div>

        <div className="job-main-info">
          <h1>{job.title}</h1>

          <p>{job.company}</p>

          <div className="job-main-meta">
            <span>📍 {job.location}</span>
            <span>💼 {job.jobType}</span>
            <span>🎓 {job.experience}</span>

            {job.salary && (
              <span>💰 {job.salary}</span>
            )}
          </div>
        </div>

      </section>

      {/* Content */}
      <div className="job-details-grid">

        {/* Left */}
        <main className="job-description-card">

          <section>
            <h2>Job Description</h2>

            <p className="job-description">
              {job.description}
            </p>
          </section>

          <section>
            <h2>Required Skills</h2>

            <div className="job-details-skills">
              {job.skills?.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

        </main>

        {/* Right */}
        <aside className="job-summary-card">

          <h2>Job Summary</h2>

          <div className="summary-item">
            <span>Job Type</span>
            <strong>{job.jobType}</strong>
          </div>

          <div className="summary-item">
            <span>Experience</span>
            <strong>{job.experience}</strong>
          </div>

          <div className="summary-item">
            <span>Location</span>
            <strong>{job.location}</strong>
          </div>

          {job.salary && (
            <div className="summary-item">
              <span>Salary</span>
              <strong>{job.salary}</strong>
            </div>
          )}

          <div className="summary-item">
            <span>Status</span>

            <strong className="active-text">
              Active
            </strong>
          </div>

        </aside>

      </div>

      {/* Candidate Apply Section */}
      {user?.role === "candidate" && (
        <section
          style={{
            maxWidth: "1100px",
            margin: "25px auto",
            background: "white",
            borderRadius: "14px",
            padding: "28px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Apply for this position
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "20px",
            }}
          >
            Submit your application to {job.company}.
          </p>

          {!alreadyApplied && (
            <>
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Cover Letter
              </label>

              <textarea
                value={coverLetter}
                onChange={(e) =>
                  setCoverLetter(e.target.value)
                }
                placeholder="Tell the recruiter why you are a good fit for this role..."
                rows="5"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  resize: "vertical",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  marginBottom: "15px",
                }}
              />

              <button
                onClick={handleApply}
                disabled={applying}
                style={{
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: applying
                    ? "not-allowed"
                    : "pointer",
                  opacity: applying ? 0.7 : 1,
                }}
              >
                {applying
                  ? "Submitting..."
                  : "🚀 Apply Now"}
              </button>
            </>
          )}

          {alreadyApplied && (
            <div
              style={{
                padding: "15px",
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                color: "#166534",
                borderRadius: "9px",
                fontWeight: "600",
              }}
            >
              ✓ You have already applied for this job.
            </div>
          )}

          {applicationMessage && (
            <p
              style={{
                marginTop: "15px",
                marginBottom: 0,
                color: applicationMessage
                  .toLowerCase()
                  .includes("success")
                  ? "#166534"
                  : "#dc2626",
                fontWeight: "600",
              }}
            >
              {applicationMessage}
            </p>
          )}
        </section>
      )}

    </div>
  );
}

export default JobDetails;