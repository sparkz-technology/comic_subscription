import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

import { setShowSubscribe, setSubscriptionStatus } from "../SubscribeSlice";

function useSubscribe() {
  const navigate = useNavigate(); // Fix the function name here
  const dispatch = useDispatch();
  const clientSecret = useSelector((state) => state.subscribe.clientSecret);
  const [paymentIntent, setPaymentIntent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paymentIntent && paymentIntent.status === "succeeded") {
      dispatch(setShowSubscribe(false));
      dispatch(setSubscriptionStatus("active"));

      console.log("paymentIntent", paymentIntent);
    }
  }, [paymentIntent, dispatch, navigate]);

  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    return null; // You can return an empty component here if needed
  }

  const handleSubmit = async (value) => {
    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: value.name,
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setPaymentIntent(paymentIntent);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
  return { handleSubmit, validationSchema, loading };
}

export default useSubscribe;
