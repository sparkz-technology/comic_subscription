import { configureStore } from "@reduxjs/toolkit";

import subscribeReducer from "./SubscribeSlice";
import authReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    subscribe: subscribeReducer,
    auth: authReducer,
  },
});
export default store;
