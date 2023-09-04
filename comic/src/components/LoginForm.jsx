/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useState } from "react";
import { ErrorMessage } from "formik";

import { RetrieveCustomer } from "../services/apiSubscription";
import {
  ToggleContainer,
  ToggleButton,
  VisibleIcon,
  InvisibleIcon,
} from "../styles/Form";
import { FieldInput } from "../ui/Input";
import { FormContainer } from "../ui/FormContainer";
import { StyledLink } from "../ui/StyledLink";
import MiniLoader from "../ui/MiniLoader";
import Button from "../ui/Button";
import Label from "../ui/Lable";
import HoriziondalLine from "../ui/HoriziondalLine";
import Header from "../ui/Header";
import Gap from "../ui/Gap";
import Google from "../ui/Google";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(values) {
    try {
      setLoading(true);
      const responce = await RetrieveCustomer(values.email, values.password);
      setLoading(false);
      if (!responce) return;
      const { customer, token } = responce;
      Cookies.set("customer", customer.id);
      Cookies.set("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  }
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <FormContainer>
      <Header>
        <h1>Log in to Comic World</h1>
      </Header>
      <Google>Log in with Google</Google>
      <HoriziondalLine>
        <hr />
        <span>or log in with email</span>
        <hr />
      </HoriziondalLine>
      <Formik
        initialValues={{ email: "test@gmail.com", password: "Sparkz@07" }}
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
              <StyledLink variant="withFlexEnd" to="/forgot-password">
                Forgot Password?
              </StyledLink>
            </Gap>

            <ToggleButton
              top={40}
              type="button"
              onClick={() => toggleVisibility()}
            >
              {isVisible ? <InvisibleIcon /> : <VisibleIcon />}
            </ToggleButton>
          </ToggleContainer>

          <Button type="submit" disabled={loading}>
            {loading ? <MiniLoader /> : "Login"}
          </Button>
          <StyledLink variant="withGap" to="/signup">
            Don't have an account? Sign up
          </StyledLink>
        </Form>
      </Formik>
    </FormContainer>
  );
}

export default LoginForm;
