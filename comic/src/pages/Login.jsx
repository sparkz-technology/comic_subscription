import LoginForm from "../components/LoginForm";
// import { BackgroundImage } from "../ui/BackgroundImage";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default Login;
export const Container = styled.div`
  display: flex;
  justify-content: center; /* Center the inner div horizontally */
  align-items: center; /* Center the inner div vertically */
  width: 100%; /* Make the outer div full width */
  height: 100vh; /* Make the outer div full height */
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
