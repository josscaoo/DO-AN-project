import React from 'react';
// import "./service.css";
import { Col, Row } from 'reactstrap'
import { useNavigate } from 'react-router';
import { Add, Body, Container, List, Main } from "./Style";

const Service = () => {
    const navigate = useNavigate();

  const navigateToShop = () => {
    navigate("/shop");
  };
  return (
    <Container>
      <Main>
        Phụ kiện giá rẻ
      </Main>

      <Body>
        <List>
          <li>Tai nghe</li>
          <li>Sạc nhanh</li>
          <li>Ốp lưng</li>
          <li>Cường lực</li>
        </List>
        <Add onClick={navigateToShop}>Xem tất cả...</Add>
      </Body>
    </Container>
  );
}

export default Service