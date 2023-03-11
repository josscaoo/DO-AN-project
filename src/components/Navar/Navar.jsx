import React from 'react'
import { Container, Row, Col } from "reactstrap";
import './navar.css'

const Navar = () => {
  return (
    <div className="header__menu">
      <Row>
        <Col md="8">
          <div className="menu__container">
            <ul className="ul__header__menu">
              <li>
                <i class="ri-smartphone-line"></i>
                Điện thoại
              </li>
              <li>
                <i class="ri-macbook-line"></i>
                Máy tính
              </li>

              <li>
                <i class="ri-headphone-fill"></i>
                Tai nghe
              </li>

              <li>
                <i class="ri-clapperboard-line"></i>
                Phụ kiện
              </li>
            </ul>
          </div>
        </Col>
        <Col m="5">
          <div className='menu__phone'>
            <ul className='ul__menu__phone'>
                <li className='aaaa'>iPhone</li>
                <li>SamSung</li>
                <li>Xiaomi</li>
                <li>OPPO</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Navar