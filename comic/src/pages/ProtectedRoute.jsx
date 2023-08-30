/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const isAuthenticated = Cookies.get("customer");

  useEffect(() => {
    if (!isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
