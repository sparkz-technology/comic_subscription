import AccountSubscription from "./AccountSubscription";
import styled from "styled-components";
const Account = () => {
  return (
    <StyledAccount>
      <h1>Account Settings</h1>

      <AccountSubscription />
    </StyledAccount>
  );
};

export default Account;

const StyledAccount = styled.div`
  padding: 10px;
  box-sizing: border-box;
  h1 {
    font-size: 2rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  @media (max-width: 768px) {
    height: 100%;
  }
`;
