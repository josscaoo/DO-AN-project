import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {
    addReview(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
