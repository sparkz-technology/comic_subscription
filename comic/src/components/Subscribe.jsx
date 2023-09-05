import { CardElement } from "@stripe/react-stripe-js";
import { Formik, Form, ErrorMessage } from "formik";
import styled from "styled-components";

import { FieldInput } from "../ui/Input";
import { Button } from "../ui/Button";
import MiniLoader from "../ui/MiniLoader";
import useSubscribe from "../hooks/useSubscribe";

const Subscribe = () => {
  const { handleSubmit, validationSchema, loading } = useSubscribe();
  return (
    <StyledSubscribe>
      <h1>Subscribe</h1>
      <p> Unlock Limitless Adventures: Subscribe Now!</p>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <FieldInput
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            disabled={loading}
          />
          <Gap>
            <ErrorContainer name="name" component="div" className="error" />
          </Gap>

          <StyledCardElement />

          <Button
            variant="subscribe"
            width="200px"
            type="submit"
            disabled={loading}
          >
            {loading ? <MiniLoader /> : "Subscribe"}
          </Button>
        </StyledForm>
      </Formik>
    </StyledSubscribe>
  );
};

export default Subscribe;

const Gap = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledSubscribe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

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
  align-items: start;
  .error {
    position: absolute;
    top: 2px;
    color: red;
    font-size: 0.8rem;
    text-align: left;
  }
  input {
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
