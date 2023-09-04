import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
Google.propTypes = {
  children: PropTypes.node.isRequired,
};
export const GoogleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #bdbdbd;
  border-radius: 30px;
  gap: 10px;
  height: 40px;
  p {
    font-size: 0.8rem;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    margin: 0;
  }
`;
function Google({ children }) {
  return (
    <GoogleContainer>
      <FcGoogle size={20} />
      <p>{children}</p>
    </GoogleContainer>
  );
}

export default Google;
