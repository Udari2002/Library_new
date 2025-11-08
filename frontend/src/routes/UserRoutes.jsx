// src/routes/UserRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Import user pages
import UserDashboard from "../pages/user/Dashboard.jsx";
import BookList from "../pages/user/BookList.jsx";
import BorrowForm from "../pages/user/BorrowForm.jsx";
import Borrowed from "../pages/user/Borrowed.jsx";
import Returned from "../pages/user/Returned.jsx";
import Overdue from "../pages/user/Overdue.jsx";

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/books" element={<BookList />} />
        <Route path="/user/borrow" element={<BorrowForm />} />
        <Route path="/user/borrowed" element={<Borrowed />} />
        <Route path="/user/returned" element={<Returned />} />
        <Route path="/user/overdue" element={<Overdue />} />
      </Route>
    </Routes>
  );
}
