import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CandidateDetails() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [screening, setScreening] = useState(false);

  const statuses = [
    "New",
    "AI Screened",
    "Shortlisted",
    "Interview",
    "Selected",
    "Rejected",
  ];

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/candidates/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load candidate.");
          return;
        }

        setCandidate(data.candidate);
      } catch (err) {
        console.error("Fetch candidate error:", err);
        setError("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCandidate();
    } else {
      setError("Candidate ID is missing.");
      setLoading(false);
    }
  }, [id]);

  // ==================== UPDATE STATUS ====================

  const updateStatus = async (newStatus) => {
    if (!candidate || updatingStatus) return;

    try {
      setUpdatingStatus(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/candidates/${candidate._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to update status.");
        return;
      }

      setCandidate(data.candidate);
    } catch (err) {
      console.error("Update status error:", err);
      setError("Unable to connect to server.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ==================== AI SCREENING ====================

  const runAIScreening = async () => {
    if (!candidate || screening) return;

    try {
      setScreening(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/candidates/${candidate._id}/ai-screen`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "AI screening failed.");
        return;
      }

      setCandidate(data.candidate);
    } catch (err) {
      console.error("AI screening error:", err);
      setError("Unable to connect to server.");
    } finally {
      setScreening(false);
    }
  };

  // ==================== LOADING ====================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          background: "#f5f7fb",
        }}
      >
        <h2>Loading candidate...</h2>
      </div>
    );
  }

  // ==================== ERROR ====================

  if (error && !candidate) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Unable to load candidate</h2>
        <p>{error}</p>

        <Link to="/candidates">← Back to Candidates</Link>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Candidate not found</h2>

        <Link to="/candidates">← Back to Candidates</Link>
      </div>
    );
  }

  const skills = candidate.skills || [];
  const matchedSkills = candidate.matchedSkills || [];
  const missingSkills = candidate.missingSkills || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      {/* ==================== HEADER ==================== */}

      <header
        style={{
          background: "#111827",
          color: "white",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>HireNest</h2>

        <Link
          to="/candidates"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          ← Back to Candidates
        </Link>
      </header>

      {/* ==================== MAIN ==================== */}

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "35px 25px",
        }}
      >
        {/* ==================== CANDIDATE HEADER ==================== */}

        <section
          style={{
            background: "white",
            borderRadius: "14px",
            padding: "28px",
            marginBottom: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                style={{
                  width: "65px",
                  height: "65px",
                  borderRadius: "50%",
                  background: "#e0e7ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#4338ca",
                }}
              >
                {candidate.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h1 style={{ margin: "0 0 7px", fontSize: "28px" }}>
                  {candidate.name}
                </h1>

                <p
                  style={{
                    margin: "0 0 5px",
                    color: "#6b7280",
                  }}
                >
                  {candidate.email}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                  }}
                >
                  {candidate.phone || "Phone not provided"}
                </p>
              </div>
            </div>

            <div
              style={{
                background: "#eef2ff",
                color: "#4338ca",
                padding: "9px 16px",
                borderRadius: "20px",
                fontWeight: "600",
              }}
            >
              {candidate.status}
            </div>
          </div>
        </section>

        {/* ==================== STATUS ==================== */}

        <section
          style={{
            background: "white",
            borderRadius: "14px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Application Status</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => updateStatus(status)}
                disabled={updatingStatus}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border:
                    candidate.status === status
                      ? "2px solid #4f46e5"
                      : "1px solid #d1d5db",
                  background:
                    candidate.status === status ? "#eef2ff" : "white",
                  color:
                    candidate.status === status ? "#4338ca" : "#374151",
                  fontWeight:
                    candidate.status === status ? "600" : "500",
                  cursor: updatingStatus ? "not-allowed" : "pointer",
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {updatingStatus && (
            <p style={{ color: "#4f46e5", marginBottom: 0 }}>
              Updating status...
            </p>
          )}

          {error && candidate && (
            <p
              style={{
                color: "#dc2626",
                marginBottom: 0,
              }}
            >
              {error}
            </p>
          )}
        </section>

        {/* ==================== INFORMATION GRID ==================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* ==================== CANDIDATE INFORMATION ==================== */}

          <section
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Candidate Information</h2>

            <div style={{ lineHeight: "1.9" }}>
              <p>
                <strong>Experience:</strong>{" "}
                {candidate.experience || "Not specified"}
              </p>

              <p>
                <strong>Applied Position:</strong>{" "}
                {candidate.job?.title || "Not specified"}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {candidate.job?.company || "Not specified"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {candidate.job?.location || "Not specified"}
              </p>
            </div>
          </section>

          {/* ==================== SKILLS ==================== */}

          <section
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Skills</h2>

            {skills.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: "#f3f4f6",
                      padding: "8px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: "#6b7280" }}>
                No skills added.
              </p>
            )}
          </section>

          {/* ==================== AI SCREENING ==================== */}

          <section
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              gridColumn: "1 / -1",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 7px" }}>
                  🤖 AI Resume Screening
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                  }}
                >
                  Analyze candidate skills against the job requirements.
                </p>
              </div>

              <button
                onClick={runAIScreening}
                disabled={screening}
                style={{
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: screening ? "not-allowed" : "pointer",
                }}
              >
                {screening
                  ? "⏳ Screening..."
                  : "✨ AI Screen Candidate"}
              </button>
            </div>

            {candidate.aiScore !== undefined &&
              candidate.aiScore !== null && (
                <div
                  style={{
                    marginTop: "25px",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "15px",
                  }}
                >
                  {/* SCORE */}

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "20px",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#6b7280",
                      }}
                    >
                      Match Score
                    </p>

                    <h1
                      style={{
                        margin: "8px 0 0",
                        fontSize: "38px",
                        color: "#4f46e5",
                      }}
                    >
                      {candidate.aiScore}%
                    </h1>
                  </div>

                  {/* RECOMMENDATION */}

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px",
                        color: "#6b7280",
                      }}
                    >
                      Recommendation
                    </p>

                    <h3
                      style={{
                        margin: 0,
                        color: "#111827",
                      }}
                    >
                      {candidate.aiRecommendation ||
                        "Needs Review"}
                    </h3>
                  </div>

                  {/* MATCHED SKILLS */}

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px",
                        color: "#6b7280",
                      }}
                    >
                      Matched Skills
                    </p>

                    {matchedSkills.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        {matchedSkills.map((skill, index) => (
                          <span
                            key={index}
                            style={{
                              background: "#dcfce7",
                              color: "#166534",
                              padding: "5px 9px",
                              borderRadius: "15px",
                              fontSize: "13px",
                            }}
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "#6b7280" }}>
                        None
                      </span>
                    )}
                  </div>

                  {/* MISSING SKILLS */}

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 8px",
                        color: "#6b7280",
                      }}
                    >
                      Missing Skills
                    </p>

                    {missingSkills.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        {missingSkills.map((skill, index) => (
                          <span
                            key={index}
                            style={{
                              background: "#fee2e2",
                              color: "#991b1b",
                              padding: "5px 9px",
                              borderRadius: "15px",
                              fontSize: "13px",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span
                        style={{
                          color: "#166534",
                        }}
                      >
                        No missing skills 🎉
                      </span>
                    )}
                  </div>
                </div>
              )}

            {candidate.aiScore === undefined ||
            candidate.aiScore === null ? (
              <div
                style={{
                  marginTop: "25px",
                  padding: "18px",
                  background: "#f9fafb",
                  borderRadius: "10px",
                  color: "#6b7280",
                }}
              >
                Click <strong>AI Screen Candidate</strong> to
                analyze this candidate against the job requirements.
              </div>
            ) : null}
          </section>

          {/* ==================== RESUME ==================== */}

          <section
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              gridColumn: "1 / -1",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Resume</h2>

            {candidate.resume ? (
              <a
                href={candidate.resume}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#4f46e5",
                  fontWeight: "600",
                }}
              >
                📄 View Resume
              </a>
            ) : (
              <p style={{ color: "#6b7280" }}>
                No resume uploaded.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default CandidateDetails;