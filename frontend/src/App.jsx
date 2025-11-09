// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import Books from "./pages/admin/Books.jsx";
import Users from "./pages/admin/Users.jsx";
import BorrowedBooks from "./pages/admin/BorrowedBooks.jsx";
import ReturnedBooks from "./pages/admin/ReturnedBooks.jsx";
import OverdueBooks from "./pages/admin/OverdueBooks.jsx";

// User Pages
import UserDashboard from "./pages/user/Dashboard.jsx";
import BookList from "./pages/user/BookList.jsx";
import BorrowForm from "./pages/user/BorrowForm.jsx";
import Borrowed from "./pages/user/Borrowed.jsx";
import Returned from "./pages/user/Returned.jsx";
import Overdue from "./pages/user/Overdue.jsx";

// Shared (placeholders)
import Profile from "./pages/shared/Profile.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
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

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Additional user routes (so sidebar links work) */}
        <Route
          path="/user/books"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/borrow"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <BorrowForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/borrowed"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Borrowed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/returned"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Returned />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/overdue"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Overdue />
            </ProtectedRoute>
          }
        />

            {/* Default */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
