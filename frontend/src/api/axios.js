import axios from "axios";

// API base URL - Use environment variable or fallback to localhost
const base = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

console.log('🔧 Frontend API Configuration:');
console.log('🔍 Using API base URL:', base);

const api = axios.create({
  baseURL: base,
});

// Attach token automatically (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
