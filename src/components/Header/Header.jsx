import { logout } from "../../redux/auth/authSlice";
import React, { useEffect, useRef, useState } from "react";

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
  HeaderComponent,
  HeaderText,
  Hyper,
  Icons,
  Logins,
  Logo,
  Main,
  Mobile,
  Name,
  Navigation,
  Registers,
  StyledModal,
  Text,
} from "./Style";
import { cartActions } from "../../redux/slices/cartSlice";
import Register from "../../pages/Auth/Register";
import Login from "../../pages/Auth/Login";


const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const res = await axios.get(
          `http://localhost:3001/cartItems?userId=${userId}`
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
    const userId = localStorage.getItem("user_id");
    const fetchTotalQuantity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/cartItems?userId=${userId}`
        );
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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.name);

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start the auto-scroll interval
    intervalRef.current = setInterval(() => {
      setOffset((offset) => offset - 1);
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, []);

  const text =
    "Luôn cập nhật những sản phẩm mới nhất, đem đến sự trải nghiệm thú vị. Với ưu đãi cho học sinh sinh viên";

  useEffect(() => {
    // Reset the offset and count when count reaches 5
    if (count === 5) {
      setOffset(0);
      setCount(0);
    }
    // Update the count when offset reaches the end of the text
    if (offset === -text.length * 6) {
      setCount((count) => count + 1);
    }
  }, [offset, count, text.length]);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const showModalLogin = () => {
    setIsModalOpenLogin(true);
  };
  const handleOkLogin = () => {
    setIsModalOpenLogin(false);
  };
  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };

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
          <HeaderComponent>
            <Hyper onClick={navigateToShop}>
              <i className="ri-store-3-line"></i>
              <span>Cửa Hàng</span>
            </Hyper>
            <Hyper onClick={navigateToCart}>
              <i className="ri-shopping-bag-line"></i>
              <span>Giỏ Hàng</span>
            </Hyper>
            <Hyper onClick={navigateToOrder}>
              <i className="ri-survey-line"></i>
              <span>Tra Cứu Đơn</span>
            </Hyper>
          </HeaderComponent>
          <HeaderText>
            <Text
              style={{
                transform: `translateX(${offset}px)`,
                color: "white",
                fontSize: "11px",
              }}
            >
              {text}
            </Text>
          </HeaderText>
        </Navigation>

        <Icons>
          <Actions>
            {isLoggedIn ? (
              <div onMouseLeave={handleMouseLeave}>
                <Name className="d-flex">
                  <h4 onClick={navigateToUser}>{name}</h4>
                  <i
                    className="ri-user-3-fill"
                    onMouseEnter={handleMouseEnter}
                  ></i>
                </Name>

                {isHovering && (
                  <UserMenu
                    handleLogout={handleClick}
                    navigateToUser={navigateToUser}
                    navigateToOrder={navigateToOrder}
                  />
                )}
              </div>
            ) : (
              <Auth>
                <Registers>
                  <div onClick={showModal} className="register">
                    Đăng kí
                  </div>
                  <StyledModal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Register
                      onShowLoginModal={() => {
                        setIsModalOpen(false);
                        setIsModalOpenLogin(true);
                      }}
                    />
                  </StyledModal>
                </Registers>

                <Logins>
                  <div onClick={showModalLogin} className="login">
                    Đăng nhập
                  </div>
                  <StyledModal
                    open={isModalOpenLogin}
                    onOk={handleOkLogin}
                    onCancel={handleCancelLogin}
                  >
                    <Login
                      onShowRegisterModal={() => {
                        setIsModalOpenLogin(false);
                        setIsModalOpen(true);
                      }}
                    />
                  </StyledModal>
                </Logins>
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

  const handleLogoutAndReload = () => {
    handleLogout();
    window.location.reload();
  };
  return (
    <ul className="menu__user-list">
      <li onClick={handleLogoutAndReload}>Đăng Xuất</li>
      <li onClick={navigateToUser}>Trang cá nhân</li>
      <li onClick={navigateToOrder}>Tra cứu đơn hàng</li>
    </ul>
  );
};

export default Header;
