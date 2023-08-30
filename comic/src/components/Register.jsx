/* eslint-disable react/prop-types */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

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
} from "../styles/Form";
import Button from "../ui/Button";
import { FieldInput } from "../ui/Input";

const Register = ({ toggleShow }) => {
  const handleSubmit = async (values) => {
    try {
      const responce = await CreateCustomer(values.email, values.password);
      if (!responce) return;

      const { customer } = responce;
      Cookies.set("customer", customer.id);
      toggleShow();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

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
                    />
                    <ErrorContainer name="email" component="div" />
                  </Row>
                  <Row>
                    <FieldInput
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                    />
                    <ErrorContainer name="password" component="div" />
                  </Row>
                  <NavigationContainer>
                    <NavigateBtn onClick={toggleShow} type="button">
                      Already have an account ?
                    </NavigateBtn>
                  </NavigationContainer>
                  <Row>
                    <Button variant="subscribe" width="100px" type="submit">
                      Register
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
