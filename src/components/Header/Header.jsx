import { logout } from "../../redux/auth/authSlice";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo-01.png";
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
    axios
      .get(
        "http://localhost:3001/cartItems?user_id=" +
          localStorage.getItem("user_id")
      )
      .then((res) => dispatch(cartActions.setItem(res.data)));
  }, []);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cartItems")
      .then((response) => {
        const total = response.data.reduce(
          (acc, product) => acc + (product.quantity || 0),
          0
        );
        setTotalQuantity(total);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const navigateToShop = () => navigate("/shop");
  const navigateToCart = () => navigate("/cart");
  const navigateToHome = () => navigate("/");
  const navigateToUser = () => navigate("/user");

  const handleClick = () => dispatch(logout());

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

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
                  <i class="ri-user-3-fill" onClick={toggleMenu}></i>
                </Name>

                {isOpen && (
                  <ul className="menu__user-list">
                    <li onClick={handleClick}>Đăng Xuất</li>
                    <li onClick={navigateToUser}>Trang cá nhân</li>
                  </ul>
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
            <i class="ri-shopping-bag-line"></i>
            <Badge>{totalQuantity}</Badge>
          </Cart>
          <Mobile onClick={navigateToCart}>
            <i class="ri-menu-line"></i>
          </Mobile>
        </Icons>
      </Main>
    </Container>
  );
};

export default Header;
