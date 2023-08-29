import { Formik } from "formik";
import styled from "styled-components";

import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { apiTrial } from "../services/apiTrial";

function EmailForm() {
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
          await apiTrial(values.email);
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
                variant="subscribe"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <Button
                variant="subscribe"
                type="submit"
                width="200px"
                disabled={isSubmitting}
              >
                Free Trial
              </Button>
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
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  color: var(--red-color);
  font-weight: bold;
`;
