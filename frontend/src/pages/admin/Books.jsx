import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ModalForm from "../../components/ModalForm";
import api from "../../api/axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error loading books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-700">Books</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              + Add Book
            </button>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Availability</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{b.title}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3">{b.category}</td>
                    <td
                      className={`p-3 font-semibold ${
                        b.available ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {b.available ? "Available" : "Borrowed"}
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td className="p-3 text-gray-500" colSpan="4">
                      No books yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          onAdded={fetchBooks}
        />
      )}
    </div>
  );
}
