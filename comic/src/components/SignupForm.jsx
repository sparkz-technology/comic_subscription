/* eslint-disable react/prop-types */
import { Formik, Form, ErrorMessage } from "formik";
import styled from "styled-components";

import { StyledLink } from "../ui/StyledLink";
import useSignup from "../hooks/useSignup";
import {
  ToggleContainer,
  ToggleButton,
  VisibleIcon,
  InvisibleIcon,
} from "../styles/Form";
import Button from "../ui/Button";
import { FieldInput } from "../ui/Input";
import MiniLoader from "../ui/MiniLoader";
import { FormContainer } from "../ui/FormContainer";
import Header from "../ui/Header";
import Google from "../ui/Google";
import HoriziondalLine from "../ui/HoriziondalLine";
import Label from "../ui/Lable";
import Gap from "../ui/Gap";

const SignupForm = () => {
  const {
    validationSchema,
    handleSubmit,
    loading,
    isVisible,
    toggleVisibility,
  } = useSignup();
  return (
    <FormContainer>
      <Header>
        <h1>Sign up to Comic World</h1>
      </Header>
      <Google>Sign in with Google</Google>
      <HoriziondalLine>
        <hr />
        <span>or Sign up with email</span>
        <hr />
      </HoriziondalLine>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Label htmlFor="email">Email</Label>
          <FieldInput
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            disabled={loading}
          />
          <Gap>
            <ErrorMessage name="email" component="div" className="error" />
          </Gap>
          <ToggleContainer>
            <Label htmlFor="password">Password</Label>
            <FieldInput
              type={isVisible ? "password" : "text"}
              id="password"
              name="password"
              placeholder="password"
              disabled={loading}
            />
            <Gap>
              <ErrorMessage name="password" component="div" className="error" />
            </Gap>
            <ToggleButton
              top={50}
              type="button"
              onClick={() => toggleVisibility()}
            >
              {isVisible ? <InvisibleIcon /> : <VisibleIcon />}
            </ToggleButton>
          </ToggleContainer>
          <TeamsAndConditions>
            <p>
              I agree with Comic World &apos;s Terms of Service & Privacy Policy
              by creating an account.
            </p>
          </TeamsAndConditions>
          <Button type="submit" disabled={loading}>
            {loading ? <MiniLoader /> : "Create Account"}
          </Button>
          <StyledLink variant="withGap" to="/login">
            Already have an account? Log In
          </StyledLink>
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default SignupForm;

const TeamsAndConditions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0 1rem;
  p {
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
    text-align: start;
  }
`;
