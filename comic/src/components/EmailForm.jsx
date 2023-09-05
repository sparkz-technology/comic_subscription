import { Formik } from "formik";
import styled from "styled-components";
import { BsFillSendFill } from "react-icons/bs";
import { apiTrial } from "../services/apiTrial";
import { useState } from "react";
import MiniLoader from "../ui/MiniLoader";

function EmailForm() {
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <Formik
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          await apiTrial(values.email);
          setLoading(false);
          values.email = "";
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div>
                <Button type="submit" disabled={isSubmitting}>
                  {loading ? (
                    <LoaderContainer>
                      <MiniLoader />
                    </LoaderContainer>
                  ) : (
                    <BsFillSendFill size={20} />
                  )}
                </Button>
              </div>
            </InputContainer>
            {touched.email && errors.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default EmailForm;

const Container = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  position: relative;
  div {
    position: absolute;
    right: 1.3%;
  }
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  margin: 8px 0 0 20px;
  color: var(--red-color);
`;
const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
`;
const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 30px;
  outline: none;
  border: 2px solid var(--border-color);
  &:focus {
    border-color: #73c9bf;
  }
  &:hover {
    border-color: #73c9bf;
    box-shadow: 0px 0px 5px 0px #73c9bf;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Button = styled.button`
  height: 40px;
  width: 100px;
  text-align: center;
  border-radius: 30px;
  outline: none;
  border: 0px;
  background-color: #0d0c22;
  color: var(--white-color);
  &:hover {
    background-color: #565564;
  }
`;
