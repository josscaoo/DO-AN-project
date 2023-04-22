import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  reviews: [],
  checkout: [],
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.cartItems = action.payload;
    },

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
    addProducts: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartProducts.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartProducts.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });

        axios.post("http://localhost:3001/cartProducts", {
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

        axios.put(`http://localhost:3001/cartProducts/${existingItem.id}`, {
          ...existingItem,
        });
      }

      state.totalAmount = state.cartProducts.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        // Cập nhật trạng thái sản phẩm thành "đang bị xóa"
        existingItem.isDeleting = true;

        // Gửi yêu cầu PUT để cập nhật trạng thái sản phẩm trên server
        axios.put(`http://localhost:3001/cartItems/${existingItem.id}`, {
          ...existingItem,
        });

        // Xóa sản phẩm khỏi giỏ hàng trong store Redux
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        axios.delete(`http://localhost:3001/cartItems/${existingItem.id}`);
      }
    },

    updateTotalAmount: (state) => {
      const newTotalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalAmount = newTotalAmount;

      // cập nhật tổng giá của từng mặt hàng trong giỏ hàng trên máy chủ
      state.cartItems.forEach((item) => {
        axios.put(`http://localhost:3001/cartItems/${item.id}`, {
          ...item,
        });
      });
    },

    decrementItem: (state, action) => {
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

      axios
        .post(`http://localhost:3001/reviews`, action.payload)
        .then((response) => {
          state.reviews.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteReview: (state, action) => {
      const id = action.payload;
      const reviewIndex = state.reviews.findIndex((review) => review.id === id);
      const newReview = action.payload;
      const productId = newReview.productId;

      if (reviewIndex !== -1) {
        const existingItem = state.reviews[reviewIndex];
        state.reviews.splice(reviewIndex, 1);

        axios
          .delete(
            `http://localhost:3001/products/${productId}/reviews/${existingItem.id}`
          )
          .then(() => {
            console.log("Đã xóa");
          })
          .catch((error) => {
            console.log(error);
            state.reviews.splice(reviewIndex, 0, existingItem); // rollback if delete fails
          });
      }
    },

    editReview: (state, action) => {
      const reviewIndex = state.reviews.findIndex(
        (review) => review.id === action.payload.id
      );
      if (reviewIndex !== -1) {
        state.reviews[reviewIndex] = action.payload;

        axios
          .put(
            `http://localhost:3001/reviews/${action.payload.id}`,
            action.payload
          )
          .then((response) => {
            state.reviews[reviewIndex] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
