import React, { useContext, useState, createContext, useEffect } from "react";

// Simulate backend calls with localStorage for demo/standalone.
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to load user from localStorage
    const data = localStorage.getItem("flashcard_user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  // PUBLIC_INTERFACE
  const login = (username, password) => {
    if (!username) return false;
    localStorage.setItem("flashcard_user", JSON.stringify({ username }));
    setUser({ username });
    return true;
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    localStorage.removeItem("flashcard_user");
    setUser(null);
  };

  // PUBLIC_INTERFACE
  const register = (username, password) => {
    // Demo: No backend, just permit all
    return login(username, password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
