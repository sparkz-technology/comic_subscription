/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  activeComponent: "A",
  email: "",
  token: "",
  authentication: false,
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthentication: (state, action) => {
      state.authentication = action.payload;
    },
  },
});
export const { setActiveComponent, setEmail, setToken, setAuthentication } =
  AuthSlice.actions;
export default AuthSlice.reducer;
