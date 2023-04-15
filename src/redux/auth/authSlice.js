import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getInitialUserState = () => {
  if (localStorage.getItem("isLoggedIn") === "1") {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(userData);
    }
  }
  return {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    error: "",
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "1" ? true : false,
    ...getInitialUserState(),
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("user_id", action.payload.id);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: action.payload.email,
          password: action.payload.password,
          name: action.payload.name,
          phone: action.payload.phone,
          address: action.payload.address,
          error: "",
        })
      );
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user_id");
      localStorage.removeItem("userData");
      state.email = "";
      state.password = "";
      state.name = "";
      state.phone = "";
      state.address = "";
      state.error = "";
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
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});


export const {
  login,
  logout,
  setEmail,
  setPassword,
  setName,
  setError,
  setPhone,
  setAddress,
} = authSlice.actions;

export const register = (email, password, name, phone, address) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/users", {
      email,
      password,
      name,
      phone,
      address,
    });
    const user = response.data;
    dispatch(setEmail(user.email));
    dispatch(setPassword(user.password));
    dispatch(setName(user.name));
     dispatch(setPhone(user.phone));
     dispatch(setAddress(user.address));
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
       dispatch(setPhone(user.phone));
       dispatch(setAddress(user.address));
      dispatch(login(user));
    } else {
      dispatch(setError("Kiểm tra lại mật khẩu hoặc Email"));
    }
  } catch (error) {
    dispatch(setError("Đăng nhập không thành công"));
  }
};

export default authSlice.reducer;
