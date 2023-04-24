import { logout } from "../../redux/auth/authSlice";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo-01.png";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Banner/Banner";
import axios from "axios";

import {
  Actions,
  Auth,
  Badge,
  Cart,
  Container,
  Hyper,
  Icons,
  Login,
  Logo,
  Main,
  Mobile,
  Name,
  Navigation,
  Register,
} from "./Style";
import { cartActions } from "../../redux/slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/cartItems?user_id=" +
            localStorage.getItem("user_id")
        );
        dispatch(cartActions.setItem(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [dispatch]);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cartItems");
        const total = response.data.reduce(
          (acc, product) => acc + (product.quantity || 0),
          0
        );
        setTotalQuantity(total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalQuantity();
  }, []);

  const navigate = useNavigate();

  const navigateToShop = () => navigate("/shop");
  const navigateToCart = () => navigate("/cart");
  const navigateToHome = () => navigate("/");
  const navigateToUser = () => navigate("/user");
  const navigateToOrder = () => navigate("/order");

  const handleClick = () => dispatch(logout());

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.name);

  return (
    <Container>
      <Banner />

      <Main>
        <Logo onClick={navigateToHome}>
          <img src={logo} alt="logo" />
          <div>
            <h1 className="logo__text">HienMobi</h1>
          </div>
        </Logo>

        <Navigation>
          <Hyper onClick={navigateToHome}>Trang Chủ</Hyper>
          <Hyper onClick={navigateToShop}>Cửa Hàng</Hyper>
          <Hyper onClick={navigateToCart}>Giỏ Hàng</Hyper>
        </Navigation>

        <Icons>
          <Actions>
            {isLoggedIn ? (
              <div>
                <Name className="d-flex">
                  <h4 onClick={navigateToUser}>{name}</h4>
                  <i className="ri-user-3-fill" onClick={handleToggleMenu}></i>
                </Name>

                {isOpen && (
                  <UserMenu
                    handleLogout={handleClick}
                    navigateToUser={navigateToUser}
                    navigateToOrder={navigateToOrder}
                  />
                )}
              </div>
            ) : (
              <Auth>
                <Register>
                  <Link to="/register" className="register">
                    Đăng kí
                  </Link>
                </Register>
                <Login>
                  <Link to="/login" className="login">
                    Đăng nhập
                  </Link>
                </Login>
              </Auth>
            )}
          </Actions>

          <Cart onClick={navigateToCart}>
            <i className="ri-shopping-bag-line"></i>
            <Badge>{totalQuantity}</Badge>
          </Cart>
          <Mobile onClick={navigateToCart}>
            <i className="ri-menu-line"></i>
          </Mobile>
        </Icons>
      </Main>
    </Container>
  );
};
const UserMenu = ({ handleLogout }) => {
  const navigate = useNavigate();
  const navigateToUser = () => navigate("/user");
  const navigateToOrder = () => navigate("/order");

  return (
    <ul className="menu__user-list">
      <li onClick={handleLogout}>Đăng Xuất</li>
      <li onClick={navigateToUser}>Trang cá nhân</li>
      <li onClick={navigateToOrder}>Tra cứu đơn hàng</li>
    </ul>
  );
};


export default Header;
