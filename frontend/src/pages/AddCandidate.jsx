import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddCandidate.css";

function AddCandidate() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    skills: "",
    experience: "",
    job: "",
  });

  // Fetch recruiter's jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!user?.id) {
          setError("Recruiter information not found.");
          setLoadingJobs(false);
          return;
        }

        const response = await fetch(
          `https://hirenest-backend-ihvo.onrender.com/api/jobs/recruiter/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setJobs(data.jobs || []);
        } else {
          setError(data.message || "Unable to load jobs.");
        }
      } catch (error) {
        console.error("Fetch jobs error:", error);
        setError("Unable to connect to server.");
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [user?.id]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit candidate
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name || !formData.email || !formData.job) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      const response = await fetch(
        "https://hirenest-backend-ihvo.onrender.com/api/candidates",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resume: formData.resume,
            skills: skillsArray,
            experience: formData.experience,
            job: formData.job,
            recruiter: user.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to add candidate.");
        return;
      }

      // Candidate successfully added
      navigate("/candidates");

    } catch (error) {
      console.error("Add candidate error:", error);
      setError("Unable to connect to server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-candidate-page">

      {/* Sidebar */}
      <aside className="add-candidate-sidebar">

        <div className="add-candidate-brand">

          <div className="brand-icon">
            H
          </div>

          <span>
            HireNest
          </span>

        </div>

        <nav className="add-candidate-nav">

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
      <main className="add-candidate-main">

        <Link
          to="/candidates"
          className="back-link"
        >
          ← Back to Candidates
        </Link>

        <div className="add-candidate-heading">

          <div>

            <h1>
              Add Candidate
            </h1>

            <p>
              Add candidate information to start the
              screening process.
            </p>

          </div>

        </div>

        {/* Form Card */}
        <section className="candidate-form-card">

          <div className="form-card-header">

            <div className="form-header-icon">
              👤
            </div>

            <div>

              <h2>
                Candidate Information
              </h2>

              <p>
                Enter the candidate's basic details.
              </p>

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Basic Information */}
            <div className="form-section">

              <h3>
                Basic Information
              </h3>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Full Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Experience
                  </label>

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 2 years / Fresher"
                  />

                </div>

              </div>

            </div>

            {/* Application Details */}
            <div className="form-section">

              <h3>
                Application Details
              </h3>

              <div className="form-grid">

                <div className="form-group full-width">

                  <label>
                    Apply for Job <span>*</span>
                  </label>

                  <select
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    disabled={loadingJobs}
                  >

                    <option value="">
                      {loadingJobs
                        ? "Loading jobs..."
                        : "Select a job"}
                    </option>

                    {jobs.map((job) => (

                      <option
                        key={job._id}
                        value={job._id}
                      >
                        {job.title} — {job.company}
                      </option>

                    ))}

                  </select>

                  {!loadingJobs && jobs.length === 0 && (
                    <small className="field-note">
                      No jobs found. Create a job first.
                    </small>
                  )}

                </div>

              </div>

            </div>

            {/* Skills & Resume */}
            <div className="form-section">

              <h3>
                Skills & Resume
              </h3>

              <div className="form-grid">

                <div className="form-group full-width">

                  <label>
                    Skills
                  </label>

                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, JavaScript"
                  />

                  <small className="field-note">
                    Separate skills using commas.
                  </small>

                </div>

                <div className="form-group full-width">

                  <label>
                    Resume
                  </label>

                  <input
                    type="text"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="Paste resume link or file reference"
                  />

                  <small className="field-note">
                    Resume file upload will be added later.
                  </small>

                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="form-actions">

              <Link
                to="/candidates"
                className="cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="save-candidate-btn"
                disabled={saving || loadingJobs}
              >
                {saving
                  ? "Adding Candidate..."
                  : "Add Candidate →"}
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}

export default AddCandidate;