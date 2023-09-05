import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setSubscriptionStatus } from "../SubscribeSlice";
import {
  SubscriptionCancel,
  GetSubscriptionDetails,
} from "../services/apiSubscription";

function useAccount() {
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

  return { subscriptionsDetails, loader, handleClick };
}

export default useAccount;
