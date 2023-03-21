import React, { useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import products from "../../assets/data/products";
import ListSale from "../../components/UI/Sale/ListSale";

const Container = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  overflow: hidden;
  padding-top: 10px;
  background-color: rgba(245, 231, 231, 0.5);
  line-height: 10px;

  @media (max-width: 768px) {
    margin-top: -8px;
    margin-bottom: -10px;
  }
  
`;
const Main = styled.div`
  margin-left: 145px;
  margin-right: 110px;
  border-radius: 5px;
  background-color: #bd0a0a;
  overflow: hidden;
  height: 24rem;
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
  padding-top: 25px;
  text-shadow: 2px 2px 5px red;
  color: yellow;
  font-size: 30px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Images = styled.div`
  width: 100%;
  height: 16rem;
  display: flex;
  position: relative;
  overflow: hidden;

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
  height: 100%;
  display: flex;
  transition: all 0.8s ease;
  transform: translateX(${(props) => props.slideIndex * -10.3}vw);
  padding: 2px;
`;
const Slide = styled.div`
  width: 123vw;
  display: flex;
  align-items: center;
`;

const SaleDays = () => {
  const [bestSalesProducts, setBestSalesProducts] = useState([]);

  useEffect(() => {
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "iphone"
    );
    setBestSalesProducts(filteredBestSalesProducts);
  }, []);

  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
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
              <ListSale data={bestSalesProducts} />
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
