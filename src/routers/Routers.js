import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Auth/Checkout";
import Login from "../pages/Auth/Login";
// import Information from "../pages/Auth/Information";
import Register from "../pages/Auth/Register";
import ReviewForm from "../pages/ReviewForm";
import User from "../components/User/User";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />

      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route path="information" element={<Information />} /> */}
      <Route path="user" element={< User/>} />
      <Route path="reviews" element={<ReviewForm />} />
    </Routes>
  );
};

export default Routers;
