import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, authLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    const ok = await register(email, password);
    if (!ok) setError("Registration failed.");
    else navigate("/flashcards");
  };

  return (
    <div className="fcapp-login-wrap">
      <form onSubmit={handleSubmit} className="fcapp-card">
        <h2>Sign Up</h2>
        <input
          autoFocus
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="fcapp-in"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="fcapp-in"
        />
        <button type="submit" className="fcapp-btn" disabled={authLoading}>
          {authLoading ? "Registering..." : "Register"}
        </button>
        <div className="fcapp-nudge">
          <span>Already have an account?</span> <Link to="/login">Sign In</Link>
        </div>
        {error && <div className="fcapp-error">{error}</div>}
      </form>
    </div>
  );
}

export default RegisterPage;
