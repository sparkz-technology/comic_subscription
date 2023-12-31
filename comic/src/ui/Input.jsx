import styled from "styled-components";
import { Field } from "formik";

export const Input = styled.input`
  height: 40px;
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: ${(props) =>
    props.variant === "subscribe" ? "5px 0px 0px 5px" : "5px"};
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  border: 0px;

  &:focus {
    border-color: var(--blue-color);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const FieldInput = styled(Field)`
  height: 55px;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  border: 0px;
  width: 100%;
  border: 2px solid var(--border-color);
  &:hover {
    border-color: #73c9bf;
    box-shadow: 0px 0px 5px 0px #73c9bf;
  }
  &:focus {
    border-color: #73c9bf;
    box-shadow: 0px 0px 5px 0px #73c9bf;
  }
  &::placeholder {
    color: var(--border-color);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
