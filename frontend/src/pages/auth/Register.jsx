import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await register(form);
      if (user?.role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <label className="block mb-2">
          <span className="text-sm">Name</span>
          <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Password</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Role</span>
          <select name="role" value={form.role} onChange={handleChange} className="mt-1 block w-full rounded border px-3 py-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

  <button type="submit" disabled={loading} className="w-full bg-indigo-600 disabled:opacity-50 text-white py-2 rounded">{loading ? "Creating..." : "Register"}</button>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/auth/login" className="text-indigo-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

