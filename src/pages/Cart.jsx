import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from "antd";


const Main = styled.div`
  margin-top: 30px;
  display: flex;
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
  tr {
    @media (max-width: 1024px) {
      padding-left: 10px;
    }
    td {
      padding-top: 10px;
      padding-right: 40px;
      padding-bottom: 15px;
      cursor: pointer;
      color: var(--primary-color);
      border-bottom: 1px solid rgb(133, 129, 129);

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
    }
    th{
      padding-right: 10px;
      
    }
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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const addLogin = () => {
    toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
  };
    const addPurchase = () => {
      toast.error("Bạn Cần Chọn Sản Phẩm");
    };

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTotalAmount, setSelectedTotalAmount] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const name = useSelector((state) => state.auth.name);

  const toggleCheck = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      setSelectedTotalAmount((prevAmount) => prevAmount - item.totalPrice);
      setSelectedQuantity((prevAmount) => prevAmount - item.quantity);
      
    } else {
      setSelectedItems([...selectedItems, item]);
      setSelectedTotalAmount((prevAmount) => prevAmount + item.totalPrice);
      setSelectedQuantity((prevAmount) => prevAmount + item.quantity);
    }

    // Create a JSON object with the relevant data
    const jsonData = {
      selectedUserName: name,
      selectedItems,
      selectedTotalAmount,
      selectedQuantity,
    };

    axios
      .post("http://localhost:3001/orders", jsonData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckboxChange = () => {
    const isChecked = selectedItems.length === cartItems.length;

    if (isChecked) {
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
                      <Tr
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
                      <button className="buy__btn w-100 ">
                        <Link to="/checkout">Thanh Toán</Link>
                      </button>
                    ) : (
                      <button className="buy__btn w-100 " disabled>
                        <Link onClick={addPurchase}>Thanh Toán</Link>
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <button className="buy__btn w-100 " onClick={addLogin}>
                      Thanh Toán
                    </button>
                  </div>
                )}

                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Tiếp Tục Mua Hàng</Link>
                </button>
              </ButtonCart>
            </Col>
          </Row>
        </Container>
      </Main>
    </Helmet>
  );
};
const Tr = ({ item, isChecked, toggleCheck }) => {
  const dispatch = useDispatch();

  const { imgUrl, productName, price } = item;

  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(price * quantity);

  useEffect(() => {
    const newTotalPrice = price * quantity;
    setTotalPrice(newTotalPrice);
    dispatch(cartActions.updateTotalAmount());
  }, [quantity, price, dispatch]);

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  const addProduct = () => {
    dispatch(cartActions.incrementItem(item.id));
    setQuantity((prevState) => prevState + 1);
  };

  const subtractProduct = () => {
    if (quantity > 1) {
      dispatch(cartActions.decrementItem(item.id));
      setQuantity((prevState) => prevState - 1);
    }
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Đã xóa");
  };
  const cancel = (e) => {
    console.log(e);
  };
  

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheck}
          style={{ cursor: "pointer" }}
        />
      </td>
      <td>
        <img src={imgUrl} alt="" />
      </td>
      <td>{productName}</td>
      <td>{totalPrice.toLocaleString("vi-VN")}VND</td>
      <td>
        <div
          className="d-flex align-items-center"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!isChecked && (
            <>
              <motion.i
                whileTap={{ scale: 1.2 }}
                onClick={subtractProduct}
                className="ri-subtract-line"
              ></motion.i>
              <span
                style={{ fontSize: "20px", fontWeight: "600" }}
                className="mx-2"
              >
                {quantity}
              </span>
              <motion.i onClick={addProduct} class="ri-add-line"></motion.i>
            </>
          )}
          {isChecked && (
            <span>
              <i
                class="ri-check-line"
                style={{ color: "green", fontSize: "20px", fontWeight: "700" }}
              ></i>
            </span>
          )}
        </div>
      </td>

      <td>
        {!isChecked && (
          <Popconfirm
            title="Bạn có muốn xóa?"
            onConfirm={confirm}
            onCancel={cancel}
            okText={<h6 onClick={deleteProduct}>có</h6>}
            cancelText={<h6>Không</h6>}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
          >
            <Button type="link">
              <motion.i
                style={{
                  color: "red",
                }}
                class="ri-delete-bin-5-line"
              ></motion.i>
            </Button>
          </Popconfirm>
        )}
        {isChecked && <p>Đã chọn</p>}
      </td>
    </tr>
  );
};



export default Cart;
