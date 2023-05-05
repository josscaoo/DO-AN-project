import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
const Container = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 3.9rem;
  line-height: 50px;
  display: flex;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const Main = styled.div`
  font-weight: 700;
  font-size: 19px;
`;
const Body = styled.div`
  display: flex;
  margin-left: 24rem;
  padding-left: 50px;
`;
const List = styled.div`
  li {
    display: inline;
    cursor: pointer;
    border: 1px solid rgb(150, 146, 146);
    padding: 5px;
    border-radius: 10px;
    margin-right: 10px;
    font-size: 13px;
    padding-left: 20px;
  }
  li:hover {
    background-color: #940707;
    color: white;
  }
`;
const Add = styled.div`
    padding-left: 40px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    :hover{
    color: rgb(218, 135, 2);
    }
    `;


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