import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { authenticate } from "../../redux/auth/authSlice";
import axios from "axios";
import { Col, Row } from "reactstrap";
import { Button } from "antd";
import image from "../../assets/iphone-14-wallpaper-h.png";
import logo from "../../assets/logo-01.png";
import google from "../../assets/Google__G__Logo.svg.webp";
import facebook from "../../assets/Facebook_f_logo_(2019).svg.webp";



const Container = styled.div`

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
  p {
    margin-bottom: 10px;
  }
  .styled-logo {
    img {
      width: 3.5rem;
      height: 3.5rem;
      padding: 10px;
      cursor: pointer;
    }
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

const ButtonLogin = styled.button`
  background-color: #940707;
  width: 100%;
  height: 45px;
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
const Image = styled.div`
  background-color: #940707;
  span {
    display: flex;
    img {
      width: 3.5rem;
      height: 3.5rem;
    }
    h1 {
      margin-top: 15px;
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
    }
  }
`;


const Login = ({ onShowRegisterModal }) => {
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
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      dispatch(setError(err.message));
    }
  };

  return (
    <Helmet title="Login">
      <Container>
        <Row>
          <Col style={{ backgroundColor: "#940707" }}>
            <Image>
              <img src={image} alt="" />
              <span>
                <img src={logo} alt="logo" />
                <h1 className="logo__text">HienMobi</h1>
              </span>
            </Image>
          </Col>
          <Col>
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
              <ButtonLogin type="submit">Đăng nhập</ButtonLogin>
              <h6>Bạn quên mật khẩu?</h6>
              <p>Hoặc đăng nhập bằng</p>

              <div className="styled-logo">
                <img src={google} alt="" />
                <img src={facebook} alt="" />
              </div>
              <p>
                bạn chưa có tài khoản?{" "}
                <Button type="link" onClick={onShowRegisterModal}>
                  Đăng ký
                </Button>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Login;
