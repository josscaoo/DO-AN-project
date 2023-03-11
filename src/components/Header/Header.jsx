import React, {useRef, useEffect} from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css';

import { motion } from 'framer-motion';

import logo from '../../assets/images/logo-01.png';
import userIcon from '../../assets/images/user-icon.png';
import { useSelector } from 'react-redux';
import useAuth from "../../custom-hooks/useAuth";

import { signOut } from "firebase/auth";
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import sale from '../../assets/images/sale-01.webp'

const nav__links = [
  {
    path: "home",
    display: "Trang Chủ",
  },
  {
    path: "shop",
    display: "Cửa Hàng",
  },
  {
    path: "cart",
    display: "Giỏ Hàng",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  //chua xong
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // const stickyHeaderFunc = () => {
  //   window.addEventListener('scroll', () => {
  //     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
  //       headerRef.current.classList.add("sticky__header")
  //     } else {
  //       headerRef.current.classList.remove('sticky__header')
  //     }
  //   });
  // };

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Đăng xuất thành công');
      navigate('/home')
    }).catch(err => {
      toast.error(err.message)
    })
  }

  // useEffect(() => {
  //   stickyHeaderFunc();

  //   return () => window.removeEventListener("scroll", stickyHeaderFunc);
  // });

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const navigateToCart = () => {
    navigate('/cart');
  };

  //chua xong
  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");
    
  return (
    <header className="header" ref={headerRef}>
        <div className="img__sale__heard">
          <img src={sale} alt="img" />
        </div>
      
        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div>
              <h1 className="logo__text">HienMobi</h1>
            </div>
          </div>

          <div className="navigation" ref={menuRef} onClick={menuToggle}>
            <form action="" className="search">
              <input
                type="search"
                placeholder="Bạn muốn tìm gì..."
                className="search__input"
              />
              <div className="search__button">
                <i class="ri-search-2-line"></i>
              </div>
            </form>
            <ul className="ul_top_hyper">
              {nav__links.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__icons">
            <div className="profile">
              <motion.img
                whileTap={{ scale: 1.2 }}
                src={currentUser ? currentUser.photoURL : userIcon}
                alt=""
                onClick={toggleProfileActions}
              />
            </div>
            <span>
              <div
                className="profile__actions"
                ref={profileActionRef}
                onClick={toggleProfileActions}
              >
                {currentUser ? (
                  <span onClick={logout}>
                    Đăng xuất
                    {/* <i class="ri-shut-down-line"></i> */}
                  </span>
                ) : (
                  <div className="d-flex  ">
                    <div className="icon_sig">
                      <Link to="/signup" className="sig">
                        Đăng kí
                      </Link>
                    </div>
                    <div className="icon_log">
                      <Link to="/login" className="log">
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </span>

            <span className="cart__icon" onClick={navigateToCart}>
              <i class="ri-shopping-bag-line"></i>
              <span className="badge">{totalQuantity}</span>
            </span>
            <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </div>
      
    </header>
  );
}

export default Header