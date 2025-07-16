import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import DecksPage from "./pages/DecksPage";
import ReviewPage from "./pages/ReviewPage";
import ProgressPage from "./pages/ProgressPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

// PUBLIC_INTERFACE
function AppContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Mobile responsiveness: close menu on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="fcapp-root">
      <Header onMenu={() => setSidebarOpen((o) => !o)} />
      <div className="fcapp-main-layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="fcapp-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/flashcards" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/flashcards" /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/flashcards" /> : <RegisterPage />}
            />
            <Route
              path="/flashcards"
              element={isAuthenticated ? <FlashcardsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/decks"
              element={isAuthenticated ? <DecksPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/review"
              element={isAuthenticated ? <ReviewPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/progress"
              element={isAuthenticated ? <ProgressPage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Handles theme using .env or default to light
  const [theme, setTheme] = useState(
    process.env.REACT_APP_THEME === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <AppContainer />
      </Router>
      <button
        className="theme-toggle"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        onClick={() =>
          setTheme((th) => (th === "light" ? "dark" : "light"))
        }
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </AuthProvider>
  );
}

export default App;
