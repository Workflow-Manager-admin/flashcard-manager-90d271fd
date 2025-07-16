import React from "react";
import { useAuth } from "../context/AuthContext";

function Header({ onMenu }) {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="fcapp-header">
      <button className="fcapp-menu-btn" onClick={onMenu} aria-label="Open navigation">
        ☰
      </button>
      <div className="fcapp-title">
        <span style={{ color: "var(--color-primary)" }}>Flashcard Manager</span>
      </div>
      {isAuthenticated && (
        <div className="fcapp-profile">
          <span className="fcapp-profile-avatar">{user ? user.email[0].toUpperCase() : "U"}</span>
          <span className="fcapp-profile-email">{user?.email}</span>
        </div>
      )}
    </header>
  );
}

export default Header;
