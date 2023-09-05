import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import {
  CreateSubscription,
  GetSubscriptionDetails,
} from "../services/apiSubscription";
import {
  setSubscriptionData,
  setSubscriptionStatus,
  setShowSubscribe,
} from "../SubscribeSlice";

function usePlan() {
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
      const { subscriptionId, clientSecret } = response;
      console.log(subscriptionId, clientSecret);
      dispatch(setSubscriptionData({ subscriptionId, clientSecret }));
      Cookies.set("subscriptionId", subscriptionId);
      dispatch(setShowSubscribe(true));
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
  return { loading, subscriptionStatus, showSubscribe, createSubscription };
}

export default usePlan;
