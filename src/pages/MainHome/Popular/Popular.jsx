import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ListPhone from "../../../components/UI/Phone/ListPhone";
// import products from "../../../assets/data/products";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 23rem;
  display: flex;
  overflow: hidden;
  padding-top: 10px;
  line-height: 10px;
  @media (max-width: 768px) {
    margin-bottom: -10px;
  }
`;
const Main = styled.div`
  border-radius: 5px;
  background-color: #bd0a0a;
  overflow: hidden;
  height: 21rem;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 2px;
    margin-top: -22px;
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
  position: relative;
  overflow: hidden;
  padding-top: 1px;
`;

const Arrow = styled.div`
  width: 40px;
  height: 40px;
  background-color: #cec9c9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "30px"};
  right: ${(props) => props.direction === "right" && "30px"};

  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -11.8}vw);
  padding: 2px;
`;
const Slide = styled.div`
  width: 123vw;
  display: flex;
  align-items: center;
`;


const Popular = () => {
  
  const [samsungProducts, setSamsungProducts] = useState([]);
  const [oppoProducts, setOppoProducts] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const { data: products } = await axios.get(
      "http://localhost:3001/products"
    );
    const filteredSamsungProducts = products.filter(
      (item) => item.category === "samsung"
    );
    const filteredOppoProducts = products.filter(
      (item) => item.category === "oppo"
    );
    setSamsungProducts(filteredSamsungProducts);
    setOppoProducts(filteredOppoProducts);
  };
  fetchData();
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
    setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
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
        <Title>CẬP NHẬT NHỮNG SẢN PHẨM MỚI NHẤT</Title>

        <Images>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <LeftOutlined />
          </Arrow>

          <Wrapper slideIndex={slideIndex}>
            <Slide>
              <ListPhone data={samsungProducts} />
              <ListPhone data={oppoProducts} />
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

export default Popular;
