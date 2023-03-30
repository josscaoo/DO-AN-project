import React from "react";
import { Col, Row } from "reactstrap";
import CarouselMain from "../Carousel/CarouselMain";
import "./promotion.css";
import salePhone from "../../../assets/images/anhsale-06.webp";
import saleMac from "../../../assets/images/anhsale-07.webp";
import saleLogo from "../../../assets/images/hotsale-01.webp";
import { useNavigate } from "react-router";

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
        <Col className="promotion__top__menu">
          <div className="trend__title">Xu hướng mua sắm</div>
          <div className="trend__menu">
            <div className="trend__menu__a">
              #1 <strong onClick={navigateToSamSung}>Galaxy S23 Ultra</strong>{" "}
              <br />
              <p>Mở bán . Ưu đãi tốt</p>
            </div>
            <div className="trend__menu__a">
              #2
              <strong onClick={navigateToIphone14}>
                {" "}
                iPhone 14 Pro Max
              </strong>{" "}
              <br />
              <p>Thiết kế đẹp. Giá sốc</p>
            </div>
            <div className="trend__menu__a">
              #3{" "}
              <strong onClick={navigateToIphone13}>iPhone 13 128GB Hồng</strong>{" "}
              <br />
              <p>Thiết kế đẹp. Siêu tiết kiệm</p>
            </div>
            <div className="trend__menu__a">
              #4 <strong onClick={navigateToRealme}>Realme C33 3GB-32GB</strong>{" "}
              <br />
              <p>Thiết kế đẹp. Giá sốc</p>
            </div>
            <div className="trend__menu__a">
              #5 <strong onClick={navigateToOppo}>OPPO A15 3GB 32GB</strong>{" "}
              <br />
              <p>Êm tai. Giá siêu sốc</p>
            </div>
            <div className="trend__menu__b">
              #6 <strong onClick={navigateToVivo}>Vivo T1x 4GB-64GB</strong>{" "}
              <br />
              <p>Chính hãng. Giá tốt</p>
            </div>
          </div>
        </Col>

        <Col md="7">
          <div className="promotion__top__slice  ">
            <CarouselMain />
          </div>
        </Col>
        <Col className="promotion__sale">
          <div className="title__sale">
            <img src={saleLogo} alt="logo" />
            <div className="sale__logo__text">
              <h6 onClick={navigateToShop}>Siêu khuyến mãi</h6>
            </div>
          </div>

          <div className="img__salephone">
            <img src={salePhone} alt="img" />
          </div>

          <div className="img__salemac">
            <img src={saleMac} alt="img" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PromotionTop;
