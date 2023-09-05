import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

import { PostVerifyResetToken } from "../services/apiSubscription";
import { setActiveComponent, setToken } from "../AuthSlice";

function useCodeverification() {
  const validationSchema = Yup.object().shape({
    code1: Yup.string().required("Required"),
    code2: Yup.string().required("Required"),
    code3: Yup.string().required("Required"),
    code4: Yup.string().required("Required"),
    code5: Yup.string().required("Required"),
    code6: Yup.string().required("Required"),
  });
  const [loading, setLoading] = useState(false);
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

  const [seconds, setSeconds] = useState(300);

  const handleSubmit = async (values) => {
    // Handle form submission here
    console.log(values);

    const code = Object.values(values).join("");
    console.log(code);
    const data = { email, code };
    setLoading(true);
    const response = await PostVerifyResetToken(data);
    setLoading(false);
    if (!response) return;
    dispatch(setToken(response.token));
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

  // Create a memoized function using useCallback
  const updateSeconds = useCallback(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    }
    if (seconds === 0) {
      dispatch(setActiveComponent("A"));
      toast.error("Timeout");
    }

    return () => clearTimeout(timer);
  }, [seconds, dispatch]);

  // Use the memoized function in useEffect
  useEffect(() => {
    updateSeconds(); // Call the function initially
  }, [updateSeconds]);

  function formateTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }
  return {
    validationSchema,
    initialValues,
    handleSubmit,
    handleInputChange,
    loading,
    seconds,
    formateTime,
  };
}

export default useCodeverification;
