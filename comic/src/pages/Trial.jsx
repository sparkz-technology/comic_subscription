import EmailForm from "../components/EmailForm";
import {
  Container,
  BackgroundImage,
  StyledHome,
  Navbar,
  StyledLink,
} from "../styles/Trial";
import { Logo } from "../ui/Logo";

function Trial() {
  return (
    <Container>
      <Navbar>
        <div>
          <Logo theme="dark" />
          <h1>Comic World</h1>
        </div>

        <StyledLink to="/home">Let Start !</StyledLink>
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

export default Trial;
