import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   name: "",
//   email: "",
//   address: "",
//     phone: "",
//   isOrdered: false,
// };

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     setName: (state, action) => {
//       state.name = action.payload;
//     },
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },
//     setAddress: (state, action) => {
//       state.address = action.payload;
//     },
//     setPhone: (state, action) => {
//       state.phone = action.payload;
//     },
//     setIsOrdered: (state, action) => {
//       state.isOrdered = action.payload;
//     },
//   },
// });

// export const { setName, setEmail, setPhone, setAddress, setIsOrdered } =
//   orderSlice.actions;

// export default orderSlice.reducer;
