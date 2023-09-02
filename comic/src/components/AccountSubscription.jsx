import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setSubscriptionStatus } from "../SubscribeSlice";
import {
  SubscriptionCancel,
  GetSubscriptionDetails,
} from "../services/apiSubscription";

function AccountSubscription() {
  const dispatch = useDispatch();
  const [subscriptionsDetails, setSubscriptionsDetails] = useState({} || null);
  const subscriptionId =
    useSelector((state) => state.subscribe.subscriptionId) ||
    Cookies.get("subscriptionId");
  const handleClick = async (e) => {
    e.preventDefault();
    const subscriptionsCancelData = await SubscriptionCancel(subscriptionId);
    setSubscriptionsDetails(subscriptionsCancelData);
    dispatch(
      setSubscriptionStatus(subscriptionsCancelData.canceledSubscription.status)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!Cookies.get("customer")) return;

      const subscriptionsData = await GetSubscriptionDetails();
      setSubscriptionsDetails(subscriptionsData); // Update with the user data
      Cookies.set("subscriptionId", subscriptionsData?.latestSubscription?.id);

      dispatch(
        setSubscriptionStatus(subscriptionsData?.latestSubscription?.status)
      );
    };
    fetchData();
  }, [dispatch, subscriptionId]);

  if (!subscriptionsDetails) {
    return <p>Loading subscription details...</p>;
  }

  return (
    <StyledAccountSubscription>
      <h1>Account</h1>
      {subscriptionsDetails.latestSubscription?.id ? (
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
              subscriptionsDetails.latestSubscription?.current_period_end * 1000
            ).toString()}
          </p>
          {subscriptionsDetails.latestSubscription?.status !== "canceled" && (
            <button onClick={handleClick}>Cancel Subscribtion </button>
          )}
        </div>
      ) : (
        <p>No subscription found</p>
      )}
    </StyledAccountSubscription>
  );
}

export default AccountSubscription;
const StyledAccountSubscription = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
  h1 {
    font-size: 22px;
    margin: 0 0 20px;
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
      border: 1px solid#c70039;
      background-color: #900c3f;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;
