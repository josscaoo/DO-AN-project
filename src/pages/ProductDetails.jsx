
  import React, { useState, useEffect } from "react";
  import { Container, Row, Col } from "reactstrap";
  import { Link, useParams } from "react-router-dom";
  import Helmet from "../components/Helmet/Helmet";
  import { motion } from "framer-motion";
  import ProductsList from "../components/UI/Shop/ProductsList";
  import { useDispatch, useSelector } from "react-redux";
  import { cartActions } from "../redux/slices/cartSlice";
  import { toast } from "react-toastify";
  import { Modal, message, Popconfirm } from "antd";
  import "./product.css";
  import {
    Content,
    Detail,
    DetailReview,
    EditReview,
    FormGroup,
    Image,
    Price,
    Review,
    ReviewForm,
    ReviewWrapper,
    Select,
    SelectReview,
    TextReview,
    UserName,
    Wrapper,
  } from "./Stile.Product-detail";
  import authSlice from "../redux/auth/authSlice";
  import axios from "axios";

  const ProductDetails = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.auth.name);
    const [newReview, setNewReview] = useState({
      id: "",
      name: userName,
      content: "",
    });
    // const [editing, setEditing] = useState(false);
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

    const handleDeleteReview = (id) => {
      // Xóa review khỏi state
      const newReviews = reviews.filter((review) => review.id !== id);
      setReviews(newReviews);

      // Gửi yêu cầu DELETE đến JSON server
      axios
        .delete(`http://localhost:3001/reviews/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          // Nếu có lỗi xảy ra, cập nhật lại state để đồng bộ với dữ liệu từ server
          setReviews(reviews);
        });
    };

    
const handleEditReview = (idReview, newContent) => {
  // Cập nhật review khỏi state
  
  const newReviews = reviews.map((review) => {
    if (review.id === idReview) {
      return {
        ...review,
        content: newContent,
        productId: Number(id),
        name: userName,
      };
    }
    return review;
  });
  setReviews(newReviews);

  // Gửi yêu cầu PUT đến JSON server
  axios
    .put(`http://localhost:3001/reviews/${idReview}`, {
      content: newContent,
      name: userName,
      productId: Number(id),
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      // Nếu có lỗi xảy ra, cập nhật lại state để đồng bộ với dữ liệu từ server
      setReviews(reviews);
    });
};

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
      setOpen(true);
    };

    const handleCancel = () => {
      console.log("xoá");
      setOpen(false);
    };
    const [tab, setTab] = useState("desc");

    const handleChange = (e) => {
      setNewReview({ ...newReview, content: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(cartActions.addReview({ ...newReview, productId: Number(id) }));
      setNewReview({ id: "", name: userName, content: "" });
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalEdit = () => {
      setIsModalOpen(true);
    };
    const handleOkEdit = () => {
      setIsModalOpen(false);
    };
    const handleCancelEdit = () => {
      setIsModalOpen(false);
    };

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    const addToCart = () => {
      console.log(product);
      dispatch(
        cartActions.addItem({
          id: product.id,
          user_id: Number(localStorage.getItem("user_id")),
          imgUrl: product.imgUrl,
          productName: product.productName,
          price: product.price,
          description: product.description,
        })
      );
      toast.success("Đã thêm vào giỏ hàng");
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 100);
    };
    const addLogin = () => {
      toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
    };

    useEffect(() => {
      window.scrollTo(0, 0);
      fetch(`http://localhost:3001/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
      fetch(`http://localhost:3001/products?category=${product.category}`)
        .then((response) => response.json())
        .then((data) => setRelatedProducts(data));
    }, [id, product.category]);
    

  

    const handleButtonClick = () => {
      dispatch(authSlice.setName("")); // set the name to "John Doe" when the button is clicked
    };
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const confirm = (e) => {
      console.log(e);
      message.success("Đã xóa");
    };
    const cancel = (e) => { };
    
  const [isOpen, setIsOpen] = useState(false);
const [selectedReviewId, setSelectedReviewId] = useState(null);
const toggleMenu = (id) => {
  if (id === selectedReviewId) {
    setIsOpen(!isOpen);
  } else {
    setIsOpen(true);
    setSelectedReviewId(id);
  }
};
    return (
      <Helmet title={product.productName}>
        <Image>
          <Container>
            <Row>
              <Col lg="4">
                <img src={product.imgUrl} alt="" />
              </Col>
              <Col lg="">
                <Detail>
                  <h2>{product.productName}</h2>
                  <div d-flex align-items-center gap-5>
                    <Price>
                      {product.price && product.price.toLocaleString("vi-VN")}
                      VND
                    </Price>
                    <br />
                    <span>Mặt hàng : {product.category}</span>
                  </div>
                  <p className="mt-3">{product.shortDesc}</p>

                  <div>
                    {isLoggedIn ? (
                      <div className="Add__Cart">
                        <button
                          whileTap={{ scale: 1.2 }}
                          className="buy__btn"
                          type="primary"
                          onClick={showModal}
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <Modal
                          open={open}
                          onOk={addToCart}
                          confirmLoading={confirmLoading}
                          onCancel={handleCancel}
                          okText="Đồng ý"
                          cancelText="Trở về"
                        >
                          <h3>Thêm vào giỏ hàng</h3>
                        </Modal>
                      </div>
                    ) : (
                      <div className="Add__Cart">
                        <button
                          whileTap={{ scale: 1.2 }}
                          className="buy__btn"
                          onClick={addLogin}
                        >
                          Mua Hàng
                        </button>
                      </div>
                    )}
                  </div>
                </Detail>
              </Col>
            </Row>
          </Container>
        </Image>

        <DetailReview>
          <Container>
            <Row>
              <Col lg="12">
                <Wrapper>
                  <Select
                    className={`${tab === "desc" ? "active__tab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Mô tả
                  </Select>
                  <Select
                    className={`${tab === "rev" ? "active__tab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Nhận xét ({reviews.length})
                  </Select>
                </Wrapper>

                {tab === "desc" ? (
                  <Content>
                    <p>{product.description}</p>
                  </Content>
                ) : (
                  <Review>
                    <ReviewWrapper>
                      <h2>Reviews:</h2>
                      {isLoggedIn ? (
                        <div>
                          <ul>
                            {reviews.map((review) => (
                              <li key={review.id} className="d-flex">
                                <UserName>{review.name} : </UserName>
                                <TextReview>"{review.content}"</TextReview>

                                <div className="d-flex">
                                  <SelectReview>
                                    <i
                                      className="ri-more-2-fill"
                                      onClick={
                                        review.name === userName
                                          ? () => toggleMenu(review.id)
                                          : undefined
                                      }
                                    ></i>
                                  </SelectReview>
                                  {isOpen && selectedReviewId === review.id && (
                                    <EditReview>
                                      <>
                                        <i
                                          whileTap={{ scale: 1.2 }}
                                          className="ri-edit-fill"
                                          type="primary"
                                          onClick={showModalEdit}
                                        ></i>
                                        <Modal
                                          title="Bạn muốn sửa Bình luận"
                                          open={isModalOpen}
                                          onOk={handleOkEdit}
                                          onCancel={handleCancelEdit}
                                          footer={null}
                                          style={{ marginTop: "150px" }} // Đặt margin-bottom là 50px
                                        >
                                          <form
                                            onSubmit={(event) => {
                                              event.preventDefault();
                                              const newContent =
                                                event.target.content.value;
                                              handleEditReview(
                                                review.id,
                                                newContent
                                              );
                                              setIsModalOpen(false);
                                            }}
                                          >
                                            <input
                                              type="text"
                                              name="content"
                                              defaultValue={review.content}
                                            />
                                            <br />
                                            <button type="submit">Lưu</button>
                                          </form>
                                        </Modal>

                                        <Popconfirm
                                          title="Bạn có muốn xóa bình luận?"
                                          // description="Bạn có muốn xóa bình luận?"
                                          onConfirm={confirm}
                                          onCancel={cancel}
                                          okText={
                                            <h6
                                              onClick={() =>
                                                handleDeleteReview(review.id)
                                              }
                                            >
                                              Có
                                            </h6>
                                          }
                                          cancelText={<h6>Không</h6>}
                                        >
                                          <div type="link">
                                            <i class="ri-delete-bin-5-line"></i>
                                          </div>
                                        </Popconfirm>
                                      </>
                                    </EditReview>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                          <ReviewForm>
                            <form onSubmit={handleSubmit}>
                              <label htmlFor="review">
                                Để lại ý kiến của bạn:
                              </label>
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
                                  {/* {editing ? "Lưu" : "Đánh giá"} */}
                                  Đánh giá
                              </motion.button>
                            </form>
                          </ReviewForm>
                        </div>
                      ) : (
                        <p>
                          Bạn cần phải <Link to={"/login"}>Đăng nhập</Link> để
                          bình luận
                        </p>
                      )}
                    </ReviewWrapper>
                  </Review>
                )}
              </Col>

              <Col lg="12" className="mt-5">
                <h2 className="related__title">Bạn có thể thích</h2>
              </Col>
              <ProductsList data={relatedProducts} />
            </Row>
          </Container>
        </DetailReview>
      </Helmet>
    );
  };

  export default ProductDetails;
