import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import Button from "../ui/Button";
import { setActiveComponent } from "../AuthSlice";
import MiniLoader from "../ui/MiniLoader";
import useCodeverification from "../hooks/useCodeverification";
import { useDispatch } from "react-redux";

const CodeVerification = () => {
  const dispatch = useDispatch();
  const {
    validationSchema,
    handleSubmit,
    loading,
    initialValues,
    handleInputChange,
    seconds,
    formateTime,
  } = useCodeverification();
  return (
    <StyledCodeVerification>
      <h1>Code Verification</h1>
      <p>
        Please check your emails for a message with <br />
        your code. Your code is 6 digits long.
      </p>
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
              <Timer>{formateTime(seconds)}</Timer>
              <p
                className="resendCode"
                onClick={() => dispatch(setActiveComponent("A"))}
              >
                Resend Code ?
              </p>
              <Button type="submit" className="verify-button">
                {loading ? <MiniLoader /> : "Verify"}
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
  align-items: start;
  height: 400px;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  // last paragraph tag in the component only last paragraph tag in the component only

  .resendCode {
    cursor: pointer;
    text-decoration: underline;
  }
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
