/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import MiniLoader from "../ui/MiniLoader";
import Button from "../ui/Button";
import { FieldInput } from "../ui/Input";
import { PostPaswordReset } from "../services/apiSubscription";
import { setActiveComponent, setEmail } from "../AuthSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  async function handleSubmit(values) {
    setLoading(true);
    console.log(values);
    const response = await PostPaswordReset(values.email);
    setLoading(false);
    if (!response) return;
    dispatch(setActiveComponent("B"));
    dispatch(setEmail(values.email));
    console.log(response);
  }
  return (
    <StyledForgotPassword>
      <h1>Forgot Password ?</h1>
      <p>
        Enter the email address you used when you joined and we’ll
        <br /> send you instructions to reset your password.
      </p>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <Row>
              <FieldInput name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <Error>{errors.email}</Error>
              ) : (
                " "
              )}
            </Row>
            <br />
            <br />
            <Row>
              <Button type="submit" disabled={loading}>
                {loading ? <MiniLoader /> : "Send verification code"}
              </Button>
            </Row>
          </StyledForm>
        )}
      </Formik>
    </StyledForgotPassword>
  );
}

export default ForgotPassword;

const StyledForgotPassword = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 300px;
  border-radius: 5px;
  padding: 1rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: start;
  }
`;
const Error = styled.div`
  position: absolute;
  color: var(--red-color);
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
const StyledForm = styled(Form)`
  width: 100%;
  box-sizing: border-box;
`;
const Row = styled.div`
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
`;
