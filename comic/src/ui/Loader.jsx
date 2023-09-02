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
  /* position: absolute; */
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */

  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid #868181;
  border-top: 5px solid #000;
  box-sizing: border-box;
  animation: ${spinAnimation} 1s linear infinite;
`;
const Container = styled.div`
  /* position: absolute; */
  /* top: 0; */
  /* right: 0; */
  /* bottom: 0; */
  /* left: 0; */
  display: flex;
  align-items: center; // Vertical
  justify-content: center; // Horizontal
`;
function Loader() {
  return (
    <Container>
      <StyledLoader />
    </Container>
  );
}

export default Loader;
