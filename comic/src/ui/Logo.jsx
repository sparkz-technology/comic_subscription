import { GiBookmarklet } from "react-icons/gi";
import styled from "styled-components";
export const Logo = styled(GiBookmarklet)`
  font-size: 50px;
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
  padding: 10px;
`;
