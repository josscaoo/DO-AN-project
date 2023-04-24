import React, { useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
// import products from "../../../assets/data/products";
import ListSale from "../../components/UI/Sale/ListSale";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 26rem;
  display: flex;
  overflow: hidden;
  padding-top: 10px;
  line-height: 10px;
  @media (max-width: 768px) {
    margin-top: -8px;
  }
`;
const Main = styled.div`
  border-radius: 5px;
  background-color: #bd0a0a;
  overflow: hidden;
  height: 24.5rem;
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 10px;
    margin-top: -10px;
    margin-bottom: -10px;
  }
  @media (max-width: 1024px) {
    margin: 5px;
  }
`;
const Title = styled.h1`
  padding-top: 20px;
  padding-bottom: 10px;
  text-shadow: 2px 2px 5px red;
  color: yellow;
  font-size: 20px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const Images = styled.div`
  width: 100%;
  height: 16rem;
  display: flex;
  position: relative;
  /* overflow: hidden; */
  padding-left: 5px;

  @media (max-width: 768px) {
    margin-top: -13px;
  }
`;

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  background-color: #cec9c9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 20rem;
  display: flex;
  transition: all 0.8s ease;
  transform: translateX(${(props) => props.slideIndex * -14.9}vw);
  padding: 2px;
`;
const Slide = styled.div`
  width: 123vw;
  display: flex;
  align-items: center;
`;


const SaleDays = () => {
  const [iphoneProducts, setIphoneProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: products } = await axios.get(
        "http://localhost:3001/products"
      );
      const filteredIphoneProducts = products.filter(
        (item) => item.category === "iphone"
      );
      setIphoneProducts(filteredIphoneProducts);
    };

    fetchData();
  }, []);


  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 5);
    } else {
      setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
    }
  };

  const [intervalId, setIntervalId] = useState(null);

  const handleAutoSlide = () => {
    setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
  };

  useEffect(() => {
    const id = setInterval(() => {
      handleAutoSlide();
    }, 3000); // thay đổi thời gian slide tự chạy tại đây
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, [slideIndex]);
  return (
    <Container>
      <Main>
        <Title>SĂN SALE GIÁ SỐC MỖI NGÀY</Title>

        <Images>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <LeftOutlined />
          </Arrow>

          <Wrapper slideIndex={slideIndex}>
            <Slide>
              <ListSale data={iphoneProducts} />
            </Slide>
          </Wrapper>

          <Arrow direction="right" onClick={() => handleClick("right")}>
            <RightOutlined />
          </Arrow>
        </Images>
      </Main>
    </Container>
  );
};

export default SaleDays;
