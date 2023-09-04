import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: min(100vh, 1000px);
  h1 {
    filter: none;
    font-size: 3rem;
    margin: 0;
  }
  h2 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin: 0;
  }
  @media (max-width: 768px) {
    h1 {
      margin: 0;
      font-size: 5rem;
      padding: 0 20px;
    }
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;
export const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  position: fixed;
  align-items: center;
  padding: 20px 0;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    font-weight: 600;
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  div:nth-child(1) {
    padding-left: 20px;
  }
  div:nth-child(2) {
    padding-right: 20px;
    gap: 10px;
  }
`;
export const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: var(--pure-white-color);
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #0000007d;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--pure-white-color);
    color: #000;
  }
  &:active {
    transform: scale(0.9);
  }
`;
