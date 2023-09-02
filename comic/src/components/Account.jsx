import AccountSubscription from "./AccountSubscription";
import styled from "styled-components";
const Account = () => {
  return (
    <StyledAccount>
      <AccountSubscription />
    </StyledAccount>
  );
};

export default Account;

const StyledAccount = styled.div`
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 100%;
  }
`;
