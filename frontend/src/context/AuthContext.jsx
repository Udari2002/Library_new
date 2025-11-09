import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("authUser")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);

  // attach token to axios instance when available
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("authUser", JSON.stringify(user));
    else localStorage.removeItem("authUser");
  }, [user]);

  // Register: call backend, then auto-login to obtain token
  const register = async ({ name, email, password, role = "user" }) => {
    try {
      await api.post("/auth/register", { name, email, password, role });
        // auto-login after successful register to get token
        const res = await api.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      return u;
    } catch (err) {
      // normalize error
      const message = err?.response?.data?.message || err.message || "Registration failed";
      throw new Error(message);
    }
  };

  const login = async (email, password) => {
    try {
    const res = await api.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      return u;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Login failed";
      throw new Error(message);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, register, login, logout, api, setUser }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
