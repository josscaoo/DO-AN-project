import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { authenticate } from "../../redux/auth/authSlice";
import axios from "axios";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 2px;
  width: 400px;
  .error {
    color: red;
    margin-bottom: 20px;
    text-align: center;
  }
  p{
    margin-top: 15px;
    font-size: 15px;
  }
`;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 10px;
  margin: auto;
  width: 50%;
  color: #940707;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 3px;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => (props.isError ? "red" : "grey")};
`;

const Button = styled.button`
  background-color: #940707;
  width: 100%;
  color: #ffebeb;
  padding: 5px;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e85004;
    color: #fff;
  }
`;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập");
      return;
    }

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
          <Heading>Đăng nhập</Heading>
          {error && <div className="error">{error}</div>}
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isError={error && !email}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isError={error && !password}
          />
          <Button type="submit">Đăng nhập</Button>
          <p>
            Bạn chưa có tài khoản?
            <Link to="/register">Tạo một tài khoản</Link>
          </p>
        </Form>
      </Container>
    </Helmet>
  );
};

export default Login;
