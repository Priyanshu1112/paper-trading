import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import appReducer from "./reducers/appReducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});
