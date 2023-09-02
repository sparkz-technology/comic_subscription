import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid #868181;
  border-top: 2px solid #000;
  box-sizing: border-box;
  animation: ${spinAnimation} 1s linear infinite;
`;
const Container = styled.div`
  display: flex;
  align-items: center; // Vertical
  justify-content: center; // Horizontal
`;
function MiniLoader() {
  return (
    <Container>
      <StyledLoader />
    </Container>
  );
}

export default MiniLoader;
