import styled from "styled-components";
import { Link } from "react-router-dom";
const variant = {
  withGap: {
    justifyContent: "center",
    alignItems: "center",
    margin: "20px ",
    color: "#0d0c22",
    padding: "0px",
  },
  withFlexEnd: {
    justifyContent: "flex-end",
    margin: "5px 0px 0px 0px",
    color: "#0d0c22",
    padding: "0px",
  },
  withBg: {
    backgroundColor: "#0d0c22",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "30px",
  },
};

export const StyledLink = styled(Link)`
  ${({ variant: linkVariant }) => linkVariant && variant[linkVariant]}
  display: flex;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
`;
