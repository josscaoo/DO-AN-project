// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import orderReducer from "../slices/checkoutSlice";
// import cartSlice from "../slices/cartSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"], // chỉ lưu trữ trạng thái của slice "cart" vào local storage
// };

// const persistedCartReducer = persistReducer(persistConfig, cartSlice);

// const stores = configureStore({
//   reducer: {
//     cart: persistedCartReducer,
//     order: orderReducer,
//   },
//   middleware: getDefaultMiddleware({
//     serializableCheck: false, // tránh báo lỗi khi sử dụng redux-persist
//   }),
// });

// const persistor = persistStore(stores);

// export { stores, persistor };
