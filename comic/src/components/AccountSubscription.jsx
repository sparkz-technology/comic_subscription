import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import styled from "styled-components";

import { setSubscriptionStatus } from "../SubscribeSlice";
import {
  SubscriptionCancel,
  GetSubscriptionDetails,
} from "../services/apiSubscription";
import Loader from "../ui/Loader";

function AccountSubscription() {
  const dispatch = useDispatch();
  const [subscriptionsDetails, setSubscriptionsDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const subscriptionId =
    useSelector((state) => state.subscribe.subscriptionId) ||
    Cookies.get("subscriptionId");

  const handleClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    const subscriptionsCancelData = await SubscriptionCancel(subscriptionId);
    setSubscriptionsDetails(subscriptionsCancelData);
    dispatch(
      setSubscriptionStatus(subscriptionsCancelData.canceledSubscription.status)
    );
    setLoader(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!Cookies.get("customer")) return;
      setLoader(true);
      const subscriptionsData = await GetSubscriptionDetails();
      setSubscriptionsDetails(subscriptionsData); // Update with the user data
      setLoader(false);
      Cookies.set("subscriptionId", subscriptionsData?.latestSubscription?.id);

      dispatch(
        setSubscriptionStatus(subscriptionsData?.latestSubscription?.status)
      );
    };
    fetchData();
  }, [dispatch, subscriptionId]);

  if (!subscriptionsDetails || !subscriptionsDetails.latestSubscription?.id) {
    return loader ? (
      <Loader />
    ) : (
      <Container>
        <h1>subscription benefits </h1>
        <StyledAccountSubscription>
          <p>
            Stay updated with the latest Tamil comic releases by subscribing
            today!
          </p>

          <p>Benefits of subscribing:</p>
          <ul>
            <li>Access to exclusive Tamil comic content.</li>
            <li>
              Receive regular updates about new releases and special promotions.
            </li>
            <li>Join our vibrant Tamil comic community.</li>
          </ul>

          <p>
            Subscribe now and immerse yourself in the world of Tamil comics.
          </p>
        </StyledAccountSubscription>
      </Container>
    );
  }

  return (
    <Container>
      {loader ? (
        <Loader />
      ) : (
        <>
          <h1>Account Settings</h1>
          <StyledAccountSubscription>
            <h2>Account</h2>
            <div>
              <p>
                <strong> Customer ID: </strong>
                {subscriptionsDetails.latestSubscription?.customer}
              </p>
              <p>
                <strong>Subscription ID: </strong>
                {subscriptionsDetails.latestSubscription?.id}
              </p>
              <p>
                <strong> Subscription Status: </strong>
                {subscriptionsDetails?.latestSubscription?.status}
              </p>
              <p>
                <strong> Current period end: </strong>
                {new Date(
                  subscriptionsDetails.latestSubscription?.current_period_end *
                    1000
                ).toString()}
              </p>
              {subscriptionsDetails.latestSubscription?.status !==
                "canceled" && (
                <button onClick={handleClick}>Cancel Subscription</button>
              )}
            </div>
          </StyledAccountSubscription>
        </>
      )}
    </Container>
  );
}

export default AccountSubscription;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 20px;
  border-radius: 48px;
  /* background-color: #f8f7f4; */
  box-sizing: border-box;
  h1 {
    font-size: 1rem;
    font-family: sans-serif;
    font-weight: 700;
    color: #fff;
    padding: 10px 20px;
    border-radius: 30px;
    background-color: #0d0c22;
  }
  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  ul {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  li {
    font-size: 16px;
    color: #555;
    line-height: 1.5;
  }
`;

const StyledAccountSubscription = styled.div`
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
  h2 {
    font-size: 22px;
    margin: 0 0 20px;
  }
  h1 {
    font-size: 2rem;
    font-family: sans-serif;
    font-weight: 700;
  }
  strong {
    font-family: "Roboto Mono", monospace;
  }
  button {
    border: 1px solid #900c3f;
    background-color: #c70039;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #c70039;
      background-color: #900c3f;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;
