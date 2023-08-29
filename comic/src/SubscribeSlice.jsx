import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptionId: "",
  clientSecret: "",
  subscribtionStatus: "",
  showSubscribe: false,
};

export const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    setSubscriptionData: (state, action) => {
      state.subscriptionId = action.payload.subscriptionId;
      state.clientSecret = action.payload.clientSecret;
    },
    setSubscriptionId: (state, action) => {
      state.subscriptionId = action.payload;
    },
    setSubscriptionStatus: (state, action) => {
      state.subscribtionStatus = action.payload;
    },
    setShowSubscribe: (state, action) => {
      state.showSubscribe = action.payload;
    },
  },
});

export const {
  setSubscriptionData,
  setSubscriptionId,
  setSubscriptionStatus,
  setShowSubscribe,
} = subscribeSlice.actions;

export default subscribeSlice.reducer;
