import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import TabletList from "../../components/UI/Table/TabletList";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 38rem;
  /* display: flex; */
  overflow: hidden;
  padding-top: 10px;
  line-height: 10px;
  @media (max-width: 768px) {
    margin-top: -37px;
  }
`;
const Main = styled.div`
  background-color: white;
  overflow: hidden;
  height: 18rem;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 2px;
    margin-top: 0;
  }
  @media (max-width: 1024px) {
    margin: 5px;
  }
`;
const Title = styled.h1`
  padding-top: 10px;
  width: 100%;
  height: 2.8rem;
  line-height: 30px;
  display: flex;
  background-color: #bd0a0a;

  .left__product {
    padding-left: 1rem;
    font-weight: 700;
    font-size: 19px;
    color: white;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
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
  top: 13;
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
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -11.4}vw);
`;
const Slide = styled.div`
  width: 125vw;
  display: flex;
  align-items: center;
`;

const GoodPhone = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: products } = await axios.get(
        "http://localhost:3001/products"
      );
      const filteredTrendingProducts = products.filter(
        (item) => item.category === "samsung"
      );
      const filteredMobileProducts = products.filter(
        (item) => item.category === "oppo"
      );
      setTrendingProducts(filteredTrendingProducts);
      setMobileProducts(filteredMobileProducts);
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
    }, 4000);
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, [slideIndex]);
  return (
    <Container>
      <Main>
        <Title>
          <div className="left__product">Điện thoại tốt</div>
        </Title>

        <Images>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <LeftOutlined />
          </Arrow>

          <Wrapper slideIndex={slideIndex}>
            <Slide>
              <TabletList data={mobileProducts} />
              <TabletList data={trendingProducts} />
            </Slide>
          </Wrapper>
          <Arrow direction="right" onClick={() => handleClick("right")}>
            <RightOutlined />
          </Arrow>
        </Images>
      </Main>

      <Main>
        <Images>
          <Wrapper slideIndex={slideIndex}>
            <Slide>
              <TabletList data={trendingProducts} />
              <TabletList data={mobileProducts} />
            </Slide>
          </Wrapper>
        </Images>
      </Main>
    </Container>
  );
};

export default GoodPhone;
