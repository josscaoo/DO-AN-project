import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #fff;
  margin: 3px;
  border-radius: 10px;
  width: 240px;
  padding: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 300px;
  }
  @media (max-width: 425px) {
    height: 280px;
    width: 100%;
    padding: 10px;
  }
`;
const Images = styled.div`
  width: 180px;
  height: 200px;
  img {
    padding-top: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 768px) {
    }
    @media (max-width: 425px) {
      width: 100%;
      height: 220px;
    }
  }
`;
const Info = styled.div`
  padding-top: 20px;
  span {
    font-size: 10px;
  }
  h5 {
    font-size: 12px;
    color: var(--primary-color);
    font-weight: 600;
    margin-top: 1px;
    a {
      @media (max-width: 992px) {
        font-size: 1rem;
      }
      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
      @media (max-width: 425px) {
        margin-top: 5px;
        font-size: 0.8rem;
        h5 {
          font-size: 1rem;
          margin-top: 10px;
        }
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
      @media (max-width: 425px) {
        font-size: 0.8rem;
      }
    }
    @media (max-width: 425px) {
      margin-top: 5px;
    }
  }
`;


const CardSale = ({ item }) => {


  return (

      <Container>
            <Images>
              <Link to={`/shop/${item.id}`}>
                <motion.img
                  whileHover={{ scale: 0.9 }}
                  src={item.imgUrl}
                  alt=""
                />
              </Link>
            </Images>

            <Info>
              <h5>
                <Link to={`/shop/${item.id}`}>{item.productName}</Link>
              </h5>

              <span>{item.category}</span>
            </Info>

            <Bottom>
              <span>
                {item.price.toLocaleString("vi-VN")}VND
              </span>
            </Bottom>
      </Container>

  );
};

export default CardSale;
