import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FieldInput } from "../ui/Input";
import { Button } from "../ui/Button";
import { setShowSubscribe, setSubscriptionStatus } from "../SubscribeSlice";

const Subscribe = () => {
  const navigate = useNavigate(); // Fix the function name here
  const dispatch = useDispatch();
  const clientSecret = useSelector((state) => state.subscribe.clientSecret);
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

  const handleSubmit = async (value) => {
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
      return;
    }
    setPaymentIntent(paymentIntent);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  return (
    <>
      <h1>Subscribe</h1>
      <p> Unlock Limitless Adventures: Subscribe Now!</p>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <FieldInput type="text" id="name" name="name" placeholder="Name" />
          <ErrorContainer name="name" component="div" />

          <StyledCardElement />

          <Button variant="subscribe" width="200px" type="submit">
            Subscribe
          </Button>
        </StyledForm>
      </Formik>
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
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;
const ErrorContainer = styled(ErrorMessage)`
  color: var(--red-color);
  font-weight: bold;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 0 20px;
    height: 40px;
    width: 100%;
    min-width: 400px;
    max-width: 450px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  button {
    margin-top: 10px;
    width: 100%;
    min-width: 400px;
    max-width: 450px;

    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
`;
