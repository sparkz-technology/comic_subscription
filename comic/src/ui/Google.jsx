import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

import { useEffect } from "react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

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

// Google.js

function Google() {
  const { token, handleGoogleLoginFailure } = useGoogleAuth();
  useEffect(() => {
    if (token) {
      console.log(token);
    }
  }, [token]);

  return (
    <GoogleContainer onClick={handleGoogleLoginFailure}>
      <FcGoogle size={20} />
      <p>Sign in with Google</p>
    </GoogleContainer>
  );
}

export default Google;
