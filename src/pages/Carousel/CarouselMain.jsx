import React from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { sliderItems } from "../../assets/data/products";

const Container = styled.div`
  width: 100%;
  height: 20.3rem;
  display: flex;
  position: relative;
  overflow: hidden;
  padding-top: 10px;

  @media (max-width: 768px) {
    width: 50rem;
    /* font-size: 10px; */
    padding: 4px 12px;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
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
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    padding-left: 5px;
    margin-left: 40px;
    margin-right: 30px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 0.5;
`;

const Img = styled.img`
  height: 100%;
  @media (max-width: 768px) {
    width: 47rem;
    padding-left: 15px;
    margin: 5px;
    overflow: hidden;
    position: relative;
  }
`;


const CarouselMain = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
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
     }, 6000); // thay đổi thời gian slide tự chạy tại đây
     setIntervalId(id);
     return () => {
       clearInterval(intervalId);
     };
   }, [slideIndex]);
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <LeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
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
    </Container>
  );
};

export default CarouselMain;

