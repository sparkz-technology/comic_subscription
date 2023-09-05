import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";

import image from "../assets/venom.jpg";

import Account from "../components/Account";
import { setShowSubscribe, setSubscriptionData } from "../SubscribeSlice";
import { CreateSubscription } from "../services/apiSubscription";
import { GetSubscriptionDetails } from "../services/apiSubscription";
import Subscribe from "../components/Subscribe";
import { setSubscriptionStatus } from "../SubscribeSlice";
import Navbar from "../components/Navbar";
import Spinner from "../ui/Spinner";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const subscriptionStatus = useSelector(
    (state) => state.subscribe.subscribtionStatus
  );
  const showSubscribe = useSelector((state) => state.subscribe.showSubscribe);
  const createSubscription = async () => {
    try {
      setLoading(true);
      const response = await CreateSubscription();
      setLoading(false);
      // if (response.error) dispatch(setAuthentication(false));
      const { subscriptionId, clientSecret } = response;
      console.log(subscriptionId, clientSecret);
      dispatch(setSubscriptionData({ subscriptionId, clientSecret }));
      Cookies.set("subscriptionId", subscriptionId);
      dispatch(setShowSubscribe(true));
      // in mobile view, when user clicks on select button, it will scroll to bottom of the page
      if (window.innerWidth < 768) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const subscriptionsData = await GetSubscriptionDetails();
      dispatch(
        setSubscriptionStatus(subscriptionsData?.latestSubscription?.status)
      );
      Cookies.set("subscriptionId", subscriptionsData?.latestSubscription?.id);
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <Navbar />

      {loading && <Spinner />}
      <StyledDashboard>
        <StyledPlan>
          <Container>
            <Card>
              <div>
                <img src={image} alt="comic" height="200px" width="100%" />
              </div>
              <div>
                <h3>Comic of Tamil</h3>

                <strong>INR 10.00 </strong>
                <p>
                  Per month
                  <br />
                  Weekly updates
                </p>

                {subscriptionStatus !== "active" ? (
                  <button
                    onClick={() => createSubscription()}
                    disabled={loading}
                  >
                    subscribe
                  </button>
                ) : (
                  <button>Subscribed</button>
                )}
              </div>
            </Card>
          </Container>
        </StyledPlan>
        <StyledAccount>
          {showSubscribe && <Subscribe />}
          {!showSubscribe && <Account />}
        </StyledAccount>
      </StyledDashboard>
    </>
  );
}

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const StyledPlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 500px;
`;

const Card = styled.div`
  background: linear-gradient(rgb(236, 251, 249) 0%, rgb(229, 252, 222) 100%);
  display: flex;
  /* align-items: start; */
  width: 100%;
  box-sizing: border-box;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  translate: all 0.2s ease-in-out;
  gap: 20px;
  padding: 40px;
  border-radius: 48px;
  // select first div
  strong {
    font-size: 1.5rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  p {
    text-align: center;
    font-size: 1rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    img {
      width: 100%;
      object-fit: fill;

      &:hover {
        transform: scale(1.1);
        transition: all 0.2s ease-in-out;
        transform: all 0.2s ease-in-out;
        transform: scale(1.1);
      }
    }

    box-sizing: border-box;
  }

  & > div:last-child {
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    box-sizing: border-box;
  }
  button {
    padding: 10px;
    border-radius: 30px;
    border: none;
    background-color: var(--red-color);
    color: #fff;
    font-weight: bold;
    font-size: 0.1rem;
    align-items: center;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background-color: var(--red-color-hover);
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 48px;
  box-sizing: border-box;
  color: #0d0c22;

  h3 {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0;
  }
  p {
    font-size: 1rem;
    font-family: sans-serif;
    font-weight: 700;
    text-align: start;
  }

  h1 {
    font-size: 2rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 50px;
    margin-top: 40px;
  }
`;
const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 60%;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 20px;
    margin-bottom: 40px;
  }
`;
