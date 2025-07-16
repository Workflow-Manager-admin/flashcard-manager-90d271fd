import React from "react";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function Header() {
  const { user } = useAuth();
  return (
    <header className="header">
      <div className="header-title">Flashcard Manager</div>
      {user && <span className="header-user">Hello, {user.username}!</span>}
    </header>
  );
}
