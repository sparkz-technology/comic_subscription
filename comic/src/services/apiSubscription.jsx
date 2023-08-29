import { toast } from "react-hot-toast";

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

export const CreateCustomer = async (email) => {
  try {
    const response = await fetch(
      "http://localhost:8000/subscription/create-customer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const data = await response.json();
    toast.success(data.message);
    return data;
  } catch (error) {
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
