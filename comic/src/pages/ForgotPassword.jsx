import styled from "styled-components";
import { useSelector } from "react-redux";

import ForgotPasswordComponent from "../components/forgotPassword"; // Import the component without renaming it
import CodeVerification from "../components/CodeVerification";
import NewPassword from "../components/NewPassword";
import { Logo } from "../ui/Logo";

function ForgotPassword() {
  const activeComponent = useSelector((state) => state.auth.activeComponent);

  return (
    <>
      <Container>
        <Header>
          <Logo />
          <h1>Comic World </h1>
        </Header>
        {activeComponent === "A" && <ForgotPasswordComponent />}
        {activeComponent === "B" && <CodeVerification />}
        {activeComponent === "C" && <NewPassword />}
      </Container>
    </>
  );
}

export default ForgotPassword;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  h1 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 20px;
`;
