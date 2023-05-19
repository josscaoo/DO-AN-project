import React, { useEffect, useState } from "react";
import OrdersTable from "./OrdersTable";
import styled from "styled-components";
import axios from "axios";

const Main = styled.div`
  h4 {
    text-align: center;
  }
  p {
    text-align: center;
  }
`;

const OrderStatus = () => {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/newOrders?userId=${userId}`
        );
        setLatestOrder(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestOrder();
  }, []);
  return (
    <Main>
      <h4>Đơn Đặt Hàng Của Bạn</h4>
      {latestOrder ? (
        <OrdersTable order={latestOrder} setLatestOrder={setLatestOrder} />
      ) : (
        <p>Bạn không có đơn hàng nào ...</p>
      )}
    </Main>
  );
};

export default OrderStatus;
