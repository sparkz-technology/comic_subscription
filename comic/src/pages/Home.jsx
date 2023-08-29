import EmailForm from "../components/EmailForm";
import { Container, BackgroundImage, StyledHome } from "../styles/Home";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";

function Home() {
  return (
    <Container>
      <Navbar>
        <div>
          <Logo theme="dark" />
          <h1>Comic World</h1>
        </div>

        <StyledLink to="/register">Register</StyledLink>
      </Navbar>
      <BackgroundImage />
      <StyledHome>
        <h1>Unlimited comics, stories, and more.</h1>
        <h2>Enjoy what you like.</h2>
        <p>Ready to read? Enter your email for a free trial.</p>
        <EmailForm />
      </StyledHome>
    </Container>
  );
}

export default Home;

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff21;

  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #0000007d;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #000;
  }
  &:active {
    transform: scale(0.9);
  }
`;
