import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateJob.css";

function CreateJob() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full Time",
    experience: "",
    salary: "",
    skills: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://hirenest-backend-ihvo.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
          recruiter: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create job");
        setLoading(false);
        return;
      }

      setMessage("Job created successfully! 🎉");

      setTimeout(() => {
        navigate("/recruiter-dashboard");
      }, 1000);
    } catch (error) {
      console.error("Create job error:", error);
      setMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="create-job-page">

      {/* Header */}
      <header className="create-job-header">
        <Link to="/recruiter-dashboard" className="back-link">
          ← Dashboard
        </Link>

        <div className="create-job-brand">
          <div className="brand-icon">H</div>
          <span>HireNest</span>
        </div>
      </header>

      {/* Main */}
      <main className="create-job-main">

        <div className="page-heading">
          <span>RECRUITER</span>
          <h1>Create a New Job</h1>
          <p>
            Add job details to start finding the right candidates.
          </p>
        </div>

        <form
          className="job-form"
          onSubmit={handleSubmit}
        >

          {/* Basic Information */}
          <section className="form-section">

            <h2>Basic Information</h2>
            <p className="section-description">
              Tell candidates about the role and company.
            </p>

            <div className="form-grid">

              <div className="input-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Full Stack Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Company *</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. TechNova"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Bangalore / Remote"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Job Type *</label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="input-group">
                <label>Experience *</label>
                <input
                  type="text"
                  name="experience"
                  placeholder="e.g. 0-2 years"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  placeholder="e.g. ₹6-10 LPA"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

            </div>

          </section>

          {/* Skills */}
          <section className="form-section">

            <h2>Required Skills</h2>

            <p className="section-description">
              Add the skills required for this position.
            </p>

            <div className="input-group">

              <label>Skills *</label>

              <input
                type="text"
                name="skills"
                placeholder="React, Node.js, MongoDB, JavaScript"
                value={formData.skills}
                onChange={handleChange}
                required
              />

              <small>
                Separate skills using commas.
              </small>

            </div>

          </section>

          {/* Description */}
          <section className="form-section">

            <h2>Job Description</h2>

            <p className="section-description">
              Describe the role, responsibilities and expectations.
            </p>

            <div className="input-group">

              <label>Description *</label>

              <textarea
                name="description"
                rows="7"
                placeholder="Write a detailed description of the job..."
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

          </section>

          {/* Message */}
          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </div>
          )}

          {/* Actions */}
          <div className="form-actions">

            <Link
              to="/recruiter-dashboard"
              className="cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="submit-job-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job →"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreateJob;