import React from 'react';
import "./service.css";
import { Col, Row } from 'reactstrap'

const Service = () => {
  return (
    <div className="main_service">
      <Row>
        <Col md="4">
          <div className="left__service">Điện thoại hot nhất</div>
        </Col>
        <Col md="8">
          <div className="right__service">
            <ul className="ul__menu__service">
              <li>iPhone 14Pro Max</li>
              <li>SamSung S23 Ultra</li>
              <li>Xiaomi 13Pro</li>
              <li>OPPO A77s</li>
              <li>Redmi K50</li>
            </ul>
            <div className="add__service">Xem tất cả...</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Service