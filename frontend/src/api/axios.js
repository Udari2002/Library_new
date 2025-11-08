import axios from "axios";

// Prefer Vite env variable VITE_API_BASE, fallback to localhost:5001 (your backend .env uses PORT=5001)
const base = (import.meta.env && import.meta.env.VITE_API_BASE) || "http://localhost:5001/api";

const api = axios.create({
  baseURL: base,
});

// Attach token automatically (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lms_user_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
