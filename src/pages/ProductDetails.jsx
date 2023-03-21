import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/Shop/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "../styles/product-detail.css";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();

  const reviewSubmitHandler = (event) => {
    event.preventDefault();
    setReviews((prevReviews) => [...prevReviews, reviewText]);
    dispatch(cartActions.addReview(reviewText));
    setReviewText("");
  };

  const reviewChangeHandler = (event) => {
    setReviewText(event.target.value);
  };

  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    shortDesc,
    category,
    description,
  } = product;
  const relatedProducts = products.filter((item) => item.category === category);

  
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );

    toast.success("Đã thêm vào giỏ hàng");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <section>
        <Container>
          <Row>
            <Col lg="5" className="product__details__img">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="7">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3 ">
                  <div>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-line"></i>
                    </span>
                  </div>

                  <p>
                    (<span>{avgRating}</span> đánh giá)
                  </p>
                </div>

                <div d-flex align-items-center gap-5>
                  <span className="product__price">
                    {price.toLocaleString("vi-VN")}VND
                  </span>
                  <br />
                  <span>Mặt hàng:{category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Thêm vào giỏ hàng
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
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
                  Nhận xét({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tap__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wapper">
                    <h2>Reviews:</h2>
                    <ul>
                      {reviews.map((review, index) => (
                        <li key={index}>
                          {" "}
                          <strong>"user"</strong> <br />
                          {review}
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <form onSubmit={reviewSubmitHandler}>
                        <label htmlFor="review">Để lại ý kiến của bạn:</label>
                        <div className="form__group">
                          <textarea
                            id="review"
                            value={reviewText}
                            onChange={reviewChangeHandler}
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn "
                        >
                          Đánh giá
                        </motion.button>
                      </form>
                    </div>
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
