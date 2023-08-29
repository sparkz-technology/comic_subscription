import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
export const BackgroundImage = styled.div`
  background-image: url(https://as2.ftcdn.net/v2/jpg/05/84/02/69/1000_F_584026907_ksj4Rk4TVxWhVduqBsV5QMxr4MjNqqno.jpg);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
  z-index: -1;
`;

export const StyledHome = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: var(--white-color);
  text-shadow: var(--text-shadow);
  h1 {
    filter: none;
    font-size: 3rem;
    margin: 0;
  }
  h2 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin: 0;
  }
  @media (max-width: 768px) {
    h1 {
      margin: 0;
      font-size: 5rem;
      padding: 0 20px;
    }
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;
