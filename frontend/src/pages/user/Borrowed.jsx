import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Borrowed() {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/borrowed/${user._id}`)
      .then((res) => setBorrowedBooks(res.data))
      .catch((err) => console.error(err));
  }, [user]);

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
            {borrowedBooks.map((book) => (
              <tr key={book._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{new Date(book.borrowDate).toLocaleDateString()}</td>
                <td className="p-3">{new Date(book.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
