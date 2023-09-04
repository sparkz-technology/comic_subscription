import Cookies from "js-cookie";
import EmailForm from "../components/EmailForm";
import {
  // Container,
  // BackgroundImage,
  StyledHome,
  Navbar,
  // StyledLink,
} from "../styles/Trial";
import { Logo } from "../ui/Logo";
import { StyledLink } from "../ui/StyledLink";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Trial() {
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

export default Trial;
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// // varient for button

// // Define your variant object
// const variants = {
//   primary: {
//     default: {
//       backgroundColor: "var(--red-color)",
//       color: "var(--pure-white-color)",
//     },
//     hover: {
//       backgroundColor: "var(--pure-white-color)",
//       color: "var(--red-color)",
//       border: "2px solid var(--red-color)",
//     },
//   },
//   secondary: {
//     default: {
//       backgroundColor: "var(--pure-white-color)",
//       color: "var(--red-color)",
//       border: "2px solid var(--red-color)",
//     },
//     hover: {
//       backgroundColor: "var(--red-color)",
//       color: "var(--pure-white-color)",
//     },
//   },
// };

// // Create the StyledLink component
// export const StyledLink = styled(Link)`
//   font-size: 16px;
//   font-weight: 600;
//   color: var(--pure-white-color);
//   text-decoration: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   background-color: #0000007d;
//   margin-left: 10px;
//   transition: all 0.3s ease-in-out;

//   ${({ variant }) => variant && variants[variant].default}

//   &:hover {
//     ${({ variant }) => variant && variants[variant].hover}
//   }

//   &:active {
//     transform: scale(0.9);
//   }
// `;
