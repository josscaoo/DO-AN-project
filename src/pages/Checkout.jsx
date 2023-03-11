import React from "react";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {

  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <div>
        <form className="check__cart">
          <h6>
            Tổng đơn hàng: <span>{totalQty}</span>
          </h6>

          <h6>
            Tổng tiền đơn hàng: <span>{totalAmount} VND</span>
          </h6>

          <h4>
            Tổng thanh toán: <span>{totalAmount}VND</span>
          </h4>
          <div className="button__cart">
            <div className="button__left">
              <button type="submit" className="  buy__btn auth__btn">
                Đặt hàng
              </button>
            </div>
            <div className="button__right">
              
              <Link className="aaaaa" to="/information">
                quay lại
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default Checkout;