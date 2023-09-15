/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

function AdminProtectedRoute({ children }) {
  const navigate = useNavigate();

  const isAuthenticated = Cookies.get("role") === "ADMIN";
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default AdminProtectedRoute;
