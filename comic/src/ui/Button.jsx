import styled from "styled-components";

// export const Button = styled.button`
//   height: 40px;
//   width: ${(props) => (props.width ? props.width : "100%")};
//   border-radius: 5px;
//   border: none;
//   padding: 0 10px;
//   font-size: 16px;
//   box-sizing: border-box;
//   outline: none;
//   font-family: var(--font-primary);
//   font-weight: bold;
//   cursor: pointer;
//   background-color: ${(props) =>
//     props.variant === "subscribe" ? "var(--red-color)" : "var(--blue-color)"};
//   color: var(--pure-white-color);
// `;
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
