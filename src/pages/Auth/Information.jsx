import React, { useState, useEffect } from "react";
import { FormGroup } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import axios from "axios";
import "../../styles/information.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { cartActions } from "../../redux/slices/cartSlice";

const Information = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      toast.error("vui lòng kiểm tra lại và nhập đủ thông tin");
      return;
    } else {
      toast.success("thành công");
      navigate("/checkout");
    }

    const data = { name, email, address, phone };

    try {
      const response = await axios.post("http://localhost:3001/orders", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    dispatch(cartActions.addCheckout(data));
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
  };

  return (
    <Helmet title="Information">
      <div className="body__checkout">
        <form className="billing__form" onSubmit={handleSubmit}>
          <div className="text__information">
            <h4>NHẬP THÔNG TIN CỦA BẠN</h4>
          </div>
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
          <div className="form__button">
            <button type="submit">XONG</button>
          </div>
        </form>
      </div>
    </Helmet>
  );
};

export default Information;
