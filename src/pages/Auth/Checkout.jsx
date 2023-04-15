import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet/Helmet";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  padding: 20px;
  background: rgb(110, 7, 7);
  color: #fff9f9;
  border-radius: 5px;
  margin: 0 200px;
  h6 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(221, 221, 221, 0.253);
    padding-top: 20px;
  }
`;
const Button = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 100px;
    border: 1px;
    margin-top: 5px;
    height: 40px;
  }
`;
const Add = styled.div`
  button:hover {
    background-color: rgb(255, 255, 255);
    color: #000000;
  }
`;
const Exit = styled.div`
  button:hover {
    background-color: rgb(207, 12, 12);
    color: white;
  }
  button {
    a:hover {
      color: white;
    }
  }
`;


const Checkout = () => {
  const name = useSelector((state) => state.auth.name);
  const address = useSelector((state) => state.auth.address);
  const phone = useSelector((state) => state.auth.phone);
  const [latestSelectedQuantity, setLatestSelectedQuantity] = useState(0);
  const [latestSelectedTotalAmount, setLatestSelectedTotalAmount] =
    useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/oders")
      .then((response) => {
        const orders = response.data;
        orders.sort((a, b) => b.id - a.id);
        const latestQuantity = orders[0]?.selectedQuantity || 0;
        setLatestSelectedQuantity(latestQuantity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/oders")
      .then((response) => {
        const orders = response.data;
        orders.sort((a, b) => b.id - a.id);
        const latestTotalAmount = orders[0]?.selectedTotalAmount || 0;
        setLatestSelectedTotalAmount(latestTotalAmount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Helmet title="Checkout">
      <Form>
        <h6>
          Tên khách Hàng <span>{name}</span>
        </h6>
        <h6>
          Địa chỉ <span>{address}</span>
        </h6>
        <h6>
          Số điện thoại <span>{phone}</span>
        </h6>
        <h6>
          Tổng đơn hàng: <span>{latestSelectedQuantity}</span>
        </h6>

        <h6>
          Tổng tiền đơn hàng:
          <span>{latestSelectedTotalAmount.toLocaleString("vi-VN")} VND</span>
        </h6>

        <h4 style={{ color: "white", fontSize: "25px", fontWeight: "700" }}>
          Tổng thanh toán:
          <span>{latestSelectedTotalAmount.toLocaleString("vi-VN")}VND</span>
        </h4>
        <Button>
          <Add>
            <button type="summit" className="buy__btn w-100 ">
              Đặt hàng
            </button>
          </Add>
          <Exit>
            <button className="buy__btn w-100 ">
              <Link to="/cart">quay lại</Link>
            </button>
          </Exit>
        </Button>
      </Form>
    </Helmet>
  );
};

export default Checkout;
