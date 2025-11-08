import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function BorrowForm() {
  const { user } = useAuth();
  const [bookId, setBookId] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await api.get("/books");
        if (!mounted) return;
        setBooks(res.data || []);
      } catch (err) {
        console.error("Failed to load books", err);
      }
    };
    fetch();
    return () => (mounted = false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!bookId) return setMessage("Please select a book by name.");
    setLoading(true);
    try {
      const res = await api.post("/borrows", { bookId });
      setMessage(res.data.message || "Book borrowed successfully!");
      setBookId("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to borrow book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">Borrow a Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Choose a book (by name)</label>
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select a book...</option>
            {books.map((b) => (
              <option key={b._id} value={b._id}>
                {b.title} {b.author ? `— ${b.author}` : ""}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg disabled:opacity-60 text-center"
            >
              {loading ? "Borrowing…" : "Borrow"}
            </button>

            <Link to="/dashboard" className="flex-1 text-center border border-gray-200 hover:shadow px-3 py-3 rounded-lg">
              Back to Dashboard
            </Link>
          </div>
        </form>
        {message && <p className="mt-3 text-sm text-gray-700 text-center">{message}</p>}
      </div>
    </div>
  );
}
