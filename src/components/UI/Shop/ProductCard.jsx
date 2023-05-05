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

  const addToCart = () => {
    const newItem = {
      id: item.id,
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl,
    };
    dispatch(cartActions.addItem(newItem));
    axios
      .post("http://localhost:3001/cartItems", newItem)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    toast.success("Đã thêm sản phẩm", { position: "top-center" });
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 100);
  };

  const addLogin = () => toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");

  return (
    <Col lg="3" md="4" className=" mb-2">
      <Container>
        <Images>
          <Link to={`/shop/${item.id}`}>
            <motion.img whileHover={{ scale: 1.1 }} src={item.imgUrl} alt="" />
          </Link>
        </Images>

        <Info>
          <h6 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h6>
          <span>{item.category}</span>
        </Info>

        <Button>
          <h4>{item.price.toLocaleString("vi-VN")}VND</h4>

          {isLoggedIn ? (
            <div>
              <span
                whiletap ={{ scale: 1.2 }}
                className="buy__btn"
                type="primary"
                onClick={() => setOpen(true)}
              >
                <i className="ri-shopping-cart-line"></i>
              </span>
              <Modal
                open={open}
                onOk={addToCart}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                okText="Đồng ý"
                cancelText="Trở về"
              >
                <h5>Thêm vào giỏ hàng</h5>
              </Modal>
            </div>
          ) : (
            <div>
              <motion.span whiletap ={{ scale: 1.2 }} onClick={addLogin}>
                <i className="ri-shopping-cart-line"></i>
              </motion.span>
            </div>
          )}
        </Button>
      </Container>
    </Col>
  );
};

export default ProductCard;
