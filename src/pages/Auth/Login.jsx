import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { authenticate } from "../../redux/auth/authSlice";


const Container = styled.div`
  margin: auto;
  text-align: center;
  margin-top: 150px;
`;
const Main = styled.div`
  background-color: #c5c4c4b2;
  padding: 40px;
  border-radius: 5px;
  margin-left: 200px;
  margin-right: 200px;
  button {
    margin-top: 10px;
    border-radius: 10px;
    background-color: #103b64;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    :hover {
      background-color: #b61515;
      color: white;
    }
  }
  h5 {
    font-size: 15px;
  }
  p {
    .link__login:hover {
      color: #e11c1c;
      font-weight: 600;
    }
  }
  form{
    .error{
      font-weight: 600;
      color: red;
    }
  }
`;
const Input = styled.div`
  input {
    width: 400px;
    border-radius: 10px;
    text-align: center;
    margin-top: 20px;
    font-size: 23px;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticate(email, password))
    
  };
    

  return (
    <Helmet title="Login">
      <Container>
        <div>
          <Main>
            <form onSubmit={handleSubmit}>
              {error && <div className="error">{error}</div>}
              <h1>Login</h1>
              <Input>
                <input
                  placeholder="Nhập địa chỉ email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Input>
              <Input>
                <input
                  placeholder="Nhập mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Input>
              <button type="submit" className="buy__btn auth__btn">
                Login
              </button>
              <div><Link to="/">Home</Link></div>
              <p>
                Tài khoảng không tồn tại?
                <Link to="/register">Tạo một tài khoảng</Link>
              </p>
            </form>
          </Main>
        </div>
      </Container>
    </Helmet>
  );
}
export default Login;

