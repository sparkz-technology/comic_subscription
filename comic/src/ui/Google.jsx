import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const GoogleContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 30px;
  gap: 10px;
  height: 60px;
  width: 100%;
  background-color: transparent;
  cursor: pointer;

  p {
    font-size: 0.8rem;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    margin: 0;
  }
`;

function Google() {
  const { navigate } = useNavigate();

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
      if (customerId) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Google Login Error");
      return false;
    }
  }

  return (
    <GoogleContainer onClick={handleGoogleLoginFailure}>
      <FcGoogle size={20} />
      <p>Sign in with Google</p>
    </GoogleContainer>
  );
}

export default Google;
