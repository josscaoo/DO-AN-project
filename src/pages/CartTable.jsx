import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { Button, message, Popconfirm } from "antd";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { QuestionCircleOutlined } from "@ant-design/icons";

const CartTable = ({ item, isChecked, toggleCheck }) => {
  const dispatch = useDispatch();

  const { imgUrl, productName, price } = item;
  const [showDetails, setShowDetails] = useState(true);

  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(price * quantity);

  useEffect(() => {
    const newTotalPrice = price * quantity;
    setTotalPrice(newTotalPrice);
    dispatch(cartActions.updateTotalAmount());
  }, [quantity, price, dispatch]);

  useEffect(() => {
    if (!showDetails) {
      window.location.reload();
    }
  }, [showDetails]);

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
    setShowDetails(false);
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
      <td>
        {" "}
        <Link to={`/shop/${item.id}`}>{productName}</Link>
      </td>
      <td>{totalPrice.toLocaleString("vi-VN")}₫</td>
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
              <motion.i onClick={addProduct} className="ri-add-line"></motion.i>
            </>
          )}
          {isChecked && (
            <span>
              <i
                className="ri-check-line"
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
                className="ri-delete-bin-5-line"
              ></motion.i>
            </Button>
          </Popconfirm>
        )}
        {isChecked && <p>Đã chọn</p>}
      </td>
    </tr>
  );
};

export default CartTable