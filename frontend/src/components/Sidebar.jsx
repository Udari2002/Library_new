// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icon library from lucide-react

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Books", path: "/admin/books" },
    { name: "Users", path: "/admin/users" },
    { name: "Borrowed", path: "/admin/borrowed" },
    { name: "Returned", path: "/admin/returned" },
    { name: "Overdue", path: "/admin/overdue" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white p-4 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">📚 Library</h2>

        <nav className="flex flex-col space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-600 text-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
