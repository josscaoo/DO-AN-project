import React, { useState } from "react";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../../firebase.config";
import { storage } from "../../firebase.config";
import { db } from "../../firebase.config";

import { toast } from "react-toastify";

import "../../styles/login.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Tài khoản đã được tạo");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Lỗi! Vui lòng kiểm tra lại ");
    }
  };

  return (
    <Helmet title="Signup">
      <div className="main__login__signup">
        <section>
          <Container>
            <Row>
              {loading ? (
                <Col lg="12" className="text-center">
                  <h5 className="fw-bold">Loading.......</h5>
                </Col>
              ) : (
                <Col lg="6" className="m-auto text-center">
                  <div className="header__login__signup">
                    <h3>Đăng Kí</h3>
                  </div>
                  <Form className="auth__form" onSubmit={register}>
                    <FormGroup className="form__group">
                      <input
                        type="text"
                        placeholder="Nhập tên"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup className="form__group">
                      <input
                        type="email"
                        placeholder="nhập địa chỉ email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup className="form__group">
                      <input
                        type="password"
                        placeholder="nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>

                    <button type="submit" className="buy__btn auth__btn">
                      Tạo tài khoản
                    </button>
                    <p>
                      bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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
};

export default Register;
