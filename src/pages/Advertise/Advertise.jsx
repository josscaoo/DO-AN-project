import React from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { sliderSale } from "../../assets/data/products";

const Container = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  overflow: hidden;
  padding-top: 10px;
  background-color: rgba(245, 231, 231, 0.5);
  line-height: 10px;
  @media (max-width: 768px) {
    margin-bottom: 0;

    margin-top: -50px;
  }
`;
const Main = styled.div`
  margin-left: 145px;
  margin-right: 110px;
  background-color: #bd0a0a;
  overflow: hidden;
  height: 12.5rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 2px;
  }
`;
const Title = styled.h1`
  padding-top: 10px;
  text-shadow: 2px 2px 5px red;
  color: white;
  font-size: 20px;
  text-align: left;
  font-weight: 600;
  padding-left: 10px;
  padding-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
    /* margin-top: -20px; */
    }
`;

const Images = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 1px;
  background-color: white;

  
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
  z-index: 5;
`;

const Wrapper = styled.div`
  height: 150%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -104.5}vw);
  padding: 2px;
`;
const Slide = styled.div`
  width: 123vw;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 20rem;
`;

const Img = styled.img`
  height: 100%;
  width: 19.5rem;
  margin-left: 8px;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Advertise = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
    };
    
    const [intervalId, setIntervalId] = useState(null);
    const handleAutoSlide = () => {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    };

    useEffect(() => {
      const id = setInterval(() => {
        handleAutoSlide();
      }, 4000); // thay đổi thời gian slide tự chạy tại đây
      setIntervalId(id);
      return () => {
        clearInterval(intervalId);
      };
    }, [slideIndex]);


  return (
    <Container>
      <Main>
        <Title>Thương hiệu hàng đầu</Title>

        <Images>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <LeftOutlined />
          </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderSale.map((item) => (
          <Slide>
            <ImgContainer>
              <Img src={item.img} />
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      
      <Arrow direction="right" onClick={() => handleClick("right")}>
            <RightOutlined />
        </Arrow>
        </Images>
      </Main>
    </Container>
  );
};

export default Advertise;
