import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: auto;
  width: 50%;
  height: 35px;
  @media (max-width: 1024px) {
    height: 15px;
  }
`;

const ListMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 270px;
  display: flex;
  li {
    display: flex;
    padding: 5px;
    font-size: 13px;
    font-weight: 500;
    padding-bottom: 7px;
  }
  li:hover {
    color: red;
  }
  li:last-child {
    border-bottom: none;
  }
  @media (max-width: 1024px) {
    margin-top: 15px;
  }
`;

const ListPhone = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 50%;
  text-align: center;
  span {
    font-weight: 600;
  }
`;


const Navar = () => {
  const [showPhone, setShowPhone] = useState({});

  const navigateTo = {
    iPhone: {
      "iPhone 14 Pro Max 128GB Đen": "/shop/7",
      "iPhone 14 Pro Max 128GB Vàng": "/shop/1",
      "iPhone 14 Pro Max 64GB Tím": "/shop/6",
      "iPhone X 64GB Trắng": "/shop/3",
      "iPhone 14 Pro Max 128GB Hồng": "/shop/5",
      "iPhone 11 64GB Xanh Ngọc": "/shop/2",
    },
    SamSung: {
      "Samsung Galaxy S22 Đen": "/shop/11",
      "Samsung Galaxy S22 Trắng": "/shop/12",
      "Samsung Galaxy A52 Xanh": "/shop/14",
      "Samsung Galaxy A92": "/shop/15",
      "Samsung Galaxy Note 2": "/shop/13",
    },
    Oppo: {
      "Oppo Reno6 5G (8+128GB)": "/shop/15",
      "OPPO A15 3GB 32GB": "/shop/16",
      "OPPO Reno7 5G": "/shop/17",
      "ĐIỆN THOẠI OPPO A16K": "/shop/18",
      "OPPO...": "/shop/19",
    },
    Vivo: {
      "Điện thoại Vivo Y02 2GB-32GB": "/shop/21",
      "Điện thoại Vivo T1x 4GB-64GB": "/shop/22",
      "Điện thoại Vivo Y16 4GB-128GB": "/shop/23",
      "Điện thoại Vivo Y16 4GB-64GB": "/shop/24",
    },
  };

  const handleMouseEnter = (name) => {
    setShowPhone((prevState) => ({ ...prevState, [name]: true }));
  };

  const handleMouseLeave = (name) => {
    setShowPhone((prevState) => ({ ...prevState, [name]: false }));
  };

  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Container>
      {Object.keys(navigateTo).map((brand) => (
        <ListPhone
          key={brand}
          onMouseEnter={() => handleMouseEnter(brand)}
          onMouseLeave={() => handleMouseLeave(brand)}
        >
          <span>{brand}</span>
          {showPhone[brand] && (
            <ListMenu>
              <ul>
                {Object.keys(navigateTo[brand]).map((item) => (
                  <li
                    key={item}
                    onClick={() => handleClick(navigateTo[brand][item])}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ListMenu>
          )}
        </ListPhone>
      ))}
    </Container>
  );
};

export default Navar;
