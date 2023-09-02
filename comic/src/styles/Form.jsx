import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Container = styled.div`
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const InputContainer = styled.div`
  font-family: "Poppins", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 32rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 1rem;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 0.9rem;
  margin: 8px 0px;

  color: var(--red-color);
  font-weight: bold;
`;
// new code
export const NavigationContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
export const NavigateBtn = styled.button`
  border: none;
  background: none;
  color: var(--blue-color);
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  padding: 0px;
  margin: 0;
  text-decoration: underline;
  transition: all 0.3s ease-in-out;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ErrorContainer = styled(ErrorMessage)`
  margin: 1px 0px;
  color: var(--red-color);
  font-size: 0.9rem;
  box-sizing: border-box;
  width: 100%;
`;
export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  background-color: var(--white-color);
  h1 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin: 0;
  }
`;
export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  box-sizing: border-box;
`;
export const ToggleButton = styled.button`
  right: 0;
  top: 20%;
  left: 90%;
  position: absolute;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const VisibleIcon = styled(AiOutlineEye)`
  height: 1.5rem;
  width: 1.5rem;
  color: var(--color-grey);
`;
export const InvisibleIcon = styled(AiOutlineEyeInvisible)`
  height: 1.5rem;
  width: 1.5rem;
  color: var(--color-grey);
`;
export const ToggleContainer = styled.div`
  position: relative;
`;
