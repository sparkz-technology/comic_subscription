import { toast } from "react-hot-toast";
import Axios from "axios";

export const SubscriptionCancel = async (subscriptionId) => {
  console.log(subscriptionId);

  try {
    const response = await fetch(
      "http://localhost:8000/subscription/cancel-subscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      }
    );
    const data = await response.json();
    console.log(data, "cancel subscription");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetSubscription = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/subscription/get-subscription",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const priceId = "price_1NiuaMSGCEU7P6TIP17bP56L";
export const CreateSubscription = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/subscription/create-subscription",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const RetrieveCustomer = async (email, password) => {
  try {
    const response = await Axios.post(
      "http://localhost:8000/subscription/retrieve-customer",
      {
        email: email,
        password: password,
      }
    );
    const data = await response.data;

    toast.success("Customer login successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    // toast.error(
    //   error.response.data.data[0].msg ||
    //     error.message ||
    //     error.response.data.message
    // );
  }
};
export const CreateCustomer = async (email, password) => {
  try {
    // const response = await fetch(
    //   "http://localhost:8000/subscription/create-customer",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   }
    // );
    const response = await Axios.post(
      "http://localhost:8000/subscription/create-customer",
      {
        email: email,
        password: password,
      }
    );
    const data = await response.data;

    console.log(data, "create customer");
    // toast.success(data[0].message);
    toast.success("Customer created successfully");

    return data;
  } catch (error) {
    toast.error(error.response.data.data[0].msg || error.message);
    console.log(error);
  }
};
export const GetSubscriptionDetails = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/subscription/get-subscription-details",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
