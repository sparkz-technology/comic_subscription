import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie";

import { CreateCustomer } from "../services/apiSubscription";

function useSignup() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/^(?=.*\d)/, "Password must contain at least one number")
      .matches(
        /^(?=.*[@$!%*?&])/,
        "Password must contain at least one special character"
      )
      .min(8, "Password must be at least 8 characters"),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const responce = await CreateCustomer(values.email, values.password);
      setLoading(false);
      if (!responce) return;
      const { customer } = responce;
      navigate("/login");
      Cookies.set("customer", customer.id);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return {
    validationSchema,
    handleSubmit,
    loading,
    isVisible,
    toggleVisibility,
  };
}

export default useSignup;
