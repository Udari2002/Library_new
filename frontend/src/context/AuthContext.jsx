// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// This provider wraps the entire app and stores the logged-in user info
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, role }

  // Load user from localStorage on refresh
  useEffect(() => {
    const raw = localStorage.getItem("lms_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // Fake sign-in function for now (will be replaced by backend later)
  const signIn = async (payload) => {
    setUser(payload);
    localStorage.setItem("lms_user", JSON.stringify(payload));
  };

  // Logout function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the auth context anywhere
export const useAuth = () => useContext(AuthContext);
