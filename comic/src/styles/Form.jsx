import styled from "styled-components";

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
  margin-top: 8px;
  color: var(--red-color);
  font-weight: bold;
`;
