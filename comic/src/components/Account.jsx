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
  h1 {
    font-size: 2rem;
    font-family: sans-serif;
    font-weight: 700;
  }
`;
