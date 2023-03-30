import React from 'react';
import "./service.css";
import { Col, Row } from 'reactstrap'
import { useNavigate } from 'react-router';

const Service = () => {
    const navigate = useNavigate();

  const navigateToShop = () => {
    navigate("/shop");
  };
  return (
    <div className="main_service">
      <Row>
        <Col md="6">
          <div className="left__service">Phụ kiện giá rẻ</div>
        </Col>
        <Col md="6">
          <div className="right__service">
            <ul className="ul__menu__service">
              <li>Tai nghe</li>
              <li>Sạc nhanh</li>
              <li>Ốp lưng</li>
              <li>Cường lực</li>
            </ul>
            <div className="add__service" onClick={navigateToShop}>
              Xem tất cả...
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Service