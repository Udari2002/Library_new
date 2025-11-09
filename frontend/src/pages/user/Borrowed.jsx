import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Borrowed() {
  const { user, api } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!user) return setBorrowedBooks([]);
      try {
        const res = await api.get('/borrows/me');
        if (!mounted) return;
        setBorrowedBooks(res.data || []);
      } catch (err) {
        console.error('Failed to load borrows', err);
      }
    };
    fetch();
    return () => (mounted = false);
  }, [user, api]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Borrowed Books</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-3">Book Title</th>
              <th className="p-3">Borrow Date</th>
              <th className="p-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((rec) => {
              const title = rec.book?.title || rec.snapshot?.title || 'Unknown';
              return (
                <tr key={rec._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{title}</td>
                  <td className="p-3">{rec.borrowDate ? new Date(rec.borrowDate).toLocaleDateString() : '-'}</td>
                  <td className="p-3">{rec.dueDate ? new Date(rec.dueDate).toLocaleDateString() : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
