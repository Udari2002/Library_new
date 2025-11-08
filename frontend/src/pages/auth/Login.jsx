import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import AuthLayout from "../../components/AuthLayout.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user?.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm text-gray-600">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" required />
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-gray-600">Password</label>
          <input id="password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} className="w-full border rounded-lg p-2 mt-1" required />
        </div>

        <div className="flex items-center justify-between">
          <Link to="/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg p-2">{loading ? "Logging in..." : "Login"}</button>

        <p className="mt-4 text-sm text-gray-600">Don't have an account? <Link to="/auth/register" className="text-indigo-600">Register</Link></p>
      </form>
    </AuthLayout>
  );
}
