// src/pages/user/BookList.jsx
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function BookList() {
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-700">Available Books</h1>
          <p className="text-gray-600">Browse and borrow books below.</p>
        </main>
      </div>
    </div>
  );
}
