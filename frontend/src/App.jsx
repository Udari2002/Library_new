// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import Books from "./pages/admin/Books.jsx";
import Users from "./pages/admin/Users.jsx";
import BorrowedBooks from "./pages/admin/BorrowedBooks.jsx";
import ReturnedBooks from "./pages/admin/ReturnedBooks.jsx";
import OverdueBooks from "./pages/admin/OverdueBooks.jsx";

// User Pages
import UserDashboard from "./pages/user/Dashboard.jsx";

// Shared (placeholders)

import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Admin protected route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/borrowed"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BorrowedBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/returned"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ReturnedBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/overdue"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <OverdueBooks />
            </ProtectedRoute>
          }
        />

        {/* User protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
