import React, { createContext, useContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
const AuthContext = createContext();

// Demo only: Replace localStorage/session with backend API and .env configured endpoints for production.
function getStoredUser() {
  const user = localStorage.getItem("fcapp-user");
  return user ? JSON.parse(user) : null;
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Fake delay and validation for UX; replace with API call.
    await new Promise((res) => setTimeout(res, 400));
    if (email && password) {
      const fakeUser = { id: "u_" + Date.now(), email };
      localStorage.setItem("fcapp-user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const register = async (email, password) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 400));
    if (email && password) {
      const fakeUser = { id: "u_" + Date.now(), email };
      localStorage.setItem("fcapp-user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem("fcapp-user");
    setUser(null);
  };

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        authLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
