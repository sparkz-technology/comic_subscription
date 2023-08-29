import { configureStore } from "@reduxjs/toolkit";
import subscribeReducer from "./SubscribeSlice";

const store = configureStore({
  reducer: {
    subscribe: subscribeReducer,
  },
});
export default store;
