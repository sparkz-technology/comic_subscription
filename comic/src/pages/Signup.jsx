import SignupForm from "../components/SignupForm";
import styled from "styled-components";

function Signup() {
  return (
    <Container>
      <SignupForm />
    </Container>
  );
}

export default Signup;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
