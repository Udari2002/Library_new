// src/pages/admin/Books.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function Books() {
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-700">Books</h1>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm">
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
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">The Great Gatsby</td>
                  <td className="p-3">F. Scott Fitzgerald</td>
                  <td className="p-3">Novel</td>
                  <td className="p-3 text-emerald-600 font-semibold">Available</td>
                </tr>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">1984</td>
                  <td className="p-3">George Orwell</td>
                  <td className="p-3">Dystopian</td>
                  <td className="p-3 text-red-500 font-semibold">Borrowed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
