import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { toast } from "react-toastify";
import axios from "axios";
import { Col, Row } from "reactstrap";
import { Button } from "antd";
import image from "../../assets/iphone-14-wallpaper-h.png";
import logo from "../../assets/logo-01.png";
import google from "../../assets/Google__G__Logo.svg.webp";
import facebook from "../../assets/Facebook_f_logo_(2019).svg.webp";

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Title = styled.h1`
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #940707;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 10px;
  }
`;

const InputField = styled.input`
  width: 300px;
  height: 35px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;

  &:focus {
    border-bottom: 2px solid #6ccd05c2;
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
  background-color: #940707;
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
const Container = styled.div``;

const Register = ({ onShowLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !phone ||
      !address
    ) {
      setError("Bạn phải nhập đầy đủ thông tin");
      return;
    }
    if (name.length < 3) {
      setError("Tên phải có ít nhất 3 kí tự");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 kí tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
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
        onShowLoginModal();
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
            <RegisterWrapper>
              <Title>Đăng ký</Title>

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
                </Form>
              )}
              <p>Hoặc đăng kí bằng</p>
              <div className="styled-logo">
                <img src={google} alt="" />
                <img src={facebook} alt="" />
              </div>
              <p>
                bạn đã có tài khoản?{" "}
                <Button type="link" onClick={onShowLoginModal}>
                  Đăng nhập
                </Button>
              </p>
            </RegisterWrapper>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Register;
