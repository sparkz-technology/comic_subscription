import styled from "styled-components";

export const Button = styled.button`
  height: 50px;
  width: 100%;
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 30px;
  outline: none;
  border: 0px;
  background-color: #0d0c22;
  color: var(--white-color);
  &:hover {
    background-color: #565564;
  }
`;
// Button.defaultProps = {
//   variant: "primary", // Correct the prop name to 'variant'
// };

export default Button;
