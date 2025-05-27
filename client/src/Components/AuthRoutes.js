import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute({ requiresAuth }) {
  const token = localStorage.getItem("x-auth-token");

  if (requiresAuth && !token) {
    return <Navigate to="/" />;
  }

  if (!requiresAuth && token) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
