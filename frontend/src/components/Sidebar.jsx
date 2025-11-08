// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icon library from lucide-react
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Books", path: "/admin/books" },
    { name: "Users", path: "/admin/users" },
    { name: "Borrowed", path: "/admin/borrowed" },
    { name: "Returned", path: "/admin/returned" },
    { name: "Overdue", path: "/admin/overdue" },
  ];

  const userMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Books", path: "/user/books" },
    { name: "Borrow", path: "/user/borrow" },
    { name: "Borrowed", path: "/user/borrowed" },
    { name: "Returned", path: "/user/returned" },
    { name: "Overdue", path: "/user/overdue" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white p-4 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Measurements (desktop)
            - width: w-64 (16rem = 256px)
            - header height: h-20 (5rem = 80px)
            - menu item height: h-12 (3rem = 48px)
            - full height: h-full / min-h-screen to fit viewport
        */}

        {/* Logo / header area */}
        <div className="flex items-center gap-3 h-20 px-2">
          <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center">📚</div>
          <div>
            <h1 className="text-lg font-bold">Library</h1>
            <p className="text-xs opacity-80">Management</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-4 flex-1 overflow-auto px-1">
          <ul className="space-y-2">
            {(user?.role === "admin" ? adminMenu : userMenu).map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center h-12 px-3 rounded-lg transition-colors duration-150 gap-3 text-sm ${
                      isActive ? "bg-indigo-600 shadow-inner" : "hover:bg-indigo-600/60"
                    }`
                  }
                >
                  <span className="w-6 text-center opacity-90">•</span>
                  <span className="flex-1">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 text-xs opacity-90 px-2">
          <div>© {new Date().getFullYear()} Library</div>
          <div className="text-xxs mt-1 opacity-70">v0.1.0</div>
        </div>
      </aside>
    </>
  );
}
