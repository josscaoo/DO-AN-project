import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/checkoutSlice";


import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    order: orderReducer,
  },
});

export default store;