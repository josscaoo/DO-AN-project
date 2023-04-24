import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  img {
    /* display: flex; */
    width: 100%;
  }
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Banner = () => {
   const [sliderItem, setSliderItem] = useState({});

   useEffect(() => {
     async function fetchData() {
       const result = await axios.get("http://localhost:3001/banner");
       const banner = result.data.find((item) => item.id === 1);
       setSliderItem(banner);
     }
     fetchData();
   }, []);
  return (
    <Main>
      <div>
        <img src={sliderItem.img} alt="" />
      </div>
    </Main>
  );
};

export default Banner;



