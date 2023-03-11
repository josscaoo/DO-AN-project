import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ul/CommonSection';

import '../styles/checkout.css';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/checkoutSlice";
import { toast } from "react-toastify";

const Checkout = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("vui lòng nhập thông tin")
      return ;
    } else {
      toast.success("Đặt hàng thành công");
    }

    dispatch(
      addToCart({
        name,
        email,
        address,
        phone,
      })
    );

    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
  };

  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <CommonSection title="" />

      <form onSubmit={handleSubmit} className="body__checkout">
        <div>
          <Form className="billing__form">
            <FormGroup className="form__group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn"
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email"
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Địa chỉ nhận hàng"
              />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="text" placeholder="Tỉnh/Thành phố" />
            </FormGroup>

            <FormGroup className="form__group">
              <input type="text" placeholder="Ghi chú" />
            </FormGroup>
          </Form>
        </div>

        <div className="check__cart">
          <h6>
            Tổng đơn hàng: <span>{totalQty}</span>
          </h6>

          <h6>
            Tổng tiền đơn hàng: <span>{totalAmount} VND</span>
          </h6>

          <h4>
            Tổng thanh toán: <span>{totalAmount}VND</span>
          </h4>
          <button type="submit" className="buy__btn auth__btn w-100">
            Đặt hàng
          </button>
        </div>
      </form>
    </Helmet>
  );
}

export default Checkout