/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RetrieveCustomer } from "../services/apiSubscription";
import { Formik, Form, ErrorMessage } from "formik";
import { FieldInput } from "../ui/Input";
import { Container, InputContainer } from "../styles/Form";
import { Button } from "../ui/Button";
import styled from "styled-components";
// import { useShow } from "../hooks/useShow";
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
  // const { toggleShow } = useShow();

  return (
    <>
      <StyledLogin>
        <LoginContainer>
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
        </LoginContainer>
      </StyledLogin>
    </>
  );
}

export default Login;
const NavigationContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
const NavigateBtn = styled.button`
  border: none;
  background: none;
  color: var(--blue-color);
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  padding: 0px;
  margin: 0;
  text-decoration: underline;
  transition: all 0.3s ease-in-out;

  /* width: 100%; */
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ErrorContainer = styled(ErrorMessage)`
  margin: 1px 0px;
  color: var(--red-color);
  font-size: 0.9rem;
  box-sizing: border-box;
  width: 100%;
`;
const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  background-color: var(--white-color);
  h1 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin: 0;
  }
`;
const LoginContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  box-sizing: border-box;
`;
