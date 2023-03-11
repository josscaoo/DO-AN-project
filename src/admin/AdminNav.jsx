import React from 'react';
import { Container, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";

import { NavLink } from "react-router-dom";

const admin__nav = [
  {
    display: "Trang của tôi",
    path: "/dashboard",
  },
  {
    display: "Tất cả sản phẩm",
    path: "/dashboard/all-products",
  },
  {
    display: "Đơn đặt hàng",
    path: "/dashboard/order",
  },
  {
    display: "Người dùng",
    path: "/dashboard/users",
  },
  {
    display: "thêm sản phẩm",
    path: "/dashboard/add-product",
  },
];

const AdminNav = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>Shop Mart</h2>
              </div>
              <div className="search__box">
                <input type="text" placeholder="Tìm kiếm.........." />
                <div className="admin__nav-top-right">
                  <span>
                    <i class="ri-notification-3-line"></i>
                  </span>

                  <span>
                    <i class="ri-settings-3-line"></i>
                  </span>
                </div>
                <div className="admin__avatar">
                  <img
                    src={currentUser && currentUser.photoURL}
                    alt=""
                    onClick={navigateToHome}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AdminNav
