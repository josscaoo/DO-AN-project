import React, { useState } from "react";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";
import axios from "axios";
import { Button, Container, Images, Info } from "./Style";
import { Modal } from "antd";


const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

      const showModal = () => {
        setOpen(true);
  };
    const handleCancel = () => {
      console.log("xoá");
      setOpen(false);
    };

  // Gửi một HTTP POST request đến JSON server khi người dùng thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    // Lấy thông tin sản phẩm
    const newItem = {
      id: item.id,
      // user_id: Number(localStorage.getItem("user_id")),
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl,
    };

    // Thêm sản phẩm vào giỏ hàng trên Redux store
    dispatch(cartActions.addItem(newItem));

    // Gửi thông tin sản phẩm lên server
    axios
      .post("http://localhost:3001/cartItems", newItem)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Hiển thị thông báo
    toast.success("Đã thêm sản phẩm");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 100);
  };

  const addLogin = () => {
    toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
  };

  return (
    <Col lg="3" md="4" className=" mb-2">
      <Container>
        <Images>
          <Link to={`/shop/${item.id}`}>
            <motion.img whileHover={{ scale: 1.1 }} src={item.imgUrl} alt="" />
          </Link>
        </Images>

        <Info>
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </Info>

        <Button>
          <h4>{item.price.toLocaleString("vi-VN")}VND</h4>

          {isLoggedIn ? (
            <div>
              <span
                whileTap={{ scale: 1.2 }}
                className="buy__btn"
                type="primary"
                onClick={showModal}
              >
                <i class="ri-shopping-cart-line"></i>
              </span>
              <Modal
                open={open}
                onOk={addToCart}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Đồng ý"
                cancelText="Trở về"
              >
                <h5>Thêm vào giỏ hàng</h5>
              </Modal>
            </div>
          ) : (
            <div>
              <motion.span whileTap={{ scale: 1.2 }} onClick={addLogin}>
                <i class="ri-shopping-cart-line"></i>
              </motion.span>
            </div>
          )}
        </Button>
      </Container>
    </Col>
  );
};

export default ProductCard;
