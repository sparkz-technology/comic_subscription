import styled from "styled-components";

export const Button = styled.button`
  height: 40px;
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: 5px;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  font-family: var(--font-primary);
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "subscribe" ? "var(--red-color)" : "var(--blue-color)"};
  color: var(--pure-white-color);
`;

Button.defaultProps = {
  variant: "primary", // Correct the prop name to 'variant'
};

export default Button;
