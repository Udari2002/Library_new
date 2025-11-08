import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message || "Password reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link.");
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="We will send a reset link to your email">
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition"
        >
          Send Reset Link
        </button>
      </form>

      <div className="text-sm text-center mt-4">
        <Link to="/auth/login" className="text-indigo-600 hover:underline">Back to Login</Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
