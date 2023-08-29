/* eslint-disable react/prop-types */
// import logoDark from "../assets/logoDark.png";
// import logoLight from "../assets/logoLight.svg";
import { GiBookmarklet } from "react-icons/gi";
import styled from "styled-components";
export const Logo = styled(GiBookmarklet)`
  font-size: 50px;
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
  padding: 10px;
`;
