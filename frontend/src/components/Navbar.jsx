// src/components/Navbar.jsx
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { signOut, user } = useAuth();

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-100">
      <h1 className="text-xl font-semibold text-indigo-700">Library Management</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 text-sm font-medium">
          {user?.email || "Admin"}
        </span>

        <button
          onClick={signOut}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
