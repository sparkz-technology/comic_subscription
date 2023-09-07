import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import Axios from "axios";

Google.propTypes = {
  children: PropTypes.node.isRequired,
};

export const GoogleContainer = styled.button`
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
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

function Google({ children }) {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      Axios.post("http://localhost:8000/auth/google", {
        token: tokenResponse.accessToken,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Axios Error:", error);
        });
    },
  });
  return (
    <>
      <GoogleContainer onClick={handleGoogleLogin}>
        <FcGoogle size={20} />
        <p>{children}</p>
      </GoogleContainer>
    </>
  );
}

export default Google;
