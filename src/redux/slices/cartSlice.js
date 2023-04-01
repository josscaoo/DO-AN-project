import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  reviews: [],
  checkout: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });

        axios.post("http://localhost:3001/cartItems", {
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);

        axios.put(`http://localhost:3001/cartItems/${existingItem.id}`, {
          ...existingItem,
        });
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          axios.delete(`http://localhost:3001/cartItems/${existingItem.id}`);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            Number(existingItem.totalPrice) - Number(existingItem.price);

          axios.put(`http://localhost:3001/cartItems/${existingItem.id}`, {
            ...existingItem,
          });
        }
        state.totalQuantity--;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }
    },

    incrementItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(existingItem.price);

        axios.put(`http://localhost:3001/cartItems/${existingItem.id}`, {
          ...existingItem,
        });

        state.totalQuantity++;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);

      axios.post("http://localhost:3001/reviews", {
        ...action.payload,
      });
    },

    deleteReview: (state, action) => {
      const reviewId = action.payload;

      axios
        .delete(`https://localhost:3001/reviews/${reviewId}`)
        .then((response) => {
          state.reviews = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
editReview: (state, action) => {
  const { id, content } = action.payload;
  const reviewIndex = state.reviews.findIndex((review) => review.id === id);
  if (reviewIndex !== -1) {
    state.reviews[reviewIndex].content = content;
  }
},
    addCheckout: (state, action) => {
      const checkoutData = action.payload;
      axios.post('https://localhost:3001/checkout', checkoutData)
        .then(response => {
          // Request succeeded, update the state
          state.checkout.push(response.data);
        })
        .catch(error => {
          // Request failed, log the error
          console.error('Error adding checkout:', error);
        });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
