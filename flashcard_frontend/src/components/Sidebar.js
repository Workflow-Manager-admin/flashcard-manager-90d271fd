import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const sidebarLinks = [
  { to: "/flashcards", label: "Flashcards", icon: "📝" },
  { to: "/decks", label: "Decks", icon: "📚" },
  { to: "/review", label: "Review", icon: "🔁" },
  { to: "/progress", label: "Progress", icon: "📈" },
];

// PUBLIC_INTERFACE
function Sidebar({ open, onClose }) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <aside className={`fcapp-sidebar${open ? " open" : ""}`}>
      <div className="fcapp-sidebar-header">
        <span className="fcapp-logo" aria-label="App Logo">
          <span style={{ color: "var(--color-primary)" }}>⚡</span>
        </span>
        <span className="fcapp-appname">Flashcards</span>
        <button className="fcapp-sidebar-close" onClick={onClose} aria-label="Close Menu">
          ×
        </button>
      </div>
      <nav className="fcapp-sidebar-nav" onClick={onClose}>
        {sidebarLinks.map((l) => (
          <NavLink key={l.to} to={l.to} className="fcapp-navlink">
            <span className="fcapp-navicon">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
      {isAuthenticated && (
        <button
          className="fcapp-sidebar-logout"
          onClick={logout}
          aria-label="Logout"
        >
          Logout
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
