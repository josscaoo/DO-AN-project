import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    email: "",
    password: "",
    name: "",
    error: "",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      state.error = "";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.password = "";
      state.name = "";
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setEmail, setPassword, setName, setError } =
  authSlice.actions;

export const register = (email, password, name) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/users", {
      email,
      password,
      name,
    });
    const user = response.data;
    dispatch(setEmail(user.email));
    dispatch(setPassword(user.password));
    dispatch(setName(user.name));
  } catch (error) {
    dispatch(setError("Đăng ký không thành công"));
  }
};

export const authenticate = (email, password) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users?email=${email}&password=${password}`
    );
    const user = response.data[0];
    if (user) {
      dispatch(setEmail(user.email));
      dispatch(setPassword(user.password));
      dispatch(setName(user.name));
      dispatch(login());
    } else {
      dispatch(setError("Kiểm tra lại mật khẩu hoặc Email"));
    }
  } catch (error) {
    dispatch(setError("Đăng nhập không thành công"));
  }
};

export default authSlice.reducer;
