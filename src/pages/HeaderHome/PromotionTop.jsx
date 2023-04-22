import React from "react";
import { Col, Row } from "reactstrap";
import CarouselMain from "./CarouselMain";
import salePhone from "../../assets/images/anhsale-06.webp";
import saleMac from "../../assets/images/anhsale-07.webp";
import saleLogo from "../../assets/images/hotsale-01.webp";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Title = styled.div`
  background-color: #be1e2d;
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
  padding: 5px;
  img {
    width: 90px;
    height: 35px;
  }
  h6:hover {
    color: #be1e2d;
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
          <SaleTitle>
            <img src={saleLogo} alt="logo" />
            <div className="sale__logo__text">
              <h6 onClick={() => navigateTo("")}>Siêu khuyến mãi</h6>
            </div>
          </SaleTitle>

          <SalePhone>
            <img src={salePhone} alt="img" />
          </SalePhone>

          <SaleMac>
            <img src={saleMac} alt="img" />
          </SaleMac>
        </Col>
      </Row>
    </Component>
  );
};

export default PromotionTop;
