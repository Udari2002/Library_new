import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function BorrowForm() {
  const { user } = useAuth();
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/borrow", {
        userId: user._id,
        bookId,
      });
      setMessage(res.data.message || "Book borrowed successfully!");
      setBookId("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Borrow a Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full border p-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
        >
          Borrow
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
