import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import products from "../../assets/data/products";
import './main-product.css';
import TabletList from "../../components/Ul/TabletList";

const Container = styled.div`
  width: 100%;
  height: 19rem;
  display: flex;
  overflow: hidden;
  padding-top: 10px;
  background-color: rgba(245, 231, 231, 0.5);
  line-height: 10px;
  @media (max-width: 768px) {
    margin-top: -37px;
  }
`;
const Main = styled.div`
  margin-left: 145px;
  margin-right: 110px;
  background-color: #bd0a0a;
  overflow: hidden;
  height: 17.8rem;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 2px;
    margin-top: 0;
  }
`;
const Title = styled.h1`
  
`;

const Images = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
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
  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};

  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -11.7}vw);
  
`;
const Slide = styled.div`
  width: 125vw;
  display: flex;
  align-items: center;
`;

const MainProduct = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "samsung"
    );
    const filteredMobileProducts = products.filter(
      (item) => item.category === "oppo"
    );
    setTrendingProducts(filteredTrendingProducts);
    setMobileProducts(filteredMobileProducts);
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
  ;
  useEffect(() => {
    const id = setInterval(() => {
      handleAutoSlide();
    }, 3000); 
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, [slideIndex]);
  return (
    <Container>
      <Main>
        <Title>
          <div className="main_product">
            <div className="left__product">Máy tính bảng</div>

            <div className="right__product">
              <ul className="ul__menu__product">
                <li>Alcatel 3T8</li>
                <li>Samsung Galaxy Tab A7 Lite</li>
                <li>Huawei MatePad 128GB.</li>
                <li>iPad Pro M1</li>
              </ul>
              <div className="add__product">Xem tất cả...</div>
            </div>
          </div>
        </Title>

        <Images>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <LeftOutlined />
          </Arrow>

          <Wrapper slideIndex={slideIndex}>
            <Slide>
              <TabletList data={trendingProducts} />
              <TabletList data={mobileProducts} />
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

export default MainProduct;
