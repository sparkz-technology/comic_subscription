import { useGoogleLogin } from "react-google-login";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

function useGoogle() {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);
      await handleGoogle(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error("Google Login Error");
    },
  });

  async function handleGoogleLoginFailure() {
    await handleGoogleLogin();
  }

  async function handleGoogle(access_token) {
    try {
      const response = await fetch("http://localhost:8000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: access_token,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      toast.success("Google Login Success");
      const { customerId, token } = data;
      Cookies.set("customer", customerId);
      Cookies.set("token", token);
      return true;
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Google Login Error");
      return false;
    }
  }
  return { handleGoogleLoginFailure };
}

export default useGoogle;
