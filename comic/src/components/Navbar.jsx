import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Logo } from "../ui/Logo";
function Navbar() {
  const navigate = useNavigate();
  function handleSignOut() {
    Cookies.remove("subscriptionId");
    Cookies.remove("customer");
    Cookies.remove("token");
    navigate("/");
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
  padding: 15px 20px 20px 10px;
  gap: 20px;
  background-color: #fff;
  box-sizing: border-box;
  /* the navbar is fixed to the top of the page  if the user scrolls down the page, the navbar will remain at the top: */
  z-index: 1;
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

const SignOutButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-family: sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #0d0c22;
    color: #fff;
  }
`;
