import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../../redux/auth/authSlice";
import axios from "axios";
// import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin: 10px;
`;
const Form = styled.form`
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #dba802;
  color: white;
  font-size: 16px;
  width: 100px;
  height: 50px;
`;
const User = () => {
  const { email, password, name, phone, address } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email,
    password,
    name,
    phone,
    address,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(authSlice.actions.updateUserInfo(formData));
  const userId = localStorage.getItem("user_id"); // Lấy ID của người dùng từ localStorage
  const url = `http://localhost:3001/users/${userId}`; // Tạo địa chỉ URL

  try {
    const response = await axios.put(url, formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data); // Log response từ JSON server (nếu muốn)
  } catch (error) {
    console.log(error); // Log lỗi (nếu có)
  }
};

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Địa chỉ:
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Phone:
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          <Link to={"/checkout"}>trở lại</Link>
        </Label>
        <Button type="submit">Lưu</Button>
      </Form>
    </Container>
  );
};



export default User;
