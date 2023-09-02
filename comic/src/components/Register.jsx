/* eslint-disable react/prop-types */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { ErrorMessage } from "formik";

import { CreateCustomer } from "../services/apiSubscription";
import {
  Container,
  InputContainer,
  StyledForm,
  FormContainer,
  NavigationContainer,
  NavigateBtn,
  Row,
  ErrorContainer,
  ToggleContainer,
  ToggleButton,
  VisibleIcon,
  InvisibleIcon,
} from "../styles/Form";
import Button from "../ui/Button";
import { FieldInput } from "../ui/Input";
import { useState } from "react";
import MiniLoader from "../ui/MiniLoader";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character"
    )
    .min(8, "Password must be at least 8 characters"),
});
const Register = ({ toggleShow }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const responce = await CreateCustomer(values.email, values.password);
      setLoading(false);
      if (!responce) return;
      const { customer } = responce;
      Cookies.set("customer", customer.id);
      toggleShow();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <StyledForm>
        <FormContainer>
          <h1>Register</h1>
          <p>Unlimited comics, stories and more. Cancel anytime.</p>
          <Container>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <InputContainer>
                  <Row>
                    <FieldInput
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      disabled={loading}
                    />
                    <ErrorContainer>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </ErrorContainer>
                  </Row>
                  <Row>
                    <ToggleContainer>
                      <FieldInput
                        type={isVisible ? "password" : "text"}
                        id="password"
                        name="password"
                        placeholder="password"
                        disabled={loading}
                      />
                      <ToggleButton
                        type="button"
                        onClick={() => toggleVisibility()}
                      >
                        {isVisible ? <InvisibleIcon /> : <VisibleIcon />}
                      </ToggleButton>
                    </ToggleContainer>
                    <ErrorContainer>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </ErrorContainer>
                  </Row>
                  <NavigationContainer>
                    <NavigateBtn onClick={toggleShow} type="button">
                      Already have an account ?
                    </NavigateBtn>
                  </NavigationContainer>
                  <Row>
                    <Button
                      variant="subscribe"
                      width="100px"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <MiniLoader /> : " Register"}
                    </Button>
                  </Row>
                </InputContainer>
              </Form>
            </Formik>
          </Container>
        </FormContainer>
      </StyledForm>
    </>
  );
};

export default Register;
