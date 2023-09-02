import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";

import Account from "../components/Account";
import { setShowSubscribe, setSubscriptionData } from "../SubscribeSlice";
import { CreateSubscription } from "../services/apiSubscription";
import { GetSubscriptionDetails } from "../services/apiSubscription";
import Subscribe from "../components/Subscribe";
import { setSubscriptionStatus } from "../SubscribeSlice";
import Navbar from "../components/Navbar";

function Dashboard() {
  const dispatch = useDispatch();
  const subscriptionStatus = useSelector(
    (state) => state.subscribe.subscribtionStatus
  );
  const showSubscribe = useSelector((state) => state.subscribe.showSubscribe);
  const createSubscription = async () => {
    try {
      const response = await CreateSubscription();
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
      <StyledDashboard>
        <StyledPlan>
          <h1>Subscribe to a plan</h1>
          <p>Grab Your All-Access Pass to Endless Comics Delight!</p>
          <Card>
            <div>
              <h3>Comic of Tamil</h3>
            </div>
            <div>
              <strong>INR 10.00 </strong>
              <p>
                Per month
                <br />
                Weekly updates
              </p>

              {subscriptionStatus !== "active" ? (
                <button onClick={() => createSubscription()}>Select</button>
              ) : (
                <button>Subscribed</button>
              )}
            </div>
          </Card>
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
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 40%;
  height: 100vh;
  box-sizing: border-box;
  color: var(--white-color);
  /* background-color: var(--white-color);
   */
  background-color: #040d12;
  h3 {
    font-family: "Delicious Handrawn", cursive;
    font-weight: 400;
    font-size: 2rem;
    text-align: center;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    font-family: sans-serif;
    font-weight: 700;
    text-align: center;
    padding: 0 20px;
    margin: 0;
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
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 250px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  padding: 20px;
  box-shadow: 0 0 10px #ccc;
  /* background-color: #fff; */
  background-color: #0b1a24;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px #ccc;
    cursor: pointer;
  }

  //first div
  div:first-child {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    box-sizing: border-box;
    width: 100%;
    /* color: var(--red-color); */
    /* background-color: var(--white-color); */
  }
  //last div
  div:last-child {
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    /* background-color: #fff; */
  }
  strong {
    font-size: 2rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  p {
    font-size: 1rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #900c3f;
    background-color: #c70039;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      background-color: #900c3f;
      border: 1px solid #c70039;
    }
  }
`;
