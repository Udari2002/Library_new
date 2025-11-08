// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Import admin pages
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import ManageBooks from "../pages/admin/ManageBooks.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import Reports from "../pages/admin/Reports.jsx";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
