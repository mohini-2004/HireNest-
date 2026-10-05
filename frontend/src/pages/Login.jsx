import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("recruiter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://hirenest-backend-ihvo.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful! 🎉");

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === "recruiter") {
          navigate("/recruiter-dashboard");
        } else {
          navigate("/candidate-dashboard");
        }
      }, 800);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">H</div>
          <span>HireNest</span>
        </div>

        <div className="login-left-content">
          <h1>
            Welcome back to
            <span> smarter hiring.</span>
          </h1>

          <p>
            Connect with great opportunities and exceptional talent.
            Your next career move starts here.
          </p>

          <div className="login-stats">
            <div>
              <strong>10K+</strong>
              <span>Professionals</span>
            </div>

            <div>
              <strong>2.5K+</strong>
              <span>Companies</span>
            </div>

            <div>
              <strong>8K+</strong>
              <span>Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-container">
          <div className="login-header">
            <h2>Sign in</h2>
            <p>Access your HireNest account</p>
          </div>

          <div className="role-toggle">
            <button
              type="button"
              className={role === "recruiter" ? "active" : ""}
              onClick={() => setRole("recruiter")}
            >
              Recruiter
            </button>

            <button
              type="button"
              className={role === "candidate" ? "active" : ""}
              onClick={() => setRole("candidate")}
            >
              Candidate
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="password-label">
                <label>Password</label>
                <a href="#">Forgot password?</a>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <div
                className={
                  message.includes("successful")
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account?{" "}
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;