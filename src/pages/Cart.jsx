import React, {useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import Service from "./ListProducts/Service";
import GoodPhone from "./ListProducts/GoodPhone";
import OtherPhone from "./ListProducts/OtherPhone";
import CartTable from "./CartTable";

const Main = styled.div`
  margin-top: 30px;
  display: flex;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    text-align: center;
    margin: 0;
  }
  @media (max-width: 1024px) {
    text-align: center;
    margin: 0;
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  thead {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
  tr {
    @media (max-width: 1024px) {
      padding-left: 10px;
    }
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  p {
    font-size: 13px;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  img {
    max-width: 50px;
  }
`;
const ButtonCart = styled.div`
  button {
    background-color: rgb(241, 158, 49);
    color: black;
    font-weight: 600;
    border-radius: 10px;
    width: 100px;
    border: 1px;
    margin-top: 5px;
    height: 40px;

    a:hover {
      background-color: rgb(184, 21, 21);
      color: white;
    }
  }

  button:hover {
    background-color: rgb(184, 21, 21);
    color: white;
  }
  @media (max-width: 768px) {
    margin: 0 200px;
  }
`;

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn, name } = useSelector((state) => state.auth);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTotalAmount, setSelectedTotalAmount] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const addLogin = () => {
    toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
  };

  const addPurchase = () => {
    toast.error("Bạn Cần Chọn Sản Phẩm");
  };

  const toggleCheck = (item) => {
    const isSelected = selectedItems.includes(item);
    const amount = isSelected
      ? selectedTotalAmount - item.totalPrice
      : selectedTotalAmount + item.totalPrice;
    const quantity = isSelected
      ? selectedQuantity - item.quantity
      : selectedQuantity + item.quantity;
    setSelectedItems(
      isSelected
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item]
    );
    setSelectedTotalAmount(amount);
    setSelectedQuantity(quantity);
  };

  const handleCheckboxChange = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
      setSelectedTotalAmount(0);
      setSelectedQuantity(0);
    } else {
      setSelectedItems(cartItems);
      setSelectedTotalAmount(
        cartItems.reduce((acc, item) => acc + item.totalPrice, 0)
      );
      setSelectedQuantity(
        cartItems.reduce((acc, item) => acc + item.quantity, 0)
      );
    }
  };

  const placeOrder = () => {
    const jsonData = {
      selectedUserName: name,
      selectedItems: selectedItems,
      selectedTotalAmount: selectedTotalAmount,
      selectedQuantity: selectedQuantity,
    };

    axios
      .post("http://localhost:3001/orders", jsonData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    setSelectedItems([]);
    setSelectedTotalAmount(0);
    setSelectedQuantity(0);
    navigate("/checkout");
  };

  const navigate = useNavigate();

  const navigateToShop = () => navigate("/shop");

  const isAllSelected = selectedItems.length === cartItems.length;
  
  return (
    <Helmet title="Cart">
      <Main>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">
                  Không có mặt hàng nào được thêm vào giỏ hàng
                </h2>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          checked={isAllSelected}
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          style={{ cursor: "pointer" }}
                        />
                      </th>
                      <th>Sản phẩm</th>
                      <th>Tên sản phẩm </th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <CartTable
                        item={item}
                        key={index}
                        isChecked={selectedItems.includes(item)}
                        toggleCheck={() => toggleCheck(item)}
                      />
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className=" d-flex align-items-center justify-content-between ">
                  Tổng thanh toán(sản phẩm {selectedQuantity}):
                </h6>
                <span className=" fs-4 fw-bold">
                  {selectedTotalAmount.toLocaleString("vi-VN")}VND
                </span>
              </div>
              <p className="fs-6 mt-2">
                thuế và phí vận chuyển sẽ được tính khi thanh toán
              </p>
              <ButtonCart>
                {isLoggedIn ? (
                  <div>
                    {selectedItems.length > 0 ? (
                      <button
                        className="buy__btn w-100 "
                        onClick={placeOrder}
                        disabled={selectedItems.length === 0}
                      >
                        Đặt Hàng
                      </button>
                    ) : (
                      <button className="buy__btn w-100 " onClick={addPurchase}>
                        Đặt Hàng
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <button className="buy__btn w-100 " onClick={addLogin}>
                      Đặt Hàng
                    </button>
                  </div>
                )}

                <button
                  className="buy__btn w-100 mt-3"
                  onClick={navigateToShop}
                >
                  Tiếp Tục Mua Hàng
                </button>
              </ButtonCart>
            </Col>
          </Row>
        </Container>
      </Main>
      <GoodPhone />
      <Service />
      <OtherPhone />
    </Helmet>
  );
};

export default Cart;
