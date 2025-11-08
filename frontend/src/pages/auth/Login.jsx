// src/pages/auth/Login.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin"); // admin | user (for now)
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    // Fake login for now
    await signIn({ id: "u1", email, role });
    navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={onSubmit} className="bg-white w-full max-w-md shadow rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-indigo-700">Library Login</h1>

        <input
          type="email"
          className="w-full border rounded-lg p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          className="w-full border rounded-lg p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-2">
          Sign In
        </button>
      </form>
    </div>
  );
}
