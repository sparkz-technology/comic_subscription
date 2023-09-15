import { toast } from "react-hot-toast";
import Axios from "axios";
import Cookies from "js-cookie";

import config from "../config";

const priceId = config.PRICE_ID;
const API_URL = `${config.API_URL}/subscription`;
const API_URL_STRIPE = `${config.API_URL}/stripe`;

// register customer with stripe
export const CreateCustomer = async (email, password) => {
  try {
    const response = await Axios.post(`${API_URL_STRIPE}/create-customer`, {
      email: email,
      password: password,
    });
    const data = await response.data;
    toast.success("Customer created successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.data[0].msg || error.message);
  }
};
// login customer with stripe
export const RetrieveCustomer = async (email, password) => {
  try {
    const response = await Axios.post(`${API_URL_STRIPE}/retrieve-customer`, {
      email: email,
      password: password,
    });
    const data = await response.data;

    toast.success("Login successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  }
};
// create subscription with stripe
export const CreateSubscription = async () => {
  try {
    const response = await Axios.post(
      `${API_URL}/create-subscription`,
      {
        priceId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true, // Include cookies in the request
      }
    );
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// cancel subscription with stripe
export const SubscriptionCancel = async (subscriptionId) => {
  console.log(subscriptionId);

  try {
    const response = await Axios.post(
      `${API_URL}/cancel-subscription`,
      {
        subscriptionId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true, // Include cookies in the request
      }
    );
    const data = await response.data;
    console.log(data, "cancel subscription");
    toast.success("Subscription cancelled successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
// get subscription details with stripe
export const GetSubscriptionDetails = async () => {
  try {
    const response = await Axios.get(`${API_URL}/get-subscription-details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true,
    });
    const data = await response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const PostPaswordReset = async (email) => {
  try {
    const response = await Axios.post(
      `${API_URL_STRIPE}/reset-password-request`,
      {
        email,
      }
    );
    const data = await response.data;
    toast.success(data.message);

    return data;
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  }
};
// "/verify-reset-token/:verifyToken",
// subscriptionController.postVerifyResetToken
// );
// router.post("/reset-password", subscriptionController.postPasswordReset);
export const PostVerifyResetToken = async (data) => {
  const { code, email } = data;
  console.log(code, email);
  console.log(data);
  try {
    const response = await Axios.post(
      `${API_URL_STRIPE}/verify-reset-token/${code}`,
      {
        email,
      }
    );
    const data = await response.data;
    toast.success(data.message);
    return data;
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  }
};
export const PostPasswordReset = async (data) => {
  const { password, token } = data;
  console.log(data);
  try {
    const response = await Axios.post(`${API_URL_STRIPE}/reset-password`, {
      password,
      token,
    });
    const data = await response.data;
    toast.success(data.message);

    return data;
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  }
};
