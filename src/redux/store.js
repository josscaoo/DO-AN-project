import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cartSlice from "./slices/cartSlice";
import thunk from "redux-thunk";


const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;
