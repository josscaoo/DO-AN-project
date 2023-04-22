import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc ;
  outline: none;
  /* border: 1px solid ${(props) => (props.isError ? "red" : "grey")}; */

  &:focus {
    border-bottom: 2px solid #333;
  }
  &:invalid {
    border-bottom: 3px solid #f44336;
  }
    &.error {
    border-color: red;
    }
`;

const RegisterButton = styled.button`
  width: 300px;
  height: 40px;
  margin-top: 20px;
  background-color: #f44336;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
  
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || !confirmPassword || !name || !phone || !address) {
    setError("Bạn phải nhập đầy đủ thông tin");
    return;
  }

  if (password !== confirmPassword) {
    setError("Mật khẩu không khớp");
    return;
  }

  if (password.length < 8) {
    setError("Mật khẩu phải có ít nhất 8 kí tự");
    return;
  }
  if (name.length < 3) {
    setError("Tên phải có ít nhất 3 kí tự");
    return;
  }
  if (phone.length < 9) {
    setError("Số điện thoại không đủ");
    return;
  }

  setLoading(true);

  try {
    const users = await axios.get("http://localhost:3001/users");
    const existingUser = users.data.find((user) => user.email === email);
    if (existingUser) {
      setError("Email này đã được sử dụng. Vui lòng sử dụng email khác");
      return;
    }

    const response = await axios.post("http://localhost:3001/users", {
      email,
      password,
      name,
      phone,
      address,
    });

    if (response.status === 201) {
      toast.success("Tài khoản đã được tạo");
      navigate("/login");
    }
  } catch (err) {
    console.error(err);
    setError("Đăng ký không thành công. Vui lòng thử lại sau");
  } finally {
    setLoading(false);
  }
};


  return (
    <Helmet title="Register">
      <RegisterWrapper>
        <Title>Đăng kí tài khoản</Title>

        {loading ? (
          <h5 className="fw-bold">Loading.......</h5>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <InputField
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={error && !name ? "error" : ""}
            />

            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error && !email ? "error" : ""}
            />
            <InputField
              type="password"
              placeholder="Mật khẩu(ít nhất 8 kí tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error && !password ? "error" : ""}
            />
            <InputField
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={error && !password ? "error" : ""}
            />
            <InputField
              type="number"
              placeholder="Số điện thoại "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={error && !phone ? "error" : ""}
            />
            <InputField
              type="text"
              placeholder="Địa chỉ "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={error && !address ? "error" : ""}
            />
            <RegisterButton type="submit">Đăng kí</RegisterButton>
            <p>
              bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          </Form>
        )}
      </RegisterWrapper>
    </Helmet>
  );
};

export default Register;
