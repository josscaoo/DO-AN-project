import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../../redux/auth/authSlice";
import axios from "axios";
// import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Container = styled.div`
margin: auto;
width: 50%;
`;

const Label = styled.div`


`;
const Form = styled.form`
margin: auto;
width: 30%;

`;

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 200px;
`;

const Button = styled.button`
  margin-right: 40px;
  margin-left: 10px;
  border-radius: 5px;
  border: none;
  background-color: #dba802;
  color: white;
  font-size: 16px;
  width: 80px;
  height: 35px;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
  font-size: 13px;
`;

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    password: storedPassword,
    name,
    phone,
    address,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    name,
    phone,
    address,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== storedPassword) {
      setError("Mật khẩu không đúng");
      return;
    }

    if (formData.newPassword) {
      dispatch(authSlice.actions.updatePassword(formData.newPassword));
    }

    dispatch(authSlice.actions.updateUserInfo(formData));

    const userId = localStorage.getItem("user_id");
    const url = `http://localhost:3001/users/${userId}`;

    try {
      const response = await axios.put(url, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      toast.success("Lưu thành công", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          <div>Tên</div>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          <div> Địa chỉ:</div>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          <div>Số điện thoại:</div>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          <div>Mật khẩu mới:</div>
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword || ""}
            onChange={handleChange}
          />
        </Label>
        <Label>
          <div> Nhập mật khẩu:</div>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Lưu</Button>
        <Link to={"/checkout"}>trở lại</Link>
      </Form>
    </Container>
  );
};


export default User;


