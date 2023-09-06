import { loginOrSignupGoogle } from "../services/apiAuth";

function useGoogle() {
  async function Google() {
    try {
      const data = await loginOrSignupGoogle();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return { Google };
}

export default useGoogle;
