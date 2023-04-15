

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import "./product.css";
import {
  Content,
  Detail,
  DetailReview,
  FormGroup,
  Image,
  SelectReview,
  Price,
  EditReview,
  Review,
  ReviewForm,
  ReviewWrapper,
  TextReview,
  UserName,
  Wrapper,
} from "./Stile.Product-detail";
import authSlice from "../redux/auth/authSlice";
import axios from "axios";
import { Modal, message, Popconfirm } from "antd";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.auth.name);
  const [newReview, setNewReview] = useState({
    id: "",
    name: userName,
    content: "",
  });
  const [editing, setEditing] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/reviews")
      .then((response) => {
        const filteredReviews = response.data.filter(
          (review) => review.productId === Number(id)
        );

        setReviews(filteredReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setNewReview({ ...newReview, content: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(cartActions.editReview(newReview));
      setEditing(false);
    } else {
      dispatch(cartActions.addReview({ ...newReview, productId: Number(id) }));
    }
    setNewReview({ id: "", name: userName, content: "" });
  };

  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
    fetch(`http://localhost:3001/products?category=${product.category}`).then(
      (response) => response.json()
    );
  }, [id, product.category]);

  const handleButtonClick = () => {
    dispatch(authSlice.setName("")); // set the name to "John Doe" when the button is clicked
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = (review) => {
    setNewReview(review);
    setEditing(true);
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Đã xóa");
  };
  const cancel = (e) => {};

  const handleDelete = (id) => {
    dispatch(cartActions.deleteReview(id));
  };
  return (
    <Helmet title={product.productName}>
      <Image>
        <Container>
          <Row>
            <Col lg="4">
              <img src={product.imgUrl} alt="" />
            </Col>
          </Row>
        </Container>
      </Image>

      <DetailReview>
        <Container>
          <Row>
            <Col lg="12">
              <Review>
                <ReviewWrapper>
                  <h2>Reviews:</h2>

                  <ul>
                    {reviews.map((review) => (
                      <li key={review.id} className="d-flex">
                        <UserName>{review.name} : </UserName>
                        <TextReview>"{review.content}"</TextReview>

                        <div className="d-flex">
                          <SelectReview>
                            <i class="ri-more-2-fill" onClick={toggleMenu}></i>
                          </SelectReview>
                          {isOpen && (
                            <EditReview>
                              <i
                                whileTap={{ scale: 1.2 }}
                                class="ri-edit-fill"
                                onClick={() => handleEdit(review)}
                              ></i>
                              <Popconfirm
                                title="Bạn có muốn xóa bình luận?"
                                // description="Bạn có muốn xóa bình luận?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText={
                                  <h6 onClick={() => handleDelete(review.id)}>
                                    Có
                                  </h6>
                                }
                                cancelText={<h6>Không</h6>}
                              >
                                <div type="link">
                                  <i class="ri-delete-bin-5-line"></i>
                                </div>
                              </Popconfirm>
                            </EditReview>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <ReviewForm>
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="review">Để lại ý kiến của bạn:</label>
                        <FormGroup>
                          <textarea
                            type="text"
                            value={newReview.content}
                            onChange={handleChange}
                          />
                        </FormGroup>

                        <motion.button
                          type="submit"
                          className="buy__btn "
                          whileTap={{ scale: 1.2 }}
                          onClick={handleButtonClick}
                        >
                          aaaa
                        </motion.button>
                      </form>
                    </ReviewForm>
                  </div>
                </ReviewWrapper>
              </Review>
            </Col>
          </Row>
        </Container>
      </DetailReview>
    </Helmet>
  );
};

export default ProductDetails;

