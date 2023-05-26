
  import React, { useState, useEffect } from "react";
  import { Container, Row, Col } from "reactstrap";
  import { useParams } from "react-router-dom";
  import Helmet from "../components/Helmet/Helmet";
  import { motion } from "framer-motion";
  import ProductsList from "../components/UI/Shop/ProductsList";
  import { useDispatch, useSelector } from "react-redux";
  import { cartActions } from "../redux/slices/cartSlice";
  import { toast } from "react-toastify";
  import { message, Popconfirm } from "antd";
  import {
    Content,
    Detail,
    DetailReview,
    EditReview,
    FormGroup,
    Image,
    Price,
    Promotion,
    Review,
    ReviewForm,
    ReviewImage,
    ReviewWrapper,
    Select,
    Service,
    StyledModal,
    TextReview,
    UserName,
    Wrapper,
    
} from "./Style.Product-detail";
  
  import axios from "axios";
  import GoodPhone from "./ListProducts/GoodPhone";
  import OtherPhone from "./ListProducts/OtherPhone";
  

const ProductDetails = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.auth.name);
    const [newReview, setNewReview] = useState({
      id: "",
      name: userName,
      content: "",
    });
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [tab, setTab] = useState("desc");
    const [inputError, setInputError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showDetails, setShowDetails] = useState(true);



    useEffect(() => {
      window.scrollTo(0, 0);
      fetch(`http://localhost:3001/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
      fetch(`http://localhost:3001/products?category=${product.category}`)
        .then((response) => response.json())
        .then((data) => setRelatedProducts(data));
    }, [id, product.category]);
  
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
  console.log(addToCart);
  
    const addLogin = () => {
        toast.error("Bạn Cần Đăng Nhập Để Mua Hàng");
      };

  
const handleSubmit = (event) => {
  event.preventDefault();

  if (!isLoggedIn) {
    // nếu chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập
    setInputError("Vui lòng đăng nhập để bình luận.");
    return;
  }

  const reviewData = {
    ...newReview,
    productId: Number(id),
  };
  if (!newReview.content) {
    setInputError("Bạn chưa nhập nội dung bình luận!");
  } else {
    axios
      .post("http://localhost:3001/reviews", reviewData)
      .then((response) => {
        const updatedReviews = [...reviews, response.data];

        setReviews(updatedReviews);
        setNewReview({ id: "", name: userName, content: "" });
      })
      .catch((error) => {
        console.log(error);
      });
    setInputError(null);
  }
};

  
   const handleDeleteReview = (id) => {
     // Gửi yêu cầu DELETE đến JSON server
     axios
       .delete(`http://localhost:3001/reviews/${id}`)
       .then((response) => {
         console.log(response);
         // Xóa review khỏi state
         const newReviews = reviews.filter((review) => review.id !== id);
         setReviews(newReviews);
        setShowDetails(false);

         
       })
       .catch((error) => {
         console.log(error);
       });
  };
    useEffect(() => {
      if (!showDetails) {
        window.location.reload();
      }
    }, [showDetails]);

  
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
    
    const handleChange = (e) => {
      setNewReview({ ...newReview, content: e.target.value });
    };    

    const showModalEdit = () => {
      setIsModalOpen(true);
    };
    const handleOkEdit = () => {
      setIsModalOpen(false);
    };
    const handleCancelEdit = () => {
      setIsModalOpen(false);
    };
    
    const showModal = () => {
      setOpen(true);
    };

    const handleCancel = () => {
      console.log("xoá");
      setOpen(false);
    };

    const confirm = (e) => {
      console.log(e);
      message.success("Đã xóa");
    };
    const cancel = (e) => { };
    
const [hoveredReviewId, setHoveredReviewId] = useState(null);

const handleMouseMove = (reviewId) => {
  setHoveredReviewId(reviewId);
};

const handleMouseLeave = () => {
  setHoveredReviewId(null);
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
                  <div className="d-flex align-items-center gap-5">
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
                          whiletap={{ scale: 1.2 }}
                          className="buy__btn"
                          type="primary"
                          onClick={showModal}
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <StyledModal
                          open={open}
                          onOk={addToCart}
                          confirmLoading={confirmLoading}
                          onCancel={handleCancel}
                          okText="Đồng ý"
                          cancelText="Trở về"
                        >
                          <h5>Thêm vào giỏ hàng</h5>
                        </StyledModal>
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
                    Nhận xét({reviews.length})
                  </Select>
                  <Select
                    className={`${tab === "rev" ? "active__tab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Mô tả
                  </Select>
                </Wrapper>

                {tab === "desc" ? (
                  <Review>
                    <ReviewWrapper>
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
                              {inputError && (
                                <p style={{ color: "red" }}>{inputError}</p>
                              )}
                            </FormGroup>
                            <motion.button
                              type="submit"
                              whileTap={{ scale: 1.2 }}
                            >
                              Đánh giá
                            </motion.button>
                          </form>
                        </ReviewForm>
                        <ul>
                          {reviews.map((review) => (
                            <li key={review.id} onMouseLeave={handleMouseLeave}>
                              <div
                                className="review__form"
                                onMouseMove={() => handleMouseMove(review.id)}
                              >
                                <UserName>{review.name} </UserName>
                                <TextReview>"{review.content}"</TextReview>
                              </div>
                              <div className="review__icon">
                                {hoveredReviewId === review.id && (
                                  <i
                                    className="ri-more-line"
                                    onClick={
                                      review.name === userName
                                        ? () => toggleMenu(review.id)
                                        : undefined
                                    }
                                    onMouseMove={() =>
                                      handleMouseMove(review.id)
                                    }
                                  ></i>
                                )}
                                {isOpen && selectedReviewId === review.id && (
                                  <EditReview>
                                    <>
                                      <i
                                        whileTap={{ scale: 1.2 }}
                                        className="ri-edit-fill"
                                        type="primary"
                                        onClick={showModalEdit}
                                      ></i>
                                      <StyledModal
                                        title="Bạn muốn sửa Bình luận"
                                        open={isModalOpen}
                                        onOk={handleOkEdit}
                                        onCancel={handleCancelEdit}
                                        footer={null}
                                        style={{
                                          marginTop: "150px",
                                          height: "100px",
                                        }} // Đặt margin-bottom là 50px
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
                                          <FormGroup>
                                            <textarea
                                              type="text"
                                              name="content"
                                              defaultValue={review.content}
                                            />
                                            <motion.button
                                              className="buy__btn "
                                              whileTap={{ scale: 1.2 }}
                                              type="submit"
                                            >
                                              Lưu
                                            </motion.button>
                                          </FormGroup>
                                        </form>
                                      </StyledModal>

                                      <Popconfirm
                                        title="Bạn có muốn xóa bình luận?"
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
                                          <i className="ri-delete-bin-5-line"></i>
                                        </div>
                                      </Popconfirm>
                                    </>
                                  </EditReview>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                    </ReviewWrapper>
                    <div>
                      <ReviewImage>
                        <h5>Khuyến mãi</h5>
                        <Promotion>
                          <h6>
                            1. Tuần Lễ {product.category} | Duy nhất hôm nay:
                            Với voucher ưu đãi lên đến <span>700.000đ</span> và
                            nhiều ưu đãi sau đây:
                            <li>
                              Tặng thêm đến <span> 500.000đ</span> khi thu cũ
                              đổi mới Xem chi tiết
                            </li>
                            <p>
                              Lưu ý: Chương trình có thể kết thúc sớm vì số
                              lượng có hạn
                            </p>
                          </h6>
                          <h6>
                            2. Ưu đãi khác:
                            <li>
                              Tặng ngay gói Youtube Premium <span>4 tháng</span>{" "}
                            </li>
                            <li>
                              Tặng bảo hành Samsung Care Plus{" "}
                              <span>6 tháng</span>{" "}
                            </li>
                            <li>
                              Tặng gói phòng chờ hạng Thương Gia Xem chi tiết
                            </li>
                            <li>
                              Trả góp <span>0%</span> đến 24 tháng Xem chi tiết
                            </li>
                            <li>
                              Không giấy tờ phức tạp chỉ cần <span>CCCD</span>
                            </li>
                          </h6>
                        </Promotion>
                      </ReviewImage>
                      <div className="hottelephone__sale">
                        Gọi đặt mua 1800.6018 (7:30 - 22:00)
                      </div>
                      <Service>
                        <h5> Ưu đãi dịch vụ</h5>
                        <Promotion>
                          <p>
                            <i className="ri-coupon-2-line"></i> Giảm thêm tới{" "}
                            <span>1.5%</span>
                            cho thành viên của Di Động Việt
                          </p>
                          <p>
                            <i className="ri-secure-payment-line"></i> Chỉ từ{" "}
                            <span>2K/ngày</span>
                            có ngay Gói Bảo Hành Hư Lỗi - Đổi Mới trong 1 năm
                          </p>
                          <p>
                            <i className="ri-takeaway-line"></i> Miễn phí Giao
                            hàng siêu tốc trong <span> 1 giờ</span>{" "}
                          </p>
                          <p>
                            <i className="ri-bank-card-line"></i> Giảm thêm{" "}
                            <span> 5% </span>tối đa 500.000đ thanh toán qua
                            Kredivo{" "}
                          </p>
                          <p>
                            <i className="ri-refund-2-fill"></i> Giảm thêm{" "}
                            <span>30%</span> tối đa 600.000đ mở thẻ qua TPBank
                            EVO
                          </p>
                          <p>
                            <i className="ri-visa-fill"></i> Giảm thêm{" "}
                            <span>200.000đ</span> mở thẻ qua VIB
                          </p>
                          <p>
                            <i className="ri-mastercard-line"></i> Giảm thêm{" "}
                            <span>500.000đ</span> mở thẻ qua VPBANK
                          </p>
                        </Promotion>
                      </Service>
                    </div>
                  </Review>
                ) : (
                  <Content>
                    <p>{product.description}</p>
                  </Content>
                )}
              </Col>

              <Col lg="12" className="mt-5">
                <h2 className="related__title">Bạn có thể thích</h2>
              </Col>
              <ProductsList data={relatedProducts} />
            </Row>
          </Container>
        </DetailReview>
        <GoodPhone />
        <OtherPhone />
      </Helmet>
    );
  
  };

  export default ProductDetails;
