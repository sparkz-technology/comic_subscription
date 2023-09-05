import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import ForgotPasswordComponent from "../components/forgotPassword"; // Import the component without renaming it
import CodeVerification from "../components/CodeVerification";
import NewPassword from "../components/NewPassword";
import { useEffect } from "react";

function ForgotPassword() {
  const activeComponent = useSelector((state) => state.auth.activeComponent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "auth/setActiveComponent", payload: "A" });
  }, [dispatch]);

  return (
    <>
      <Container>
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
`;
