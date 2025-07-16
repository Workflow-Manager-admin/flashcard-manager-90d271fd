import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const initialState = { username: "", password: "" };

// PUBLIC_INTERFACE
export default function Auth() {
  const { login, register } = useAuth();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = e => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("Enter both username and password.");
      return;
    }
    if (tab === "login") {
      if (!login(form.username, form.password)) {
        setError("Invalid credentials.");
      }
    }
    if (tab === "register") {
      if (!register(form.username, form.password)) {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="auth-box">
      <div className="auth-tabs">
        <button
          className={tab === "login" ? "tab active" : "tab"}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={tab === "register" ? "tab active" : "tab"}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>
      <form className="auth-form" onSubmit={handleAuth}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleInput}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInput}
          autoComplete={tab === "login" ? "current-password" : "new-password"}
        />
        <button type="submit" className="primary-btn">
          {tab === "login" ? "Login" : "Register"}
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
}
