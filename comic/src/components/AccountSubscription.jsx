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
            Customer ID: {subscriptionsDetails.latestSubscription?.customer}
          </p>
          <p>Subscription ID: {subscriptionsDetails.latestSubscription?.id}</p>
          <p>
            Subscription Status:
            {subscriptionsDetails?.latestSubscription?.status}
          </p>
          <p>
            Current period end:
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
  h1 {
    font-size: 22px;
  }
  button {
    background-color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
  }
`;
