import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  margin-top: 8px;
  color: var(--red-color);
  font-weight: bold;
`;
