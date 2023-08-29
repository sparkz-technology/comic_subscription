import styled from "styled-components";

const Variant = {
  primary: {
    backgroundColor: "#4936f4",
    color: "#fff",
  },
  subscribe: {
    backgroundColor: "#ec4f44",
    color: "#fff",
  },
};

export const Button = styled.button`
  height: 40px;
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: ${(props) =>
    props.variant === "subscribe" ? "0px 5px 5px 0px" : "5px"};
  border: none;
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  font-family: var(--font-primary);
  font-weight: bold;
  cursor: pointer;
  ${(props) => Variant[props.variant]}// Apply the appropriate variant styles
`;

Button.defaultProps = {
  variant: "primary", // Correct the prop name to 'variant'
};

export default Button;
