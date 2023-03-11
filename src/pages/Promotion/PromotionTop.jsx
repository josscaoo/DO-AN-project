import React from 'react';
import { Col, Row } from 'reactstrap';
import CarouselMain from '../Carousel/CarouselMain';
import './promotion.css';
import salePhone from '../../assets/images/anhsale-06.webp';
import saleMac from "../../assets/images/anhsale-07.webp";
import saleLogo from '../../assets/images/hotsale-01.webp'


const PromotionTop = () => {
  return (
    <div className="columns">
      <Row mt="16">
        <Col md="3" className="columns__col__left">
          <div className="promotion__top__menu">
            <div className="trend__title">Xu hướng mua sắm</div>
            <div className="trend__menu">
              <div className="trend__menu__a">
                #1 <strong>Galaxy S23 Ultra</strong> <br />
                <p>Mở bán . Ưu đãi tốt</p>
              </div>
              <div className="trend__menu__a">
                #2 <strong> iPhone 14 Pro Max</strong> <br />
                <p>Thiết kế đẹp. Giá sốc</p>
              </div>
              <div className="trend__menu__a">
                #3 <strong>iPhone 13</strong> <br />
                <p>Thiết kế đẹp. Siêu tiết kiệm</p>
              </div>
              <div className="trend__menu__a">
                #4 <strong>Apple Watch Series 8</strong> <br />
                <p>Thiết kế đẹp. Giá sốc</p>
              </div>
              <div className="trend__menu__a">
                #5 <strong>AirPods 2</strong> <br />
                <p>Êm tai. Giá siêu sốc</p>
              </div>
              <div className="trend__menu__b">
                #6 <strong>Phụ kiện iPhone 14</strong> <br />
                <p>Chính hãng. Giá tốt</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6" className="columns__col__center">
          <div className="promotion__top__slice">
            <CarouselMain />
          </div>
        </Col>
        <Col md="3" className="columns__col__right">
          <div className="promotion__sale">
            <div className="title__sale">
              <img src={saleLogo} alt="logo" />
              <div className="sale__logo__text">
                <h6>Siêu khuyến mãi</h6>
              </div>
            </div>

            <div className="img__salephone">
              <img src={salePhone} alt="img" />
            </div>

            <div className="img__salemac">
              <img src={saleMac} alt="img" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PromotionTop