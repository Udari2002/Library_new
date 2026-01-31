import axios from "axios";

// API base URL - points to your backend server
const base = "http://34.229.72.128:5001/api";

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
