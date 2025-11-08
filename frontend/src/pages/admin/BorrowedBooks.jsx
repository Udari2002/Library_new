// src/pages/admin/BorrowedBooks.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function BorrowedBooks() {
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-700">Borrowed Books</h1>
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Book</th>
                  <th className="p-3">Borrower</th>
                  <th className="p-3">Date Borrowed</th>
                  <th className="p-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">1984</td>
                  <td className="p-3">Thamindu Bandara</td>
                  <td className="p-3">2025-11-02</td>
                  <td className="p-3 text-red-500 font-semibold">2025-11-09</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
