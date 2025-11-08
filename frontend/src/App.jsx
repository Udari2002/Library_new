// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Auth
import Login from "./pages/auth/Login.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import Books from "./pages/admin/Books.jsx";
import Users from "./pages/admin/Users.jsx";
import BorrowedBooks from "./pages/admin/BorrowedBooks.jsx";
import ReturnedBooks from "./pages/admin/ReturnedBooks.jsx";
import OverdueBooks from "./pages/admin/OverdueBooks.jsx";

// User Pages
import UserDashboard from "./pages/user/Dashboard.jsx";

// Shared
import NotFound from "./pages/shared/NotFound.jsx";
import Profile from "./pages/shared/Profile.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Admin area */}
      <Route element={<ProtectedRoute allowRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<Books />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/borrowed" element={<BorrowedBooks />} />
        <Route path="/admin/returned" element={<ReturnedBooks />} />
        <Route path="/admin/overdue" element={<OverdueBooks />} />
      </Route>

      {/* User area */}
      <Route element={<ProtectedRoute allowRoles={["user", "admin"]} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
