import config from "../config";
import Axios from "axios";

const API_URL = `${config.API_URL}/auth`;
export async function loginOrSignupGoogle() {
  const responce = await Axios.get(`${API_URL}/google`, {
    withCredentials: true,
  });
  const data = await responce.data;
  return data;
}
