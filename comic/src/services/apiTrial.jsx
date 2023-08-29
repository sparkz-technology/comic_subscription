import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8000/api";
export const apiTrial = async (email) => {
  try {
    const response = await axios.post(API_URL + "/user", {
      email: email,
    });
    const data = response.data;
    toast.success(data.message);
    return response;
  } catch (error) {
    toast.error(
      error.response.data["data"][0]["msg"] ||
        error.response.data.message ||
        error.message
    );
  }
};
