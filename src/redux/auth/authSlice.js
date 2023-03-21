import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

export const login = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await authApi.login(formData);
    dispatch(setUser(response));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await authApi.register(formData);
    dispatch(setUser(response));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
