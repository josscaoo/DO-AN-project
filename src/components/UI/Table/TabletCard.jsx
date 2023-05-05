import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  /* border: 1px solid rgba(83, 78, 78, 0.667); */
  background-color: #fff;
  height: 15rem;
  width: 174px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    box-shadow: 0 0 10px 5px rgba(181, 117, 126, 0.821);
    border-color: rgba(180, 158, 48, 0.2);
  }
  @media (max-width: 768px) {
    height: 260px;
  }
`;
const Images = styled.div`
  width: 140px;
  height: 160px;
  img {
    padding-top: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Info = styled.div`
  padding-top: 15px;

  span {
    background-color: antiquewhite;
    border-radius: 3px;
    font-size: 10px;
  }
  h5 {
    font-size: 12px;
    color: var(--primary-color);
    font-weight: 600;
    margin-top: 1px;
    a {
      @media (max-width: 992px) {
        font-size: 1.1rem;
      }
      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
    }
  }
  a:hover {
    color: #bd0a0a;
    background-color: white;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  span {
    color: #bd0a0a;
    font-size: 10px;
    font-weight: 700;

    i {
      font-size: 10px;
      padding: 5px;
      background: var(--primary-color);
      color: #d6bbbb;
      border-radius: 50px;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;

const TabletCard = ({ item }) => {
  return (
    <Container>
      <Images>
        <Link to={`/shop/${item.id}`}>
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </Link>
      </Images>

      <Info>
        <h5>
          <Link to={`/shop/${item.id}`}>{item.productName}</Link>
        </h5>

        <span>{item.category}</span>
      </Info>

      <Bottom>
        <span>{item.price.toLocaleString("vi-VN")}VND</span>
      </Bottom>
    </Container>
  );
};

export default TabletCard;
