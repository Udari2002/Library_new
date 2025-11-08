// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allowRoles }) {
  const { user } = useAuth();

  // If not logged in → redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in but role not allowed → redirect to dashboard of their role
  if (allowRoles && !allowRoles.includes(user.role)) {
    const redirectPath =
      user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  // If allowed → render the nested route
  return <Outlet />;
}
