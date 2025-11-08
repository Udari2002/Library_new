// src/pages/user/BookList.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    api
      .get("/books")
      .then((res) => {
        if (mounted) setBooks(res.data || []);
      })
      .catch((err) => console.error("Failed to fetch books:", err));
    return () => (mounted = false);
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-700">Available Books</h1>
          <p className="text-gray-600">Browse and borrow books below.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((b) => (
              <div key={b._id} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.author}</p>
                <p className="text-xs mt-2">Category: {b.category || 'General'}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">Available: <strong>{b.copiesAvailable ?? b.totalCopies ?? 0}</strong></div>
                  <button className="bg-indigo-600 text-white text-sm px-3 py-1 rounded">Borrow</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
