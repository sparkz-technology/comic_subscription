import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Logo } from "../ui/Logo";
function Navbar() {
  const navigate = useNavigate();
  function handleSignOut() {
    Cookies.remove("subscriptionId");
    Cookies.remove("customer");
    navigate("/register");
  }
  return (
    <StyledNavbar>
      <div>
        <Logo />
        <h1>Comic World</h1>
      </div>

      <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
    </StyledNavbar>
  );
}

export default Navbar;

const StyledNavbar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  z-index: 1;
  // shadow effect
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #000;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

// const Logo = styled.h1`
//   margin: 0;
// `;

const SignOutButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: sans-serif;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;
