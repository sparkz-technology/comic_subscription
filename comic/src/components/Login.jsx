/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useState } from "react";

import { RetrieveCustomer } from "../services/apiSubscription";
import {
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
import { FieldInput } from "../ui/Input";
import { Container, InputContainer } from "../styles/Form";
import { Button } from "../ui/Button";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
function Login({ toggleShow }) {
  const navigate = useNavigate();
  async function handleSubmit(values) {
    try {
      const responce = await RetrieveCustomer(values.email, values.password);
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
    <>
      <StyledForm>
        <FormContainer>
          <h1>Login</h1>
          <p>Unlimited comics, stories and more. Cancel anytime.</p>
          <Container>
            <Formik
              initialValues={{ email: "test@test.com", password: "Sparkz@07" }}
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
                    />
                    <ErrorContainer name="email" component="div" />
                  </Row>
                  <Row>
                    <ToggleContainer>
                      <FieldInput
                        type={isVisible ? "password" : "text"}
                        id="password"
                        name="password"
                        placeholder="password"
                      />
                      <ToggleButton
                        type="button"
                        onClick={() => toggleVisibility()}
                      >
                        {isVisible ? <InvisibleIcon /> : <VisibleIcon />}
                      </ToggleButton>
                    </ToggleContainer>
                    <ErrorContainer name="password" component="div" />
                  </Row>
                  <NavigationContainer>
                    <NavigateBtn onClick={toggleShow} type="button">
                      Don't have an account?
                    </NavigateBtn>
                  </NavigationContainer>
                  <Row>
                    <Button variant="subscribe" width="100px" type="submit">
                      Login
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
}

export default Login;
