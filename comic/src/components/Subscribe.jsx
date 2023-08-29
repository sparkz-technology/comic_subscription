import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

import { setShowSubscribe, setSubscriptionStatus } from "../SubscribeSlice";

const Subscribe = () => {
  const navigate = useNavigate(); // Fix the function name here
  const dispatch = useDispatch();
  const clientSecret = useSelector((state) => state.subscribe.clientSecret);
  const [name, setName] = useState("sparky");
  const [paymentIntent, setPaymentIntent] = useState();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }
    setPaymentIntent(paymentIntent);
  };

  return (
    <>
      <h1>Subscribe</h1>
      <p> Unlock Limitless Adventures: Subscribe Now!</p>
      <Form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <StyledCardElement />

        <button>Subscribe</button>
      </Form>
    </>
  );
};

export default Subscribe;
import styled from "styled-components";

const StyledCardElement = styled(CardElement)`
  border: 1px solid #ccc;
  padding: 10px 14px;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
  min-width: 400px;
  max-width: 450px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;
const Form = styled.form`
  lable {
    display: block;
    margin-bottom: 10px;
  }
  input {
    display: block;
    width: 100%;
    min-width: 400px;
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      width: 100%;
      padding: 10px;
    }
  }
  button {
    display: block;
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: var(--red-color);
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    &:hover {
      background: var(--red-color-hover);
    }
  }
`;
