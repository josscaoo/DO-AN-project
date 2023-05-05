import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CarouselMain from "./CarouselMain";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";

const Title = styled.div`
  background-color: #940707;
  text-align: center;
  border-radius: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  color: white;
  text-shadow: 2px 1px 2px yellow, 2px 2px 25px yellowgreen, 0 0 10px wheat;
`;
const ListPhone = styled.div`
  background-color: white;
  border-radius: 3px;
  padding-left: 25px;
  padding-right: 20px;
  padding-top: 10px;
  strong:hover {
    color: rgb(168, 0, 0);
  }
`;
const Trend = styled.div`
  border-bottom: rgb(187, 185, 185) solid 1.5px;
  font-size: 13px;
  padding-bottom: 10px;
  cursor: pointer;
  p {
    font-size: 10px;
  }
`;
const Component = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SaleTitle = styled.div`
display: flex;

  img {
    width: 50px;
    height: 40px;
  }
  h6{
    padding-top: 7px;
  }
  h6:hover {
    color: #940707;
    cursor: pointer;
  }
`;
const SalePhone = styled.div`
  padding-bottom: 10px;
  img {
    border-radius: 5px;
    cursor: pointer;
  }
`;
const SaleMac = styled.div`
  img {
    border-radius: 5px;
    cursor: pointer;
  }
`;


const PromotionTop = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(`/shop/${path}`);
  };

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("http://localhost:3001/banner");
      setBanners(result.data);
    }
    fetchData();
  }, []);

  return (
    <Component>
      <Row mt="16">
        <Col>
          <Title>Xu hướng mua sắm</Title>
          <ListPhone>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Trend key={item}>
                #{item}{" "}
                <strong
                  onClick={() => navigateTo([11, 9, 5, 25, 20, 21][item - 1])}
                >
                  {
                    [
                      "Galaxy S23 Ultra",
                      "iPhone 14 Pro Max",
                      "iPhone 13 128GB Hồng",
                      "Realme C33 3GB-32GB",
                      "OPPO A15 3GB 32GB",
                      "Vivo T1x 4GB-64GB",
                    ][item - 1]
                  }
                </strong>
                <br />
                <p>
                  {
                    [
                      "Mở bán . Ưu đãi tốt",
                      "Thiết kế đẹp. Giá sốc",
                      "Thiết kế đẹp. Siêu tiết kiệm",
                      "Thiết kế đẹp. Giá sốc",
                      "Êm tai. Giá siêu sốc",
                      "Chính hãng. Giá tốt",
                    ][item - 1]
                  }
                </p>
              </Trend>
            ))}
          </ListPhone>
        </Col>

        <Col md="7">
          <CarouselMain />
        </Col>

        <Col>
          {banners.map((banner) => {
            switch (banner.id) {
              case 2:
                return (
                  <SaleTitle key={banner.id}>
                    <img src={banner.img} alt="" />
                    <div className="sale__logo__text">
                      <h6 onClick={() => navigateTo("")}>Siêu khuyến mãi</h6>
                    </div>
                  </SaleTitle>
                );
              case 3:
                return (
                  <SalePhone key={banner.id}>
                    <img src={banner.img} alt="" />
                  </SalePhone>
                );
              case 4:
                return (
                  <SaleMac key={banner.id}>
                    <img src={banner.img} alt="" />
                  </SaleMac>
                );

              default:
                return null;
            }
          })}
        </Col>
      </Row>
    </Component>
  );
};


export default PromotionTop;
