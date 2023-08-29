import { styled } from "styled-components";
import Login from "../components/Login";
import Register from "../components/Register";
// import { useShow } from "../hooks/useShow";
import { useState } from "react";

const Home = () => {
  // const { show, toggleShow } = useShow();
  // useEffect(() => {
  //   console.log(show);
  // }, [show, toggleShow]);
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <BackgroundImage />

      <Header>
        <q>
          Unleash your inner superhero and embark on a thrilling adventure of
          comics with our subscription – Join now to unlock a universe of
          captivating stories!
        </q>
      </Header>
      {show ? (
        <Login toggleShow={toggleShow} />
      ) : (
        <Register toggleShow={toggleShow} />
      )}
    </>
  );
};

export default Home;
const BackgroundImage = styled.div`
  background-image: url(https://as2.ftcdn.net/v2/jpg/05/84/02/69/1000_F_584026907_ksj4Rk4TVxWhVduqBsV5QMxr4MjNqqno.jpg);
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);

  /* z-index: -1; */
`;
const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 40vh;
  q {
    font-size: 3rem;
    margin: 0;
    font-size: 400;
    font-family: var(--font-comic);
    padding: 20px;
    color: #fff;
    text-align: center;
  }
  @media (max-width: 768px) {
    q {
      font-size: 2rem;
    }
  }
`;
