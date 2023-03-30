import { logout } from "../../redux/auth/authSlice";
import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo-01.png';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../Banner/Banner';
import { Actions, Auth, Badge, Cart, Container, Hyper, Icons, Login, Logo, Main, Mobile, Navigation, Register } from './Style';





const Header = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const navigate = useNavigate();

    const navigateToShop = () => {
      navigate("/shop");
    };

  const navigateToCart = () => {
    navigate('/cart');
  };
  const navigateToHome = () => {
    navigate("/");
  };

  function handleClick() {
    dispatch(logout());
  }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
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
                <div>
                  <i class="ri-user-3-fill" onClick={toggleMenu}></i>
                  {isOpen && (
                    <ul className="menu__user-list">
                      <li onClick={handleClick}>Đăng Xuất</li>
                      <li>Trang cá nhân</li>
                    </ul>
                  )}
                </div>
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
}

export default Header