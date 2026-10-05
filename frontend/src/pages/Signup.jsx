import { useState } from "react";
import "./Signup.css";

function Signup() {
  const [role, setRole] = useState("recruiter");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://hirenest-backend-ihvo.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully! 🎉");

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* Left Side */}
      <div className="signup-left">

        <div className="signup-brand">
          ✦ HireNest
        </div>

        <div className="signup-left-content">

          <div className="signup-badge">
            🚀 Start Hiring Smarter
          </div>

          <h1>
            Your next great hire
            <span> starts here.</span>
          </h1>

          <p>
            Join HireNest and simplify your recruitment process
            with AI-powered candidate screening and smart hiring insights.
          </p>

          <div className="signup-benefits">

            <div>
              <span>✓</span>
              <p>AI-powered resume screening</p>
            </div>

            <div>
              <span>✓</span>
              <p>Smart candidate matching</p>
            </div>

            <div>
              <span>✓</span>
              <p>AI-generated interview questions</p>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="signup-right">

        <div className="signup-card">

          <div className="mobile-signup-logo">
            ✦ HireNest
          </div>

          <h2>Create your account</h2>

          <p className="signup-subtitle">
            Get started with HireNest today
          </p>

          {/* Role Selection */}
          <div className="signup-role-selection">

            <button
              type="button"
              className={
                role === "recruiter"
                  ? "signup-role active"
                  : "signup-role"
              }
              onClick={() => setRole("recruiter")}
            >
              👨‍💼
              <span>Recruiter</span>
            </button>

            <button
              type="button"
              className={
                role === "candidate"
                  ? "signup-role active"
                  : "signup-role"
              }
              onClick={() => setRole("candidate")}
            >
              👩‍💻
              <span>Candidate</span>
            </button>

          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>

            <div className="signup-input-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="signup-input-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="signup-input-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="signup-input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

            <div className="terms">

              <input
                type="checkbox"
                id="terms"
                required
              />

              <label htmlFor="terms">
                I agree to the Terms & Conditions
              </label>

            </div>

            {/* Message */}
            {message && (
              <p className="signup-message">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="signup-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : `Create ${
                    role === "recruiter"
                      ? "Recruiter"
                      : "Candidate"
                  } Account`
              }

              {!loading && <span>→</span>}
            </button>

          </form>

          <p className="already-account">
            Already have an account?
            <a href="/login"> Login</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;