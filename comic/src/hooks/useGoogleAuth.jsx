// useGoogleAuth.js
import { useCallback, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { authenticateWithGoogle } from "../services/googleService";

export function useGoogleAuth() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);
      setToken(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error("Google Login Error");
    },
  });

  async function handleGoogleLoginFailure() {
    await handleGoogleLogin();
  }
  const authenticate = useCallback(
    async (access_token) => {
      const responce = await authenticateWithGoogle(access_token);
      if (!responce) return;
      const { customerId, token } = responce;
      Cookies.set("customer", customerId);
      Cookies.set("token", token);
      navigate("/dashboard");
    },
    [navigate]
  );
  useEffect(() => {
    if (token) {
      authenticate(token);
    }
  }, [token, authenticate]);

  return { token, handleGoogleLoginFailure };
}
