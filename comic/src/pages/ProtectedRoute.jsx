/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Store the isAuthenticated status in a cookie
  // if authenticated, navigate to the lost used page on refresh
  const isAuthenticated = Cookies.get("customer");

  useEffect(() => {
    if (!isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
