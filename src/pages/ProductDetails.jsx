import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useParams } from "react-router-dom";
// import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/Shop/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "../styles/product-detail.css";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.cart.reviews);
const [newReview, setNewReview] = useState({ id: "", content: "" });
const [editing, setEditing] = useState(false);

const handleChange = (e) => {
  setNewReview({ ...newReview, content: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (editing) {
    dispatch(cartActions.editReview(newReview));
    setEditing(false);
  } else {
    dispatch(cartActions.addReview({ ...newReview, id: uuidv4() }));
  }
  setNewReview({ id: "", content: "" });
};

const handleEdit = (review) => {
  setNewReview(review);
  setEditing(true);
};

const handleDelete = (reviewId) => {
  dispatch(cartActions.deleteReview(reviewId));
  };
  



  const { id } = useParams();
const [product, setProduct] = useState({});
const [relatedProducts, setRelatedProducts] = useState([]);

  
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        imgUrl: product.imgUrl,
        productName: product.productName,
        price: product.price,
        description: product.description,
      })
    );
    toast.success("Đã thêm vào giỏ hàng");
  };
  const addLogin = () => {
    toast.error('Bạn Cần Đăng Nhập Để Mua Hàng');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
    fetch(`http://localhost:3001/products?category=${product.category}`)
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data));
  }, [id, product.category]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const name = useSelector((state) => state.auth.name);
   const handleButtonClick = () => {
     dispatch(cartActions.setName("")); // set the name to "John Doe" when the button is clicked
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Helmet title={product.productName}>
      <section className="detail__img">
        <Container>
          <Row>
            <Col lg="4" className="product__details__img">
              <img src={product.imgUrl} alt="" />
            </Col>
            <Col lg="">
              <div className="product__details">
                <h2>{product.productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3 "></div>

                <div d-flex align-items-center gap-5>
                  <span className="product__price">
                    {product.price && product.price.toLocaleString("vi-VN")}VND
                  </span>
                  <br />
                  <span>Mặt hàng:{product.category}</span>
                </div>
                <p className="mt-3">{product.shortDesc}</p>

                <div>
                  {isLoggedIn ? (
                    <div>
                      <motion.button
                        whileTap={{ scale: 1.2 }}
                        className="buy__btn"
                        onClick={addToCart}
                      >
                        Thêm vào giỏ hàng
                      </motion.button>
                    </div>
                  ) : (
                    <div>
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="datail__text">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Mô tả
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Nhận xét ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tap__content mt-5">
                  <p>{product.description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wapper">
                    <h2>Reviews:</h2>
                    {isLoggedIn ? (
                      <div>
                        <ul>
                          {reviews.map((review) => (
                            <li key={review.id} className="d-flex">
                              <div className="user__name">{name} : </div>
                              <div className="text__review">
                                "{review.content}"
                              </div>

                              <div className="d-flex">
                                <div className="review__menu">
                                  <i
                                    class="ri-more-2-fill"
                                    onClick={toggleMenu}
                                  ></i>
                                </div>
                                {isOpen && (
                                  <div className="edit__delete d-flex">
                                    <i
                                      whileTap={{ scale: 1.2 }}
                                      class="ri-edit-fill"
                                      onClick={() => handleEdit(review)}
                                    ></i>
                                    <i
                                      class="ri-delete-bin-line"
                                      onClick={() => handleDelete(review.id)}
                                    ></i>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="review__form">
                          <form onSubmit={handleSubmit}>
                            <label htmlFor="review">
                              Để lại ý kiến của bạn:
                            </label>
                            <div className="form__group">
                              <textarea
                                type="text"
                                value={newReview.content}
                                onChange={handleChange}
                              />
                            </div>

                            <motion.button
                              type="submit"
                              className="buy__btn "
                              whileTap={{ scale: 1.2 }}
                              onClick={handleButtonClick}
                            >
                              {editing ? "Lưu" : "Đánh giá"}
                            </motion.button>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <p>
                        Bạn cần phải <Link to={"/login"}>Đăng nhập</Link> để
                        bình luận
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">Bạn có thể thích</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};





export default ProductDetails;
