import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Returned() {
  const { user } = useAuth();
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/returned/${user._id}`)
      .then((res) => setReturnedBooks(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Returned Books</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-3">Book Title</th>
              <th className="p-3">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {returnedBooks.map((book) => (
              <tr key={book._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{new Date(book.returnDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
