import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { authenticate } from "../../redux/auth/authSlice";
import axios from "axios";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fceabb, #f8b500);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 10px;
  width: 400px;
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #f8b500;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fceabb;
    color: #f8b500;
  }
`;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/users");
      const user = response.data.find((u) => u.email === email);

      if (!user) {
        throw new Error("Tài khoản chưa đăng ký");
      } else if (user.password !== password) {
        throw new Error("Sai mật khẩu");
      } else {
        dispatch(authenticate(email, password));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      dispatch(setError(err.message));
    }
  };

  return (
    <Helmet title="Login">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Heading>Login</Heading>
          {error && <div className="error">{error}</div>}
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Đăng nhập</Button>
          <p>
            Tài khoản không tồn tại?
            <Link to="/register">Tạo một tài khoản</Link>
          </p>
        </Form>
      </Container>
    </Helmet>
  );
};

export default Login;
