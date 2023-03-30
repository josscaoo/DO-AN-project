import React from "react";

import { motion } from "framer-motion";
import "../../../styles/card-sale.css";
import { Link } from "react-router-dom";

const CardSale = ({ item }) => {


  return (
    <div className="product__container_sale">
      <div>
        <div className="product__item__sale">
          <div className="product__img_sale">
            <Link to={`/shop/${item.id}`}>
              <motion.img
                whileHover={{ scale: 0.9 }}
                src={item.imgUrl}
                alt=""
              />
            </Link>
          </div>

          <div className=" product__info__sale">
            <h5 className="product__name_sale">
              <Link to={`/shop/${item.id}`}>{item.productName}</Link>
            </h5>

            <span>{item.category}</span>
          </div>

          <div className="product__sale__card-bottom  d-flex align-items-center justify-content-between p-2">
            <span className="price">
              {item.price.toLocaleString("vi-VN")}VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSale;
