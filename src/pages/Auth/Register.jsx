import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "../../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
  form {
    .error {
      font-weight: 500;
      color: red;
    }
    button {
      background-color: rgb(241, 158, 49);
      color: black;
      font-weight: 600;
      border-radius: 10px;
      width: 150px;
      height: 30px;
      border: 1px;
      margin-top: 5px;
      a:hover {
        background-color: rgb(184, 21, 21);
        color: white;
      }
    }
    button:hover {
      background-color: rgb(184, 21, 21);
      color: white;
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
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Kiểm tra các ô input không được để trống
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

    // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp nhau hay không
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);

        try {
          // Gọi request để đăng ký tài khoản
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
    <Container>
      <div>
        {loading ? (
          <div>
            <h5 className="fw-bold">Loading.......</h5>
          </div>
        ) : (
          <Main>
            <form onSubmit={handleSubmit}>
              {error && <div className="error">{error}</div>}
              <h2>Đăng Kí</h2>
              <Input>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Input>
              <Input>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Input>
              <Input>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Input>
              <Input>
                <input
                  type="text"
                  placeholder="Tên "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Input>
              <Input>
                <input
                  type="number"
                  placeholder="Số điện thoại "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Input>
              <Input>
                <input
                  type="text"
                  placeholder="Địa chỉ "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Input>

              <button type="submit" className="buy__btn auth__btn">
                Register
              </button>
              <p>
                bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </p>
            </form>
          </Main>
        )}
      </div>
    </Container>
  </Helmet>
);

}

export default Register;
