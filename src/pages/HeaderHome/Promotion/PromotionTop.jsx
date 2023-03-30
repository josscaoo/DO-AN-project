import React from "react";
import { Col, Row } from "reactstrap";
import CarouselMain from "../Carousel/CarouselMain";
import salePhone from "../../../assets/images/anhsale-06.webp";
import saleMac from "../../../assets/images/anhsale-07.webp";
import saleLogo from "../../../assets/images/hotsale-01.webp";
import { useNavigate } from "react-router";
import { ListPhone, SaleMac, SalePhone, SaleTitle, Slice, Title, Trend } from "./Style";

const PromotionTop = () => {
  const navigate = useNavigate();

  const navigateToSamSung = () => {
    navigate("/shop/27");
  };
  const navigateToIphone14 = () => {
    navigate("/shop/0103");
  };
  const navigateToIphone13 = () => {
    navigate("/shop/04");
  };
  const navigateToRealme = () => {
    navigate("/shop/19");
  };
  const navigateToOppo = () => {
    navigate("/shop/11");
  };
  const navigateToVivo = () => {
    navigate("/shop/17");
  };
  const navigateToShop = () => {
    navigate("/shop");
  };
  return (
    <div>
      <Row mt="16">
        <Col>
          <Title>Xu hướng mua sắm</Title>
          <ListPhone>
            <Trend>
              #1 <strong onClick={navigateToSamSung}>Galaxy S23 Ultra</strong>{" "}
              <br />
              <p>Mở bán . Ưu đãi tốt</p>
            </Trend>
            <Trend>
              #2
              <strong onClick={navigateToIphone14}>
                iPhone 14 Pro Max
              </strong>
              <br />
              <p>Thiết kế đẹp. Giá sốc</p>
            </Trend>
            <Trend>
              #3
              <strong onClick={navigateToIphone13}>iPhone 13 128GB Hồng</strong>{" "}
              <br />
              <p>Thiết kế đẹp. Siêu tiết kiệm</p>
            </Trend>
            <Trend>
              #4 <strong onClick={navigateToRealme}>Realme C33 3GB-32GB</strong>{" "}
              <br />
              <p>Thiết kế đẹp. Giá sốc</p>
            </Trend>
            <Trend>
              #5 <strong onClick={navigateToOppo}>OPPO A15 3GB 32GB</strong>{" "}
              <br />
              <p>Êm tai. Giá siêu sốc</p>
            </Trend>
            <Trend>
              #6 <strong onClick={navigateToVivo}>Vivo T1x 4GB-64GB</strong>{" "}
              <br />
              <p>Chính hãng. Giá tốt</p>
            </Trend>
          </ListPhone>
        </Col>

        <Col md="7">
          <Slice>
            <CarouselMain />
          </Slice>
        </Col>

        <Col>
          
          <SaleTitle>
            <img src={saleLogo} alt="logo" />
            <div className="sale__logo__text">
              <h6 onClick={navigateToShop}>Siêu khuyến mãi</h6>
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
    </div>
  );
};

export default PromotionTop;
