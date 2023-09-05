import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../ui/Button";
import { FieldInput } from "../ui/Input";
import { PostPasswordReset } from "../services/apiSubscription";
import { setActiveComponent } from "../AuthSlice";

const validationSchema = Yup.object({
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function NewPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  async function handleSubmit(values) {
    const data = { password: values.password, token };
    console.log(data);
    const responce = await PostPasswordReset(data);
    if (!responce) return;
    dispatch(setActiveComponent("A"));
    navigate("/login");
  }
  return (
    <StyledNewPassword>
      <h1>New Password</h1>
      <p>Enter your new password to reset the old password</p>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <Row>
            <FieldInput
              name="password"
              type="password"
              placeholder="password"
            />
            <ErrorMessage name="password" className="error" component="div" />
          </Row>
          <Row>
            <FieldInput
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
            />
            <ErrorMessage
              name="confirmPassword"
              className="error"
              component="div"
            />
          </Row>
          <br />
          <Button type="submit">Change password</Button>
        </StyledForm>
      </Formik>
    </StyledNewPassword>
  );
}

export default NewPassword;
const StyledNewPassword = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 400px;
  width: 400px;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  & .error {
    position: absolute;
    top: 90%;
    color: var(--red-color);
    font-size: 0.8rem;
  }
`;
const StyledForm = styled(Form)`
  box-sizing: border-box;
  margin: 0 auto;

  width: 100%;
`;
const Row = styled.div`
  position: relative;
  width: 100%;
  font-size: 16px;
  padding: 1rem 0;
  box-sizing: border-box;
  outline: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
