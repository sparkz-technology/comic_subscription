import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Button from "../ui/Button";
import { PostVerifyResetToken } from "../services/apiSubscription";
import { setActiveComponent, setToken } from "../AuthSlice";

const validationSchema = Yup.object().shape({
  code1: Yup.string().required("Required"),
  code2: Yup.string().required("Required"),
  code3: Yup.string().required("Required"),
  code4: Yup.string().required("Required"),
  code5: Yup.string().required("Required"),
  code6: Yup.string().required("Required"),
});

const CodeVerification = () => {
  const initialValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    // Handle form submission here
    console.log(values);
    const code = Object.values(values).join("");
    console.log(code);
    const data = { email, code };
    const responce = await PostVerifyResetToken(data);
    if (!responce) return;
    dispatch(setToken(responce.token));
    dispatch(setActiveComponent("C"));
  };

  const handleInputChange = (e, fieldName, formik) => {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);

    // Focus on the next input field if a single character is entered
    if (value.length === 1 && fieldName !== "code6") {
      const nextFieldName = `code${parseInt(fieldName.slice(-1)) + 1}`;
      document.getElementById(nextFieldName).focus();
    }

    // Move focus to the previous input field when backspace is pressed
    if (value.length === 0 && fieldName !== "code1") {
      const prevFieldName = `code${parseInt(fieldName.slice(-1)) - 1}`;
      document.getElementById(prevFieldName).focus();
    }
  };
  const [seconds, setSeconds] = useState(300);
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    if (seconds === 0) {
      dispatch(setActiveComponent("A"));
      toast.error("Timeout ");
    }

    return () => clearTimeout(timer);
  }, [seconds, dispatch]);
  function formateTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
  return (
    <StyledCodeVerification>
      <h1>Code Verification</h1>
      <p>Please enter the code sent to your email</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="verification-code">
              <CodeInputContainer>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <StyledField
                    key={i}
                    type="text"
                    name={`code${i}`}
                    maxLength="1"
                    id={`code${i}`}
                    onInput={(e) => handleInputChange(e, `code${i}`, formik)}
                    className={`code-input ${
                      formik.touched[`code${i}`] &&
                      formik.errors[`code${i}`] &&
                      "error"
                    }`}
                  />
                ))}
              </CodeInputContainer>
              {<Timer> {formateTime(seconds)}</Timer>}
              <Button type="submit" className="verify-button">
                Verify
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </StyledCodeVerification>
  );
};

export default CodeVerification;
const StyledField = styled(Field)`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  font-size: 20px;
  text-align: center;
  margin: 0 10px;
  gap: 10px;
  &.error {
    border: 1px solid red;
  }
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    gap: 0px;
    margin: 0px;
  }
`;
const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 10px;
`;
const StyledCodeVerification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;
const Timer = styled.div`
  font-size: 15px;
  margin-bottom: 30px;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  width: 40px;
  text-align: center;

  border: 2px solid #d6d6d6;
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 10px;
    padding: 5px 10px;
    width: 30px;
  }
`;
