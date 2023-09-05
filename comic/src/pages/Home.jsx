import Cookies from "js-cookie";
import EmailForm from "../components/EmailForm";
import { StyledHome, Navbar } from "../styles/Home";
import { Logo } from "../ui/Logo";
import { StyledLink } from "../ui/StyledLink";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("customer");
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Navbar>
        <div>
          <Logo theme="light" />
          <h1>Comic World</h1>
        </div>
        <div>
          <StyledLink variant="withGap" to="/login">
            Login
          </StyledLink>
          <StyledLink variant="withBg" to="/signup">
            Sign up
          </StyledLink>
        </div>
      </Navbar>
      <StyledHome>
        <h1>Unlimited comics, stories, and more.</h1>
        <h2>Enjoy what you like.</h2>
        <p>Ready to read? Enter your email for a free trial.</p>
        <EmailForm />
      </StyledHome>
    </>
  );
}

export default Home;
