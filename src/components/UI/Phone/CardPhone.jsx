import React from "react";

import { motion } from "framer-motion";
import "../../../styles/card-phone.css";
import { Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";

const CardSale = ({ item }) => {
  const dispatch = useDispatch();

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

  return (
    <Container className="product__container__phone">
      <Col md="6" lg="12" className="mb-2">
        <div className="product__item_phone">
          <div className="product__img_phone">
            <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
          </div>

          <div className=" product__info__phone">
            <h5 className="product__name_phone">
              <Link to={`/shop/${item.id}`}>{item.productName}</Link>
            </h5>

            <span>{item.category}</span>
          </div>

          <div className="product__phone__card-bottom  d-flex align-items-center justify-content-between p-2">
            <span className="price">
              {item.price.toLocaleString("vi-VN")}VND
            </span>
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default CardSale;
