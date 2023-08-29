import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CreateCustomer } from "../services/apiSubscription";
import { Container, InputContainer } from "../styles/Form";
import Button from "../ui/Button";
import { FieldInput } from "../ui/Input";
import { styled } from "styled-components";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const { customer } = await CreateCustomer(values.email);
      Cookies.set("customer", customer.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <>
      <BackgroundImage />

      <Header>
        <q>
          Unleash your inner superhero and embark on a thrilling adventure of
          comics with our subscription – Join now to unlock a universe of
          captivating stories!
        </q>
      </Header>
      <StyledRegister>
        <RegisterContainer>
          <h1>Register</h1>
          <p>Unlimited comics, stories and more. Cancel anytime.</p>
          <Container>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <InputContainer>
                  <FieldInput
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />

                  <Button variant="subscribe" width="200px" type="submit">
                    Register
                  </Button>
                </InputContainer>
                <ErrorContainer name="email" component="div" />
              </Form>
            </Formik>
          </Container>
        </RegisterContainer>
      </StyledRegister>
    </>
  );
};

export default Register;

const ErrorContainer = styled(ErrorMessage)`
  margin-top: 8px;
  color: var(--red-color);
  font-weight: bold;
`;
const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
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
const RegisterContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  box-sizing: border-box;
`;
const BackgroundImage = styled.div`
  background-image: url(https://as2.ftcdn.net/v2/jpg/05/84/02/69/1000_F_584026907_ksj4Rk4TVxWhVduqBsV5QMxr4MjNqqno.jpg);
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);

  /* z-index: -1; */
`;
const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0;
  left: 0;
  height: 50vh;
  q {
    font-size: 3rem;
    margin: 0;
    font-size: 400;
    font-family: var(--font-comic);
    padding: 20px;
    color: #fff;
    text-align: center;
  }
  @media (max-width: 768px) {
    q {
      font-size: 2rem;
    }
  }
`;
