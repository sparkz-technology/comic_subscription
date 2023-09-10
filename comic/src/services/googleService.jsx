import axios from "axios";

export async function authenticateWithGoogle(access_token) {
  console.log(access_token);
  try {
    const response = await axios.post("http://localhost:8000/auth/google", {
      accessToken: access_token,
    });

    if (response.status !== 200) {
      const errorMessage = `HTTP error! Status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}
