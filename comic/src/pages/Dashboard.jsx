import styled from "styled-components";
import { useSelector } from "react-redux";

import Account from "../components/Account";
import Subscribe from "../components/Subscribe";
import Navbar from "../components/Navbar";
import Plan from "../components/Plan";

function Dashboard() {
  const showSubscribe = useSelector((state) => state.subscribe.showSubscribe);

  return (
    <>
      <StyledDashboard>
        <Navbar />
        <Plan />
        <Container>
          {showSubscribe && <Subscribe />}
          {!showSubscribe && <Account />}
        </Container>
      </StyledDashboard>
    </>
  );
}

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 60%;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 20px;
    margin-bottom: 40px;
  }
`;
