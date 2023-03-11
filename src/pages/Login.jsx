import React,{useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

import '../styles/login.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      console.log(user)
      setLoading(false)
      toast.success('Đăng nhập thành công')
      navigate('/home')

    } catch (error) {
      setLoading(false)
      toast.error("Lỗi! Vui lòng kiểm tra lại" )
    }
  }
  
  return (
    <Helmet title="login">
      <div className="main__login__signup">
        <section>
          <Container>
            <Row>
              {loading ? (
                <Col lg="12" className="text-center">
                  <h5 className="fw-bold">Loading.....</h5>
                </Col>
              ) : (
                <Col lg="6" className="m-auto text-center">
                  <div className='header__login__signup'>
                    <h3>Đăng Nhập</h3>
                  </div>

                  <Form className="auth__form" onSubmit={signIn}>
                    <FormGroup className="form__group">
                      <input
                        type="email"
                        placeholder="Nhập địa chỉ email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>

                    <button type="submit" className="buy__btn auth__btn">
                      Đăng Nhập
                    </button>
                    <p>
                      Tài khoảng không tồn tại?
                      <Link to="/signup">Tạo một tài khoảng</Link>
                    </p>
                  </Form>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  );
}

export default Login