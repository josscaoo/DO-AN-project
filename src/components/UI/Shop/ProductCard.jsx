import React from "react";

import { motion } from "framer-motion";
import "../../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success("Đã thêm sản phẩm");
  };
    const addLogin = () => {
      toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
    };



  return (
    <Col lg="3" md="4" className=" mb-2">
      <div className="product__item">
        <div className="product__img">
          <Link to={`/shop/${item.id}`}>
            <motion.img whileHover={{ scale: 1.1 }} src={item.imgUrl} alt="" />
          </Link>
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">{item.price.toLocaleString("vi-VN")}VND</span>

          {isLoggedIn ? (
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <i class="ri-shopping-cart-line"></i>
            </motion.span>
          ) : (
            <div>
              <motion.span whileTap={{ scale: 1.2 }} onClick={addLogin}>
                <i class="ri-shopping-cart-line"></i>
              </motion.span>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
